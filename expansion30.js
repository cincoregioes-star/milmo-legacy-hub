(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];

const css=document.createElement('style');
css.textContent=`
#inicio .hero.mlh28-hero{grid-template-columns:minmax(0,1.12fr) minmax(420px,.88fr)!important;align-items:center!important}
#mlh28RebirthCard{width:min(100%,560px)!important;aspect-ratio:4/3!important;min-height:0!important;justify-self:end!important;align-self:center!important;background:radial-gradient(circle at 50% 28%,rgba(75,211,255,.16),transparent 34%),linear-gradient(145deg,#0b2d43,#061827)!important;overflow:hidden!important;display:grid!important;place-items:center!important;position:relative!important}
#mlh28RebirthCard img{width:82%!important;height:auto!important;max-height:68%!important;min-height:0!important;object-fit:contain!important;object-position:center!important;display:block!important;opacity:1!important;visibility:visible!important;image-rendering:auto!important;filter:drop-shadow(0 18px 28px rgba(0,0,0,.32))!important}
#mlh28RebirthCard:before{content:'VENHA JOGAR';position:absolute;top:28px;left:0;right:0;text-align:center;color:#fff;font-size:13px;font-weight:900;letter-spacing:.16em;opacity:.86}
#mlh28RebirthCard:after{content:'Abrir seção Rebirth →'!important;position:absolute!important;left:12px!important;right:12px!important;bottom:12px!important;padding:11px 12px!important;border:1px solid rgba(255,217,79,.34)!important;border-radius:12px!important;background:rgba(3,16,25,.82)!important;color:#fff!important;font-weight:900!important;font-size:12px!important;text-align:center!important;z-index:3!important}
#hall29Archive{display:block!important;opacity:1!important;visibility:visible!important}
@media(max-width:1100px){#inicio .hero.mlh28-hero{grid-template-columns:1fr!important;align-items:start!important}#mlh28RebirthCard{width:100%!important;max-width:760px!important;justify-self:center!important;margin-top:4px!important}}
@media(max-width:760px){#mlh28RebirthCard{width:100%!important;max-width:none!important;border-radius:16px!important;aspect-ratio:4/3!important}#mlh28RebirthCard img{width:80%!important;max-height:64%!important}#mlh28RebirthCard:before{top:20px;font-size:11px}#mlh28RebirthCard:after{font-size:10px!important;padding:8px 10px!important;bottom:9px!important;left:9px!important;right:9px!important}}
`;
document.head.appendChild(css);

function fixHero(){
 const card=$('#mlh28RebirthCard');
 if(!card)return false;
 let img=card.querySelector('img');
 if(!img){img=document.createElement('img');card.prepend(img)}
 img.alt='MilMo Rebirth';
 img.loading='eager';
 img.decoding='async';
 img.src='https://milmorebirth.com/site/images/Milmorebirth_logo.png';
 card.onclick=()=>{try{if(typeof go==='function')go('rebirth');else $('[data-go="rebirth"]')?.click()}catch(e){location.href='#rebirth'}};
 card.style.cursor='pointer';
 return true;
}

function fixHall(){
 const hall=$('#hall');if(!hall)return;
 const archive=$('#hall29Archive');
 if(archive){archive.style.display='block';archive.style.opacity='1';archive.style.visibility='visible'}
 const grid=$('#hall29Grid');
 if(grid&&!grid.children.length)grid.innerHTML='<div class="hall29-empty">Nenhum registro aprovado encontrado.</div>';
 try{if(typeof loadHall==='function')loadHall()}catch(e){}
}

function boot(){
 let tries=0;
 const t=setInterval(()=>{
   const ok=fixHero();fixHall();
   if(ok||++tries>30)clearInterval(t);
 },150);
 $$('[data-go="hall"]').forEach(b=>b.addEventListener('click',()=>setTimeout(fixHall,60),true));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();