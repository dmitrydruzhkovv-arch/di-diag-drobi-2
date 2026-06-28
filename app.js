/* Диагностика дробей — v2 (ступень 1 воронки, лид-диагностика).
   Обёртка как у входного теста ОГЭ 8→9: бренд-кит, без обложки (старт сразу с
   вопроса), вспышки-ромбы на каждый ответ, финал = кликабельная карта тем с
   разбором каждого задания. Содержание (14 вопросов + живые объяснялки) — из v1,
   не менялось. Математику не трогаем. */

window.onerror=function(m,s,l){var r=document.getElementById('screen')||document.body;r.innerHTML='<pre style="color:#f43f5e;padding:16px;white-space:pre-wrap;font-size:13px">JS error:\n'+m+'\n(line '+l+')</pre>';};

/* ====== ДАННЫЕ (Методист · cond_voice) — БЕЗ ИЗМЕНЕНИЙ из v1 ======
   opts: массив {t:текст, ok:1 у правильного}. Порядок показа перемешивается. */
const DATA = {
  cta:{
    label:"Хочу разобрать это на пробном →",
    note:"Откроется чат с Ди. Напиши «прошёл тест» — подберём время. Бесплатно, без обязательств.",
    url:"https://vk.me/club238196266"
  },
  questions:[
    {id:"q01",theme:"Смысл и виды",ref:"Урок 1",cond:"Какая часть полоски закрашена?",svg:"pie8_3",
     opts:[{t:"3/8",ok:1},{t:"3/5"},{t:"5/8"},{t:"8/3"}],
     explain:{type:"bar-read",n:8,k:3,note:"Верх дроби — сколько закрашено, низ — на сколько долей делили."}},
    {id:"q02",theme:"Смысл и виды",ref:"Урок 1",cond:"Одна из этих дробей — неправильная. Найди её.",
     opts:[{t:"7/5",ok:1},{t:"3/4"},{t:"5/8"},{t:"2/9"}],
     explain:{type:"improper-circle",num:7,den:5,note:"Неправильная дробь — это больше целого. 7/5 — это целый пирог и ещё 2/5 второго."}},
    {id:"q03",theme:"Сокращение",ref:"Урок 2",cond:"Запиши 6/8 короче — сократи.",
     opts:[{t:"3/4",ok:1},{t:"2/4"},{t:"6/8"},{t:"1/2"}],
     explain:{type:"reduce-circle",from:[6,8],to:[3,4],note:"Закрашено столько же — просто кусков стало крупнее. 6/8 = 3/4."}},
    {id:"q04",theme:"Сокращение",ref:"Урок 2",cond:"Сократи 12/18 до конца, не бросай на полпути.",
     opts:[{t:"2/3",ok:1},{t:"6/9"},{t:"4/6"},{t:"1/2"}],
     explain:{type:"reduce-bar",from:[12,18],to:[2,3],note:"Делим верх и низ на 6: 12/18 = 2/3. Закрашено столько же — кусков стало крупнее."}},
    {id:"q05",theme:"Сравнение",ref:"Урок 2",cond:"Два повербанка: один заряжен на 3/5, другой на 5/8. У какого заряд больше?",
     opts:[{t:"5/8",ok:1},{t:"3/5"},{t:"равны"},{t:"нельзя сравнить"}],
     explain:{type:"compare-bars",a:[3,5],b:[5,8],note:"Налей оба на одной шкале: у 5/8 столбик чуть выше — заряд больше."}},
    {id:"q06",theme:"Сравнение",ref:"Урок 2",cond:"Кусок в 1/4 пиццы или кусок в 1/6 — какой больше?",
     opts:[{t:"1/4",ok:1},{t:"1/6"},{t:"равны"},{t:"нельзя сравнить"}],
     explain:{type:"compare-circles",a:[1,4],b:[1,6],note:"Чем больше кусков — тем мельче каждый. 1/4 крупнее 1/6."}},
    {id:"q07",theme:"Сложение и вычитание",ref:"Урок 3",cond:"Сколько будет 1/5 + 2/5?",
     opts:[{t:"3/5",ok:1},{t:"3/10"},{t:"3/25"},{t:"2/5"}],
     explain:{type:"bar-add",n:5,k1:1,k2:2,note:"Доли одного размера — складываем верх, низ не трогаем. 1/5 + 2/5 = 3/5."}},
    {id:"q08",theme:"Сложение и вычитание",ref:"Урок 3",cond:"Утром прошёл 1/2 пути, после обеда ещё 1/3. Какая часть пути позади?",
     opts:[{t:"5/6",ok:1},{t:"2/5"},{t:"2/6"},{t:"1/5"}],
     explain:{type:"bar-add-common",den:6,parts:[[1,2],[1,3]],result:[5,6],note:"Разный размер долей — приводим к шестым: 1/2 = 3/6, 1/3 = 2/6. Вместе 5/6."}},
    {id:"q09",theme:"Умножение и деление",ref:"Урок 4",cond:"В банке осталось 3/4 сока. Ты выпил половину от этого остатка. Какая часть полной банки оказалась у тебя в стакане?",
     opts:[{t:"3/8",ok:1},{t:"4/6"},{t:"3/4"},{t:"2/6"}],
     explain:{type:"part-of-part",outer:[3,4],result:[3,8],note:"Берём половину от 3/4. Режем на восьмые: 3/4 = 6/8, половина от шести долей — это 3/8."}},
    {id:"q10",theme:"Умножение и деление",ref:"Урок 4",cond:"У тебя 3/4 пиццы. Одна порция — это 1/2 пиццы. Сколько порций выйдет?",
     opts:[{t:"3/2",ok:1},{t:"3/8"},{t:"2/3"},{t:"1/2"}],
     explain:{type:"division-portions",pizza:[3,4],portion:[1,2],result:[3,2],note:"Сколько половинок помещается в 3/4? Одна целая половина и ещё половинка — это 3/2 = 1,5 порции."}},
    {id:"q11",theme:"Десятичные",ref:"Урок 5",cond:"Переведи 3/4 в десятичную дробь.",
     opts:[{t:"0,75",ok:1},{t:"0,34"},{t:"0,43"},{t:"3,4"}],
     explain:{type:"decimal-bar",frac:[3,4],decimal:"0,75",note:"3/4 — это три четвертинки. Каждая четверть = 0,25, три штуки = 0,75."}},
    {id:"q12",theme:"Десятичные",ref:"Урок 5",cond:"На одной карте 0,5 ₽, на другой 0,45 ₽. Где денег больше?",
     opts:[{t:"0,5",ok:1},{t:"0,45"},{t:"равны"},{t:"нельзя сравнить"}],
     explain:{type:"compare-bars",a:[5,10],b:[45,100],labelA:"0,5",labelB:"0,45",note:"0,5 — это пять десятых, 0,45 — чуть меньше. На общей шкале 0,5 выше."}},
    {id:"q13",theme:"Проценты",ref:"Урок 6",cond:"Скидка 25% на товар за 80 ₽. Какова сумма скидки в рублях?",
     opts:[{t:"20",ok:1},{t:"40"},{t:"25"},{t:"2"}],
     explain:{type:"percent-circle",percent:25,whole:80,unit:" ₽",note:"25% — это четверть. Делим 80 на 4 равных куска: один кусок = 20 ₽."}},
    {id:"q14",theme:"Проценты",ref:"Урок 6",cond:"Толстовка стоит 1000 ₽, скидка 20%. Сколько заплатишь на кассе?",
     opts:[{t:"800 ₽",ok:1},{t:"980 ₽"},{t:"200 ₽"},{t:"750 ₽"}],
     explain:{type:"percent-remain",percent:20,whole:1000,unit:" ₽",note:"Скидка 20% — убираем одну пятую. Остаётся 80%: это 800 ₽."}},
  ],
  senseQ:["q05","q06","q12"],
};
const THEMES=["Смысл и виды","Сокращение","Сравнение","Сложение и вычитание","Умножение и деление","Десятичные","Проценты"];
const KEYS=["A","B","C","D"];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

/* ====== БУМ-ЭФФЕКТ (вспышки ромбов + звук, как у теста 8→9) ======
   Диагностика показывает правильность по ходу, поэтому вспышка дифференцированная:
   верно → зелёная + win, неверно → красная + lose. */
function lkFlash(el){ if(!el) return; el.classList.remove('is-on'); void el.offsetWidth; el.classList.add('is-on'); }
function playSound(id){ const a=document.getElementById(id); if(!a) return; try{ a.currentTime=0; a.play().catch(()=>{});}catch(e){} }
function flashOk(){ lkFlash(document.getElementById('lk-fx-ok')); playSound('snd-win'); }
function flashBad(){ lkFlash(document.getElementById('lk-fx-bad')); playSound('snd-lose'); }

/* ====== РЕНДЕР МАТЕМАТИКИ (для вариантов и разбора) ======
   `моно` · **акцент** · 7/4 → двухэтажная дробь. */
function makeFrac(n,d){ return `<span class="frac lk-mono"><span class="fn">${n}</span><span class="fd">${d}</span></span>`; }
function fmtInline(text){
  if(text==null) return '';
  return String(text)
    .replace(/\*\*(.+?)\*\*/g,(_,s)=>`<span class="lk-hl">${s}</span>`)
    .replace(/`([^`]+)`/g,(_,s)=>`<span class="lk-mono">${s}</span>`)
    .replace(/(\d+)\/(\d+)/g,(_,n,d)=>makeFrac(n,d));
}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;}
function lcm(a,b){return a/gcd(a,b)*b;}

/* ====== ОТЧЁТ ЛИДА (#38) — анонимный код-мост ======
   Лид без ника → генерим короткий код. На CTA шлём итоги на тот же эндпоинт #38
   (token=код): Ди получает разбор в ВК, лид пишет «тест КОД» — Ди сматчит. ПДн нет.
   CORS эндпоинта пускает только прод github.io → локальные превью не шлют. */
const HW_ENDPOINT='https://194-87-110-53.nip.io/hw-result';
const LEAD_CODE=Math.random().toString(36).slice(2,6).toUpperCase();
let reported=false;

/* ====== СОСТОЯНИЕ ====== */
let idx=0; const answers={}; // id -> {ok:bool, pick:int(индекс в показанном порядке)}
const screen=()=>document.getElementById('screen');

const svgPie8 = `<svg width="220" height="92" viewBox="0 0 220 92" xmlns="http://www.w3.org/2000/svg">
  ${Array.from({length:8}).map((_,i)=>{
    const x=6+i*26, filled=i<3;
    return `<rect x="${x}" y="6" width="25" height="80" rx="4"
      fill="${filled?'rgba(168,85,247,.85)':'rgba(255,255,255,.05)'}"
      stroke="${filled?'#c084fc':'#2a2a4d'}" stroke-width="2"
      ${filled?'filter="url(#g)"':''}/>`;
  }).join('')}
  <defs><filter id="g"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
</svg>`;

/* ====== ЖИВЫЕ ОБЪЯСНЯЛКИ (живая математика) — БЕЗ ИЗМЕНЕНИЙ из v1 ====== */
const EX_FILL='rgba(168,85,247,.85)', EX_EMPTY='rgba(255,255,255,.05)';
const EX_SON='#c084fc', EX_SOFF='#2a2a4d';

function exPol(cx,cy,r,a){return [cx+r*Math.cos(a), cy+r*Math.sin(a)];}
function exSector(cx,cy,r,i,n){
  if(n===1) return `M${cx-r},${cy} A${r},${r} 0 1 1 ${cx+r},${cy} A${r},${r} 0 1 1 ${cx-r},${cy} Z`;
  const step=2*Math.PI/n, a0=-Math.PI/2+i*step, a1=a0+step;
  const [x0,y0]=exPol(cx,cy,r,a0),[x1,y1]=exPol(cx,cy,r,a1);
  return `M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${step>Math.PI?1:0} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`;
}
function exGlow(uid){return `<defs><filter id="exg${uid}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;}

function exCircleSVG(uid,n,size){
  const r=size/2-6, c=size/2;
  let s=`<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${exGlow(uid)}`;
  for(let i=0;i<n;i++) s+=`<path data-c="${uid}" data-i="${i}" d="${exSector(c,c,r,i,n)}" fill="${EX_EMPTY}" stroke="${EX_SOFF}" stroke-width="2" stroke-linejoin="round"/>`;
  s+=`<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#4a3a78" stroke-width="2" opacity=".5"/></svg>`;
  return s;
}
function exBarSVG(uid,n,w,h){
  const gap=4, cw=(w-gap*(n-1))/n;
  let s=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${exGlow(uid)}`;
  for(let i=0;i<n;i++){const x=i*(cw+gap);s+=`<rect data-c="${uid}" data-i="${i}" x="${x.toFixed(1)}" y="0" width="${cw.toFixed(1)}" height="${h}" rx="5" fill="${EX_EMPTY}" stroke="${EX_SOFF}" stroke-width="2"/>`;}
  s+=`</svg>`;return s;
}
function exLight(host,uid,i){
  const el=host.querySelector(`[data-c="${uid}"][data-i="${i}"]`); if(!el) return;
  el.setAttribute('fill',EX_FILL); el.setAttribute('stroke',EX_SON); el.setAttribute('filter',`url(#exg${uid})`);
}
function exPaint(host,uid,i,fill,stroke){
  const el=host.querySelector(`[data-c="${uid}"][data-i="${i}"]`); if(!el) return;
  el.setAttribute('fill',fill); el.setAttribute('stroke',stroke); el.setAttribute('filter',`url(#exg${uid})`);
}
function exFrac(k,n){return `<span class="exf"><b>${k}</b><i></i><b>${n}</b></span>`;}

function exSeq(host,steps){
  let t=0;
  steps.forEach(step=>{ t+=step.wait||0; setTimeout(()=>{ if(host.isConnected) step.run(); }, t); });
}

function exMeterSVG(uid,w,h){
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${exGlow(uid)}
    <rect x="1" y="1" width="${w-2}" height="${h-2}" rx="8" fill="${EX_EMPTY}" stroke="${EX_SOFF}" stroke-width="2"/>
    <rect data-m="${uid}" x="3" y="${h-3}" width="${w-6}" height="0" rx="6" fill="${EX_FILL}" filter="url(#exg${uid})" style="transition:height .6s cubic-bezier(.2,.8,.2,1),y .6s cubic-bezier(.2,.8,.2,1)"/></svg>`;
}
function exMeterTo(host,uid,frac,h){
  const r=host.querySelector(`[data-m="${uid}"]`); if(!r) return;
  const fh=(h-6)*frac; r.setAttribute('height',fh.toFixed(1)); r.setAttribute('y',(h-3-fh).toFixed(1));
}
function exTrackSVG(uid,w,h,ticks){
  let s=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${exGlow(uid)}
    <rect x="1" y="1" width="${w-2}" height="${h-2}" rx="7" fill="${EX_EMPTY}" stroke="${EX_SOFF}" stroke-width="2"/>
    <rect data-m="${uid}" x="3" y="3" width="0" height="${h-6}" rx="5" fill="${EX_FILL}" filter="url(#exg${uid})" style="transition:width .6s cubic-bezier(.2,.8,.2,1)"/>`;
  if(ticks){for(let i=1;i<ticks;i++){const x=3+(w-6)*i/ticks;s+=`<line x1="${x.toFixed(1)}" y1="3" x2="${x.toFixed(1)}" y2="${h-3}" stroke="#4a3a78" stroke-width="2" stroke-dasharray="3 3"/>`;}}
  s+=`</svg>`;return s;
}
function exTrackTo(host,uid,frac,w){
  const r=host.querySelector(`[data-m="${uid}"]`); if(!r) return;
  r.setAttribute('width',((w-6)*frac).toFixed(1));
}

function renderExplain(spec,host){
  const uid=Math.random().toString(36).slice(2,7);
  if(spec.type==='bar-read'){
    const {n,k}=spec;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig">${exBarSVG(uid,n,260,52)}</div>
      <div class="exlbl" id="exl">${exFrac(0,n)}</div>
      <div class="exnote">${spec.note}</div>`;
    const lbl=host.querySelector('#exl');
    const steps=[];
    for(let j=1;j<=k;j++) steps.push({wait:520,run:()=>{exLight(host,uid,j-1);if(lbl)lbl.innerHTML=exFrac(j,n);}});
    exSeq(host,steps);
  }
  else if(spec.type==='bar-add'){
    const {n,k1,k2}=spec;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig">${exBarSVG(uid,n,260,52)}</div>
      <div class="exlbl" id="exl">${exFrac(0,n)}</div>
      <div class="exnote">${spec.note}</div>`;
    const lbl=host.querySelector('#exl');
    const steps=[];
    for(let j=1;j<=k1;j++) steps.push({wait:520,run:()=>{exLight(host,uid,j-1);if(lbl)lbl.innerHTML=exFrac(j,n);}});
    for(let j=1;j<=k2;j++) steps.push({wait:520,run:()=>{exLight(host,uid,k1+j-1);if(lbl)lbl.innerHTML=exFrac(k1+j,n);}});
    exSeq(host,steps);
  }
  else if(spec.type==='reduce-circle'){
    const [kf,nf]=spec.from, [kt,nt]=spec.to;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig"><div class="exstage" id="exs">${exCircleSVG(uid,nf,170)}</div></div>
      <div class="exlbl" id="exl">${exFrac(kf,nf)}</div>
      <div class="exnote">${spec.note}</div>`;
    const stage=host.querySelector('#exs'), lbl=host.querySelector('#exl');
    const steps=[];
    for(let j=0;j<kf;j++) steps.push({wait:300,run:()=>exLight(host,uid,j)});
    steps.push({wait:900,run:()=>{
      if(!stage) return;
      const uid2=uid+'b';
      stage.style.opacity=0;
      setTimeout(()=>{ if(!host.isConnected) return;
        stage.innerHTML=exCircleSVG(uid2,nt,170); stage.style.opacity=1;
        for(let j=0;j<kt;j++) setTimeout(()=>exLight(host,uid2,j),120*(j+1));
        if(lbl) lbl.innerHTML=`${exFrac(kf,nf)} <span class="exeq">=</span> ${exFrac(kt,nt)}`;
      },260);
    }});
    exSeq(host,steps);
  }
  else if(spec.type==='compare-circles'){
    const [ka,na]=spec.a, [kb,nb]=spec.b;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig excmp">
        <div class="excol"><div class="exstage" id="exA">${exCircleSVG(uid+'a',na,150)}</div><div class="exlbl">${exFrac(ka,na)}</div></div>
        <div class="excol"><div class="exstage" id="exB">${exCircleSVG(uid+'b',nb,150)}</div><div class="exlbl">${exFrac(kb,nb)}</div></div>
      </div>
      <div class="exnote">${spec.note}</div>`;
    exSeq(host,[
      {wait:500,run:()=>{for(let j=0;j<ka;j++) exLight(host,uid+'a',j);}},
      {wait:600,run:()=>{for(let j=0;j<kb;j++) exLight(host,uid+'b',j);}},
    ]);
  }
  else if(spec.type==='percent-circle'){
    const {percent,whole,unit}=spec;
    const n=Math.round(100/percent), val=whole*percent/100;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig">${exCircleSVG(uid,n,170)}</div>
      <div class="exlbl" id="exl">${percent}% = ${exFrac(1,n)}</div>
      <div class="exnote">${spec.note}</div>`;
    const lbl=host.querySelector('#exl');
    exSeq(host,[
      {wait:600,run:()=>{exLight(host,uid,0);}},
      {wait:700,run:()=>{if(lbl)lbl.innerHTML=`${percent}% = ${exFrac(1,n)} = <b class="exval">${val}${unit||''}</b>`;}},
    ]);
  }
  else if(spec.type==='improper-circle'){
    const {num,den}=spec; const ncirc=Math.ceil(num/den);
    let figs=''; for(let i=0;i<ncirc;i++) figs+=`<div class="exstage">${exCircleSVG(uid+i,den,120)}</div>`;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig excmp">${figs}</div>
      <div class="exlbl">${exFrac(num,den)} <span class="exeq">&gt; целого</span></div>
      <div class="exnote">${spec.note}</div>`;
    const cells=[]; let left=num,c=0;
    while(left>0){const take=Math.min(den,left);for(let j=0;j<take;j++)cells.push([c,j]);left-=take;c++;}
    exSeq(host,cells.map(([ci,j])=>({wait:170,run:()=>exLight(host,uid+ci,j)})));
  }
  else if(spec.type==='reduce-bar'){
    const [kf,nf]=spec.from,[kt,nt]=spec.to;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig"><div class="exstage" id="exs">${exBarSVG(uid,nf,280,44)}</div></div>
      <div class="exlbl" id="exl">${exFrac(kf,nf)}</div>
      <div class="exnote">${spec.note}</div>`;
    const stage=host.querySelector('#exs'), lbl=host.querySelector('#exl');
    const steps=[];
    for(let j=0;j<kf;j++) steps.push({wait:90,run:()=>exLight(host,uid,j)});
    steps.push({wait:900,run:()=>{ if(!stage) return; const uid2=uid+'b'; stage.style.opacity=0;
      setTimeout(()=>{ if(!host.isConnected) return;
        stage.innerHTML=exBarSVG(uid2,nt,280,44); stage.style.opacity=1;
        for(let j=0;j<kt;j++) setTimeout(()=>exLight(host,uid2,j),150*(j+1));
        if(lbl) lbl.innerHTML=`${exFrac(kf,nf)} <span class="exeq">=</span> ${exFrac(kt,nt)}`;
      },260);
    }});
    exSeq(host,steps);
  }
  else if(spec.type==='compare-bars'){
    const [ka,na]=spec.a,[kb,nb]=spec.b; const va=ka/na, vb=kb/nb;
    let la, lb;
    if(spec.labelA||spec.labelB){ la=spec.labelA||exFrac(ka,na); lb=spec.labelB||exFrac(kb,nb); }
    else {                                   // обе обыкновенные → показываем приведение к общему знаменателю
      const L=lcm(na,nb);
      la=`${exFrac(ka,na)} <span class="exeq">=</span> ${exFrac(ka*L/na,L)}`;
      lb=`${exFrac(kb,nb)} <span class="exeq">=</span> ${exFrac(kb*L/nb,L)}`;
    }
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig excmp">
        <div class="excol">${exMeterSVG(uid+'a',56,118)}<div class="exlbl">${la}</div></div>
        <div class="excol">${exMeterSVG(uid+'b',56,118)}<div class="exlbl">${lb}</div></div>
      </div>
      <div class="exnote">${spec.note}</div>`;
    exSeq(host,[
      {wait:340,run:()=>exMeterTo(host,uid+'a',va,118)},
      {wait:60,run:()=>exMeterTo(host,uid+'b',vb,118)},
    ]);
  }
  else if(spec.type==='bar-add-common'){
    const den=spec.den; const conv=spec.parts.map(([k,n])=>k*den/n); const [rk,rn]=spec.result;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig">${exBarSVG(uid,den,280,44)}</div>
      <div class="exlbl" id="exl">${exFrac(0,den)}</div>
      <div class="exnote">${spec.note}</div>`;
    const lbl=host.querySelector('#exl'); const steps=[]; let filled=0;
    const colors=[['rgba(168,85,247,.9)','#c084fc'],['rgba(217,70,239,.85)','#f0abfc']];
    spec.parts.forEach((p,pi)=>{ const add=conv[pi]; for(let j=0;j<add;j++){ const idx=filled++; steps.push({wait:470,run:()=>{exPaint(host,uid,idx,colors[pi%2][0],colors[pi%2][1]); if(lbl)lbl.innerHTML=exFrac(idx+1,den);}});} });
    steps.push({wait:520,run:()=>{ if(lbl) lbl.innerHTML=`${exFrac(spec.parts[0][0],spec.parts[0][1])} + ${exFrac(spec.parts[1][0],spec.parts[1][1])} = ${exFrac(rk,rn)}`;}});
    exSeq(host,steps);
  }
  else if(spec.type==='part-of-part'){
    const [ok,on]=spec.outer; const n2=on*2, fillN=ok*2; const [rk,rn]=spec.result;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig">${exCircleSVG(uid,n2,170)}</div>
      <div class="exlbl" id="exl">${exFrac(ok,on)}</div>
      <div class="exnote">${spec.note}</div>`;
    const lbl=host.querySelector('#exl'); const steps=[];
    for(let j=0;j<fillN;j++) steps.push({wait:150,run:()=>exLight(host,uid,j)});
    steps.push({wait:650,run:()=>{ if(lbl)lbl.innerHTML=`половина от ${exFrac(ok,on)}`;}});
    for(let j=0;j<rk;j++) steps.push({wait:280,run:()=>exPaint(host,uid,j,'rgba(217,70,239,.9)','#f0abfc')});
    steps.push({wait:520,run:()=>{ if(lbl)lbl.innerHTML=`${exFrac(ok,on)} → ${exFrac(rk,rn)}`;}});
    exSeq(host,steps);
  }
  else if(spec.type==='division-portions'){
    const [pk,pn]=spec.pizza; const [qk,qn]=spec.portion; const [rk,rn]=spec.result;
    const pizza=pk/pn, port=qk/qn; const ticks=Math.round(1/port);
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exsub">целая пицца · делёж по ${exFrac(qk,qn)}</div>
      <div class="exfig">${exTrackSVG(uid,280,46,ticks)}</div>
      <div class="exlbl" id="exl">твоя пицца: ${exFrac(pk,pn)}</div>
      <div class="exnote">${spec.note}</div>`;
    const lbl=host.querySelector('#exl');
    exSeq(host,[
      {wait:420,run:()=>exTrackTo(host,uid,pizza,280)},
      {wait:1000,run:()=>{ if(lbl)lbl.innerHTML=`помещается 1 порция…`;}},
      {wait:1000,run:()=>{ if(lbl)lbl.innerHTML=`…и ещё половинка = <b class="exval">${exFrac(rk,rn)}</b> = 1,5 порции`;}},
    ]);
  }
  else if(spec.type==='decimal-bar'){
    const [k,n]=spec.frac;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig">${exTrackSVG(uid,280,46,n)}</div>
      <div class="exlbl" id="exl">${exFrac(0,n)}</div>
      <div class="exnote">${spec.note}</div>`;
    const lbl=host.querySelector('#exl'); const steps=[];
    for(let j=1;j<=k;j++){ const v=j/n, ds=(''+v).replace('.',','); steps.push({wait:620,run:()=>{exTrackTo(host,uid,v,280); if(lbl)lbl.innerHTML=`${exFrac(j,n)} = <b class="exval">${ds}</b>`;}});}
    exSeq(host,steps);
  }
  else if(spec.type==='percent-remain'){
    const {percent,whole,unit}=spec; const n=Math.round(100/percent);
    const remain=n-1, val=whole*remain/n;
    host.innerHTML=`<div class="exhead">👀 пощупай, почему</div>
      <div class="exfig">${exCircleSVG(uid,n,170)}</div>
      <div class="exlbl" id="exl">100% = ${whole}${unit||''}</div>
      <div class="exnote">${spec.note}</div>`;
    const lbl=host.querySelector('#exl'); const steps=[];
    for(let j=0;j<n;j++) steps.push({wait:130,run:()=>exLight(host,uid,j)});
    steps.push({wait:750,run:()=>{ const el=host.querySelector(`[data-c="${uid}"][data-i="${n-1}"]`);
      if(el){el.setAttribute('fill',EX_EMPTY);el.setAttribute('stroke',EX_SOFF);el.removeAttribute('filter');}
      if(lbl)lbl.innerHTML=`−${percent}% скидка`;}});
    steps.push({wait:750,run:()=>{ if(lbl)lbl.innerHTML=`осталось ${remain*percent}% = <b class="exval">${val}${unit||''}</b>`;}});
    exSeq(host,steps);
  }
  host.insertAdjacentHTML('beforeend',`<button class="exreplay" type="button">↻ повторить</button>`);
  const rb=host.querySelector('.exreplay'); if(rb) rb.onclick=()=>renderExplain(spec,host);
}

/* ====== РЕНДЕР ВОПРОСА (без обложки — сразу карточка) ====== */
function render(){
  const q=DATA.questions[idx], n=DATA.questions.length;
  document.getElementById('prog-label').textContent=`${idx+1} из ${n}`;
  document.getElementById('prog-fill').style.width=`${(idx/n)*100}%`;

  // перемешиваем варианты один раз на вопрос (правильный — на случайной позиции)
  const shown = q._shown || (q._shown = shuffle(q.opts));
  const fig = q.svg==='pie8_3' ? `<div class="qfig">${svgPie8}</div>` : '';

  screen().innerHTML=`
    <div class="task-card lk-card">
      <div class="task-head">
        <span class="task-label">${q.theme} · <span class="og">вопрос ${idx+1}</span></span>
      </div>
      <p class="cond">${fmtInline(q.cond)}</p>
      ${fig}
      <div class="opts" id="opts">
        ${shown.map((o,i)=>`<button class="opt" data-i="${i}"><span class="opt-key">${KEYS[i]}</span><span>${fmtInline(o.t)}</span></button>`).join('')}
      </div>
      <div class="explain hidden" id="explain"></div>
      <button class="lk-btn next-btn" id="next" hidden>${idx<n-1?'Дальше →':'Показать карту ✨'}</button>
    </div>`;
  window.scrollTo(0,0);

  const opts=[...document.querySelectorAll('.opt')];
  opts.forEach(o=>o.addEventListener('click',()=>{
    if(answers[q.id]) return;
    const pi=+o.dataset.i, chosen=shown[pi];
    answers[q.id]={ok:!!chosen.ok, pick:pi};
    opts.forEach(x=>{
      x.classList.add('is-locked');
      const oo=shown[+x.dataset.i];
      if(oo.ok) x.classList.add('correct');
      if(x===o && !chosen.ok) x.classList.add('wrong');
    });
    if(chosen.ok){ flashOk(); }
    else {
      flashBad();
      // тряска карточки (.lk-card-shake из кита). Класс НЕ снимаем: снятие вернуло бы
      // .task-card{animation:lk-in} → карточка мигала бы прозрачностью (баг). По концу
      // тряски просто замораживаем анимацию, чтобы entrance не переигрывался.
      const card=screen().querySelector('.task-card');
      if(card){ card.classList.add('lk-card-shake');
        card.addEventListener('animationend',()=>{ card.style.animation='none'; },{once:true}); }
    }
    document.getElementById('prog-fill').style.width=`${((idx+1)/n)*100}%`;
    document.getElementById('next').hidden=false;
    // живая объяснялка — всегда после ответа; измерение уже зафиксировано кнопкой
    if(q.explain){
      const host=document.getElementById('explain');
      if(host){ renderExplain(q.explain,host); requestAnimationFrame(()=>host.classList.remove('hidden')); }
    }
  }));
  document.getElementById('next').addEventListener('click',()=>{
    idx++;
    if(idx>=DATA.questions.length) showProfile();
    else render();
  });
}

/* ====== РАЗБОР ОДНОГО ВОПРОСА (раскрывается на карте по тапу темы) ====== */
function rvRow(inner,isCorrect,isPicked){
  const cls=isCorrect?'ok':(isPicked?'bad':'');
  const mk=isCorrect?'✅':(isPicked?'✖':'·');
  const tag=(isCorrect&&isPicked)?'твой · верно':isCorrect?'правильный':isPicked?'твой выбор':'';
  return `<div class="rv-opt ${cls}"><span class="mk">${mk}</span><span>${inner}</span>${tag?`<span class="rv-tag">${tag}</span>`:''}</div>`;
}
function renderReview(q){
  const a=answers[q.id]||{};
  const shown=q._shown||q.opts;
  const fig = q.svg==='pie8_3' ? `<div class="qfig" style="margin-bottom:12px">${svgPie8}</div>` : '';
  const list=shown.map((o,i)=>rvRow(
    `<span class="opt-key">${KEYS[i]}</span>${fmtInline(o.t)}`,
    !!o.ok, i===a.pick)).join('');
  const note = q.explain&&q.explain.note ? `<p class="rv-note">${fmtInline(q.explain.note)}</p>` : '';
  const okBadge = a.ok ? '✅ верно' : '❌ мимо';
  return `
    <div class="rv-card">
      <p class="rv-q">${fmtInline(q.cond)} <span class="rv-tag">${okBadge}</span></p>
      ${fig}
      <div class="rv-list">${list}</div>
      ${note}
    </div>`;
}

/* ====== ПРОФИЛЬ (итог, не балл) ====== */
function isCorrect(id){return !!(answers[id]&&answers[id].ok);}

// #38 — на CTA шлём анонимный отчёт (token=код лида). Только с прода; ?nosend=1 глушит.
function reportResults(){
  if(reported) return;
  if(!/github\.io$/i.test(location.hostname)) return;
  if(new URLSearchParams(location.search).has('nosend')) return;
  reported=true;
  const qs=DATA.questions;
  const score=qs.filter(q=>isCorrect(q.id)).length;
  const errors=[]; qs.forEach((q,i)=>{ if(!isCorrect(q.id)) errors.push(`№${i+1} ${q.theme}`); });
  // полный разбор по каждому заданию — для «результата по ссылке» (серверная часть подхватит)
  const detail=qs.map((q,i)=>{
    const a=answers[q.id]||{}, shown=q._shown||q.opts;
    return { n:i+1, theme:q.theme, cond:q.cond,
      your: (a.pick!=null && shown[a.pick]) ? shown[a.pick].t : '—',
      correct: (q.opts.find(o=>o.ok)||{}).t || '',
      ok: !!a.ok };
  });
  try{
    fetch(HW_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({token:LEAD_CODE, hw:'Диагностика дробей', hw_id:'diag-drobi', score, total:qs.length, errors, detail}),
      keepalive:true}).catch(()=>{});
  }catch(e){}
}

function showProfile(){
  document.getElementById('hw-header').hidden=true;
  screen().hidden=true;

  const qs=DATA.questions, n=qs.length;
  const byTheme={}; qs.forEach(q=>{(byTheme[q.theme]=byTheme[q.theme]||[]).push(isCorrect(q.id));});
  const status={};
  THEMES.forEach(t=>{const a=byTheme[t]||[];const c=a.filter(Boolean).length;status[t]=a.length===0?'warn':(c===a.length?'ok':(c===0?'gap':'warn'));});

  const strong=THEMES.filter(t=>status[t]==='ok');
  const gaps=THEMES.filter(t=>status[t]!=='ok');
  const senseMiss=DATA.senseQ.filter(id=>!isCorrect(id)).length;
  const mechMiss=qs.filter(q=>!DATA.senseQ.includes(q.id)&&!isCorrect(q.id)).length;
  const total=qs.filter(q=>isCorrect(q.id)).length;

  // Вердикт — связный абзац (крепкие + первая трещина + чувство/техника)
  const vParts=[];
  if(strong.length) vParts.push(`Фундамент держишь — <b>${strong.join(', ')}</b> ${strong.length>1?'идут':'идёт'} уверенно.`);
  const ci=THEMES.findIndex(t=>status[t]!=='ok');
  if(ci===-1) vParts.push('Пробелов не вижу — чисто по всей карте дробей.');
  else vParts.push(`Первая трещина — в теме «${THEMES[ci]}».`);
  if(senseMiss===0&&mechMiss===0) vParts.push('База и чувство числа крепкие — берём темп повыше! 🔥');
  else if(senseMiss===0&&mechMiss>0) vParts.push('Число чувствуешь, техника местами хромает — это шлифуется.');
  else if(mechMiss===0&&senseMiss>0) vParts.push('Считаешь по правилам, но размер ответа чувствуешь не всегда — быстро ставится.');
  else vParts.push('Начнём с фундамента — со смысла дроби, дальше техника.');
  const verdictPara=vParts.join(' ');

  // карта тем: строка кликабельна → раскрывает разбор вопросов темы
  const qByTheme={}; qs.forEach(q=>{(qByTheme[q.theme]=qByTheme[q.theme]||[]).push(q);});
  const mapHtml=THEMES.map((t,ti)=>`
    <div class="pf-theme tap" data-st="${ti}">
      <span class="dot ${status[t]}"></span>
      <span class="nm">${t}</span>
      <span class="st">${status[t]==='ok'?'крепко':status[t]==='warn'?'шатко':'пробел'}</span>
      <span class="caret">▸</span>
    </div>
    <div class="pf-rev" data-rev="${ti}">${(qByTheme[t]||[]).map(renderReview).join('')}</div>`).join('');

  const summerHtml = gaps.length ? `
    <div class="lk-card pf-card">
      <b>Что подтянем</b>
      <p style="margin:10px 0 0;font-size:15px;line-height:1.5"><b>${gaps.join(', ')}</b> — это закрывается за пару недель на спринте по дробям.</p>
    </div>` : `
    <div class="lk-card pf-card">
      <b>Что дальше</b>
      <p style="margin:10px 0 0;font-size:15px;line-height:1.5">Явных дыр по дробям нет — на пробном берём темп выше и идём дальше: проценты, задачи ОГЭ.</p>
    </div>`;

  const pf=document.getElementById('profile');
  pf.innerHTML=`
    <div class="lk-kicker" style="margin-bottom:10px">Твоя карта · ${total} из ${n}</div>
    <h1 class="lk-h1 lk-glow" style="margin:0 0 14px">Вот где ты сейчас</h1>
    <div class="pf-legend">
      <span><span class="dot ok"></span>крепко</span>
      <span><span class="dot warn"></span>шатко</span>
      <span><span class="dot gap"></span>пробел</span>
    </div>
    <div class="pf-map">${mapHtml}</div>
    <div class="lk-card pf-card">${verdictPara}</div>
    ${summerHtml}
    <button class="lk-btn cta-btn" id="cta">${DATA.cta.label}</button>
    <div class="pf-note" style="margin-top:10px">${DATA.cta.note}</div>
    <button class="lk-btn lk-ghost" id="again" style="width:100%;margin-top:12px">Пройти ещё раз</button>
    <div class="pf-note">Тест ничего не сохраняет о тебе лично — только твою карту по темам.</div>
    <div class="lk-sign" style="margin-top:22px;justify-content:center">
      <span class="lk-badge lk-badge-l">Λ</span>
      <span class="lk-badge lk-badge-d">D.</span>
    </div>
    <div style="height:28px"></div>`;
  pf.classList.add('show');
  window.scrollTo(0,0);

  pf.querySelectorAll('.pf-theme.tap').forEach(row=>row.addEventListener('click',()=>{
    const rev=pf.querySelector(`.pf-rev[data-rev="${row.dataset.st}"]`);
    row.classList.toggle('open');
    if(rev) rev.classList.toggle('open');
  }));
  document.getElementById('cta').addEventListener('click',()=>{ reportResults(); window.open(DATA.cta.url,'_blank'); });
  document.getElementById('again').addEventListener('click',()=>{
    DATA.questions.forEach(q=>delete q._shown);
    Object.keys(answers).forEach(k=>delete answers[k]);
    idx=0;
    pf.classList.remove('show'); pf.innerHTML='';
    screen().hidden=false;
    document.getElementById('hw-header').hidden=false;
    render();
  });
}

/* ====== СТАРТ ====== */
const _viewCode = new URLSearchParams(location.search).get('r');
if (_viewCode) { _loadViewMode(_viewCode); } else { render(); }

// ?r=КОД — режим просмотра разбора по ссылке из сообщения Ди
async function _loadViewMode(code) {
  document.getElementById('hw-header').hidden = true;
  screen().innerHTML = '<p style="text-align:center;padding:60px 0;color:var(--lk-muted)">Загружаем разбор…</p>';
  try {
    const resp = await fetch(`${HW_ENDPOINT}?r=${encodeURIComponent(code)}`);
    const d = await resp.json();
    if (!d.ok || !Array.isArray(d.detail) || !d.detail.length) throw new Error('not found');
    DATA.questions.forEach((q, i) => {
      const r = d.detail[i]; if (!r) return;
      q._shown = q.opts; // в режиме просмотра используем оригинальный порядок
      const pick = q.opts.findIndex(o => o.t === r.your);
      answers[q.id] = { ok: r.ok, pick: pick >= 0 ? pick : null };
    });
    idx = DATA.questions.length;
    reported = true; // не шлём отчёт повторно
    screen().hidden = true;
    showProfile();
    const again = document.getElementById('again');
    if (again) again.remove();
  } catch(e) {
    screen().innerHTML = '<p style="text-align:center;padding:60px 0;color:var(--lk-muted)">Результат не найден или устарел.</p>';
  }
}
