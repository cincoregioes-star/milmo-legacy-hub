(()=>{
const $=s=>document.querySelector(s);
const DEVICE_KEY='mlh_admin_device_v1';
const params=new URLSearchParams(location.search);
const setupMode=params.get('admin')==='1';
function isAdminDevice(){try{return localStorage.getItem(DEVICE_KEY)==='1'}catch{return false}}
function navButton(){return $('[data-go="admin"]')}
function applyVisibility(){
  const b=navButton();if(!b)return;
  const show=isAdminDevice()||setupMode;
  b.style.display=show?'':'none';
  b.setAttribute('aria-hidden',show?'false':'true');
  if(show)b.textContent='Admin 🔒';
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
function watchLogin(){
  const panel=$('#adminConsole');
  if(!panel)return false;
  const check=()=>{if(panel.hidden===false)authorizeThisBrowser()};
  check();
  const obs=new MutationObserver(check);
  obs.observe(panel,{attributes:true,attributeFilter:['hidden']});
  return true;
}
function addForgetButton(){
  if($('#forgetAdminDevice'))return;
  const head=$('#adminConsole .admin-console-head');if(!head)return;
  const actions=head.querySelector('div:last-child')||head;
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
function boot(){
  applyVisibility();
  let tries=0;
  const t=setInterval(()=>{
    applyVisibility();
    const ok=watchLogin();
    addForgetButton();
    if(ok||++tries>40)clearInterval(t);
  },250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();