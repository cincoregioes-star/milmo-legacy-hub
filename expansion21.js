(()=>{
const U='https://ayfdkemjykhxqirlzbzw.supabase.co',K='sb_publishable_jYLFHHgTCQkufeykOAFmmQ_cyroudoy';
const client=window.supabase?.createClient?window.supabase.createClient(U,K):null;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=(s='')=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
let areas=[],missions=[];
const css=document.createElement('style');css.textContent=`
.strict-search-help{display:block;margin-top:5px;color:var(--muted);font-size:9px}.strict-search-results{display:none;margin:8px 0 12px;padding:10px;border:1px solid rgba(66,201,255,.22);border-radius:12px;background:#061827}.strict-search-results.on{display:block}.strict-search-head{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:8px}.strict-search-list{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}.strict-search-item{border:1px solid var(--line);border-radius:10px;padding:9px;background:#071b2a;cursor:pointer;text-align:left;color:#fff}.strict-search-item:hover{border-color:rgba(66,201,255,.48)}.strict-search-item b{display:block;font-size:10px}.strict-search-item small{display:block;color:var(--muted);font-size:8px;margin-top:2px}.strict-search-type{font-size:7px;color:var(--gold);text-transform:uppercase;letter-spacing:.07em}.strict-search-empty{color:var(--muted);font-size:10px}.no-token-area{padding:10px;border:1px dashed rgba(255,213,74,.35);border-radius:10px;background:rgba(255,213,74,.05);color:var(--gold);font-size:10px;text-align:center}@media(max-width:700px){.strict-search-list{grid-template-columns:1fr}}
`;document.head.appendChild(css);
function sanitizeVisibleSupabase(root=document.body){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{let t=n.nodeValue||'',v=t;
    v=v.replace(/BANCO REAL NO SUPABASE/gi,'CATÁLOGO HISTÓRICO VERIFICADO');
    v=v.replace(/Métricas agregadas carregadas do Supabase\./gi,'Métricas agregadas carregadas.');
    v=v.replace(/Supabase indisponível\./gi,'Serviço temporariamente indisponível.');
    v=v.replace(/\bSupabase\b/gi,'Banco');
    if(v!==t)n.nodeValue=v;
  });
}
function fixStaticLabels(){
  sanitizeVisibleSupabase();
  $$('#pedia .panel h2').forEach(h=>{if(h.textContent.trim()==='Áreas iniciais catalogadas'){h.textContent='Áreas catalogadas';const p=h.parentElement?.querySelector('p.muted');if(p)p.textContent='Use o checklist local nas áreas com Exploration Tokens. Áreas especiais seguem regras próprias.'}});
}
function fixBossBeach(){
  $$('#areaGrid .area-card').forEach(card=>{const h=card.querySelector('h3');if(!h||norm(h.textContent)!=='boss beach')return;const checks=card.querySelector('.token-checks');if(checks&&!checks.dataset.fixedNoTokens){checks.dataset.fixedNoTokens='1';checks.innerHTML='<div class="no-token-area">Área especial: Boss Beach não possui Exploration Tokens.</div>'}const sm=card.querySelector('small.muted');if(sm)sm.textContent='Sem checklist de tokens nesta área.'});
}
async function loadSearchData(){
  if(!client)return;
  const [a,m]=await Promise.all([
    client.from('milmo_areas').select('slug,name,adventure,description').order('name'),
    client.from('missions').select('slug,title,area_slug,npc,objective,reward').order('title')
  ]);
  areas=a.data||[];missions=m.data||[];
  enhanceSearch();
}
function activeAdventure(){const b=$('[data-mp-adv].on');return b?.dataset?.mpAdv||'Todos'}
function areaName(slug){return areas.find(a=>a.slug===slug)?.name||slug||'Área não informada'}
function areaAdventure(slug){return areas.find(a=>a.slug===slug)?.adventure||''}
function currentMatches(q){
  const n=norm(q),adv=activeAdventure();if(n.length<2)return {area:[],mission:[]};
  const allowed=a=>adv==='Todos'||a.adventure===adv;
  const am=areas.filter(a=>allowed(a)&&norm([a.name,a.adventure,a.description].join(' ')).includes(n));
  const mm=missions.filter(m=>{const a=areas.find(x=>x.slug===m.area_slug);if(a&&!allowed(a))return false;return norm([m.title,m.npc,m.objective,m.reward,areaName(m.area_slug),areaAdventure(m.area_slug)].join(' ')).includes(n)});
  return {area:am.slice(0,12),mission:mm.slice(0,30),areaTotal:am.length,missionTotal:mm.length};
}
function openAreaFromSearch(slug){
  const a=areas.find(x=>x.slug===slug);if(!a)return;
  const tab=$$('[data-mp-adv]').find(x=>x.dataset.mpAdv==='Todos');if(tab&&!tab.classList.contains('on'))tab.click();
  const input=$('#mpSearch');if(!input)return;input.value=a.name;input.dispatchEvent(new Event('input',{bubbles:true}));
  setTimeout(()=>{const btn=$(`[data-mp-area="${CSS.escape(slug)}"]`);if(btn)btn.click()},80);
}
function renderStrictResults(){
  const input=$('#mpSearch'),box=$('#strictSearchResults');if(!input||!box)return;
  const q=input.value.trim();if(q.length<2){box.classList.remove('on');box.innerHTML='';return}
  const r=currentMatches(q);box.classList.add('on');
  const items=[];
  r.area.forEach(a=>items.push(`<button class="strict-search-item" data-strict-area="${esc(a.slug)}"><span class="strict-search-type">Ilha / área</span><b>${esc(a.name)}</b><small>${esc(a.adventure||'MilMo')}</small></button>`));
  r.mission.forEach(m=>items.push(`<button class="strict-search-item" data-strict-area="${esc(m.area_slug||'')}" data-strict-mission="${esc(m.slug)}"><span class="strict-search-type">Missão</span><b>${esc(m.title)}</b><small>${esc(areaName(m.area_slug))}${m.npc?' • NPC: '+esc(m.npc):''}</small></button>`));
  box.innerHTML=`<div class="strict-search-head"><b>Busca por ilha ou missão</b><span class="tag">${r.areaTotal||0} área(s) • ${r.missionTotal||0} missão(ões)</span></div>${items.length?`<div class="strict-search-list">${items.join('')}</div>`:'<div class="strict-search-empty">Nenhuma ilha ou missão encontrada com esse nome.</div>'}`;
  $$('[data-strict-area]').forEach(b=>b.onclick=()=>openAreaFromSearch(b.dataset.strictArea));
}
function enhanceSearch(){
  const input=$('#mpSearch');if(!input||input.dataset.strictSearch==='1')return false;
  input.dataset.strictSearch='1';input.placeholder='Buscar ilha, área ou missão...';input.setAttribute('aria-label','Buscar ilha, área ou missão');
  const toolbar=input.closest('.mp-toolbar');if(toolbar){const help=document.createElement('small');help.className='strict-search-help';help.textContent='Digite o nome de uma ilha/área ou de uma missão. Também busca NPC e objetivo.';toolbar.after(help);const box=document.createElement('div');box.id='strictSearchResults';box.className='strict-search-results';help.after(box)}
  input.addEventListener('input',()=>setTimeout(renderStrictResults,0));
  input.addEventListener('keydown',ev=>{if(ev.key==='Escape'){input.value='';input.dispatchEvent(new Event('input',{bubbles:true}))}});
  $$('[data-mp-adv]').forEach(b=>b.addEventListener('click',()=>setTimeout(renderStrictResults,0)));
  return true;
}
function observe(){
  const mo=new MutationObserver(()=>{fixStaticLabels();fixBossBeach();if(areas.length)enhanceSearch()});
  mo.observe(document.body,{subtree:true,childList:true,characterData:true});
}
function boot(){fixStaticLabels();fixBossBeach();observe();let tries=0;const t=setInterval(()=>{fixStaticLabels();fixBossBeach();if($('#mpSearch')){clearInterval(t);loadSearchData()}else if(++tries>40)clearInterval(t)},250)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot):boot();
})();