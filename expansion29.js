(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=(v='')=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const client=typeof db!=='undefined'?db:null;

const css=document.createElement('style');
css.textContent=`
#inicio .hero.mlh28-hero{grid-template-columns:minmax(0,1.12fr) minmax(420px,.88fr)!important;align-items:center!important}
.mlh28-rebirth-card{width:min(100%,560px)!important;aspect-ratio:4/3!important;min-height:0!important;justify-self:end!important;align-self:center!important;background:linear-gradient(145deg,#0b2d43,#061827)!important}
.mlh28-rebirth-card img{width:100%!important;height:100%!important;min-height:0!important;aspect-ratio:4/3!important;object-fit:cover!important;object-position:center!important;image-rendering:auto!important;display:block!important;opacity:0!important;transition:opacity .18s ease!important;filter:none!important}
.mlh28-rebirth-card.mlh29-ready img{opacity:1!important}
.mlh28-rebirth-card:after{left:12px!important;right:12px!important;bottom:12px!important;background:rgba(3,16,25,.78)!important}
.hall29-panel{margin-top:18px}.hall29-tools{display:grid;grid-template-columns:1fr auto;gap:9px;margin:12px 0}.hall29-tools input{padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:#051521;color:#fff}.hall29-count{align-self:center;color:var(--muted);font-size:11px}.hall29-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.hall29-card{border:1px solid var(--line);border-radius:15px;padding:15px;background:linear-gradient(145deg,#0b293f,#071c2c);min-width:0}.hall29-card h3{margin:7px 0 5px}.hall29-card p{margin:0 0 9px;line-height:1.55}.hall29-meta{display:flex;gap:5px;flex-wrap:wrap;margin:7px 0}.hall29-meta span{font-size:8px;border:1px solid var(--line);border-radius:999px;padding:4px 6px;color:#cde0eb}.hall29-card .link{display:inline-block;margin-top:4px}.hall29-empty{padding:18px;border:1px dashed var(--line);border-radius:13px;color:var(--muted);text-align:center}
@media(max-width:1100px){#inicio .hero.mlh28-hero{grid-template-columns:1fr!important;align-items:start!important}.mlh28-rebirth-card{width:100%!important;max-width:760px!important;justify-self:center!important;margin-top:4px!important}.hall29-grid{grid-template-columns:1fr 1fr}}
@media(max-width:760px){.mlh28-rebirth-card{width:100%!important;max-width:none!important;border-radius:16px!important}.mlh28-rebirth-card:after{font-size:10px!important;padding:8px 10px!important;bottom:9px!important;left:9px!important;right:9px!important}.hall29-grid{grid-template-columns:1fr}.hall29-tools{grid-template-columns:1fr}.hall29-count{margin-top:-3px}}
`;
document.head.appendChild(css);

async function installHQ(){
 const card=$('#mlh28RebirthCard');
 const img=$('#mlh28RebirthCard img');
 if(!img||img.dataset.hq29==='1')return false;
 img.dataset.hq29='1';
 const urls=['assets/rebirth-hero-parts/p1.txt','assets/rebirth-hero-parts/p2.txt','assets/rebirth-hero-parts/p3.txt','assets/rebirth-hero-parts/p4.txt','assets/rebirth-hero-parts/p5a.txt','assets/rebirth-hero-parts/p5b.txt','assets/rebirth-hero-parts/p6.txt','assets/rebirth-hero-parts/p7.txt','assets/rebirth-hero-parts/p8.txt'];
 try{
   const parts=await Promise.all(urls.map(async u=>{const r=await fetch(u,{cache:'force-cache'});if(!r.ok)throw new Error('asset');return (await r.text()).trim()}));
   const bin=atob(parts.join(''));
   const bytes=new Uint8Array(bin.length);
   for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
   const objectUrl=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
   const probe=new Image();
   probe.onload=()=>{img.onload=()=>{card?.classList.add('mlh29-ready');URL.revokeObjectURL(objectUrl)};img.src=objectUrl;img.removeAttribute('width');img.removeAttribute('height')};
   probe.onerror=()=>{img.dataset.hq29='0';img.style.opacity='1'};
   probe.src=objectUrl;
   return true;
 }catch(e){img.dataset.hq29='0';img.style.opacity='1';return false}
}

const historical=[
 {name:'Cantadeli',title:'Conjunto Safir / Safir Bow',server:'BR',era:'Legacy',category:'Safir',description:'Registro brasileiro preservado do conjunto Safir.',evidence_url:'https://www.youtube.com/watch?v=cGtg6ZUmD4M',confidence:'Histórico'},
 {name:'CarlãoMooca',title:'Safir Bow',server:'EN',era:'Legacy',category:'Safir',description:'Registro internacional preservado do Safir Bow.',evidence_url:'https://www.youtube.com/watch?v=wKQ9c1QCSJs',confidence:'Histórico'},
 {name:'LikuuF MilMo',title:'World Saver — 5.000 Imagination Devourers',server:'—',era:'Legacy',category:'Devoradores',description:'Registro histórico documentado no Hub para a marca de 5.000 Imagination Devourers.',evidence_url:'',confidence:'Histórico'}
];
let hallRows=[...historical];

function ensureHall(){
 const hall=$('#hall');if(!hall||$('#hall29Archive'))return false;
 const section=document.createElement('section');section.id='hall29Archive';section.className='panel hall29-panel';
 section.innerHTML=`<div class="section-head"><div><span class="eyebrow">HALL DE ARQUIVOS</span><h2>Registros históricos preservados</h2><p>O Hall reúne registros históricos e conquistas comunitárias aprovadas. Ele não fica limitado apenas ao arquivo Safir.</p></div><span class="tag" id="hall29Total">carregando</span></div><div class="hall29-tools"><input id="hall29Search" placeholder="Buscar jogador, conquista, servidor ou categoria..."><span class="hall29-count" id="hall29Count"></span></div><div id="hall29Grid" class="hall29-grid"><div class="hall29-empty">Carregando arquivos...</div></div>`;
 const first=hall.querySelector('.panel');if(first)first.after(section);else hall.appendChild(section);
 $('#hall29Search').addEventListener('input',renderHall);return true;
}
function normaliseApproved(r){return {name:r.character_name||r.player_name||'Jogador',title:r.title||'Conquista aprovada',server:r.server||'—',era:r.era||'—',category:'Conquista aprovada',description:r.description||'Registro comunitário aprovado e preservado no Hub.',evidence_url:r.evidence_url||r.screenshot_url||'',confidence:r.confidence||'Aprovado',created_at:r.created_at||''}}
async function loadHall(){
 ensureHall();let approved=[];
 if(client){try{const {data,error}=await client.from('achievement_submissions').select('id,player_name,character_name,server,era,title,description,evidence_url,screenshot_url,confidence,created_at').eq('status','approved').order('created_at',{ascending:true});if(!error)approved=(data||[]).map(normaliseApproved)}catch(e){}}
 const seen=new Set();hallRows=[...historical,...approved].filter(r=>{const k=(r.name+'|'+r.title+'|'+r.server).toLowerCase();if(seen.has(k))return false;seen.add(k);return true});renderHall();
}
function renderHall(){
 const grid=$('#hall29Grid');if(!grid)return;const term=($('#hall29Search')?.value||'').toLowerCase().trim();const rows=hallRows.filter(r=>!term||[r.name,r.title,r.server,r.era,r.category,r.description].join(' ').toLowerCase().includes(term));
 $('#hall29Total').textContent=`${hallRows.length} arquivo(s)`;$('#hall29Count').textContent=`${rows.length} exibido(s)`;
 grid.innerHTML=rows.length?rows.map(r=>`<article class="hall29-card"><span class="tag ${r.category==='Safir'?'gold':'purple'}">${esc(r.category)}</span><h3>${esc(r.name)}</h3><p><b>${esc(r.title)}</b></p><p class="muted">${esc(r.description)}</p><div class="hall29-meta"><span>${esc(r.server)}</span><span>${esc(r.era)}</span><span>${esc(r.confidence)}</span></div>${r.evidence_url?`<a class="link" href="${esc(r.evidence_url)}" target="_blank" rel="noopener">Abrir prova preservada ↗</a>`:'<small class="muted">Registro histórico catalogado no Hub.</small>'}</article>`).join(''):'<div class="hall29-empty">Nenhum arquivo encontrado para esta busca.</div>';
}
function bindHallOpen(){$$('[data-go="hall"]').forEach(b=>{if(b.dataset.hall29)return;b.dataset.hall29='1';b.addEventListener('click',()=>setTimeout(loadHall,0),true)});if(location.hash==='#hall')loadHall()}
function boot(){let tries=0;const t=setInterval(async()=>{if(await installHQ()||++tries>30)clearInterval(t)},120);ensureHall();bindHallOpen();loadHall()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();