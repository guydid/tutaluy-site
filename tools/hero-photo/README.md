# Photo hero (exploded view)

The homepage hero shows a photoreal master render of the growing system. On hover
(desktop) or when scrolled into view (touch) it swaps to five cut-out layers that
separate vertically; each layer is a link to its page.

Source renders: Nano Banana images in Drive, `גרפיקה/WEB/hero-layers/`
(`00_master` assembled, `01`–`05` isolated layers, `06` exploded still).

Pipeline (run from the repo root, renders in $SRC):

1. `python3 tools/hero-photo/cut.py $SRC $CUT isnet-general-use 00_master.png … 06_master.png`
   cuts every render out with rembg/ISNet and un-mixes the grey backdrop from edge pixels.
2. `python3 tools/hero-photo/web_assets.py $SRC $CUT new/assets/hero`
   exports the five layers as 1400px WebP with alpha.
3. `python3 tools/hero-photo/bake_master.py $SRC $CUT new/assets/hero`
   flattens the master's backdrop and bakes it onto the exact studio panel color
   (#d8d5d2), so no frame edge shows; also writes `exploded.webp/.jpg` (og:image).
4. `python3 tools/hero-photo/geometry.py $CUT .` computes the exploded transforms,
   hit bands and label positions -> `geometry.json`.
5. `python3 tools/hero-photo/build.py` renders `new/index.html` from `template.html`;
   `--preview` writes a single-file preview with the images inlined.

The earlier procedural Three.js hero is in git history (commit 3ee5707).
`tools/` is excluded from the server deploy.
