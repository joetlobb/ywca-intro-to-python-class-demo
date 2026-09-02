# Intro to Python — YWCA Learning Center

A free, self-paced Intro to Python course built for YWCA Learning Center clients. It runs entirely in the browser — no installs, no accounts, no server — using [Pyodide](https://pyodide.org/) to execute real Python code on the page.

**Live site:** [_Intro to Python_](http://python.gpkwsr.com/index.html)

## What's here

- `index.html` — topic menu. A client types their first name, then picks a topic; each card shows whether that topic is complete.
- `session1.html` – `session6.html` — the six lessons, in order:
  1. Getting Started — what is programming, meet Python, `print()`
  2. Storing Information — variables, `input()`, f-strings
  3. Making Decisions — `if` / `elif` / `else`, comparisons
  4. Repeating Things — `for` and `while` loops
  5. Organizing Code — lists and functions
  6. Practice Project — build a quiz game, combining everything above
- `client.js` — shared helpers used by every page: the active-client name (`sessionStorage`), per-client topic-complete progress (`localStorage`), and the Pyodide input/output wiring that lets `print()` and `input()` work inside the browser.
- `.nojekyll` — tells GitHub Pages to skip Jekyll processing and serve the files as-is.

Each lesson page includes learning objectives, key vocabulary, worked examples you can run, guided and independent practice, an optional stretch activity, and a "mark complete" checkbox.

## How progress tracking works

This is designed for a shared computer used by one client at a time, not for logins or accounts:

- The client's name is stored in `sessionStorage`, so it clears automatically when the browser tab closes — the next client never inherits the previous one's name.
- Completed-topic checkmarks are stored in `localStorage`, keyed by that name, so a returning client on the *same* computer keeps their progress. Progress does not follow a client to a different computer.

Nothing here is sent to a server — everything lives in the visitor's own browser.

## Running locally

No build step or dependencies required. Just serve the folder over HTTP (opening `index.html` directly as a `file://` URL will not work, since Pyodide needs to be loaded from a real origin):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deployment

This site is a set of static files, so it deploys directly with GitHub Pages — no build step needed:

1. Push this repo to GitHub.
2. In **Settings → Pages**, set Source to **Deploy from a branch**, pick your branch and `/ (root)`, and save.
3. GitHub will publish the site at `https://<username>.github.io/<repo>/`.

## Credits

Built with [Pyodide](https://pyodide.org/), which runs a full Python interpreter in the browser via WebAssembly.
