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
  .page.on .panel,.page.on .card,.page.on .pedia-card,.page.on .area-card,.page.on .progress-card{opacity:1!important;visibility:visible!important;transform:none!important}
  #conquistas.page.on,#pedia.page.on{min-height:65vh!important}
}
@media(max-width:760px){
  #conquistas .grid,#pedia .mp-grid,#pedia .area-grid{grid-template-columns:1fr!important}
  #conquistas .searchbar{grid-template-columns:1fr!important}
  #conquistas .searchbar .btn{width:100%}
}
`;document.head.appendChild(css);

function showPage(id){
  const page=$('#'+id);if(!page)return false;
  // Prefer the application's own router when present.
  try{if(typeof go==='function'){go(id)}}catch(e){}
  if(!page.classList.contains('on')){
    $$('.page').forEach(p=>p.classList.toggle('on',p.id===id));
    $$('.nav button[data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===id));
    try{history.replaceState(null,'','#'+id)}catch(e){}
  }
  // Expansion 25 reveal animation could leave hidden pages transparent on mobile.
  $$('.mlh-reveal',page).forEach(el=>{el.classList.add('mlh-in');el.style.opacity='1';el.style.transform='none'});
  page.style.opacity='1';page.style.visibility='visible';
  $('#nav')?.classList.remove('open');
  setTimeout(()=>window.scrollTo({top:0,behavior:'auto'}),0);
  return true;
}

function bindNavigation(){
  const nav=$('#nav'),menu=$('#menuBtn');
  if(menu&&!menu.dataset.mobileFix){
    menu.dataset.mobileFix='1';
    menu.setAttribute('aria-expanded',nav?.classList.contains('open')?'true':'false');
    menu.addEventListener('click',()=>setTimeout(()=>menu.setAttribute('aria-expanded',nav?.classList.contains('open')?'true':'false'),0));
  }
  $$('[data-go]').forEach(btn=>{
    const id=btn.dataset.go;
    if(!id||btn.dataset.mobileRouteFix==='1')return;
    btn.dataset.mobileRouteFix='1';
    // Capture phase makes touch navigation reliable even if an older handler throws later.
    btn.addEventListener('click',ev=>{
      if(innerWidth<=1100&&['conquistas','pedia'].includes(id)){
        ev.preventDefault();
        ev.stopPropagation();
        showPage(id);
      }
    },true);
  });
}

function repairCurrentPage(){
  const hash=(location.hash||'').replace('#','');
  if(['conquistas','pedia'].includes(hash))showPage(hash);
  const current=$('.page.on');
  if(current)$$('.mlh-reveal',current).forEach(el=>el.classList.add('mlh-in'));
}

function boot(){
  bindNavigation();repairCurrentPage();
  let n=0;const t=setInterval(()=>{bindNavigation();repairCurrentPage();if(++n>30)clearInterval(t)},300);
  addEventListener('hashchange',repairCurrentPage);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();