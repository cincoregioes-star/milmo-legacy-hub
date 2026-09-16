(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const css=document.createElement('style');
css.textContent=`
#inicio .hero.mlh28-hero{grid-template-columns:minmax(0,1.12fr) minmax(420px,.88fr)!important;align-items:center!important}
.mlh28-rebirth-card{width:min(100%,560px)!important;aspect-ratio:4/3!important;min-height:0!important;justify-self:end!important;align-self:center!important;background:#071b2a!important}
.mlh28-rebirth-card img{width:100%!important;height:100%!important;min-height:0!important;aspect-ratio:4/3!important;object-fit:cover!important;object-position:center!important;image-rendering:auto!important;display:block!important}
.mlh28-rebirth-card:after{left:12px!important;right:12px!important;bottom:12px!important;background:rgba(3,16,25,.78)!important}
@media(max-width:1100px){
 #inicio .hero.mlh28-hero{grid-template-columns:1fr!important;align-items:start!important}
 .mlh28-rebirth-card{width:100%!important;max-width:760px!important;justify-self:center!important;margin-top:4px!important}
}
@media(max-width:760px){
 .mlh28-rebirth-card{width:100%!important;max-width:none!important;border-radius:16px!important}
 .mlh28-rebirth-card:after{font-size:10px!important;padding:8px 10px!important;bottom:9px!important;left:9px!important;right:9px!important}
}
`;
document.head.appendChild(css);

async function installHQ(){
 const img=$('#mlh28RebirthCard img');
 if(!img||img.dataset.hq29==='1')return false;
 img.dataset.hq29='1';
 const urls=[1,2,3,4,5,6,7,8].map(n=>`assets/rebirth-hero-parts/p${n}.txt`);
 try{
   const parts=await Promise.all(urls.map(async u=>{const r=await fetch(u,{cache:'force-cache'});if(!r.ok)throw new Error('asset');return (await r.text()).trim()}));
   const bin=atob(parts.join(''));
   const bytes=new Uint8Array(bin.length);
   for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
   const objectUrl=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
   const old=img.src;
   img.onload=()=>{if(old.startsWith('blob:'))URL.revokeObjectURL(old)};
   img.src=objectUrl;
   img.removeAttribute('width');img.removeAttribute('height');
   return true;
 }catch(e){img.dataset.hq29='0';return false}
}
function boot(){
 let tries=0;
 const t=setInterval(async()=>{if(await installHQ()||++tries>30)clearInterval(t)},150);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();