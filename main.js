// No imports here as we load libraries via script tags in index.html

// Initialize Icons (lucide is global from local script)
if (window.lucide) {
  window.lucide.createIcons();
}

const elements = {
  initial: document.getElementById('initial-state'),
  loading: document.getElementById('loading-state'),
  results: document.getElementById('results-state'),
  error: document.getElementById('error-state'),
  loadingText: document.getElementById('loading-text'),
  errorMessage: document.getElementById('error-message'),
  totalCites: document.getElementById('total-cites'),
  uniqueKeys: document.getElementById('unique-keys'),
  citationList: document.getElementById('citation-list'),
  paperId: document.getElementById('paper-id'),
  retryBtn: document.getElementById('retry-button'),
  statusBadge: document.getElementById('status-badge'),
  searchInput: document.getElementById('search-input')
};

let currentData = [];
let metadataMap = {};
let currentArxivId = null;

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  const arxivId = parseArxivId(tab.url);
  if (!arxivId) {
    showState('initial');
    return;
  }

  currentArxivId = arxivId;
  elements.paperId.textContent = `ArXiv ID: ${currentArxivId}`;
  elements.statusBadge.textContent = 'ArXiv Detected';
  elements.statusBadge.classList.add('active');

  // Check cache
  const cacheKey = `arxiv_cite_${currentArxivId}`;
  chrome.storage.local.get([cacheKey], (result) => {
    const cached = result[cacheKey];
    if (cached) {
      if (Array.isArray(cached)) {
        metadataMap = {};
        renderResults(cached);
      } else if (cached.data) {
        const { data, metadata } = cached;
        metadataMap = metadata || {};
        renderResults(data);
      } else {
        processArxivSource(currentArxivId);
      }
    } else {
      processArxivSource(currentArxivId);
    }
  });

  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.onclick = () => processArxivSource(currentArxivId);
  }
  elements.retryBtn.onclick = () => processArxivSource(currentArxivId);
  elements.searchInput.oninput = (e) => filterList(e.target.value);
}

function parseArxivId(url) {
  if (!url) return null;
  const match = url.match(/arxiv\.org\/(?:abs|pdf|html)\/([^\/?#]+)/);
  if (match) {
    // Strip the .pdf if it exists
    return match[1].replace(/\.pdf$/, '');
  }
  return null;
}

function showState(state) {
  elements.initial.classList.add('hidden');
  elements.loading.classList.add('hidden');
  elements.results.classList.add('hidden');
  elements.error.classList.add('hidden');

  if (elements[state]) {
    elements[state].classList.remove('hidden');
  }
}

async function processArxivSource(id) {
  showState('loading');
  updateProgress('Initializing download...');

  try {
    console.log(`[CiteRanker] Starting fetch for ${id}`);
    const response = await fetch(`https://arxiv.org/src/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) throw new Error('Source file not found (404). This paper might not have TeX source available.');
      if (response.status === 403) throw new Error('Access denied (403). ArXiv might be blocking the request.');
      throw new Error(`Failed to fetch source (Status: ${response.status})`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`[CiteRanker] Downloaded ${buffer.byteLength} bytes`);
    updateProgress(`Downloaded ${(buffer.byteLength / 1024).toFixed(1)} KB...`);

    const sourceData = await extractSourceFiles(buffer);
    if (sourceData.texFiles.length === 0) {
      throw new Error('No TeX files found in the source. This might be a PDF-only submission.');
    }

    updateProgress('Analyzing citations...');
    console.log(`[CiteRanker] Analyzing ${sourceData.texFiles.length} TeX files`);
    const counts = analyzeCitations(sourceData.texFiles);
    
    updateProgress('Parsing bibliography metadata...');
    metadataMap = parseBibliographyMetadata(sourceData.bibFiles, sourceData.bblFiles);

    const sortedResult = Object.entries(counts)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count);

    console.log(`[CiteRanker] Found ${sortedResult.length} unique citation keys`);

    // Cache result
    const cacheKey = `arxiv_cite_${id}`;
    chrome.storage.local.set({ [cacheKey]: { data: sortedResult, metadata: metadataMap } });

    renderResults(sortedResult);
  } catch (err) {
    console.error('[CiteRanker] Error:', err);
    elements.errorMessage.textContent = err.message;
    showState('error');
  }
}

function updateProgress(text) {
  elements.loadingText.textContent = text;
  console.log(`[CiteRanker] Progress: ${text}`);
}

async function extractSourceFiles(buffer) {
  const texFiles = [];
  const bibFiles = [];
  const bblFiles = [];
  const uint8 = new Uint8Array(buffer);

  // Check for PDF signature (%PDF-)
  if (uint8[0] === 0x25 && uint8[1] === 0x50 && uint8[2] === 0x44 && uint8[3] === 0x46) {
    console.warn("[CiteRanker] Detected PDF file instead of TeX source.");
    throw new Error('This paper appears to be a PDF-only submission. No TeX source available for citation analysis.');
  }

  // Check for GZIP signature (1f 8b)
  let decompressed;
  if (uint8[0] === 0x1f && uint8[1] === 0x8b) {
    updateProgress('Decompressing GZIP...');
    try {
      decompressed = window.pako.ungzip(uint8);
      console.log(`[CiteRanker] Decompressed to ${decompressed.byteLength} bytes`);
    } catch (e) {
      console.error("[CiteRanker] GZIP Decompression failed", e);
      throw new Error('Failed to decompress the source file.');
    }
  } else {
    decompressed = uint8;
  }

  // Check if it's a TAR file
  const isTar = String.fromCharCode(...decompressed.slice(257, 262)).includes('ustar');

  if (isTar) {
    updateProgress('Extracting TAR archive...');
    try {
      const extracted = untarSync(decompressed);
      console.log(`[CiteRanker] Extracted ${extracted.length} files from TAR`);
      
      extracted.forEach(file => {
        const name = file.name.toLowerCase();
        const isTex = name.endsWith('.tex') || name.endsWith('.cls') || name.endsWith('.sty');
        const isBib = name.endsWith('.bib');
        const isBbl = name.endsWith('.bbl');
        const isLikelyMain = !name.includes('.') && file.size > 100;

        if (isTex || isBib || isBbl || isLikelyMain) {
          try {
            const text = new TextDecoder().decode(file.data);
            if (isBib) {
              bibFiles.push(text);
            } else if (isBbl) {
              bblFiles.push(text);
            } else if (isTex || (isLikelyMain && (text.includes('\\document') || text.includes('\\cite') || text.includes('\\section')))) {
              texFiles.push(text);
              // Extract embedded bibliography if present
              if (text.includes('\\begin{thebibliography}')) {
                const bblMatch = text.match(/\\begin\{thebibliography\}[\s\S]*?\\end\{thebibliography\}/);
                if (bblMatch) {
                  bblFiles.push(bblMatch[0]);
                } else {
                  // Fallback if \end is missing
                  const startIdx = text.indexOf('\\begin{thebibliography}');
                  bblFiles.push(text.substring(startIdx));
                }
              }
            }
          } catch (e) {
            console.warn(`[CiteRanker] Failed to decode ${file.name}`);
          }
        }
      });
    } catch (e) {
      console.error("[CiteRanker] TAR Extraction failed", e);
      throw new Error('Failed to extract files from the archive.');
    }
  } else {
    // Single file
    updateProgress('Parsing single TeX file...');
    try {
      const text = new TextDecoder().decode(decompressed);
      texFiles.push(text);
      // Extract embedded bibliography if present
      const bblMatch = text.match(/\\begin\{thebibliography\}[\s\S]*?\\end\{thebibliography\}/);
      if (bblMatch) {
        bblFiles.push(bblMatch[0]);
      } else if (text.includes('\\begin{thebibliography}')) {
        bblFiles.push(text.substring(text.indexOf('\\begin{thebibliography}')));
      }
    } catch (e) {
      throw new Error('Failed to decode the source file.');
    }
  }

  return { texFiles, bibFiles, bblFiles };
}

/**
 * Synchronous TAR parser to avoid Web Worker CSP issues.
 */
function untarSync(uint8) {
  const files = [];
  let offset = 0;

  while (offset + 512 <= uint8.length) {
    const header = uint8.subarray(offset, offset + 512);
    
    // Check if it's a null block (2 consecutive null blocks end the archive)
    if (header[0] === 0 && header[1] === 0) {
      offset += 512;
      continue;
    }

    // Extraction helper
    const readString = (start, length) => {
      let str = '';
      for (let i = 0; i < length; i++) {
        const charCode = header[start + i];
        if (charCode === 0) break;
        str += String.fromCharCode(charCode);
      }
      return str;
    };

    let fileName = readString(0, 100);
    const size = parseInt(readString(124, 12), 8);
    const type = readString(156, 1);
    
    // Check for USTAR prefix
    const ustar = readString(257, 5);
    if (ustar === 'ustar') {
      const prefix = readString(345, 155);
      if (prefix) fileName = prefix + '/' + fileName;
    }

    offset += 512;

    // Type '0' is normal file, '' is also often used for files
    if (type === '0' || type === '' || type === '\x00') {
      const fileData = uint8.subarray(offset, offset + size);
      files.push({
        name: fileName,
        size: size,
        data: fileData
      });
    }

    // Move offset to next 512-byte boundary
    offset += Math.ceil(size / 512) * 512;
  }
  return files;
}

function analyzeCitations(texContents) {
  const counts = {};
  const citeRegex = /\\cite[a-z*]*(\[[^\]]*\])*\{([^}]+)\}/g;

  texContents.forEach(content => {
    const cleanContent = content.replace(/%.*$/gm, '');
    let match;
    while ((match = citeRegex.exec(cleanContent)) !== null) {
      const keys = match[2].split(',').map(k => k.trim());
      keys.forEach(key => {
        if (!key) return;
        counts[key] = (counts[key] || 0) + 1;
      });
    }
  });

  return counts;
}

function parseBibliographyMetadata(bibContents, bblContents) {
  const metadata = {};

  // Helper for cleaning LaTeX markup
  const cleanTex = (str) => {
    if (!str) return '';
    return str
      .replace(/\\href\s*\{[^\}]*\}\s*/g, '')
      .replace(/\\url\s*\{[^\}]*\}\s*/g, '')
      .replace(/\\(bibinfo|bibfield|bibfnamefont|bibnamefont|citenamefont)\s*\{[^\}]*\}\s*/g, '')
      .replace(/\\(BibitemOpen|BibitemShut|newblock|em|it|bf|small|Large|large|sc|rm|sf|tt|url)/g, ' ')
      .replace(/\\(["'^`~v])\{?([a-zA-Z])\}?/g, '$2') // Basic accent handling
      .replace(/\\&/g, '&')
      .replace(/\\_/g, '_')
      .replace(/\\[a-zA-Z]+/g, ' ') // Strip remaining commands
      .replace(/\{|\}/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Use @vicapow/bibtex parser for .bib files
  if (window.bibtexParser) {
    const bibLib = new window.bibtexParser.Parser();
    bibContents.forEach(content => {
      try {
        const entries = bibLib.parseString(content, "bib file", window.bibtexParser.EXPAND_MACROS);
        entries.forEach(entry => {
          if (entry.metatype === window.bibtexParser.BtMetatype.REGULAR) {
            const key = entry.key;
            const fields = entry.fields;
            metadata[key] = {
              title: cleanTex(fields.title),
              authors: cleanTex(fields.author),
              venue: cleanTex(fields.journal || fields.booktitle || fields.publisher || fields.school || fields.venue || '')
            };
          }
        });
      } catch (e) {
        console.warn("[CiteRanker] BibTeX parsing error, falling back to basic extraction", e);
      }
    });
  }

  // Improved .bbl fallback parsing
  bblContents.forEach(content => {
    // Regex matches \bibitem followed by optional [key] and then {key}, then content until next bibitem or end
    const bibitemRegex = /\\bibitem\s*(?:\[[\s\S]*?\])?\s*\{([^}]+)\}([\s\S]*?)(?=\\bibitem|\s*\\end\{thebibliography\}|$)/g;
    let match;
    while ((match = bibitemRegex.exec(content)) !== null) {
      const key = match[1].trim();
      if (metadata[key] && metadata[key].title) continue;

      let rawText = cleanTex(match[2]);
      
      // Better heuristic for splitting Author. Title. Venue.
      const parts = rawText.split(/(?<![A-Z])\. \s+/).filter(p => p.length > 2);
      
      if (!metadata[key]) {
        metadata[key] = {
          title: (parts[1] || parts[0] || 'See reference list').trim(),
          authors: (parts[0] || 'Unknown Author').trim(),
          venue: (parts.length > 2 ? parts.slice(2).join('. ').substring(0, 150) : 'BBL source').trim()
        };
      }
    }
  });

  return metadata;
}

function renderResults(data) {
  currentData = data;
  showState('results');

  elements.totalCites.textContent = data.reduce((acc, curr) => acc + curr.count, 0);
  elements.uniqueKeys.textContent = data.length;

  updateList(data);
}

function updateList(data) {
  elements.citationList.innerHTML = '';
  if (data.length === 0) {
    elements.citationList.innerHTML = '<p class="center-content">No citations found.</p>';
    return;
  }

  const maxCount = Math.max(...data.map(d => d.count));

  data.forEach((item, index) => {
    const meta = metadataMap[item.key];
    const li = document.createElement('li');
    li.className = 'citation-item';
    // Limit animation delay to first 20 items for performance
    li.style.animationDelay = `${Math.min(index, 20) * 50}ms`;

    const percentage = (item.count / maxCount) * 100;

    li.innerHTML = `
      <div class="cite-header">
        <span class="cite-key">${item.key}</span>
        <span class="cite-count">${item.count}</span>
      </div>
      <div class="cite-bar-container">
        <div class="cite-bar" style="width: ${percentage}%"></div>
      </div>
      ${meta ? `
        <div class="cite-details">
          <div class="meta-title" title="${meta.title || ''}">${meta.title || 'Unknown Title'}</div>
          <div class="meta-authors">${meta.authors || 'Unknown Authors'}</div>
          <div class="meta-venue">${meta.venue || ''}</div>
        </div>
      ` : `
        <div class="cite-details empty">No metadata found in source.</div>
      `}
    `;
    elements.citationList.appendChild(li);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function filterList(query) {
  const filtered = currentData.filter(item => 
    item.key.toLowerCase().includes(query.toLowerCase())
  );
  updateList(filtered);
}

init();
