(function(){
  var EN={
    'nav-why':'Why','nav-back':'\u2190 tutaluy','f-priv':'Privacy','f-acc':'Accessibility','nav-ai':'Assistant','nav-day':'A day inside','nav-how':'How it works','nav-contact':'Contact',
    'h1':'Talk<br>to the plant.','sub':'Synergy between grower and plant, powered by AI. NITUR learns how you grow and what the plant needs, and brings it all together into one result: yield.',
    'cta':'Talk to us','cta2':'What the plant says','obj-k':'Substrate moisture · Gutter 4','obj-live':'now',
    'why-h':'Irrigate by the plant,<br>not by the clock.','why-l':'When you know what happens inside the substrate, every drop and every gram of fertiliser goes where it should.',
    'pr1':'Less<br><em>water.</em>','pr1p':'Irrigation starts when the substrate dries and stops when drainage hits the target. Not before, not after.',
    'pr2':'Less<br><em>fertiliser.</em>','pr2p':'Drain EC shows whether the plant eats what it is given. What is not taken up does not need to be poured.',
    'pr3':'More<br><em>yield.</em>','pr3p':'A plant that is not stressed does not drop fruit. A steady substrate is a steady harvest.',
    'pr4':'Simple<br><em>to use.</em>','pr4p':'One screen on your phone, and a conversation with NITUR, your agent. Ask, get an answer, approve.',
    'ai-h':'A personal assistant<br>that knows your greenhouse.','ai-l':'The system learns your way of growing and the plant\u2019s needs, and builds an assistant that knows your plots, varieties, irrigation and fertigation. Ask it the way you would ask an agronomist who was there every season.',
    'a1t':'Learns','a1h':'How you grow','a1p':'Irrigation timing, fertiliser doses, varieties and planting dates. Every season it knows you better.',
    'a2t':'Listens','a2h':'What the plant needs','a2p':'The sensors say what happens in the substrate; the assistant links it to weather, growth stage and variety.',
    'a3t':'Integrates','a3h':'Into one result','a3p':'A recommendation and an explanation, ready to carry over to the controller. You decide, it remembers.',
    'ch-top':'Assistant · Greenhouse 91',
    'ch-time':'real message',
    'm4':'Quick review of today.',
    'm5':'Today went fine. Two things to watch:<br><b>Plot 5:</b> the morning irrigation delivered only 300 L over 60 minutes, a flow of just 0.3 m\u00b3/h, and an error showed up at the end of the irrigation. Worth checking whether the filter or drippers are blocked.<br><b>Plot 4:</b> moisture is high and steady, 85\u201386%, but the measured bag barely drains after the morning, only 0.12 L. The row is probably still rewetting after the dry spell; I\u2019ll check again tomorrow morning.<br><b>Plot 3:</b> drain climbed through the day, 25% in the morning and 41\u201343% at noon, still under 50%. If it continues tomorrow we drop one pulse. <b>Plot 2:</b> the reduced pulses ran as planned. <b>Plot 1:</b> the noon pulse did its job, moisture stayed at 60\u201361.7% all day, well above the threshold. <b>Plots 6\u20137:</b> fine.',
    'ask':'Ask the assistant\u2026',
    'day-h':'One day<br>in the greenhouse.','day-l':'What you see on the screen, and what you do with it.',
    'd1h':'Morning','d1p':'Last night on the screen: substrate down to 58% moisture, drain EC steady. The assistant prepares today\u2019s irrigation recipe; you approve it and update the controller.',
    'd2h':'Noon','d2p':'Strong sun, the plants drink fast. The assistant recommends shortening the gap between irrigations with the radiation; you approve and update the controller.',
    'd3h':'Evening','d3p':'Drain in gutter 2 is below target. An alert to your phone, and tomorrow you check a blocked dripper instead of finding out in the fruit.',
    's-top':'Greenhouse 91 · Strawberry','s-time':'Sat · 17:45',
    't1':'Substrate moisture','t2':'Drain EC','t2s':'target 1.8\u20132.2','t3':'Drain · gutter 2','t3s':'target 20–30','t4':'Substrate temp','t5':'Water today','t5s':'7 irrigations','t6':'Drain pH',
    'ok':'In range','low':'Below target','al-b':'Gutter 2','al-t':'Drain 14%, three irrigations in a row. Check the drippers.',
    'note':'Demo data. In your system the screen shows your own greenhouse.',
    'how-h':'A solution,<br>not equipment.','how-l':'What gets measured follows the agronomic need of the crop, the variety and the stage. Installation is part of the project.',
    'st1h':'Measuring in the substrate','st1p':'Moisture, nutrition and temperature in the bag, and drainage at the end of the gutter. Sensors are fitted to the crop, not the other way round.',
    'st2h':'Collecting and learning','st2p':'The data flows from the greenhouse to the cloud, and the system learns your greenhouse from it. Nothing for you to manage.',
    'st3h':'Screen and assistant','st3p':'Phone and desktop. What is happening now, what happened overnight, and an alert when something drifts. Reads from most irrigation controllers on the market.',
    'pt1b':'Your data.','pt1':'On your server or in the cloud, open to export. No subscription that locks you in.',
    'pt0b':'In soil too.','pt0':'Strawberries in gutters, vegetables in coco, and orchards and field crops as well. Same system, sensors chosen for the crop.',
    'pt2b':'Grows with you.','pt2':'From one gutter to 18,000 plants. Measurement is added only when the agronomy asks for it.',
    'pt3b':'Built by a grower.','pt3':'Built from long experience in the field and proven in real growing.',
    'c-h':'Let’s hear<br>what the plant says.','c-l':'What you grow and how many gutters. We’ll come back with a proposal.',
    'f-n':'Name','f-p':'Phone','f-c':'Crop','f-s':'Gutters / dunam','f-btn':'Send on WhatsApp',
    'o1':'Strawberry','o2':'Tomato','o3':'Cucumber','o4':'Pepper','o6':'Orchard','o7':'Field crop','o5':'Other',
    'consent':'This opens a WhatsApp link with the details you filled in; we use them only to get back to you. <a href="../en/privacy.html">Privacy policy</a>.',
    'foot':'© NITUR · HaRimon 91, Moshav Achituv · by tutaluy'
  };
  var HE={};
  var site=document.getElementById('site');
  document.querySelectorAll('[data-i]').forEach(function(el){var k=el.getAttribute('data-i');if(!(k in HE))HE[k]=el.innerHTML;});
  var lang='he';
  try{lang=localStorage.getItem('nitur-lang')||'he';}catch(e){}
  var btn=document.getElementById('lang');
  function apply(){
    var d=lang==='en'?EN:HE;
    document.querySelectorAll('[data-i]').forEach(function(el){var k=el.getAttribute('data-i');if(d[k]!=null)el.innerHTML=d[k];});
    document.documentElement.dir=lang==='en'?'ltr':'rtl';document.documentElement.lang=lang;
    btn.textContent=lang==='en'?'עב':'EN';btn.setAttribute('aria-label',lang==='en'?'עברית':'English');
  }
  btn.addEventListener('click',function(){lang=lang==='en'?'he':'en';try{localStorage.setItem('nitur-lang',lang);}catch(e){}apply();});
  apply();

  document.getElementById('leadForm').addEventListener('submit',function(e){
    e.preventDefault();
    var f=e.target,sent=document.getElementById('sent');
    if(!f.n.value.trim()||!f.p.value.trim()){sent.textContent=lang==='en'?'Name and phone are needed.':'צריך שם וטלפון.';return;}
    var msg=(lang==='en'?'Hi, I’d like to hear about NITUR. ':'שלום, אשמח לשמוע על NITUR. ')+
      f.n.value.trim()+', '+f.p.value.trim()+', '+f.c.value+(f.s.value?', '+f.s.value:'');
    var url='https://wa.me/972546324746?text='+encodeURIComponent(msg);
    sent.innerHTML='';var a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';
    a.textContent=lang==='en'?'Open WhatsApp with your details':'פתיחת וואטסאפ עם הפרטים';sent.appendChild(a);
  });

  var hd=document.querySelector('header');
  function onScroll(){hd.classList.toggle('solid',scrollY>40);}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fit(c){var r=c.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
    if(!r.width||!r.height)return null;c.width=r.width*dpr;c.height=r.height*dpr;var x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);return {x:x,w:r.width,h:r.height};}
  function series(n,base,amp,seed){var out=[],v=base,s=seed;for(var i=0;i<n;i++){s=(s*9301+49297)%233280;var r=s/233280-.5;v+=r*amp*.3;v+=(base-v)*.08;out.push(v);}return out;}
  function line(x,w,h,data,col,fill,pad){var min=Math.min.apply(null,data),max=Math.max.apply(null,data),rg=(max-min)||1;
    function px(i){return pad+i/(data.length-1)*(w-pad*2);}function py(v){return h-pad-(v-min)/rg*(h-pad*2);}
    if(fill){x.beginPath();x.moveTo(px(0),h);data.forEach(function(v,i){x.lineTo(px(i),py(v));});x.lineTo(px(data.length-1),h);x.closePath();x.fillStyle=fill;x.fill();}
    x.beginPath();data.forEach(function(v,i){i?x.lineTo(px(i),py(v)):x.moveTo(px(i),py(v));});x.strokeStyle=col;x.lineWidth=2;x.lineJoin='round';x.stroke();
    var lx=px(data.length-1),ly=py(data[data.length-1]);x.beginPath();x.arc(lx,ly,3.5,0,Math.PI*2);x.fillStyle=col;x.fill();}

  /* hero: substrate moisture over a day — a sawtooth, each irrigation a step up, drying between */
  var hc=document.getElementById('heroChart'),hv=document.getElementById('heroVal'),hd=[];
  (function(){var v=58;for(var i=0;i<96;i++){if(i%14===0&&i>0)v+=9;v-=.62;hd.push(v);}})();
  function drawHero(){var g=fit(hc);if(!g)return;var x=g.x;x.clearRect(0,0,g.w,g.h);
    x.strokeStyle='rgba(237,238,234,.1)';x.lineWidth=1;for(var i=1;i<4;i++){x.beginPath();x.moveTo(0,g.h*i/4);x.lineTo(g.w,g.h*i/4);x.stroke();}
    line(x,g.w,g.h,hd,'#00C062','rgba(0,192,98,.18)',8);
    hv.textContent=Math.round(hd[hd.length-1]);}
  drawHero();
  var tick=0;
  if(!reduce)setInterval(function(){tick++;var last=hd[hd.length-1];hd.push(tick%14===0?last+9:last-.62);hd.shift();drawHero();},1500);

  /* greenhouse morning behind the hero: rows of gutters catching light, a few ripe fruit */
  var sky=document.getElementById('sky');
  function drawSky(){var g=fit(sky);if(!g)return;var x=g.x,w=g.w,h=g.h;
    var grad=x.createLinearGradient(0,0,0,h);grad.addColorStop(0,'#E6EDE4');grad.addColorStop(.6,'#EEF0EA');grad.addColorStop(1,'#F4F5F1');x.fillStyle=grad;x.fillRect(0,0,w,h);
    var lg=x.createRadialGradient(w*.78,h*.08,0,w*.78,h*.08,w*.5);lg.addColorStop(0,'rgba(255,250,230,.9)');lg.addColorStop(1,'rgba(255,250,230,0)');x.fillStyle=lg;x.fillRect(0,0,w,h);
    for(var r=0;r<7;r++){var y=h*.3+r*h*.085,s=.45+r*.09;x.strokeStyle='rgba(27,30,28,'+(.05+r*.015)+')';x.lineWidth=2*s;
      x.beginPath();x.moveTo(-20,y);x.lineTo(w+20,y+r*4);x.stroke();
      for(var c=0;c<w/60;c++){var cx=c*60*s+r*17,cy=y+(c%3)*3+r*4*(cx/w);x.fillStyle='rgba(78,155,99,'+(.14+r*.04)+')';x.beginPath();x.arc(cx,cy-6*s,2.4*s,0,7);x.fill();
        if((c+r)%4===0){x.fillStyle='rgba(225,80,80,'+(.35+r*.07)+')';x.beginPath();x.arc(cx+8*s,cy-3*s,2.8*s,0,7);x.fill();}}}
  }
  drawSky();

  var defs={vwc:[61,6,23,'#EDEEEA'],ec:[2.0,.3,3,'#EDEEEA'],drain:[14,8,5,'#F2C14E'],temp:[22.6,3,17,'#EDEEEA'],water:[0,0,1,'#EDEEEA'],ph:[5.8,.3,11,'#EDEEEA']};
  function drawTiles(){document.querySelectorAll('.tile').forEach(function(t){var k=t.getAttribute('data-k'),d=defs[k],c=t.querySelector('canvas'),g=fit(c);if(!g)return;
    var x=g.x;x.clearRect(0,0,g.w,g.h);var data;
    if(k==='water'){data=[];var acc=0;for(var i=0;i<48;i++){if(i%7===3)acc+=445;data.push(acc);}}
    else data=series(48,d[0],d[1],d[2]);
    line(x,g.w,g.h,data,d[3],d[3]==='#EDEEEA'?'rgba(237,238,234,.08)':'rgba(242,193,78,.14)',4);});}
  drawTiles();
  var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){drawSky();drawHero();drawTiles();},120);});
})();
