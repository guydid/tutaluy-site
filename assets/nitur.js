(function(){
  var EN={
    'nav-why':'Why','login':'Sign in','nav-back':'\u2190 tutaluy','f-priv':'Privacy','f-acc':'Accessibility','nav-ai':'Assistant','nav-day':'A day inside','nav-how':'How it works','nav-contact':'Contact',
    'h1':'Talk<br>to the plant.','sub':'AI that learns your greenhouse and your plant, and turns it into water, fertiliser and yield.',
    'cta':'Talk to us','cta2':'What the plant says','obj-k':'Substrate moisture · Gutter 4','obj-live':'now',
    'why-h':'Irrigate by the plant,<br>not by the clock.','why-l':'When you see what happens in the substrate, every drop goes where it should.',
    'pr1':'Less<br><em>water.</em>','pr1p':'Irrigate when the substrate dries, stop when drainage hits the target.',
    'pr2':'Less<br><em>fertiliser.</em>','pr2p':'Drain EC shows what the plant really eats. What is not taken up is not given.',
    'pr3':'More<br><em>yield.</em>','pr3p':'A plant without stress does not drop fruit. Steady substrate, steady harvest.',
    'pr4':'Simple<br><em>to use.</em>','pr4p':'One screen on your phone, and a conversation with NITUR, your agent.',
    'ai-h':'A personal assistant<br>that knows your greenhouse.','ai-l':'An assistant that knows your plots, varieties, irrigation and fertigation. Ask it like an agronomist who was there every season.',
    'a1t':'Learns','a1h':'How you grow','a1p':'Irrigation, fertigation, varieties and planting dates. Every season it knows you better.',
    'a2t':'Listens','a2h':'What the plant needs','a2p':'The sensors say what happens in the substrate; the assistant links it to weather and growth stage.',
    'a3t':'Integrates','a3h':'Into one result','a3p':'A recommendation and an explanation, ready for the controller. You decide, it remembers.',
    'ch-top':'Assistant · Greenhouse 91',
    'ch-time':'real message',
    'm4':'Quick review of today.',
    'm5':'Today went fine. Two things to watch:<br><b>Plot 5:</b> the morning irrigation delivered only 300 L over 60 minutes, a flow of just 0.3 m\u00b3/h, and an error showed up at the end of the irrigation. Worth checking whether the filter or drippers are blocked.<br><b>Plot 4:</b> moisture is high and steady, 85\u201386%, but the measured bag barely drains after the morning, only 0.12 L. The row is probably still rewetting after the dry spell; I\u2019ll check again tomorrow morning.<br><b>Plot 3:</b> drain climbed through the day, 25% in the morning and 41\u201343% at noon, still under 50%. If it continues tomorrow we drop one pulse. <b>Plot 2:</b> the reduced pulses ran as planned. <b>Plot 1:</b> the noon pulse did its job, moisture stayed at 60\u201361.7% all day, well above the threshold. <b>Plots 6\u20137:</b> fine.',
    'ask':'Ask the assistant\u2026',
    'day-h':'One day<br>in the greenhouse.','day-l':'What you see on the screen, and what you do with it.',
    'd1h':'Morning','d1p':'Last night on the screen. The assistant prepares today\u2019s irrigation recipe; you approve it and update the controller.',
    'd2h':'Noon','d2p':'Strong sun, the plants drink fast. The assistant recommends shorter gaps; you approve.',
    'd3h':'Evening','d3p':'Low drain in gutter 2. An alert to your phone, and tomorrow you check a dripper, not the fruit.',
    's-top':'Greenhouse 91 · Strawberry','s-time':'Sat · 17:45',
    't1':'Substrate moisture','t2':'Drain EC','t2s':'target 1.8\u20132.2','t3':'Drain · gutter 2','t3s':'target 20–30','t4':'Substrate temp','t5':'Water today','t5s':'7 irrigations','t6':'Drain pH',
    'ok':'In range','low':'Below target','al-b':'Gutter 2','al-t':'Drain 14%, three irrigations in a row. Check the drippers.',
    'note':'Demo data. In your system the screen shows your own greenhouse.',
    'how-h':'A solution,<br>not equipment.','how-l':'We measure what the crop needs. Installation is part of the project.',
    'st1h':'Measuring in the substrate','st1p':'Moisture, nutrition and temperature in the bag, and drainage at the end of the gutter.',
    'st2h':'Collecting and learning','st2p':'The data goes to the cloud, and the system learns your greenhouse from it.',
    'st3h':'Screen and assistant','st3p':'Phone and desktop. What is happening now, what happened overnight, and an alert when something drifts. Reads from most irrigation controllers.',
    'pt1b':'Your data.','pt1':'On your server or in the cloud, open to export.',
    'pt0b':'In soil too.','pt0':'Strawberries, vegetables, orchards and field crops. Sensors chosen for the crop.',
    'pt2b':'Grows with you.','pt2':'From one gutter to 18,000 plants.',
    'pt3b':'From experience.','pt3':'Built in the field and proven in real growing.',
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

  /* behind the hero: gentle heartbeat lines, like the one running through the logo */
  var sky=document.getElementById('sky'),skyT=0;
  function beat(x,w,h,y,amp,phase,period,col,lw){
    x.beginPath();x.lineJoin='round';x.lineCap='round';x.strokeStyle=col;x.lineWidth=lw;
    for(var px=-10;px<=w+10;px+=2){
      var u=((px+phase)%period+period)%period/period, dy=0;
      if(u>.30&&u<.34)dy=-amp*.35*Math.sin((u-.30)/.04*Math.PI);
      else if(u>=.34&&u<.40)dy=amp*Math.sin((u-.34)/.06*Math.PI);
      else if(u>=.40&&u<.50)dy=-amp*.55*Math.sin((u-.40)/.10*Math.PI);
      else if(u>=.50&&u<.62)dy=amp*.22*Math.sin((u-.50)/.12*Math.PI);
      px===-10?x.moveTo(px,y+dy):x.lineTo(px,y+dy);
    }
    x.stroke();
  }
  function drawSky(){var g=fit(sky);if(!g)return;var x=g.x,w=g.w,h=g.h;
    var grad=x.createLinearGradient(0,0,0,h);grad.addColorStop(0,'#E8EEE7');grad.addColorStop(1,'#F4F5F1');x.fillStyle=grad;x.fillRect(0,0,w,h);
    var period=Math.max(420,w*.55);
    for(var r=0;r<6;r++){var y=h*(.22+r*.11),amp=h*.05*(1-r*.08),al=.10+r*.035;
      beat(x,w,h,y,amp,skyT*(.4+r*.12)+r*period*.37,period,'rgba(0,192,98,'+al+')',1.5+r*.3);}
  }
  drawSky();
  if(!reduce)(function loop(){skyT+=.6;drawSky();requestAnimationFrame(loop);})();

  var defs={vwc:[61,6,23,'#EDEEEA'],ec:[2.0,.3,3,'#EDEEEA'],drain:[14,8,5,'#F2C14E'],temp:[22.6,3,17,'#EDEEEA'],water:[0,0,1,'#EDEEEA'],ph:[5.8,.3,11,'#EDEEEA']};
  function drawTiles(){document.querySelectorAll('.tile').forEach(function(t){var k=t.getAttribute('data-k'),d=defs[k],c=t.querySelector('canvas'),g=fit(c);if(!g)return;
    var x=g.x;x.clearRect(0,0,g.w,g.h);var data;
    if(k==='water'){data=[];var acc=0;for(var i=0;i<48;i++){if(i%7===3)acc+=445;data.push(acc);}}
    else data=series(48,d[0],d[1],d[2]);
    line(x,g.w,g.h,data,d[3],d[3]==='#EDEEEA'?'rgba(237,238,234,.08)':'rgba(242,193,78,.14)',4);});}
  drawTiles();
  var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){drawSky();drawHero();drawTiles();},120);});
})();
