(()=>{
const $=s=>document.querySelector(s);
function patchLogin(){
  const form=$('#adminLoginForm'),input=$('#adminPassword');
  if(!form||!input||form.dataset.passwordPatch==='1')return false;
  form.dataset.passwordPatch='1';
  form.addEventListener('submit',()=>{
    input.value=(input.value||'').trim();
  },true);
  const row=input.parentElement;
  if(row&&!$('#adminShowPassword')){
    const btn=document.createElement('button');
    btn.type='button';
    btn.id='adminShowPassword';
    btn.className='btn ghost';
    btn.style.marginTop='8px';
    btn.textContent='Mostrar senha';
    btn.onclick=()=>{
      const show=input.type==='password';
      input.type=show?'text':'password';
      btn.textContent=show?'Ocultar senha':'Mostrar senha';
      input.focus();
    };
    row.appendChild(btn);
  }
  const note=$('.admin-security-note');
  if(note&&!note.dataset.passwordNote){
    note.dataset.passwordNote='1';
    note.textContent='A senha não fica gravada no navegador. Espaços copiados antes ou depois da senha são removidos automaticamente.';
  }
  return true;
}
function boot(){
  let tries=0;
  const t=setInterval(()=>{
    if(patchLogin()||++tries>60)clearInterval(t);
  },200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();