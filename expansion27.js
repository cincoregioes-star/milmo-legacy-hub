(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const AGENTS={inicio:'MilMo Guide',rebirth:'Rebirth Assistant',conquistas:'Medal Hunter',pedia:'Island Explorer',progresso:'MilMo Guide',rankings:'Ranking Analyst',hall:'Legacy Archivist',comunidade:'Community Guide',admin:'Moderation Assistant'};

const css=document.createElement('style');
css.textContent=`
@media(max-width:1100px){
  .top{position:sticky!important;top:0!important;z-index:1000!important;overflow:visible!important;display:grid!important;grid-template-columns:minmax(0,1fr) 48px!important;gap:10px!important;align-items:center!important}
  .logo{min-width:0!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}
  #menuBtn{display:grid!important;place-items:center!important;margin:0!important;width:46px!important;height:46px!important;min-width:46px!important;min-height:46px!important;position:relative!important;z-index:1002!important;border:1px solid rgba(75,211,255,.20)!important;border-radius:12px!important;background:#0a2639!important;color:#fff!important;touch-action:manipulation!important}
  #nav{display:none!important;position:absolute!important;top:calc(100% + 8px)!important;left:3vw!important;right:3vw!important;z-index:1001!important;padding:8px!important;border:1px solid rgba(75,211,255,.22)!important;border-radius:15px!important;background:rgba(4,20,31,.985)!important;box-shadow:0 28px 70px rgba(0,0,0,.52)!important;backdrop-filter:blur(18px)!important;max-height:calc(100vh - 92px)!important;overflow-y:auto!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important;flex-direction:column!important;gap:3px!important}
  #nav.open{display:flex!important}
  #nav button{display:block!important;width:100%!important;min-height:46px!important;padding:12px 14px!important;text-align:left!important;border-radius:10px!important;position:relative!important;z-index:1002!important;touch-action:manipulation!important;font-size:13px!important}
  #nav button.on{background:linear-gradient(145deg,#123d59,#0d3149)!important}
  .top>#openSubmission,.top>#hubSearchTrigger{display:none!important}
  .page{display:none!important}
  .page.on{display:block!important;opacity:1!important;visibility:visible!important;transform:none!important;animation:none!important}
  .page.on>.panel:first-child,.page.on>#milmoPediaNavigator{opacity:1!important;visibility:visible!important;transform:none!important}
  #pedia>.panel:not(:first-child){content-visibility:auto!important;contain-intrinsic-size:520px!important}
  #pedia>#milmoPediaNavigator{content-visibility:visible!important;contain:none!important}
}
@media(max-width:760px){
  .top{padding:10px 12px!important}.logo{font-size:25px!important}.wrap{width:94vw!important;padding-top:16px!important}
  #conquistas .grid,#pedia .mp-grid,#pedia .area-grid,#pedia .mp-cols{grid-template-columns:1fr!important}
  #conquistas .searchbar,#pedia .mp-toolbar{grid-template-columns:1fr!important}
  #conquistas .searchbar .btn{width:100%!important}
  #pedia .mp-summary{grid-template-columns:1fr 1fr!important}
}
`;
document.head.appendChild(css);

function syncTopHash(id){
  try{
    history.replaceState(null,'','#'+id);
    if(window.top&&window.top!==window){
      const u=new URL(window.top.location.href);u.hash=id;window.top.history.replaceState(null,'',u.pathname+u.search+u.hash);
    }
  }catch(e){}
}

function revealInitial(page){
  const first=page.querySelector('#milmoPediaNavigator,.panel');
  if(first){first.classList.add('mlh-in');first.style.opacity='1';first.style.transform='none'}
}

function route(id){
  const page=$('#'+id);if(!page)return false;
  $$('.page').forEach(p=>p.classList.toggle('on',p===page));
  $$('#nav button[data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===id));
  page.style.opacity='1';page.style.visibility='visible';
  revealInitial(page);
  $('#nav')?.classList.remove('open');
  const menu=$('#menuBtn');if(menu)menu.setAttribute('aria-expanded','false');
  syncTopHash(id);
  try{if(typeof setAgent==='function')setAgent(AGENTS[id]||'MilMo Guide')}catch(e){}
  try{if(typeof track==='function')track(id)}catch(e){}
  try{if(id==='admin'&&typeof loadTraffic==='function')loadTraffic()}catch(e){}
  window.scrollTo({top:0,left:0,behavior:'auto'});
  return true;
}

function install(){
  if(document.documentElement.dataset.mobileNav27==='1')return;
  const menu=$('#menuBtn'),nav=$('#nav');if(!menu||!nav)return;
  document.documentElement.dataset.mobileNav27='1';
  menu.setAttribute('aria-label','Abrir menu');menu.setAttribute('aria-controls','nav');menu.setAttribute('aria-expanded','false');

  document.addEventListener('click',ev=>{
    if(innerWidth>1100)return;
    const mb=ev.target.closest('#menuBtn');
    if(mb){
      ev.preventDefault();ev.stopImmediatePropagation();
      const open=nav.classList.toggle('open');
      menu.setAttribute('aria-expanded',open?'true':'false');
      return;
    }
    const item=ev.target.closest('#nav button[data-go]');
    if(item){
      ev.preventDefault();ev.stopImmediatePropagation();
      route(item.dataset.go);
      return;
    }
    if(nav.classList.contains('open')&&!ev.target.closest('#nav')){
      nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
    }
  },true);

  document.addEventListener('keydown',ev=>{
    if(innerWidth<=1100&&ev.key==='Escape'&&nav.classList.contains('open')){
      nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();
    }
  });

  if(innerWidth<=1100){
    const hash=(location.hash||'').slice(1);
    if(hash&&$('#'+hash))route(hash);
    else if(!$('.page.on')&&$('#inicio'))route('inicio');
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();