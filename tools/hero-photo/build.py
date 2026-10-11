#!/usr/bin/env python3
"""Render the photo-hero homepage from template.html + geometry.json.

    python3 tools/hero-photo/build.py            -> new/index.html (images from assets/hero/)
    python3 tools/hero-photo/build.py --preview PHOTO_DIR
                                                 -> tools/hero-photo/dist/preview.html
                                                    (images inlined as data: URIs, single file;
                                                     PHOTO_DIR holds the live site's /assets/*.jpg)

Field photos are the ones already live at tutaluy.com/assets/, referenced as __PHOTO_<name>__.
"""
import base64, io, json, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ASSETS = ROOT / "new" / "assets" / "hero"
NAMES = ["gutter", "bag", "drip", "plants", "fruit", "master"]

def main() -> None:
    preview = "--preview" in sys.argv
    html = (HERE / "template.html").read_text(encoding="utf-8")
    g = json.loads((HERE / "geometry.json").read_text(encoding="utf-8"))
    meta = g.pop("_")
    layer_css, focus_css, band_css = [], [], []
    for n, v in g.items():
        layer_css.append(f".stage.x .l-{n}{{transform:translate({meta['TX']}%,{v['ty']}%) scale({meta['S']})}}")
        focus_css.append(f".stage.x:has(.b-{n}:hover) .l-{n},.stage.x:has(.b-{n}:focus-visible) .l-{n}"
                         f"{{opacity:1;filter:drop-shadow(0 16px 22px rgba(60,40,30,.22)) brightness(1.03)}}")
        band_css.append(f".b-{n}{{top:{v['band_top']}%;height:{round(v['band_bottom'] - v['band_top'], 2)}%}}")
    rep = {
        "__ASPECT__": meta["aspect"],
        "__FRAME_TOP__": str(meta["frame_top"]),
        "__FRAME_H__": str(meta["frame_h"]),
        "__LAYER_CSS__": "\n".join(layer_css),
        "__FOCUS_CSS__": "\n".join(focus_css),
        "__BAND_CSS__": "\n".join(band_css),
    }
    for n in NAMES:
        f = ASSETS / f"{n}.webp"
        rep[f"__IMG_{n}__"] = ("data:image/webp;base64," + base64.b64encode(f.read_bytes()).decode()) if preview \
            else f"assets/hero/{n}.webp"
    photo_dir = pathlib.Path(sys.argv[sys.argv.index("--preview") + 1]) if preview and len(sys.argv) > sys.argv.index("--preview") + 1 else None
    for name in sorted(set(re.findall(r"__PHOTO_([\w-]+)__", html))):
        if preview:
            from PIL import Image  # preview only: shrink so the single file stays light
            im = Image.open(photo_dir / f"{name}.jpg").convert("RGB")
            im.thumbnail((1200, 1200))
            buf = io.BytesIO(); im.save(buf, "JPEG", quality=78)
            rep[f"__PHOTO_{name}__"] = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
        else:
            rep[f"__PHOTO_{name}__"] = f"../assets/{name}.jpg"
    for k, v in rep.items():
        if k not in html:
            raise SystemExit(f"placeholder {k} missing from template")
        html = html.replace(k, v)
    out = HERE / "dist" / "preview.html" if preview else ROOT / "new" / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(f"wrote {out} ({out.stat().st_size:,} bytes)")

if __name__ == "__main__":
    main()
