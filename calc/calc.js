/* Calcium-buffering calculator for coco grow bags. Logic unchanged from the original /calc page;
   only the markup/CSS were redesigned to match the site. All element ids are shared with calc/index.html. */
(function(){
  var $ = function(id){ return document.getElementById(id); };
  var CA_MM = 40.078, PROTOCOL_CA_FRAC = 0.19;

  var FERTS = {
    haifa:   { name:'Haifa Cal GG', ca:0.19,  liquid:false, k:0.230, rec:250, max:1200, pack:25, chips:[50,100,200,400] },
    kalanit: { name:'קלניט 150',     ca:0.107, liquid:true,  dens:1.40, k:0.230, rec:500, max:1000, pack:10, chips:[100,200,300,500] }
  };

  function num(el, d){ var v = parseFloat(el.value); return (isFinite(v) && v > 0) ? v : (d === undefined ? 0 : d); }
  function fmt(v, d){ if(!isFinite(v)) return '—'; d = (d===undefined)?1:d;
    return v.toLocaleString('he-IL',{minimumFractionDigits:d, maximumFractionDigits:d}); }
  function trim(v, d){ return fmt(v,d).replace(/\.0+$/,''); }
  function smart(v){ if(!isFinite(v)) return '—';
    if(v >= 100) return fmt(v,0); if(v >= 10) return fmt(v,1); return fmt(v,2); }

  function fert(){
    var k = $('fert').value;
    if(FERTS[k]) return FERTS[k];
    return { name:'דשן מותאם', ca:num($('fCa'),19)/100, liquid:$('fState').value === 'liquid',
             dens:num($('fDens'),1.4), k:num($('kEC'),0.230),
             pack:($('fState').value === 'liquid') ? 10 : 25,
             chips:($('fState').value === 'liquid') ? [100,200,300,500] : [50,100,200,400] };
  }
  function bagSpec(){
    return ($('bag').value === 'straw')
      ? { vol:num($('sVol'),10),   pal:num($('sPal'),965), dun:num($('sDun'),818), name:'שק תותים' }
      : { vol:num($('vVol'),22.5), pal:num($('vPal'),430), dun:num($('vDun'),625), name:'שק ירקות' };
  }
  function solDefaults(){
    var p = FERTS[$('fert').value];
    if(p) return { rec:p.rec, max:p.max };
    return ($('fState').value === 'liquid') ? { rec:500, max:1000 } : { rec:250, max:1200 };
  }
  function applySolDefaults(){
    var d = solDefaults();
    $('solRec').value = d.rec; $('solMax').value = d.max;
  }
  function kgPallet(){
    var m = $('medium').value;
    return (m === '25o') ? 25 : parseFloat(m);
  }
  function protoDose(){ return kgPallet() * 1000 / bagSpec().pal; }   // g CaNO₃ per bag

  function buildAmtChips(){
    var f = fert(), u = f.liquid ? 'ל׳' : 'ק״ג';
    $('amtChips').innerHTML = f.chips.map(function(v){
      return '<button type="button" class="chip" data-a="'+v+'">'+fmt(v,0)+' '+u+'</button>'; }).join('');
    [].forEach.call($('amtChips').children, function(c){
      c.addEventListener('click', function(){ $('amt').value = c.dataset.a; calc(); }); });
  }
  function applyPackDefault(){ $('packSize').value = fert().pack; }

  var PULSE_FRAC = 0.05, PULSE_WAIT = 20;
  var WASH_MIN = 1.4, WASH_DEF = 1.6;   // × נפח המצע — 1.4 מינימום, 1.6 ברירת מחדל (EC סביר במינון הפרוטוקול)

  function calc(){
    var f = fert(), b = bagSpec(), liquid = f.liquid;

    // --- UI sync ---
    $('fertCustom').hidden = ($('fert').value !== 'other');
    $('densWrap').hidden   = !($('fert').value === 'other' && $('fState').value === 'liquid');
    $('amtHint').textContent      = liquid ? 'ליטר' : 'ק״ג';
    $('amtU').textContent         = liquid ? 'L' : 'kg';
    $('packUnitHint').textContent = liquid ? 'ליטר' : 'ק״ג';
    $('packU').textContent        = liquid ? 'L' : 'kg';

    // --- inputs ---
    var bagsSeg = num($('bagsSeg'), 1800);
    var gBag    = num($('gBag'), protoDose());
    var amt     = num($('amt'), 0);                 // kg (solid) or L (liquid) of product in the tank
    var tank    = num($('tank'), 1000);
    var pkSize  = num($('packSize'), f.pack);
    var minW    = Math.round(b.vol * WASH_MIN * 2) / 2;
    var washL   = num($('washL'), minW);
    var k       = num($('kEC'), 0.230);
    var pore    = b.vol * num($('wFrac'), 70) / 100;

    // wash chips, priced off the bag volume
    [].forEach.call(document.querySelectorAll('.chip[data-r]'), function(c, i){
      var v = Math.round(b.vol * parseFloat(c.dataset.r) * 2) / 2;
      c.dataset.w = v;
      c.textContent = trim(v,1) + ' ל׳/שק' + (i === 0 ? ' · מינימום' : '');
      c.classList.toggle('on', Math.abs(v - washL) < 0.001);
    });

    // protocol reference dose for the medium chosen in backoffice
    var protoG = protoDose();
    $('doseEq').textContent  = 'פרוטוקול: ' + fmt(protoG,1) + ' ג׳/שק · ' + fmt(gBag/b.vol,2) + ' ג׳ לליטר מצע';
    $('doseBtn').textContent = 'קבע ' + fmt(protoG,1) + ' ג׳ (פרוטוקול)';
    $('doseBtn').dataset.g   = protoG.toFixed(1);

    $('dProto').textContent = fmt(protoG,1) + ' ג׳ · פרוטוקול';
    $('dProto').dataset.g   = protoG.toFixed(1);
    $('d35').classList.toggle('on', Math.abs(gBag - 35) < 0.05);
    $('dProto').classList.toggle('on', Math.abs(gBag - protoG) < 0.05);

    // --- calcium the segment needs ---
    var caSeg = bagsSeg * gBag * PROTOCOL_CA_FRAC;              // g Ca

    // --- what the tank holds ---
    var caPerUnit  = liquid ? f.ca * (f.dens || 1.4) : f.ca;    // g Ca per g solid / per mL liquid
    var prodPerL   = amt * 1000 / tank;                         // g/L (solid) or mL/L (liquid)
    var caPerL_stk = prodPerL * caPerUnit;                      // g Ca per litre of tank solution
    var ok         = caPerL_stk > 0;
    var stockSeg   = ok ? caSeg / caPerL_stk : NaN;             // litres of tank solution per segment

    // --- water and dosing, driven by litres per bag ---
    var waterSeg = washL * bagsSeg;                             // litres
    var wOK      = waterSeg > 0;
    var inj      = (ok && wOK) ? stockSeg / (waterSeg/1000) : NaN;   // L solution per m³ water
    var caPerL_w = wOK ? caSeg / waterSeg : NaN;                // g Ca per litre of feed
    var ecDrip   = wOK ? caPerL_w * 1000 / CA_MM * k : NaN;     // EC contributed by the calcium
    var ratio    = washL / b.vol;

    // --- pulse regime ---
    var pVol   = b.vol * PULSE_FRAC;                            // litres per bag per pulse
    var pSeg   = pVol * bagsSeg;                                // litres per segment per pulse
    var nP     = (pVol > 0 && wOK) ? Math.ceil(washL / pVol) : NaN;
    var durMin = isFinite(nP) ? nP * PULSE_WAIT : NaN;
    var pStock = (ok && isFinite(nP) && nP > 0) ? stockSeg / nP : NaN;

    function hrs(m){
      if(!isFinite(m)) return '—';
      var h = Math.floor(m/60), mm = Math.round(m%60);
      return h > 0 ? (h + ' שע׳ ' + (mm ? mm + ' דק׳' : '')) : (mm + ' דק׳');
    }

    // --- solubility ceiling for this product and tank ---
    var d0     = solDefaults();
    var recC   = num($('solRec'), d0.rec);          // g/L (solid) or mL/L (liquid)
    var maxC   = num($('solMax'), d0.max);
    var cUnit  = liquid ? 'מ״ל/ל׳' : 'ג׳/ל׳';
    var aUnit  = liquid ? 'ליטר' : 'ק״ג';
    var pWord  = liquid ? ('קנקני ' + trim(pkSize,1) + ' ל׳') : ('שקי ' + trim(pkSize,1) + ' ק״ג');
    var maxAmt = recC * tank / 1000;                // L or kg of product

    $('solH1').textContent = cUnit;
    $('solU1').textContent = $('solU2').textContent = liquid ? 'mL/L' : 'g/L';

    // --- inline echoes under the inputs ---
    $('segEq').textContent  = fmt(bagsSeg/b.pal,2) + ' משטחים · ' + fmt(bagsSeg/b.dun,2) + ' דונם · '
                            + fmt(gBag,1) + ' ג׳ CaNO₃ לשק'
                            + (Math.abs(gBag - protoG)/protoG < 0.005 ? ' (פרוטוקול)' : ' (ידני)');
    $('tankEq').textContent = ok
      ? (fmt(caPerL_stk,1) + ' ג׳ Ca לליטר · ' + (pkSize > 0 ? ('≈ ' + trim(amt/pkSize,1) + ' ' + pWord + ' · ') : '')
         + 'מקסימום ' + fmt(maxAmt,0) + ' ' + aUnit)
      : '';
    $('washEq').textContent = wOK
      ? (fmt(waterSeg/1000,1) + ' מ״ק למקטע · ' + fmt(ratio,1) + '× נפח המצע · ' + fmt(washL/pore,2) + ' נפחים נקבוביים')
      : '';
    $('kEcho').value   = (1000*0.19/CA_MM*k).toFixed(2) + ' mS/cm ל-1 g/L';
    $('amtEcho').value = ok ? (fmt(caSeg/caPerUnit/1000,1) + ' ' + aUnit + ' נטו למקטע') : '—';

    // --- pulse box ---
    $('pVol').innerHTML   = fmt(pVol,2) + ' <small>ל׳ לשק</small>';
    $('pSeg').innerHTML   = fmt(pSeg,0) + ' <small>ליטר</small>';
    $('pN').innerHTML     = isFinite(nP) ? (fmt(nP,0) + ' <small>פולסים</small>') : '—';
    $('pDur').innerHTML   = hrs(durMin);
    $('pStock').innerHTML = isFinite(pStock) ? (fmt(pStock,1) + ' <small>ליטר</small>') : '—';

    // --- results ---
    $('hVal').textContent  = ok ? fmt(stockSeg,0) : '—';
    $('mVal').textContent  = ok ? fmt(stockSeg,0) : '—';
    $('hSec').innerHTML    = (ok && wOK) ? (fmt(inj,1) + ' <span>ליטר תמיסה למ״ק מים</span>') : '';
    $('mInj').textContent  = (ok && wOK) ? (fmt(inj,1) + ' ל׳/מ״ק') : '';
    $('hNote').textContent = b.name + ' · ' + fmt(bagsSeg,0) + ' שקים · ' + fmt(gBag,1) + ' ג׳ CaNO₃ לשק · ' + fmt(caSeg/1000,1) + ' ק״ג סידן נטו';

    $('rInj').innerHTML    = (ok && wOK) ? (fmt(inj,1) + ' <small>ל׳/מ״ק</small>') : '—';
    $('rTotW').innerHTML   = wOK ? (fmt(waterSeg/1000,1) + ' <small>מ״ק</small>') : '—';
    $('rEcDrip').innerHTML = wOK ? ('+' + fmt(ecDrip,2) + ' <small>mS/cm</small>') : '—';

    $('rStock').innerHTML = ok ? (fmt(caPerL_stk,1) + ' <small>ג׳ Ca/ל׳</small>') : '—';
    $('rConc').innerHTML  = ok ? (fmt(prodPerL,1) + ' <small>' + cUnit + '</small>') : '—';
    $('rSegsPerTank').innerHTML = ok ? (fmt(tank/stockSeg,2) + ' <small>מקטעים</small>') : '—';
    $('rPerBag').innerHTML = wOK ? (fmt(washL,1) + ' <small>ל׳/שק</small>') : '—';
    $('rRatio').innerHTML  = wOK ? (fmt(ratio,1) + ' <small>× נפח המצע</small>') : '—';
    $('rPore').innerHTML   = wOK ? (fmt(washL/pore,2) + ' <small>נפחים</small>') : '—';
    $('gWater').textContent = wOK ? (fmt(waterSeg/1000,1) + ' מ״ק') : '—';

    // --- alerts: only when something actually deviates ---
    var L = [];
    if(!ok){
      L.push(['e','<b>הזינו כמה ' + aUnit + ' דשן יש במיכל וכמה מים.</b>']);
    } else {
      if(washL < minW - 0.01)
        L.push(['w','<b>' + fmt(washL,1) + ' ל׳/שק — מתחת למינימום.</b> נדרש ' + fmt(minW,1) + ' ל׳/שק (' + fmt(WASH_MIN,1) + '× נפח השק). מתחת לזה לא מחליפים יונים בכל נפח המצע.']);
      if(ecDrip > 3.2)
        L.push(['w','<b>תוספת EC ' + fmt(ecDrip,2) + ' גבוהה.</b> הוסיפו מים לשק או פצלו לשני מחזורים.']);
      if(prodPerL > maxC)
        L.push(['e','<b>מעל גבול המסיסות.</b> ' + fmt(prodPerL,0) + ' מול ' + fmt(maxC,0) + ' ' + cUnit + ' — לא יימס במלואו. מקסימום למיכל: ' + fmt(maxAmt,0) + ' ' + aUnit + '.']);
      else if(prodPerL > recC)
        L.push(['w','<b>מעל הריכוז המומלץ.</b> ' + fmt(prodPerL,0) + ' מול ' + fmt(recC,0) + ' ' + cUnit + '. מקסימום למיכל ' + fmt(tank,0) + ' ל׳: <b>' + fmt(maxAmt,0) + ' ' + aUnit + '</b>. הוסיפו מים או פצלו לשני מיכלים.']);
      if(Math.abs(gBag - protoG)/protoG > 0.12)
        L.push(['w','<b>המינון חורג מהפרוטוקול</b> — ' + fmt(gBag,1) + ' מול ' + fmt(protoG,1) + ' ג׳/שק. ודאו מול ספק המצע.']);
    }
    $('alerts').innerHTML = L.map(function(a){ return '<div class="alert '+a[0]+'">'+a[1]+'</div>'; }).join('');
  }

  function syncDose(){ $('gBag').value = protoDose().toFixed(1); }

  $('doseBtn').addEventListener('click', function(){ $('gBag').value = this.dataset.g; calc(); });
  $('d35').addEventListener('click', function(){ $('gBag').value = '35'; calc(); });
  $('dProto').addEventListener('click', function(){ $('gBag').value = this.dataset.g; calc(); });

  $('fert').addEventListener('change', function(){
    var p = FERTS[$('fert').value]; if(p) $('kEC').value = p.k.toFixed(3);
    applySolDefaults(); applyPackDefault(); buildAmtChips(); calc();
  });
  $('fState').addEventListener('change', function(){
    applySolDefaults(); applyPackDefault(); buildAmtChips(); calc(); });
  $('bag').addEventListener('change', function(){
    var b = bagSpec();
    $('washL').value = (Math.round(b.vol * WASH_DEF * 2) / 2);
    syncDose(); calc(); });
  $('medium').addEventListener('change', function(){ syncDose(); calc(); });
  ['bagsSeg','gBag','amt','tank','washL','fCa','fDens','packSize',
   'sVol','sPal','sDun','vVol','vPal','vDun','kEC','wFrac','solRec','solMax'].forEach(function(id){
    $(id).addEventListener('input', calc); });
  [].forEach.call(document.querySelectorAll('.chip[data-r]'), function(c){
    c.addEventListener('click', function(){ $('washL').value = c.dataset.w; calc(); }); });

  window.addEventListener('beforeprint', function(){ $('more').open = true; });

  applySolDefaults();
  applyPackDefault();
  buildAmtChips();
  syncDose();
  calc();
})();
