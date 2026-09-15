(()=>{
const $=s=>document.querySelector(s);
const DEVICE_KEY='mlh_admin_device_v1';
function readSetupMode(){
  try{
    const own=new URLSearchParams(location.search);
    if(own.get('admin')==='1')return true;
    if(window.top&&window.top!==window){
      const topParams=new URLSearchParams(window.top.location.search);
      if(topParams.get('admin')==='1')return true;
    }
  }catch{}
  return false;
}
const setupMode=readSetupMode();
function isAdminDevice(){try{return localStorage.getItem(DEVICE_KEY)==='1'}catch{return false}}
function navButton(){return $('[data-go="admin"]')}
function applyVisibility(){
  const b=navButton();if(!b)return false;
  const show=isAdminDevice()||setupMode;
  b.style.display=show?'':'none';
  b.setAttribute('aria-hidden',show?'false':'true');
  if(show)b.textContent='Admin 🔒';
  return show;
}
function authorizeThisBrowser(){
  try{localStorage.setItem(DEVICE_KEY,'1')}catch{}
  applyVisibility();
  const msg=$('#adminPanelMsg');
  if(msg&&msg.textContent.trim()===''){
    msg.className='message ok';
    msg.textContent='Este navegador foi reconhecido como seu dispositivo administrativo.';
  }
}
let loginObserver=null;
function watchLogin(){
  const panel=$('#adminConsole');
  if(!panel)return false;
  const check=()=>{if(panel.hidden===false)authorizeThisBrowser()};
  check();
  if(!loginObserver){
    loginObserver=new MutationObserver(check);
    loginObserver.observe(panel,{attributes:true,attributeFilter:['hidden']});
  }
  return true;
}
function addForgetButton(){
  if($('#forgetAdminDevice'))return;
  const head=$('#adminConsole .admin-console-head');if(!head)return;
  const btn=document.createElement('button');
  btn.id='forgetAdminDevice';btn.className='btn ghost';btn.type='button';btn.textContent='Ocultar Admin neste navegador';
  btn.onclick=()=>{
    try{localStorage.removeItem(DEVICE_KEY)}catch{}
    applyVisibility();
    const logout=$('#adminLogout');if(logout)logout.click();
    const inicio=$('[data-go="inicio"]');if(inicio)inicio.click();
  };
  head.appendChild(btn);
}
function maybeOpenSetupAdmin(){
  if(!setupMode)return;
  const b=navButton();
  if(!b||b.dataset.setupOpened==='1')return;
  b.dataset.setupOpened='1';
  setTimeout(()=>b.click(),350);
}
function boot(){
  applyVisibility();
  maybeOpenSetupAdmin();
  let tries=0;
  const t=setInterval(()=>{
    applyVisibility();
    maybeOpenSetupAdmin();
    const ok=watchLogin();
    addForgetButton();
    if((ok&&navButton())||++tries>60)clearInterval(t);
  },250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();