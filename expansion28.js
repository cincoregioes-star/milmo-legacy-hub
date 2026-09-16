(()=>{
'use strict';
const SB_URL='https://ayfdkemjykhxqirlzbzw.supabase.co';
const SB_KEY='sb_publishable_jYLFHHgTCQkufeykOAFmmQ_cyroudoy';
const client=window.supabase?.createClient?window.supabase.createClient(SB_URL,SB_KEY):null;
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=(v='')=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const norm=(v='')=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();

const css=document.createElement('style');
css.textContent=`
/* HOME: destaque Rebirth no espaço visual da direita */
#inicio .hero.mlh28-hero{grid-template-columns:minmax(0,1.08fr) minmax(380px,.92fr)!important;gap:24px!important;align-items:stretch!important}
.mlh28-rebirth-card{position:relative;display:block;width:100%;min-height:100%;padding:0;border:1px solid rgba(75,211,255,.24);border-radius:20px;overflow:hidden;background:#071b2a;box-shadow:0 22px 50px rgba(0,0,0,.28);cursor:pointer;color:inherit;text-align:left}
.mlh28-rebirth-card img{display:block;width:100%;height:100%;min-height:360px;object-fit:cover;object-position:center}
.mlh28-rebirth-card:after{content:'Abrir seção Rebirth  →';position:absolute;left:14px;right:14px;bottom:14px;padding:10px 12px;border:1px solid rgba(255,217,79,.28);border-radius:12px;background:rgba(3,16,25,.84);backdrop-filter:blur(8px);color:#fff;font-weight:900;font-size:12px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,.25)}
.mlh28-rebirth-card:hover{transform:translateY(-2px);border-color:rgba(75,211,255,.46)}
#inicio .rebirth-banner{display:none!important}

/* MILMOPEDIA 2.0 */
#pedia .mlh-reveal{opacity:1!important;transform:none!important}
.mlh28-pedia-shell{padding:0!important;overflow:hidden}
.mlh28-pedia-head{padding:24px 24px 18px;background:linear-gradient(135deg,rgba(13,48,73,.98),rgba(6,24,38,.98));border-bottom:1px solid var(--line)}
.mlh28-pedia-title{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;flex-wrap:wrap}
.mlh28-pedia-title h2{margin:2px 0 7px;font-size:30px}
.mlh28-pedia-title p{margin:0;color:var(--muted);max-width:760px}
.mlh28-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:12px 24px;background:#061827;border-bottom:1px solid var(--line)}
.mlh28-tab{border:1px solid var(--line);border-radius:12px;background:#0a2133;color:#dbeaf3;min-height:48px;padding:10px 12px;font-weight:850;cursor:pointer;text-align:center;transition:.16s ease}
.mlh28-tab:hover{border-color:rgba(75,211,255,.42);transform:translateY(-1px)}
.mlh28-tab.on{background:linear-gradient(145deg,#123d59,#0d3149);border-color:rgba(75,211,255,.42);color:#fff;box-shadow:0 8px 22px rgba(0,0,0,.2)}
.mlh28-body{padding:22px 24px 26px}
.mlh28-view{display:none}.mlh28-view.on{display:block}
.mlh28-homegrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin:16px 0}
.mlh28-launch{display:block;width:100%;padding:20px;border:1px solid var(--line);border-radius:17px;background:linear-gradient(145deg,#0b293f,#071c2c);color:#fff;text-align:left;cursor:pointer;min-height:155px;transition:.18s ease}
.mlh28-launch:hover{transform:translateY(-2px);border-color:rgba(75,211,255,.4);box-shadow:0 15px 32px rgba(0,0,0,.18)}
.mlh28-launch .ico{font-size:30px;display:block;margin-bottom:10px}.mlh28-launch b{font-size:17px;display:block;margin-bottom:6px}.mlh28-launch small{font-size:11px;line-height:1.55;color:var(--muted)}
.mlh28-search{display:grid;grid-template-columns:1fr auto;gap:8px;margin:14px 0}
.mlh28-search input,.mlh28-search select{width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:#051521;color:#fff;outline:none}
.mlh28-search input:focus,.mlh28-search select:focus{border-color:rgba(75,211,255,.65);box-shadow:0 0 0 3px rgba(75,211,255,.08)}
.mlh28-filters{display:grid;grid-template-columns:1fr 220px;gap:8px;margin:12px 0}
.mlh28-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px}
.mlh28-card{border:1px solid var(--line);border-radius:15px;padding:15px;background:#071b2a;min-width:0}
.mlh28-card h3,.mlh28-card h4{margin:7px 0}.mlh28-card p{font-size:11px;color:var(--muted);margin:0 0 10px;line-height:1.55}.mlh28-card small{color:var(--muted);font-size:9px}.mlh28-card .meta{display:flex;gap:5px;flex-wrap:wrap;margin:7px 0}.mlh28-card .meta span{font-size:8px;border:1px solid var(--line);border-radius:999px;padding:4px 6px;color:#cde0eb}.mlh28-card .btn{margin-top:8px;width:100%}
.mlh28-status{padding:12px 13px;border:1px solid var(--line);border-radius:12px;background:#061827;color:var(--muted);font-size:11px;margin-bottom:12px}
.mlh28-results{display:grid;gap:7px;margin-top:8px}.mlh28-result{width:100%;text-align:left;border:1px solid var(--line);border-radius:11px;padding:10px;background:#071b2a;color:#fff;cursor:pointer}.mlh28-result:hover{border-color:rgba(75,211,255,.4)}.mlh28-result b{display:block}.mlh28-result small{color:var(--muted)}
.mlh28-loadmore{display:flex;justify-content:center;margin:16px 0 2px}
.mlh28-empty{padding:20px;border:1px dashed var(--line);border-radius:13px;color:var(--muted);text-align:center}
.mlh28-area-modal .modalbox{width:min(1050px,96vw)}
.mlh28-detailgrid{display:grid;grid-template-columns:1fr 1fr;gap:11px}.mlh28-detail{border:1px solid var(--line);border-radius:13px;padding:13px;background:#071b2a}.mlh28-detail h3{margin:0 0 8px}.mlh28-row{padding:8px 0;border-bottom:1px solid var(--line);font-size:10px}.mlh28-row:last-child{border-bottom:0}.mlh28-row b{display:block}.mlh28-row small{display:block;color:var(--muted);margin-top:2px}.mlh28-tokenlist{display:grid;grid-template-columns:repeat(8,1fr);gap:5px}.mlh28-token{padding:8px 3px;border:1px solid var(--line);border-radius:8px;text-align:center;background:#061827;font-size:9px}

@media(max-width:1100px){
 #inicio .hero.mlh28-hero{grid-template-columns:1fr!important;min-height:auto!important}
 .mlh28-rebirth-card img{min-height:0;aspect-ratio:4/3;object-fit:cover}
 .mlh28-tabs{grid-template-columns:1fr 1fr}.mlh28-homegrid{grid-template-columns:1fr}.mlh28-grid{grid-template-columns:1fr 1fr}.mlh28-detailgrid{grid-template-columns:1fr}
}
@media(max-width:760px){
 .mlh28-pedia-head{padding:18px}.mlh28-body{padding:16px}.mlh28-tabs{padding:10px 16px;grid-template-columns:1fr 1fr}.mlh28-tab{font-size:11px}
 .mlh28-grid{grid-template-columns:1fr}.mlh28-filters,.mlh28-search{grid-template-columns:1fr}.mlh28-tokenlist{grid-template-columns:repeat(4,1fr)}
 .mlh28-rebirth-card:after{font-size:10px;padding:8px 10px}
}
`;
document.head.appendChild(css);

const state={areas:null,missions:null,items:null,entities:null,searchAreas:null,searchMissions:null,missionShown:50,itemShown:50};

function openMainPage(id){
  try{if(typeof go==='function'){go(id);return}}catch(e){}
  const btn=qa(`[data-go="${id}"]`).find(b=>b.closest('#nav'))||q(`[data-go="${id}"]`);
  if(btn)btn.click();
}

function enhanceHome(){
  const hero=q('#inicio .hero');if(!hero||q('#mlh28RebirthCard'))return;
  hero.classList.add('mlh28-hero');
  const old=hero.querySelector('.case');
  const card=document.createElement('button');
  card.type='button';card.id='mlh28RebirthCard';card.className='mlh28-rebirth-card';card.setAttribute('aria-label','Abrir seção MilMo Rebirth');
  card.innerHTML='<img src="assets/cantadeli-rebirth-hero.jpg" alt="Cantadeli convidando jogadores para o MilMo Rebirth" loading="eager" decoding="async">';
  card.onclick=()=>openMainPage('rebirth');
  if(old)old.replaceWith(card);else hero.appendChild(card);
}

function pediaMarkup(){return `
<section class="panel mlh28-pedia-shell" id="mlh28PediaShell">
 <div class="mlh28-pedia-head"><div class="mlh28-pedia-title"><div><span class="eyebrow">ENCICLOPÉDIA DO MILMO</span><h2>MilMoPedia</h2><p>Conteúdo dividido por função para abrir rápido no celular e ficar mais fácil de consultar durante o jogo.</p></div><div class="agent-chip" data-agent="Island Explorer"><span class="ico">🗺️</span><div><strong>Island Explorer</strong><small>Explorador de Ilhas</small></div></div></div></div>
 <nav class="mlh28-tabs" aria-label="Seções da MilMoPedia">
  <button class="mlh28-tab on" data-m28view="home">⌂ Visão Geral</button>
  <button class="mlh28-tab" data-m28view="areas">🗺️ Ilhas & Áreas</button>
  <button class="mlh28-tab" data-m28view="missions">📜 Missões</button>
  <button class="mlh28-tab" data-m28view="items">🎒 Itens & NPCs</button>
 </nav>
 <div class="mlh28-body">
  <section class="mlh28-view on" data-m28pane="home">
   <div class="mlh28-search"><input id="mpSearch" autocomplete="off" placeholder="Buscar ilha, área ou missão..." aria-label="Buscar ilha, área ou missão"><button class="btn" id="m28SearchBtn">Buscar</button></div>
   <div id="m28SearchResults" class="mlh28-results"></div>
   <div class="mlh28-homegrid">
    <button class="mlh28-launch" data-m28open="areas"><span class="ico">🗺️</span><b>Ilhas & Áreas</b><small>As quatro aventuras, áreas, exploração e tokens. Abra uma área para ver os detalhes apenas quando precisar.</small></button>
    <button class="mlh28-launch" data-m28open="missions"><span class="ico">📜</span><b>Missões</b><small>Pesquise por missão, NPC, objetivo ou recompensa sem carregar toda a enciclopédia de uma vez.</small></button>
    <button class="mlh28-launch" data-m28open="items"><span class="ico">🎒</span><b>Itens & NPCs</b><small>Itens, criaturas, monstros, NPCs e outras entidades catalogadas, com busca própria.</small></button>
   </div>
   <div class="mlh28-status"><b>Desempenho:</b> cada seção é carregada somente quando você abre. A MilMoPedia deixa de montar centenas de registros antes do primeiro toque.</div>
  </section>
  <section class="mlh28-view" data-m28pane="areas"><div class="section-head"><div><h2>Ilhas & Áreas</h2><p>Explore por aventura e abra somente a área que deseja consultar.</p></div></div><div class="mlh28-filters"><input id="m28AreaSearch" placeholder="Buscar ilha ou área..."><select id="m28Adventure"><option value="">Todas as aventuras</option><option>The Horizon</option><option>Summer Tide Saga</option><option>Mice & Maniax</option><option>Air World</option></select></div><div id="m28AreaStatus" class="mlh28-status">Abra esta seção para carregar as áreas.</div><div id="m28AreaGrid" class="mlh28-grid"></div></section>
  <section class="mlh28-view" data-m28pane="missions"><div class="section-head"><div><h2>Missões</h2><p>Busca direta por missão, NPC, objetivo, recompensa ou área.</p></div></div><div class="mlh28-search"><input id="m28MissionSearch" placeholder="Buscar missão, NPC ou objetivo..."><button class="btn" id="m28MissionSearchBtn">Pesquisar</button></div><div id="m28MissionStatus" class="mlh28-status">Abra esta seção para carregar as missões.</div><div id="m28MissionGrid" class="mlh28-grid"></div><div class="mlh28-loadmore"><button class="btn secondary" id="m28MissionMore" hidden>Mostrar mais</button></div></section>
  <section class="mlh28-view" data-m28pane="items"><div class="section-head"><div><h2>Itens & NPCs</h2><p>Itens, monstros, criaturas, NPCs e outras entidades do jogo em uma seção própria.</p></div></div><div class="mlh28-search"><input id="m28ItemSearch" placeholder="Buscar item, NPC, criatura ou monstro..."><button class="btn" id="m28ItemSearchBtn">Pesquisar</button></div><div id="m28ItemStatus" class="mlh28-status">Abra esta seção para carregar itens e entidades.</div><div id="m28ItemGrid" class="mlh28-grid"></div><div class="mlh28-loadmore"><button class="btn secondary" id="m28ItemMore" hidden>Mostrar mais</button></div></section>
 </div>
</section>`}

function mountPedia(){
 const p=q('#pedia');if(!p||q('#mlh28PediaShell'))return;
 p.innerHTML=pediaMarkup();
 qa('[data-m28view]').forEach(b=>b.onclick=()=>activateView(b.dataset.m28view));
 qa('[data-m28open]').forEach(b=>b.onclick=()=>activateView(b.dataset.m28open));
 q('#m28SearchBtn').onclick=runUniversalSearch;q('#mpSearch').addEventListener('keydown',e=>{if(e.key==='Enter')runUniversalSearch()});
 q('#m28AreaSearch').addEventListener('input',renderAreas);q('#m28Adventure').addEventListener('change',renderAreas);
 q('#m28MissionSearchBtn').onclick=()=>{state.missionShown=50;renderMissions()};q('#m28MissionSearch').addEventListener('input',()=>{state.missionShown=50;renderMissions()});
 q('#m28MissionMore').onclick=()=>{state.missionShown+=50;renderMissions()};
 q('#m28ItemSearchBtn').onclick=()=>{state.itemShown=50;renderItems()};q('#m28ItemSearch').addEventListener('input',()=>{state.itemShown=50;renderItems()});
 q('#m28ItemMore').onclick=()=>{state.itemShown+=50;renderItems()};
 const modal=document.createElement('div');modal.id='m28AreaModal';modal.className='modal mlh28-area-modal';modal.innerHTML='<div class="modalbox"><div class="section-head"><div><span class="eyebrow">MILMOPEDIA • ÁREA</span><h2 id="m28AreaTitle"></h2><p id="m28AreaSub" class="muted"></p></div><button class="btn ghost" id="m28AreaClose">Fechar</button></div><div id="m28AreaBody"></div></div>';document.body.appendChild(modal);
 q('#m28AreaClose').onclick=()=>modal.classList.remove('on');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('on')};
}

async function activateView(view){
 qa('[data-m28view]').forEach(b=>b.classList.toggle('on',b.dataset.m28view===view));qa('[data-m28pane]').forEach(p=>p.classList.toggle('on',p.dataset.m28pane===view));
 if(view==='areas')await loadAreas();if(view==='missions')await loadMissions();if(view==='items')await loadItems();
 q('#mlh28PediaShell')?.scrollIntoView({block:'start',behavior:'auto'});
}

async function loadAreas(){
 if(state.areas){renderAreas();return}const st=q('#m28AreaStatus');st.textContent='Carregando áreas...';
 if(!client){st.textContent='Serviço temporariamente indisponível.';return}
 const {data,error}=await client.from('milmo_areas').select('slug,name,adventure,era,description,source_url').order('adventure').order('name');
 if(error){st.textContent='Não foi possível carregar as áreas agora.';return}state.areas=data||[];renderAreas();
}
function renderAreas(){
 if(!state.areas)return;const text=norm(q('#m28AreaSearch')?.value),adv=q('#m28Adventure')?.value||'';const rows=state.areas.filter(a=>(!adv||a.adventure===adv)&&(!text||norm([a.name,a.adventure,a.description].join(' ')).includes(text)));q('#m28AreaStatus').textContent=`${rows.length} área(s) encontrada(s) • ${state.areas.length} catalogada(s) no total.`;
 q('#m28AreaGrid').innerHTML=rows.length?rows.map(a=>`<article class="mlh28-card"><span class="tag">${esc(a.adventure||a.era||'MilMo')}</span><h3>${esc(a.name)}</h3><p>${esc(a.description||'Área catalogada na MilMoPedia.')}</p><button class="btn secondary" data-m28area="${esc(a.slug)}">Explorar área</button></article>`).join(''):'<div class="mlh28-empty">Nenhuma área encontrada.</div>';
 qa('[data-m28area]').forEach(b=>b.onclick=()=>openArea(b.dataset.m28area));
}

async function loadMissions(){
 if(state.missions){renderMissions();return}const st=q('#m28MissionStatus');st.textContent='Carregando missões...';
 if(!client){st.textContent='Serviço temporariamente indisponível.';return}
 const [m,a]=await Promise.all([client.from('missions').select('slug,title,area_slug,npc,objective,reward,source_url').order('title'),client.from('milmo_areas').select('slug,name,adventure')]);
 if(m.error){st.textContent='Não foi possível carregar as missões agora.';return}state.missions=m.data||[];if(!state.areas)state.areas=a.data||[];renderMissions();
}
function areaLabel(slug){return state.areas?.find(a=>a.slug===slug)?.name||slug||'Área não informada'}
function renderMissions(){
 if(!state.missions)return;const text=norm(q('#m28MissionSearch')?.value);const filtered=state.missions.filter(m=>!text||norm([m.title,m.npc,m.objective,m.reward,areaLabel(m.area_slug)].join(' ')).includes(text));const rows=filtered.slice(0,state.missionShown);q('#m28MissionStatus').textContent=`${filtered.length} missão(ões) encontrada(s) • mostrando ${rows.length}.`;
 q('#m28MissionGrid').innerHTML=rows.length?rows.map(m=>`<article class="mlh28-card"><span class="tag gold">MISSÃO</span><h3>${esc(m.title)}</h3><div class="meta"><span>${esc(areaLabel(m.area_slug))}</span>${m.npc?`<span>NPC: ${esc(m.npc)}</span>`:''}</div><p>${esc(m.objective||'Objetivo em catalogação.')}</p>${m.reward?`<small>Recompensa: ${esc(m.reward)}</small>`:''}${m.area_slug?`<button class="btn ghost" data-m28missionarea="${esc(m.area_slug)}">Abrir área</button>`:''}</article>`).join(''):'<div class="mlh28-empty">Nenhuma missão encontrada.</div>';
 qa('[data-m28missionarea]').forEach(b=>b.onclick=()=>openArea(b.dataset.m28missionarea));q('#m28MissionMore').hidden=rows.length>=filtered.length;
}

async function loadItems(){
 if(state.items&&state.entities){renderItems();return}const st=q('#m28ItemStatus');st.textContent='Carregando itens e entidades...';
 if(!client){st.textContent='Serviço temporariamente indisponível.';return}
 const [i,e,a]=await Promise.all([client.from('game_items').select('area_slug,name,name_pt,item_type,acquisition_type,location_hint,probability,notes,source_url').eq('status','approved'),client.from('game_entities').select('area_slug,name,name_pt,entity_type,amount,spawn_probability,notes,source_url').eq('status','approved'),client.from('milmo_areas').select('slug,name,adventure')]);
 if(i.error||e.error){st.textContent='Não foi possível carregar itens e entidades agora.';return}state.items=i.data||[];state.entities=e.data||[];if(!state.areas)state.areas=a.data||[];renderItems();
}
function renderItems(){
 if(!state.items||!state.entities)return;const text=norm(q('#m28ItemSearch')?.value);let rows=[...state.items.map(x=>({...x,_kind:'Item',_name:x.name_pt||x.name,_type:x.item_type||x.acquisition_type||'Item'})),...state.entities.map(x=>({...x,_kind:'Entidade',_name:x.name_pt||x.name,_type:x.entity_type||'Entidade'}))];rows=rows.filter(r=>!text||norm([r._name,r._type,r.location_hint,r.notes,areaLabel(r.area_slug)].join(' ')).includes(text));const shown=rows.slice(0,state.itemShown);q('#m28ItemStatus').textContent=`${rows.length} registro(s) encontrado(s) • mostrando ${shown.length}.`;
 q('#m28ItemGrid').innerHTML=shown.length?shown.map(r=>`<article class="mlh28-card"><span class="tag ${r._kind==='Item'?'green':'purple'}">${r._kind}</span><h3>${esc(r._name)}</h3><div class="meta"><span>${esc(r._type)}</span><span>${esc(areaLabel(r.area_slug))}</span></div><p>${esc(r.location_hint||r.notes||'Registro catalogado.')}</p>${r.area_slug?`<button class="btn ghost" data-m28itemarea="${esc(r.area_slug)}">Abrir área</button>`:''}</article>`).join(''):'<div class="mlh28-empty">Nenhum registro encontrado.</div>';
 qa('[data-m28itemarea]').forEach(b=>b.onclick=()=>openArea(b.dataset.m28itemarea));q('#m28ItemMore').hidden=shown.length>=rows.length;
}

async function openArea(slug){
 if(!client)return;const modal=q('#m28AreaModal'),title=q('#m28AreaTitle'),sub=q('#m28AreaSub'),body=q('#m28AreaBody');modal.classList.add('on');title.textContent='Carregando...';sub.textContent='';body.innerHTML='<div class="mlh28-status">Buscando somente os dados desta área...</div>';
 let area=state.areas?.find(a=>a.slug===slug);if(!area){const {data}=await client.from('milmo_areas').select('slug,name,adventure,description,source_url').eq('slug',slug).maybeSingle();area=data}
 const [m,i,e,t]=await Promise.all([client.from('missions').select('title,npc,objective,reward,source_url').eq('area_slug',slug),client.from('game_items').select('name,name_pt,item_type,location_hint,probability,notes').eq('area_slug',slug).eq('status','approved'),client.from('game_entities').select('name,name_pt,entity_type,amount,spawn_probability,notes').eq('area_slug',slug).eq('status','approved'),client.from('exploration_tokens').select('token_no,hint,coordinates,source_url').eq('area_slug',slug).order('token_no')]);
 const ms=m.data||[],it=i.data||[],en=e.data||[],to=t.data||[];title.textContent=area?.name||slug;sub.textContent=area?.adventure||'MilMo';
 const tokenBlock=slug==='sts-boss-beach'?'<div class="mlh28-empty">Área especial: Boss Beach não possui Exploration Tokens.</div>':to.length?`<div class="mlh28-tokenlist">${to.map(x=>`<div class="mlh28-token"><b>${x.token_no}</b></div>`).join('')}</div>${to.map(x=>`<div class="mlh28-row"><b>Token ${x.token_no}</b><small>${esc(x.hint||'Posição registrada.')}</small></div>`).join('')}`:'<div class="mlh28-empty">Rota individual ainda não validada.</div>';
 body.innerHTML=`${area?.description?`<div class="mlh28-status">${esc(area.description)}</div>`:''}<div class="mlh28-detailgrid"><section class="mlh28-detail"><h3>📜 Missões (${ms.length})</h3>${ms.length?ms.map(x=>`<div class="mlh28-row"><b>${esc(x.title)}</b>${x.npc?`<small>NPC: ${esc(x.npc)}</small>`:''}${x.objective?`<small>${esc(x.objective)}</small>`:''}${x.reward?`<small>Recompensa: ${esc(x.reward)}</small>`:''}</div>`).join(''):'<div class="mlh28-empty">Nenhuma missão individualizada nesta área.</div>'}</section><section class="mlh28-detail"><h3>👾 NPCs & criaturas (${en.length})</h3>${en.length?en.map(x=>`<div class="mlh28-row"><b>${esc(x.name_pt||x.name)}</b><small>${esc(x.entity_type||'Entidade')}${x.amount?' • qtd. '+x.amount:''}</small></div>`).join(''):'<div class="mlh28-empty">Nenhuma entidade catalogada nesta área.</div>'}</section><section class="mlh28-detail"><h3>🎒 Itens (${it.length})</h3>${it.length?it.map(x=>`<div class="mlh28-row"><b>${esc(x.name_pt||x.name)}</b><small>${esc(x.location_hint||x.item_type||'Item')}</small></div>`).join(''):'<div class="mlh28-empty">Nenhum item catalogado nesta área.</div>'}</section><section class="mlh28-detail"><h3>🧭 Tokens (${to.length})</h3>${tokenBlock}</section></div>`;
}

async function runUniversalSearch(){
 const input=q('#mpSearch'),box=q('#m28SearchResults'),text=norm(input?.value);if(text.length<2){box.innerHTML='<div class="mlh28-empty">Digite pelo menos 2 caracteres.</div>';return}box.innerHTML='<div class="mlh28-status">Buscando...</div>';
 if(!client){box.innerHTML='<div class="mlh28-empty">Serviço temporariamente indisponível.</div>';return}
 if(!state.searchAreas||!state.searchMissions){const [a,m]=await Promise.all([client.from('milmo_areas').select('slug,name,adventure,description'),client.from('missions').select('title,area_slug,npc,objective,reward')]);state.searchAreas=a.data||[];state.searchMissions=m.data||[];if(!state.areas)state.areas=state.searchAreas}
 const areas=state.searchAreas.filter(a=>norm([a.name,a.adventure,a.description].join(' ')).includes(text)).slice(0,8);const missions=state.searchMissions.filter(m=>norm([m.title,m.npc,m.objective,m.reward,areaLabel(m.area_slug)].join(' ')).includes(text)).slice(0,12);const html=[];areas.forEach(a=>html.push(`<button class="mlh28-result" data-m28sarea="${esc(a.slug)}"><span class="tag">ILHA / ÁREA</span><b>${esc(a.name)}</b><small>${esc(a.adventure||'MilMo')}</small></button>`));missions.forEach(m=>html.push(`<button class="mlh28-result" data-m28sarea="${esc(m.area_slug||'')}"><span class="tag gold">MISSÃO</span><b>${esc(m.title)}</b><small>${esc(areaLabel(m.area_slug))}${m.npc?' • NPC: '+esc(m.npc):''}</small></button>`));box.innerHTML=html.length?html.join(''):'<div class="mlh28-empty">Nenhuma ilha, área ou missão encontrada.</div>';qa('[data-m28sarea]').forEach(b=>b.onclick=()=>b.dataset.m28sarea&&openArea(b.dataset.m28sarea));
}

function boot(){enhanceHome();mountPedia();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();