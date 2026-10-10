"""Bake master/exploded onto the exact studio panel color using a combined alpha
(ISNet alpha  U  color-key alpha on the flattened image), so outside the object the
pixels equal the panel exactly and no frame edge is visible.
usage: bake_master.py SRC CUT OUTDIR"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
src, cut, out = sys.argv[1:4]
PANEL = np.array([216, 213, 210], np.float32)

def flatten(rgb, obj):
    h, w, _ = rgb.shape
    ys, xs = np.nonzero(~obj)
    sel = np.random.default_rng(0).choice(len(ys), min(60000, len(ys)), replace=False); ys, xs = ys[sel], xs[sel]
    def T(x, y):
        x = x / w * 2 - 1; y = y / h * 2 - 1
        return np.stack([np.ones_like(x), x, y, x*x, x*y, y*y, x**3, x*x*y, x*y*y, y**3], -1)
    A = T(xs.astype(np.float32), ys.astype(np.float32)); gy, gx = np.mgrid[0:h, 0:w].astype(np.float32); G = T(gx, gy)
    f = rgb.copy()
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A, rgb[ys, xs, c], rcond=None); f[..., c] += PANEL[c] - G @ coef
    return f

def bake(name, out_name, width, extra=(), plain=False):
    rgb = np.asarray(Image.open(f'{src}/{name}.png').convert('RGB')).astype(np.float32)
    a_ai = np.asarray(Image.open(f'{cut}/{name}.png'))[..., 3].astype(np.float32) / 255
    for e in extra:   # aligned layer cutouts (e.g. the gutter) cover low-contrast white parts
        a_ai = np.maximum(a_ai, np.asarray(Image.open(f'{cut}/{e}.png'))[..., 3].astype(np.float32) / 255)
    obj = ndimage.binary_dilation(a_ai > 0.03, iterations=30)
    flat = flatten(rgb, obj)
    if plain:         # standalone image (og:image): only flatten the backdrop, no alpha bake
        alpha = np.ones(flat.shape[:2], np.float32); solid = alpha > 0
    if not plain:
      d = np.sqrt(((flat - PANEL) ** 2).sum(-1))
      d = ndimage.gaussian_filter(d, 1.2)
      a_key = np.clip((d - 16) / 18, 0, 1)
      solid = (np.maximum(a_ai, a_key) > 0.5)
      solid = ndimage.binary_closing(solid, iterations=3)
      lab, n = ndimage.label(solid); sizes = ndimage.sum(solid, lab, range(1, n + 1))
      solid = np.isin(lab, 1 + np.nonzero(sizes >= 600)[0])            # drop speckles
      soft = np.maximum(a_ai, a_key)
      alpha = np.where(solid, np.maximum(soft, ndimage.binary_erosion(solid, iterations=2)), 0)
      alpha = ndimage.gaussian_filter(alpha.astype(np.float32), 0.8)
    outimg = alpha[..., None] * flat + (1 - alpha[..., None]) * PANEL
    im = Image.fromarray(np.clip(outimg, 0, 255).astype(np.uint8))
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{out}/{out_name}.webp', 'WEBP', quality=82, method=6)
    if out_name == 'exploded': im.save(f'{out}/exploded.jpg', quality=82, optimize=True, progressive=True)
    # debug: alpha preview over dark blue
    dbg = alpha[..., None] * flat + (1 - alpha[..., None]) * np.array([40, 60, 90.])
    Image.fromarray(np.clip(dbg, 0, 255).astype(np.uint8)).resize((900, round(900 * im.height / im.width))).save(f'{out}/dbg_{out_name}.jpg', quality=85)
    print(f'{out_name}: {os.path.getsize(f"{out}/{out_name}.webp")/1024:.0f} KB, object coverage {solid.mean()*100:.1f}%')

bake('00_master', 'master', 1400, extra=('01_master',))
bake('06_master', 'exploded', 1100, plain=True)
