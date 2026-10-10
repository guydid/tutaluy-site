"""Cut out hero layers with rembg and decontaminate edge colors.
usage: cut.py SRC_DIR OUT_DIR MODEL name1 name2 ..."""
import sys, os, time
import numpy as np
from PIL import Image
from rembg import new_session, remove

src, out, model = sys.argv[1], sys.argv[2], sys.argv[3]
names = sys.argv[4:]
os.makedirs(out, exist_ok=True)
sess = new_session(model)
for n in names:
    t = time.time()
    im = Image.open(os.path.join(src, n)).convert('RGB')
    mask = remove(im, session=sess, only_mask=True)            # L, 0..255
    a = np.asarray(mask).astype(np.float32) / 255.0
    rgb = np.asarray(im).astype(np.float32)
    # background color from the border
    b = np.concatenate([rgb[:20].reshape(-1, 3), rgb[-20:].reshape(-1, 3),
                        rgb[:, :20].reshape(-1, 3), rgb[:, -20:].reshape(-1, 3)])
    bg = np.median(b, axis=0)
    # un-mix the grey backdrop from semi-transparent edge pixels
    aa = np.clip(a, 1e-3, 1)[..., None]
    fg = np.where(a[..., None] > 0.02, (rgb - (1 - aa) * bg) / aa, rgb)
    fg = np.clip(fg, 0, 255)
    rgba = np.dstack([fg, a * 255]).astype(np.uint8)
    base = os.path.splitext(n)[0]
    Image.fromarray(rgba, 'RGBA').save(os.path.join(out, f'{base}.png'), optimize=True)
    print(f'{n}: {time.time()-t:.1f}s  alpha>0.5: {(a>.5).mean()*100:.1f}%', flush=True)
