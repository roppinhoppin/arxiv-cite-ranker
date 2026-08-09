# Privacy Policy for ArXiv Cite Ranker

Effective date: August 9, 2026

ArXiv Cite Ranker is a Chrome extension that analyzes arXiv paper source files to rank citation keys by frequency.

## Data Collection

ArXiv Cite Ranker does not collect, sell, transmit, or share personal information.

The extension does not use analytics, advertising trackers, remote logging, or third-party tracking services.

## Data Used by the Extension

When used on an arXiv paper page, the extension may:

- Read the active tab URL to detect the arXiv paper identifier.
- Download the paper source archive from `https://arxiv.org/src/...`.
- Parse TeX, BibTeX, and bibliography data locally in the browser to count citation usage.
- Store cached citation results locally using Chrome extension storage.

This cached data stays on the user's device and is used only to avoid reprocessing the same arXiv paper.

## Permissions

The extension requests:

- `activeTab`: to detect the current arXiv page when the extension is opened.
- `storage`: to cache citation analysis results locally on the user's device.
- `https://arxiv.org/*`: to download arXiv source files for citation analysis.

## Data Sharing

No user data is sent to the developer or to any third party. The only network request made for extension functionality is to arXiv to retrieve the source file for the current paper.

## Contact

For questions about this privacy policy, please open an issue in the GitHub repository.
