# 3D homepage

The interactive exploded-view hero (gutter, grow bag, drip line, seedlings,
fruit) is built with Three.js r160.

- **Live page / source of truth:** `new/index.html` (staging at tutaluy.com/new).
  It loads Three.js from jsDelivr. When approved it replaces the root `index.html`.
- **Self-contained preview:** `python3 tools/homepage-3d/build.py` writes
  `tools/homepage-3d/dist/preview.html` with Three.js inlined as a classic
  script, so it works offline and in sandboxed previewers (no CDN, no
  `blob:` dynamic import). `dist/` is git-ignored.

`tools/` is excluded by the server's deploy script, so nothing here is published.
