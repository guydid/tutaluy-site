"""Compute exploded-view CSS geometry for the photo hero and render a check image.
usage: geometry.py CUT OUTDIR  -> prints JSON, writes geom_check.jpg"""
import sys, json
import numpy as np
from PIL import Image, ImageDraw
cut, out = sys.argv[1:3]
FW, FH = 2528, 1696
SW, SH = 2528, 3200
FY = (SH - FH) // 2
S, TX = 0.70, 0.045                     # exploded scale, x-shift (fraction of frame width) to make room for labels
ORDER = [('gutter', '01'), ('bag', '02'), ('drip', '03'), ('plants', '04'), ('fruit', '05')]   # bottom -> top
GAP = {'bag': -30, 'drip': -100, 'plants': -10, 'fruit': -160}
BOTTOM = SH - 90
cx, cy = FW / 2, FH / 2
geo = {}; prev_top = None; ims = {}
for name, n in ORDER:
    im = Image.open(f'{cut}/{n}_master.png'); ims[name] = im
    a = np.asarray(im)[..., 3]; ys, xs = np.where(a > 40)
    y0, y1 = ys.min(), ys.max()
    tb = BOTTOM if prev_top is None else prev_top - GAP[name]
    ty = (tb - FY) - (cy + S * (y1 - cy))
    top = tb - (y1 - y0) * S
    geo[name] = dict(ty=ty / FH * 100, top=top / SH * 100, bottom=tb / SH * 100)
    prev_top = top
# hit bands: split at midpoints between neighbouring layers
names = [n for n, _ in ORDER]
for i, n in enumerate(names):
    g = geo[n]
    lo = g['bottom'] if i == 0 else (g['bottom'] + geo[names[i - 1]]['top']) / 2
    hi = g['top'] if i == len(names) - 1 else (g['top'] + geo[names[i + 1]]['bottom']) / 2
    g['band_top'], g['band_bottom'] = max(0, hi), min(100, lo)
    g['label'] = (g['top'] + g['bottom']) / 2
res = {k: {kk: round(vv, 2) for kk, vv in v.items()} for k, v in geo.items()}
res['_'] = dict(S=S, TX=TX * 100, frame_top=FY / SH * 100, frame_h=FH / SH * 100, aspect=f'{SW}/{SH}')
print(json.dumps(res))
# check render: exploded composite + bands
st = Image.new('RGBA', (SW, SH), (216, 213, 210, 255))
for name, _ in ORDER:
    im = ims[name]; w, h = int(FW * S), int(FH * S)
    im2 = im.resize((w, h), Image.LANCZOS)
    st.alpha_composite(im2, (int(cx - w / 2 + TX * FW), int(FY + cy - h / 2 + geo[name]['ty'] / 100 * FH)))
d = ImageDraw.Draw(st)
for name, _ in ORDER:
    g = geo[name]
    d.rectangle([4, g['band_top'] / 100 * SH, SW - 4, g['band_bottom'] / 100 * SH], outline=(245, 105, 107, 255), width=6)
    d.text((30, g['label'] / 100 * SH), name, fill=(40, 40, 40, 255))
im = st.convert('RGB'); im.thumbnail((800, 1000)); im.save(f'{out}/geom_check.jpg', quality=85)
