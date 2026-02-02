# ArXiv Cite Ranker 📚📈

A premium Chrome Extension that analyzes ArXiv paper sources to rank citations by how often they are mentioned in the text.

## Features
- **Auto-detection**: Automatically detects when you are on an ArXiv paper page (abs, pdf, or html).
- **Source Analysis**: Downloads the TeX source from ArXiv and extracts it in-browser.
- **Citation Ranking**: Parses all LaTeX citation commands (`\cite`, `\citep`, etc.) and counts their frequency.
- **Smooth UI**: Premium design with glassmorphism, animations, and real-time filtering.
- **Caching**: Remembers previous analysis results to save bandwidth and time.

## Installation
1. Download or clone this repository.
2. Run `npm install` and `npm run build`.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** (top right).
5. Click **Load unpacked** and select the `dist` folder in this project directory.

## How it works
1. Navigate to any ArXiv paper (e.g., `https://arxiv.org/abs/2301.12345`).
2. Click the ArXiv Cite Ranker icon in your extension bar.
3. The extension will fetch the `.tar.gz` source from ArXiv, decompress it using `pako`, and untar it using `js-untar`.
4. It then scans all `.tex` files for citations and presents a ranked list.

## Tech Stack
- **Vite**: Build tool.
- **Pako**: GZIP decompression.
- **JS-Untar**: TAR extraction.
- **Lucide**: Modern iconography.
- **Chrome Storage API**: For caching results.

---
Built with ❤️ for researchers.
