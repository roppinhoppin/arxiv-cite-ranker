import pako from 'pako';
import untar from 'js-untar';

// Logic copied from main.js for debugging
function extractBibField(fieldsStr, fieldName) {
    const regex = new RegExp(`${fieldName}\\s*=\\s*(?:\{|")((?:[^{}]|\{[^{}]*\})*)(?:\}|")`, 'i');
    const match = regex.exec(fieldsStr);
    if (match) {
        return match[1].replace(/\{|\}/g, '').replace(/\s+/g, ' ').trim();
    }
    return null;
}

function parseBibliographyMetadata(bibContents, bblContents) {
    const metadata = {};

    bibContents.forEach(content => {
        const entryRegex = /@([a-zA-Z]+)\s*\{\s*([^,]+),([^@]*)/g;
        let match;
        while ((match = entryRegex.exec(content)) !== null) {
            const key = match[2].trim();
            const fieldsStr = match[3];
            
            const entry = {
                title: extractBibField(fieldsStr, 'title'),
                authors: extractBibField(fieldsStr, 'author'),
                venue: extractBibField(fieldsStr, 'journal') || extractBibField(fieldsStr, 'booktitle') || extractBibField(fieldsStr, 'publisher')
            };
            
            if (entry.title || entry.authors) {
                metadata[key] = entry;
            }
        }
    });

    bblContents.forEach(content => {
        const bibitemRegex = /\\bibitem(?:\[[^\]]*\])?\{([^}]+)\}([\s\S]*?)(?=\\bibitem|\s*\\end\{thebibliography\}|$)/g;
        let match;
        while ((match = bibitemRegex.exec(content)) !== null) {
            const key = match[1].trim();
            if (metadata[key]) continue;

            const rawText = match[2].replace(/\\newblock/g, ' ').replace(/\{|\}/g, '').replace(/\\em/g, '').replace(/\s+/g, ' ').trim();
            
            metadata[key] = {
                title: 'BBL Match: ' + rawText.substring(0, 50) + '...',
                authors: 'Extracted from .bbl',
                venue: rawText.substring(0, 100) + '...'
            };
        }
    });

    return metadata;
}

// UI Handlers
document.getElementById('test-bib').onclick = () => {
    const input = document.getElementById('bib-input').value;
    const result = parseBibliographyMetadata([input], []);
    document.getElementById('bib-result').innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
};

document.getElementById('test-bbl').onclick = () => {
    const input = document.getElementById('bbl-input').value;
    const result = parseBibliographyMetadata([], [input]);
    document.getElementById('bbl-result').innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
};

document.getElementById('test-fetch').onclick = async () => {
    const id = document.getElementById('arxiv-id').value.trim();
    if (!id) return alert('Enter ID');

    const logEl = document.getElementById('fetch-log');
    const resultEl = document.getElementById('fetch-result');
    logEl.innerHTML = 'Starting fetch...';
    
    try {
        const response = await fetch(`https://arxiv.org/src/${id}`);
        if (!response.ok) throw new Error('Status: ' + response.status);
        
        logEl.innerHTML += '<br>Downloaded. Extracts...';
        const buffer = await response.arrayBuffer();
        const uint8 = new Uint8Array(buffer);
        let decompressed;
        if (uint8[0] === 0x1f && uint8[1] === 0x8b) {
            decompressed = pako.ungzip(uint8);
        } else {
            decompressed = uint8;
        }

        const isTar = String.fromCharCode(...decompressed.slice(257, 262)).includes('ustar');
        const bibFiles = [];
        const bblFiles = [];

        if (isTar) {
            const extracted = await untar(decompressed.buffer);
            extracted.forEach(file => {
                if (file.name.endsWith('.bib')) bibFiles.push(new TextDecoder().decode(file.buffer));
                if (file.name.endsWith('.bbl')) bblFiles.push(new TextDecoder().decode(file.buffer));
            });
        }
        
        logEl.innerHTML += `<br>Found ${bibFiles.length} .bib and ${bblFiles.length} .bbl files.`;
        const metadata = parseBibliographyMetadata(bibFiles, bblFiles);
        resultEl.innerHTML = `<pre>${JSON.stringify(metadata, null, 2)}</pre>`;
        logEl.innerHTML += '<br>Done.';
    } catch (e) {
        logEl.innerHTML += `<br><span class="error">Error: ${e.message}</span>`;
    }
};
