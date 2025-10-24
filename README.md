# Portfolio (auto-populated)

This folder contains a simple static portfolio that:

- Lists your public GitHub repositories for `nik-767` (fetched from the GitHub API)
- Shows Skills
- Provides an Achievements/Certifications area that you can populate manually (or add an authenticated import later)

Files changed/added
- `portfolio.htm` — main page (Projects & Achievements added)
- `portfolio.js` — JS to fetch repos and render skills/achievements
- `potfolio.css` — styles for new sections

How to run locally (recommended)

Important: modern browsers block some cross-origin requests (CORS) from `file://` pages. To fetch GitHub API from the page you should serve the folder over HTTP.

Using Python (if installed):

```powershell
# from this project folder (d:\codesoft\task1)
python -m http.server 8000
# then open http://localhost:8000/portfolio.htm in your browser
```

Or using Node (if you have Node.js):

```powershell
npx http-server -p 8000
# then open http://localhost:8000/portfolio.htm
```

How to add achievements/certifications

1. On the page, paste a JSON array into the "Achievements & Certifications" textarea. Example:

```json
[
  {"title":"Machine Learning","issuer":"Coursera","year":"2024","link":"https://www.coursera.org/verify/..."},
  {"title":"Front-End Web Developer","issuer":"freeCodeCamp","year":"2023"}
]
```

2. Click "Load Achievements" — the page will parse and render the list.

Notes / Next steps
- Automatic import of LinkedIn requires OAuth and the LinkedIn API; I can help wire that if you want (it needs client credentials).
- I can add richer project cards (readme preview, languages breakdown) if you want.

If you'd like, I can now:
- Add README badge/metadata
- Enhance the Projects cards (show README snippet)
- Hook up a small CI deployment (GitHub Pages)

Tell me which next step you prefer.
