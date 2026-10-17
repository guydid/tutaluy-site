/* exploded view: scrubbed by scroll where CSS scroll-driven animations exist, otherwise opens when the stage
   comes into view; static and open for reduced motion. Hovering a layer's band or label focuses that layer. */
(function () {
  var stage = document.getElementById('stage'); if (!stage) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var layers = Array.prototype.slice.call(stage.querySelectorAll('.layer'));
  var ready = Promise.all(layers.map(function (im) { return im.decode ? im.decode().catch(function () {}) : Promise.resolve(); }));
  function on() { stage.classList.add('x'); }
  function off() { stage.classList.remove('x'); delete stage.dataset.focus; }

  Array.prototype.forEach.call(stage.querySelectorAll('[data-layer]'), function (el) {
    var n = el.getAttribute('data-layer');
    el.addEventListener('pointerenter', function () { stage.dataset.focus = n; });
    el.addEventListener('pointerleave', function () { if (stage.dataset.focus === n) delete stage.dataset.focus; });
    el.addEventListener('focus', function () { on(); stage.dataset.focus = n; });
    el.addEventListener('blur', function () { delete stage.dataset.focus; });
  });

  if (reduce) { ready.then(on); return; }
  if (window.CSS && CSS.supports && CSS.supports('animation-timeline: view()')) { stage.classList.add('scrub'); return; }
  ready.then(function () {
    new IntersectionObserver(function (e) { e[0].intersectionRatio > 0.55 ? on() : off(); }, { threshold: [0, 0.55, 1] }).observe(stage);
  });
})();

/* lead form: there is no backend, so it opens a pre-filled WhatsApp message and nothing is silently lost */
(function () {
  var form = document.getElementById('leadForm'); if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var en = (document.documentElement.lang || 'he').slice(0, 2) === 'en';
    var t = en
      ? { hi: "Hi, I'd like to hear about a soilless growing system.", name: 'Name: ', phone: 'Phone: ', crop: 'Crop: ', area: 'Area: ', unit: ' ha',
          sent: 'We opened WhatsApp with your details. If it did not open: +972 54-632-4746.' }
      : { hi: 'שלום, אשמח לשמוע על מערכת גידול.', name: 'שם: ', phone: 'טלפון: ', crop: 'גידול: ', area: 'שטח: ', unit: ' דונם',
          sent: 'פתחנו את וואטסאפ עם הפרטים. אם לא נפתח: 054-6324746.' };
    var f = form.elements, lines = [t.hi, t.name + f.name.value.trim(), t.phone + f.phone.value.trim(), t.crop + f.crop.value];
    if (f.size.value.trim()) lines.push(t.area + f.size.value.trim() + t.unit);
    var url = 'https://wa.me/972546324746?text=' + encodeURIComponent(lines.join('\n'));
    var w = window.open(url, '_blank');
    if (!w) { location.href = url; return; }   /* popup blocked: go in this tab rather than lose the lead */
    w.opener = null;
    document.getElementById('sent').textContent = t.sent;
  });
})();

/* phones: show the WhatsApp/phone dock once the hero has scrolled away */
(function () {
  var dock = document.querySelector('.dock'), hero = document.querySelector('.hero');
  if (!dock || !hero || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (e) { dock.classList.toggle('on', !e[0].isIntersecting); }).observe(hero);
})();
