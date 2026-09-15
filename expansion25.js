(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();

const css=document.createElement('style');
css.textContent=`
:root{--bg:#04111a;--bg2:#071d2d;--panel:#0a2940;--panel2:#081d2e;--line:#214b68;--text:#f7fbff;--muted:#a7bfd1;--gold:#ffd94f;--orange:#ff9f1c;--blue:#4bd3ff;--green:#8ff57d;--purple:#b58cff;--danger:#ff7184;--radius:20px;--shadow:0 22px 60px rgba(0,0,0,.34)}
body{background:
radial-gradient(circle at 8% -8%,rgba(143,245,125,.13),transparent 28%),
radial-gradient(circle at 92% 2%,rgba(75,211,255,.14),transparent 30%),
radial-gradient(circle at 55% 95%,rgba(181,140,255,.08),transparent 36%),
linear-gradient(180deg,#06141f 0%,#04111a 78%,#030c13 100%)!important;background-attachment:fixed!important}
body:before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.14;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:34px 34px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.9),transparent 78%);z-index:-1}
.top{padding:12px 2.5vw!important;background:rgba(3,15,24,.88)!important;border-bottom:1px solid rgba(75,211,255,.18)!important;box-shadow:0 10px 30px rgba(0,0,0,.18);backdrop-filter:blur(20px) saturate(130%)!important}
.logo{font-size:32px!important;letter-spacing:.3px;filter:drop-shadow(0 8px 18px rgba(4,43,92,.45));transition:transform .2s ease,filter .2s ease}.logo:hover{transform:translateY(-1px) scale(1.01);filter:drop-shadow(0 10px 24px rgba(66,201,255,.24))}
.nav{gap:3px!important}.nav button{transition:all .18s ease;border:1px solid transparent!important}.nav button:hover{transform:translateY(-1px);border-color:rgba(75,211,255,.14)!important}.nav button.on{background:linear-gradient(145deg,#123d59,#0d3149)!important;border-color:rgba(75,211,255,.18)!important;box-shadow:inset 0 1px rgba(255,255,255,.03),0 8px 20px rgba(0,0,0,.16)}
.wrap{width:min(1400px,94vw)!important;padding-top:30px!important}
.panel{border-color:rgba(63,121,157,.56)!important;background:linear-gradient(180deg,rgba(12,43,65,.96),rgba(6,24,38,.97))!important;box-shadow:0 24px 70px rgba(0,0,0,.28),inset 0 1px rgba(255,255,255,.025)!important;transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}.panel:hover{border-color:rgba(75,211,255,.28)!important}
.hero{min-height:430px!important;background:linear-gradient(135deg,rgba(12,43,65,.98),rgba(7,24,38,.98))!important}.hero:before{content:"";position:absolute;inset:0;background:linear-gradient(110deg,rgba(255,217,79,.025),transparent 35%,rgba(75,211,255,.035));pointer-events:none}.hero h1{filter:drop-shadow(0 16px 22px rgba(0,0,0,.18))}.hero p{font-size:16.5px!important;line-height:1.7!important}.hero .case{background:linear-gradient(145deg,rgba(18,55,83,.92),rgba(7,30,47,.96))!important;border-color:rgba(75,211,255,.24)!important;box-shadow:0 18px 42px rgba(0,0,0,.2)}
.btn{transition:transform .16s ease,box-shadow .16s ease,filter .16s ease}.btn:hover{transform:translateY(-2px);filter:brightness(1.04);box-shadow:0 12px 28px rgba(255,152,15,.2)}.btn:active{transform:translateY(0)}.btn.secondary:hover,.btn.ghost:hover{box-shadow:0 10px 25px rgba(0,0,0,.2)}
.card,.pedia-card,.area-card,.progress-card,.traffic-card,.list-item{transition:transform .18s ease,border-color .18s ease,background .18s ease,box-shadow .18s ease}.card:hover,.pedia-card:hover,.area-card:hover,.progress-card:hover,.list-item:hover{transform:translateY(-2px);border-color:rgba(75,211,255,.32)!important;box-shadow:0 15px 34px rgba(0,0,0,.18)}
.stats{gap:10px!important}.stat{position:relative;overflow:hidden;background:linear-gradient(145deg,#0b2437,#081d2d)!important}.stat:after{content:"";position:absolute;right:-18px;top:-18px;width:64px;height:64px;border-radius:50%;background:rgba(75,211,255,.04)}.stat b{font-size:25px!important}
.section-head h2{letter-spacing:-.02em}.section-head p{max-width:760px}
.agent-chip{background:linear-gradient(145deg,#0d3049,#0a2438)!important;border-color:rgba(75,211,255,.2)!important;transition:transform .18s ease,border-color .18s ease}.agent-chip:hover{transform:translateY(-2px);border-color:rgba(143,245,125,.32)!important}
.searchbar input,.form input,.form select,.form textarea,.progress-card input,.progress-card select,.modalbox input,.modalbox textarea{border-color:rgba(67,110,139,.8)!important;box-shadow:inset 0 1px 4px rgba(0,0,0,.18);transition:border-color .15s ease,box-shadow .15s ease}.searchbar input:focus,.form input:focus,.form select:focus,.form textarea:focus,.progress-card input:focus,.progress-card select:focus,.modalbox input:focus,.modalbox textarea:focus{border-color:rgba(75,211,255,.7)!important;box-shadow:0 0 0 3px rgba(75,211,255,.08),inset 0 1px 4px rgba(0,0,0,.18)!important;outline:none}
.modal{background:rgba(1,7,12,.78)!important;backdrop-filter:blur(10px)!important}.modalbox{border-color:rgba(75,211,255,.24)!important;box-shadow:0 35px 90px rgba(0,0,0,.52)}
.agent-fab{right:18px!important;bottom:18px!important;border-color:rgba(143,245,125,.24)!important;box-shadow:0 20px 45px rgba(0,0,0,.34)!important}.agent-fab:hover{transform:translateY(-2px)}
.hub-search-trigger{border:1px solid rgba(75,211,255,.24);background:rgba(75,211,255,.08);color:#e7f8ff;border-radius:11px;padding:10px 12px;font-weight:800;font-size:11px;white-space:nowrap;transition:.16s ease}.hub-search-trigger:hover{background:rgba(75,211,255,.14);transform:translateY(-1px)}
.mlh-backtop{position:fixed;left:18px;bottom:18px;z-index:34;width:42px;height:42px;border:1px solid rgba(75,211,255,.22);border-radius:13px;background:rgba(7,28,43,.92);color:#fff;display:grid;place-items:center;font-size:18px;box-shadow:0 14px 35px rgba(0,0,0,.28);opacity:0;pointer-events:none;transform:translateY(8px);transition:.18s ease}.mlh-backtop.on{opacity:1;pointer-events:auto;transform:none}.mlh-backtop:hover{border-color:rgba(75,211,255,.45);background:#0b3048}
.mlh-reveal{opacity:0;transform:translateY(12px)}.mlh-reveal.mlh-in{opacity:1;transform:none;transition:opacity .42s ease,transform .42s ease}
.rebirth-banner.mlh-text-only{grid-template-columns:1fr!important}.rebirth-banner.mlh-text-only>a{display:none!important}
.mlh-user-clean{display:none!important}
footer{background:linear-gradient(180deg,#041019,#030b11)!important;border-top-color:rgba(75,211,255,.12)!important}
*:focus-visible{outline:2px solid rgba(75,211,255,.8)!important;outline-offset:2px!important}
@media(max-width:1100px){.hub-search-trigger{display:none}.top{padding-inline:3vw!important}}
@media(max-width:760px){.hero{min-height:auto!important}.hero h1{font-size:68px!important}.panel{padding:20px!important}.wrap{padding-top:18px!important}.mlh-backtop{left:12px;bottom:12px}.stats{grid-template-columns:1fr 1fr!important}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}.mlh-reveal{opacity:1!important;transform:none!important}}
`;
document.head.appendChild(css);

function hideExactText(text){
  const target=norm(text);
  $$('body *').forEach(el=>{
    if(norm(el.textContent)!==target)return;
    if(el.closest('button,a,input,select,textarea'))return;
    el.classList.add('mlh-user-clean');
  });
}

function cleanUserFacing(){
  hideExactText('O QUE A PLATAFORMA PASSA A TER');
  hideExactText('CASE #001');

  // Remove a imagem/logotipo externo que pode quebrar e virar texto “MilMo Rebirth”.
  const rb=$('.rebirth-banner');
  if(rb){
    rb.classList.add('mlh-text-only');
    const img=$('img[alt="MilMo Rebirth"]',rb);
    if(img){const a=img.closest('a');(a||img).classList.add('mlh-user-clean')}
  }

  // Informações técnicas não úteis para visitantes.
  $$('body *').forEach(el=>{
    if(el.closest('script,style'))return;
    const t=norm(el.textContent);
    if(!t)return;
    if(t==='banco real no supabase'||t==='supabase on'||t==='metricas agregadas carregadas do supabase.'||t==='metricas agregadas carregadas.'||t==='painel tecnico do projeto.'||t==='control center'){
      el.classList.add('mlh-user-clean');
    }
  });

  // Nunca exibir mensagens internas do provedor de banco para o usuário final.
  $$('.message').forEach(el=>{
    if(/supabase/i.test(el.textContent||'')) el.textContent=(el.classList.contains('error')?'Serviço temporariamente indisponível.':'Dados carregados.');
  });

  // Visitas são métrica interna/vaidade, não conteúdo central para o jogador.
  const views=$('#statViews');
  if(views){const card=views.closest('.stat');if(card)card.classList.add('mlh-user-clean')}

  // Corrige a grade de estatísticas depois da limpeza.
  const stats=$('.stats');if(stats)stats.style.gridTemplateColumns='repeat(4,minmax(0,1fr))';

  // Textos técnicos de implementação viram linguagem de produto.
  $$('#conquistas .section-head .eyebrow').forEach(x=>{if(/supabase/i.test(x.textContent||''))x.textContent='CATÁLOGO HISTÓRICO'});
  $$('#pedia p').forEach(p=>{
    if(norm(p.textContent)==='estrutura pronta para importar npc, objetivo, area e recompensa.') p.textContent='Missões organizadas por área, NPC, objetivo e recompensa.';
  });
}

function addSearchTrigger(){
  if($('#hubSearchTrigger'))return;
  const header=$('.top'),send=$('#openSubmission');if(!header||!send)return;
  const b=document.createElement('button');
  b.id='hubSearchTrigger';b.className='hub-search-trigger';b.type='button';b.textContent='⌕ Buscar no Hub';
  b.setAttribute('aria-label','Buscar ilha, área ou missão');
  b.onclick=()=>{
    try{if(typeof go==='function')go('pedia');else $('[data-go="pedia"]')?.click()}catch{$('[data-go="pedia"]')?.click()}
    setTimeout(()=>{const input=$('#mpSearch')||$('#achievementSearch');if(input){input.focus();input.scrollIntoView({behavior:'smooth',block:'center'})}},250);
  };
  header.insertBefore(b,send);
}

function addKeyboardSearch(){
  if(document.documentElement.dataset.mlhSearchKey==='1')return;
  document.documentElement.dataset.mlhSearchKey='1';
  document.addEventListener('keydown',ev=>{
    const tag=(document.activeElement?.tagName||'').toLowerCase();
    const typing=['input','textarea','select'].includes(tag);
    if(ev.key==='/'&&!typing){ev.preventDefault();$('#hubSearchTrigger')?.click()}
  });
}

function addBackTop(){
  if($('#mlhBackTop'))return;
  const b=document.createElement('button');b.id='mlhBackTop';b.className='mlh-backtop';b.type='button';b.innerHTML='↑';b.title='Voltar ao topo';b.setAttribute('aria-label','Voltar ao topo');
  b.onclick=()=>scrollTo({top:0,behavior:'smooth'});document.body.appendChild(b);
  const sync=()=>b.classList.toggle('on',scrollY>520);addEventListener('scroll',sync,{passive:true});sync();
}

function reveal(){
  const els=$$('.panel,.card,.pedia-card,.area-card,.progress-card').filter(x=>!x.dataset.mlhReveal);
  if(!els.length)return;
  if(!('IntersectionObserver'in window)){els.forEach(x=>x.classList.add('mlh-in'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('mlh-in');io.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px -30px 0px'});
  els.forEach((el,i)=>{el.dataset.mlhReveal='1';el.classList.add('mlh-reveal');el.style.transitionDelay=Math.min(i%6,5)*25+'ms';io.observe(el)});
}

function polishAccessibility(){
  $('#menuBtn')?.setAttribute('aria-label','Abrir menu');
  $('#openSubmission')?.setAttribute('aria-label','Enviar conquista para análise');
  $$('.nav button').forEach(b=>b.setAttribute('type','button'));
  $$('a[target="_blank"]').forEach(a=>{if(!a.rel.includes('noopener'))a.rel=(a.rel+' noopener').trim()});
}

function run(){cleanUserFacing();addSearchTrigger();addKeyboardSearch();addBackTop();reveal();polishAccessibility()}

function boot(){run();let n=0;const timer=setInterval(()=>{run();if(++n>=24)clearInterval(timer)},400)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();