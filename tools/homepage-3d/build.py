#!/usr/bin/env python3
"""Build the self-contained preview of the 3D homepage.

Source of truth is the live page itself: new/index.html (later: index.html).
It loads Three.js r160 from jsDelivr and carries a harmless placeholder
comment <!--__THREE_CLASSIC__-->.

This script inlines Three.js into that placeholder as a *classic* script
(window.THREE), producing a single HTML file that works fully offline and
inside sandboxed previewers that block CDNs and blob:/dynamic imports.

Usage:
    python3 tools/homepage-3d/build.py [page.html] [out.html]

Three.js is taken from the npm registry (npm pack three@0.160.0) and
cached under tools/homepage-3d/dist/ (git-ignored).
"""
import pathlib
import subprocess
import sys
import tarfile

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]
DIST = HERE / "dist"
THREE_VERSION = "0.160.0"
PLACEHOLDER = "<!--__THREE_CLASSIC__-->"


def three_module_source() -> str:
    DIST.mkdir(exist_ok=True)
    cached = DIST / f"three-{THREE_VERSION}.module.min.js"
    if not cached.exists():
        subprocess.run(["npm", "pack", f"three@{THREE_VERSION}", "--silent"],
                       cwd=DIST, check=True)
        with tarfile.open(DIST / f"three-{THREE_VERSION}.tgz") as tf:
            member = tf.getmember("package/build/three.module.min.js")
            cached.write_bytes(tf.extractfile(member).read())
    return cached.read_text(encoding="utf-8")


def to_classic(src: str) -> str:
    """Turn the ESM build (one trailing `export{a as B,...}`) into a classic
    script that assigns window.THREE."""
    for bad in ("</script", "<!--", "<script"):
        if bad in src.lower():
            raise SystemExit(f"three.js source contains {bad!r}; cannot inline")
    i = src.rfind("export{")
    j = src.find("}", i)
    if i < 0 or src[j + 1:].strip() not in (";", ""):
        raise SystemExit("unexpected three.js module layout")
    pairs = []
    for item in src[i + 7:j].split(","):
        item = item.strip()
        if item:
            local, _, public = item.partition(" as ")
            pairs.append(f"{public or local}:{local}")
    return ('(function(){"use strict";' + src[:i] +
            "window.THREE=Object.freeze({" + ",".join(pairs) + "});})();")


def main() -> None:
    page = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "new" / "index.html"
    out = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else DIST / "preview.html"
    html = page.read_text(encoding="utf-8")
    if html.count(PLACEHOLDER) != 1:
        raise SystemExit(f"{page} must contain exactly one {PLACEHOLDER}")
    classic = to_classic(three_module_source())
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html.replace(PLACEHOLDER, "<script>" + classic + "</script>"),
                   encoding="utf-8")
    print(f"wrote {out} ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
