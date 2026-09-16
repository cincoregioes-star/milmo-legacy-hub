(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];

const css=document.createElement('style');
css.textContent=`
#mlh28RebirthCard{overflow:hidden!important;background:#082033!important}
#mlh28RebirthCard img{opacity:0!important;visibility:visible!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;image-rendering:auto!important;filter:none!important}
#mlh28RebirthCard.mlh30-ready img{opacity:1!important}
#mlh28RebirthCard.mlh30-error:before{content:'MilMo Rebirth';position:absolute;inset:0;display:grid;place-items:center;color:#ffd94f;font-weight:900;font-size:24px;background:linear-gradient(145deg,#0b2d43,#061827)}
@media(max-width:760px){#mlh28RebirthCard img{object-fit:cover!important}}
`;
document.head.appendChild(css);

let objectUrl='';
async function restoreImage(){
 const card=$('#mlh28RebirthCard'),img=$('#mlh28RebirthCard img');
 if(!card||!img||card.dataset.mlh30==='1')return false;
 card.dataset.mlh30='1';
 const files=['p1.txt','p2.txt','p3.txt','p4.txt','p5.txt','p6.txt','p7.txt','p8.txt'];
 try{
   const parts=await Promise.all(files.map(async name=>{
     const r=await fetch('assets/rebirth-hero-parts/'+name+'?v=30',{cache:'no-store'});
     if(!r.ok)throw new Error(name);
     return (await r.text()).trim();
   }));
   const joined=parts.join('');
   const binary=atob(joined);
   const bytes=new Uint8Array(binary.length);
   for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
   if(objectUrl)URL.revokeObjectURL(objectUrl);
   objectUrl=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
   await new Promise((resolve,reject)=>{
     const test=new Image();
     test.onload=resolve;
     test.onerror=reject;
     test.src=objectUrl;
   });
   img.onload=()=>{card.classList.remove('mlh30-error');card.classList.add('mlh30-ready')};
   img.onerror=()=>{card.classList.add('mlh30-error')};
   img.src=objectUrl;
   img.alt='Cantadeli convidando jogadores para o MilMo Rebirth';
   card.classList.add('mlh30-ready');
   return true;
 }catch(e){
   card.classList.add('mlh30-error');
   return false;
 }
}

function ensureHallVisible(){
 const hall=$('#hall'),archive=$('#hall29Archive');
 if(!hall||!archive)return;
 archive.style.display='block';
 archive.style.opacity='1';
 archive.style.visibility='visible';
 const grid=$('#hall29Grid');
 if(grid&&grid.children.length===0)grid.innerHTML='<div class="hall29-empty">Nenhum registro aprovado encontrado.</div>';
}

function boot(){
 let tries=0;
 const t=setInterval(async()=>{
   const ok=await restoreImage();
   ensureHallVisible();
   if(ok||++tries>35)clearInterval(t);
 },150);
 $$('[data-go="hall"]').forEach(b=>b.addEventListener('click',()=>setTimeout(ensureHallVisible,50),true));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();