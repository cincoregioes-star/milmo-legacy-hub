(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const css=document.createElement('style');css.textContent=`
@media(max-width:1100px){
  .top{z-index:100!important;overflow:visible!important}
  .menu{display:block!important;position:relative;z-index:102;min-width:44px;min-height:44px;touch-action:manipulation}
  .nav{z-index:101!important;max-height:calc(100vh - 78px);overflow:auto;-webkit-overflow-scrolling:touch;box-shadow:0 24px 55px rgba(0,0,0,.46)!important}
  .nav.open{display:flex!important}
  .nav button{width:100%;min-height:44px;text-align:left;touch-action:manipulation;position:relative;z-index:102}
  .page.on{display:block!important;opacity:1!important;visibility:visible!important;transform:none!important}
  .page.on .panel,.page.on .card,.page.on .pedia-card,.page.on .area-card,.page.on .progress-card{visibility:visible!important}
  #conquistas.page.on,#pedia.page.on{min-height:65vh!important}
  /* MilMoPedia possui muitos painéis. No celular, só renderizamos de imediato o que está visível. */
  #pedia>.panel{content-visibility:auto;contain-intrinsic-size:520px}
  #pedia>#milmoPediaNavigator,#pedia>.panel:first-child{content-visibility:visible;contain-intrinsic-size:auto}
}
@media(max-width:760px){
  #conquistas .grid,#pedia .mp-grid,#pedia .area-grid{grid-template-columns:1fr!important}
  #conquistas .searchbar{grid-template-columns:1fr!important}
  #conquistas .searchbar .btn{width:100%}
}
`;document.head.appendChild(css);

let lastShown='';
function revealCurrent(page){
  $$('.mlh-reveal',page).forEach(el=>{
    el.classList.add('mlh-in');
    el.style.opacity='1';
    el.style.transform='none';
  });
}

function showPage(id){
  const page=$('#'+id);if(!page)return false;

  // Evita reabrir a mesma página repetidamente e refazer todo o layout.
  const alreadyActive=page.classList.contains('on')&&lastShown===id;
  if(!alreadyActive){
    try{
      if(typeof go==='function') go(id);
    }catch(e){
      $$('.page').forEach(p=>p.classList.toggle('on',p.id===id));
      $$('.nav button[data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===id));
      try{history.replaceState(null,'','#'+id)}catch(_){}
    }
  }

  // Garantia imediata de visibilidade, sem aguardar animações.
  if(!page.classList.contains('on')){
    $$('.page').forEach(p=>p.classList.toggle('on',p.id===id));
    $$('.nav button[data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===id));
  }
  page.style.opacity='1';
  page.style.visibility='visible';
  revealCurrent(page);
  $('#nav')?.classList.remove('open');
  lastShown=id;
  requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'auto'}));
  return true;
}

function bindNavigation(){
  const nav=$('#nav'),menu=$('#menuBtn');
  if(menu&&!menu.dataset.mobileFix){
    menu.dataset.mobileFix='1';
    menu.setAttribute('aria-expanded',nav?.classList.contains('open')?'true':'false');
    menu.addEventListener('click',()=>requestAnimationFrame(()=>menu.setAttribute('aria-expanded',nav?.classList.contains('open')?'true':'false')));
  }

  $$('[data-go]').forEach(btn=>{
    const id=btn.dataset.go;
    if(!id||btn.dataset.mobileRouteFix==='1')return;
    btn.dataset.mobileRouteFix='1';
    btn.addEventListener('click',ev=>{
      if(innerWidth<=1100&&['conquistas','pedia'].includes(id)){
        ev.preventDefault();
        ev.stopPropagation();
        showPage(id);
      }
    },true);
  });
}

function initialRepair(){
  const hash=(location.hash||'').replace('#','');
  if(innerWidth<=1100&&['conquistas','pedia'].includes(hash)) showPage(hash);
  else{
    const current=$('.page.on');
    if(current){lastShown=current.id;revealCurrent(current)}
  }
}

function boot(){
  bindNavigation();
  initialRepair();

  // Rebinding curto apenas para elementos que expansões tardias adicionarem.
  // Não reabre MilMoPedia em loop: isso era a principal causa do atraso no celular.
  let n=0;
  const t=setInterval(()=>{
    bindNavigation();
    if(++n>=8)clearInterval(t);
  },250);

  addEventListener('hashchange',()=>{
    const hash=(location.hash||'').replace('#','');
    if(innerWidth<=1100&&['conquistas','pedia'].includes(hash)&&!$('#'+hash)?.classList.contains('on')) showPage(hash);
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();