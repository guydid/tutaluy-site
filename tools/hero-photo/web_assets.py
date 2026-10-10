"""Build web assets for the photo hero.
usage: web_assets.py SRC CUT OUTDIR
- flattens the backdrop of 00 (master) and 06 (exploded still) to the exact panel color
- exports layers 01-05 (alpha) and the master/exploded as WebP sized for the stage
"""
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage
src, cut, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
PANEL = np.array([216, 213, 210], np.float32)
W = 1400                                   # frame width on the web (2x of ~700 css px)

def flatten(name):
    rgb = np.asarray(Image.open(f'{src}/{name}.png').convert('RGB')).astype(np.float32)
    a = np.asarray(Image.open(f'{cut}/{name}.png'))[..., 3].astype(np.float32) / 255
    obj = ndimage.binary_dilation(a > 0.03, iterations=30)          # stay well clear of objects
    h, w, _ = rgb.shape
    ys, xs = np.nonzero(~obj)
    sel = np.random.default_rng(0).choice(len(ys), min(60000, len(ys)), replace=False)
    ys, xs = ys[sel], xs[sel]
    def terms(x, y):
        x = x / w * 2 - 1; y = y / h * 2 - 1
        return np.stack([np.ones_like(x), x, y, x*x, x*y, y*y, x**3, x*x*y, x*y*y, y**3], -1)
    A = terms(xs.astype(np.float32), ys.astype(np.float32))
    gy, gx = np.mgrid[0:h, 0:w].astype(np.float32)
    T = terms(gx, gy)
    fixed = rgb.copy()
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A, rgb[ys, xs, c], rcond=None)
        field = T @ coef
        fixed[..., c] = rgb[..., c] + (PANEL[c] - field)
    # remove any remaining global offset, measured far from the objects
    far = ~ndimage.binary_dilation(a > 0.03, iterations=90)
    fixed += PANEL - fixed[far].mean(0)
    fixed = np.clip(fixed, 0, 255)
    bgpx = fixed[~obj]
    print(f'{name}: backdrop after flatten  mean={bgpx.mean(0).round(1)}  std={bgpx.std(0).round(2)}')
    return Image.fromarray(fixed.astype(np.uint8))

def save_webp(im, path, q):
    im.save(path, 'WEBP', quality=q, method=6)
    print(f'  {os.path.basename(path):18s} {im.size}  {os.path.getsize(path)/1024:.0f} KB')

m = flatten('00_master'); m = m.resize((W, round(m.height * W / m.width)), Image.LANCZOS)
save_webp(m, f'{out}/master.webp', 82)
ex = flatten('06_master'); ex1 = ex.resize((1100, round(ex.height * 1100 / ex.width)), Image.LANCZOS)
save_webp(ex1, f'{out}/exploded.webp', 80); ex1.save(f'{out}/exploded.jpg', quality=82, optimize=True, progressive=True)
for n, name in zip(['01', '02', '03', '04', '05'], ['gutter', 'bag', 'drip', 'plants', 'fruit']):
    im = Image.open(f'{cut}/{n}_master.png').convert('RGBA')
    im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
    save_webp(im, f'{out}/{name}.webp', 82)
