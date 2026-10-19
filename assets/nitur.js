(function(){
  var EN={
    'nav-why':'Benefits','login':'Sign in','nav-back':'\u2190 tutaluy','f-priv':'Privacy','f-acc':'Accessibility','nav-ai':'Assistant','nav-day':'A day inside','nav-how':'How it works','nav-contact':'Contact',
    'h1':'Talk<br>to the plant.','sub':'AI that learns your greenhouse and your crop, and turns the data into water and fertiliser savings and a better yield.',
    'cta':'Talk to us','cta2':'What the plant says','obj-k':'Substrate moisture · Gutter 4','obj-live':'now',
    'why-h':'Irrigate by the plant,<br>not by the clock.','why-l':'When you can see what is happening in the substrate, every drop lands exactly where it should.',
    'pr1':'Save<br><em>water.</em>','pr1p':'Irrigate when the substrate dries out; stop when drainage reaches the target.',
    'pr2':'Save<br><em>fertiliser.</em>','pr2p':'Drain EC shows what the plant actually takes up. What is not absorbed is not added.',
    'pr3':'More<br><em>yield.</em>','pr3p':'A plant without stress does not drop fruit. A stable substrate means a stable harvest.',
    'pr4':'Simple<br><em>to use.</em>','pr4p':'One screen on your phone, and a conversation with NITUR, your digital agent.',
    'ai-h':'A personal assistant<br>that knows your plants.','ai-l':'An assistant that knows your plots, varieties, irrigation and fertigation regimes. Consult it just as you would an agronomist who has been with you for many seasons.',
    'a1t':'Learns','a1h':'How you grow','a1p':'Irrigation, fertigation, varieties and planting dates. Every season it gets to know you better.',
    'a2t':'Listens','a2h':'To the plant’s needs','a2p':'The sensors report what is happening in the substrate; the assistant weighs it against the weather and the growth stage.',
    'a3t':'Integrates','a3h':'Into a single insight','a3p':'A recommendation with a reasoned explanation, ready to enter into the controller. You decide; it remembers.',
    'ch-top':'Assistant · Greenhouse 91',
    'ch-time':'real message',
    'm4':'A short daily review.',
    'm5':'Today went smoothly. Two items for your attention:<br><b>Plot 5:</b> in the morning only 300 L were delivered over 60 minutes (a low flow of 0.3 m³/h), and an error was logged at the end of the irrigation. Check whether the filter or the drippers are blocked.<br><b>Plot 4:</b> moisture is high and steady (85–86%), but the measured bag produced almost no drainage after the morning irrigation (only 0.12 L). The row still seems to be rewetting after the dry spell; I’ll check again tomorrow morning.<br><b>Plot 3:</b> drainage rose through the day (25% in the morning, 41–43% at noon, still under the 50% threshold). If the trend continues tomorrow, we drop one pulse. <b>Plot 2:</b> the shortened pulses ran as planned. <b>Plot 1:</b> the noon pulse did its job; moisture held at 60–61.7% all day, well clear of the threshold. <b>Plots 6–7:</b> all fine.',
    'ask':'Ask the assistant\u2026',
    'day-h':'A sample<br>day.','day-l':'What you see on the screen, and what you do about it.',
    'd1h':'Morning','d1p':'Overnight data on the screen. The assistant drafts today’s irrigation plan; you approve it and update the controller.',
    'd2h':'Noon','d2p':'Strong sunlight and faster uptake by the plants. The assistant recommends shorter irrigation intervals; you approve.',
    'd3h':'Evening','d3p':'All units scanned. All quiet.',
    's-top':'Greenhouse 91 · Strawberry','s-time':'Sat · 17:45',
    't1':'Substrate moisture','t2':'Drain EC','t2s':'target 1.8\u20132.2','t3':'Drain · gutter 2','t3s':'target 20–30','t4':'Substrate temperature','t5':'Daily water use','t5s':'7 irrigations','t6':'Drain pH',
    'ok':'In range','low':'Below target','al-b':'Gutter 2','al-t':'14% drainage over three consecutive irrigations. Check the drippers.',
    'note':'A real screen from the system, greenhouse 91.',
    'how-h':'A complete solution,<br>not just equipment.','how-l':'We measure only what the crop needs. Installation is an integral part of the project.',
    'st1h':'Measuring in substrate or soil','st1p':'Moisture, pH, EC, nutrition, temperature and drainage.',
    'st2h':'Data collection and learning','st2p':'Integrates with most common irrigation controllers. The data streams to the cloud, and the system learns the characteristics of your greenhouse.',
    'st3h':'Control and monitoring','st3p':'On phone and desktop. Real-time tracking, an overnight summary and immediate alerts when something drifts.',
    'pt1b':'The data stays yours.','pt1':'Full access on a private server or in the cloud, with full data export.',
    'pt0b':'Suits soil too.','pt0':'Orchards, field crops and more, with sensors matched to the crop.',
    'pt2b':'Grows with your business.','pt2':'From a single gutter to arrays of tens of thousands of plants.',
    'pt3b':'Built on hands-on experience.','pt3':'Developed in the field and proven under real growing conditions.',
    'c-h':'Let’s hear<br>what the plant says.','c-l':'Tell us what you grow and how many gutters you have, and we’ll come back with a tailored proposal.',
    'f-n':'Name','f-p':'Phone','f-c':'Crop','f-s':'Gutters / dunam','f-btn':'Send on WhatsApp',
    'o1':'Strawberry','o2':'Tomato','o3':'Cucumber','o4':'Pepper','o6':'Orchard','o7':'Field crop','o5':'Other',
    'consent':'This opens a WhatsApp link with the details you entered; we use them only to get in touch with you. <a href="../en/privacy.html">Privacy policy</a>.',
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
    // The dashboard is another origin and can't read nitur-lang, so the login
    // link carries the choice; the dashboard's login page follows it.
    document.querySelectorAll('a.login').forEach(function(a){a.href='https://dashboard.nitur-ai.com/v2?lang='+lang;});
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
  var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){drawSky();drawTiles();},120);});
})();
