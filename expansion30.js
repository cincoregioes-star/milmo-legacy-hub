(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const css=document.createElement('style');
css.textContent=`
#inicio .hero.mlh28-hero{grid-template-columns:minmax(0,1.12fr) minmax(420px,.88fr)!important;align-items:center!important}
#mlh28RebirthCard{width:min(100%,560px)!important;aspect-ratio:4/3!important;min-height:0!important;justify-self:end!important;align-self:center!important;background:linear-gradient(145deg,#0b2d43,#061827)!important;overflow:hidden!important;position:relative!important}
#mlh28RebirthCard img{width:100%!important;height:100%!important;min-height:0!important;object-fit:cover!important;object-position:center!important;display:block!important;opacity:1!important;visibility:visible!important;image-rendering:auto!important;filter:none!important}
#mlh28RebirthCard:after{content:'Abrir seção Rebirth →'!important;position:absolute!important;left:12px!important;right:12px!important;bottom:12px!important;padding:11px 12px!important;border:1px solid rgba(255,217,79,.34)!important;border-radius:12px!important;background:rgba(3,16,25,.82)!important;color:#fff!important;font-weight:900!important;font-size:12px!important;text-align:center!important;z-index:3!important}
#hall29Archive{display:block!important;opacity:1!important;visibility:visible!important}
@media(max-width:1100px){#inicio .hero.mlh28-hero{grid-template-columns:1fr!important;align-items:start!important}#mlh28RebirthCard{width:100%!important;max-width:760px!important;justify-self:center!important;margin-top:4px!important}}
@media(max-width:760px){#mlh28RebirthCard{width:100%!important;max-width:none!important;border-radius:16px!important;aspect-ratio:4/3!important}#mlh28RebirthCard:after{font-size:10px!important;padding:8px 10px!important;bottom:9px!important;left:9px!important;right:9px!important}}
`;
document.head.appendChild(css);

async function fixHero(){
 const card=$('#mlh28RebirthCard');
 if(!card)return false;
 let img=card.querySelector('img');
 if(!img){img=document.createElement('img');card.prepend(img)}
 img.alt='Cantadeli convidando jogadores para o MilMo Rebirth';
 img.loading='eager';img.decoding='async';
 card.onclick=()=>{try{if(typeof go==='function')go('rebirth');else $('[data-go="rebirth"]')?.click()}catch(e){location.href='#rebirth'}};
 card.style.cursor='pointer';
 if(card.dataset.mlh30Fixed==='1')return true;
 card.dataset.mlh30Fixed='1';
 const files=['p1.txt','p2.txt','p3.txt','p4.txt','p5.txt','p6.txt','p7.txt','p8.txt'];
 try{
   const parts=await Promise.all(files.map(async name=>{
     const r=await fetch('assets/rebirth-hero-parts/'+name+'?v=32',{cache:'no-store'});
     if(!r.ok)throw new Error(name);
     return (await r.text()).trim();
   }));
   const dataUri='data:image/webp;base64,'+parts.join('');
   const probe=new Image();
   await new Promise((resolve,reject)=>{probe.onload=resolve;probe.onerror=reject;probe.src=dataUri});
   img.src=dataUri;
   return true;
 }catch(e){
   // Se o arquivo reconstruído falhar, mantenha a imagem já existente visível.
   img.style.opacity='1';img.style.visibility='visible';
   return false;
 }
}
function fixHall(){
 const archive=$('#hall29Archive');if(archive){archive.style.display='block';archive.style.opacity='1';archive.style.visibility='visible'}
 try{if(typeof loadHall==='function')loadHall()}catch(e){}
}
function boot(){let tries=0;const t=setInterval(async()=>{const ok=await fixHero();fixHall();if(ok||++tries>20)clearInterval(t)},180);$$('[data-go="hall"]').forEach(b=>b.addEventListener('click',()=>setTimeout(fixHall,60),true));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();