(()=>{
const U='https://ayfdkemjykhxqirlzbzw.supabase.co',K='sb_publishable_jYLFHHgTCQkufeykOAFmmQ_cyroudoy';
const db=window.supabase?.createClient?window.supabase.createClient(U,K):null;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],e=(s='')=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const focus=['sts-seastar-resort','sts-cannon-island','sts-rose-island','sts-water-lily-island','sts-nikonos-island'];
const meta={
'sts-seastar-resort':['🏖️','Resort Coral','Seastar Resort'],
'sts-cannon-island':['💣','Ilha do Canhão','Cannon Island'],
'sts-rose-island':['🌹','Ilha Rosa','Rose Island'],
'sts-water-lily-island':['🪷','Ilha da Vitória-Régia','Water Lily Island'],
'sts-nikonos-island':['⛰️','Ilha Nikonos','Nikonos Island']};
const css=document.createElement('style');css.textContent=`
.sts-wave2{margin:12px 0;padding:13px;border:1px solid rgba(66,201,255,.22);border-radius:13px;background:linear-gradient(145deg,#0b2134,#071722)}.sts-wave2-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:10px}.sts-wave2-card{padding:10px;border:1px solid var(--line);border-radius:11px;background:#061827}.sts-wave2-card h4{margin:5px 0 1px}.sts-wave2-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:7px 0}.sts-wave2-mini div{padding:5px;border:1px solid var(--line);border-radius:7px;text-align:center}.sts-wave2-mini b{display:block;font-size:9px}.sts-wave2-mini small{font-size:6px;color:var(--muted)}.sts-wave2-note{margin-top:9px;padding:9px;border-left:3px solid var(--gold);background:rgba(255,213,74,.05);border-radius:0 9px 9px 0;font-size:9px}.sts-wave2-card button{width:100%}@media(max-width:1000px){.sts-wave2-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.sts-wave2-grid{grid-template-columns:1fr}}
`;document.head.appendChild(css);
let rows=[];
async function load(){if(!db)return;const [a,m,i,g]=await Promise.all([
 db.from('milmo_areas').select('slug,name').in('slug',focus),
 db.from('missions').select('area_slug').in('area_slug',focus),
 db.from('game_items').select('area_slug').in('area_slug',focus).eq('status','approved'),
 db.from('game_entities').select('area_slug').in('area_slug',focus).eq('status','approved')
]);rows=(a.data||[]).map(x=>({slug:x.slug,name:x.name,m:(m.data||[]).filter(r=>r.area_slug===x.slug).length,i:(i.data||[]).filter(r=>r.area_slug===x.slug).length,g:(g.data||[]).filter(r=>r.area_slug===x.slug).length}));mount()}
function jump(slug){const tab=$$('[data-mp-adv]').find(x=>x.dataset.mpAdv==='Summer Tide Saga');if(tab)tab.click();const name=meta[slug]?.[2]||rows.find(x=>x.slug===slug)?.name||'';const s=$('#mpSearch');if(s){s.value=name;s.dispatchEvent(new Event('input',{bubbles:true}));setTimeout(()=>s.scrollIntoView({behavior:'smooth',block:'center'}),50)}}
function mount(){const nav=$('#milmoPediaNavigator');if(!nav||$('#stsWave2')||!rows.length)return;const anchor=$('#stsCoverageStrip')||$('#mpTabs');const box=document.createElement('div');box.id='stsWave2';box.className='sts-wave2';const tm=rows.reduce((n,x)=>n+x.m,0),ti=rows.reduce((n,x)=>n+x.i,0),tg=rows.reduce((n,x)=>n+x.g,0);box.innerHTML=`<div class="section-head" style="margin:0"><div><span class="eyebrow">SUMMER TIDE • ONDA 2</span><h3 style="margin:3px 0">Cinco áreas ganharam conteúdo detalhado</h3><p class="muted" style="margin:0">${tm} missões • ${tg} entidades • ${ti} itens nesta leva.</p></div></div><div class="sts-wave2-grid">${focus.map(slug=>{const r=rows.find(x=>x.slug===slug)||{m:0,i:0,g:0},z=meta[slug];return `<article class="sts-wave2-card"><span style="font-size:25px">${z[0]}</span><h4>${e(z[1])}</h4><small class="muted">${e(z[2])}</small><div class="sts-wave2-mini"><div><b>${r.m}</b><small>MISSÕES</small></div><div><b>${r.g}</b><small>ENTIDADES</small></div><div><b>${r.i}</b><small>ITENS</small></div></div><button class="btn secondary" data-sts2="${slug}">Abrir no navegador</button></article>`}).join('')}</div><div class="sts-wave2-note"><b>Precisão:</b> as rotas individuais de Exploration Tokens dessas áreas continuam fora do banco até haver documentação suficiente para publicar posições exatas.</div>`;anchor.after(box);$$('[data-sts2]').forEach(b=>b.onclick=()=>jump(b.dataset.sts2))}
function boot(){let n=0;const t=setInterval(()=>{if($('#milmoPediaNavigator')){clearInterval(t);load()}else if(++n>30)clearInterval(t)},250)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot):boot();
})();