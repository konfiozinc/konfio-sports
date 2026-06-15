/* ================================================================
   KONFÍO SPORTS v5 — script.js
   Plataforma deportiva premium · 100% datos locales, sin backend
   ================================================================ */

'use strict';

/* ── CONFIGURACIÓN ──────────────────────────────────────────────── */
const SITE_URL = 'https://konfiozinc.github.io/konfio-sports/';
const WA_NUM   = '573117811684';

/* ================================================================
   CATEGORÍAS / COMPETENCIAS
   ================================================================ */
const CATEGORIES = [
  { id:'seleccion',    name:'Selección Colombia', icon:'flag-co'  },
  { id:'mundial',      name:'Mundial FIFA',       icon:'trophy'   },
  { id:'betplay',      name:'Liga Colombiana',    icon:'ball'     },
  { id:'libertadores', name:'Copa Libertadores',  icon:'cup-gold' },
  { id:'sudamericana', name:'Copa Sudamericana',  icon:'cup-green'},
  { id:'champions',    name:'Champions League',   icon:'star'     },
  { id:'premier',      name:'Premier League',     icon:'flag-en'  },
  { id:'laliga',       name:'LaLiga',             icon:'flag-es'  },
  { id:'seriea',       name:'Serie A',            icon:'flag-it'  },
  { id:'bundesliga',   name:'Bundesliga',         icon:'flag-de'  },
];

/* Selecciones destacadas — Mundial */
const FEATURED_TEAMS = [
  { flag:'🇨🇴', name:'Colombia' },
  { flag:'🇦🇷', name:'Argentina' },
  { flag:'🇧🇷', name:'Brasil' },
  { flag:'🇺🇸', name:'Estados Unidos' },
  { flag:'🇲🇽', name:'México' },
  { flag:'🇨🇦', name:'Canadá' },
  { flag:'🇪🇸', name:'España' },
  { flag:'🇫🇷', name:'Francia' },
];

/* ================================================================
   ICONOS SVG (reutilizables, generados por JS)
   ================================================================ */
const ICONS = {
  'flag-co': '<svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="10.6" y="0" fill="#FCD116"/><rect width="32" height="10.6" y="10.6" fill="#003893"/><rect width="32" height="10.8" y="21.2" fill="#CE1126"/></svg>',
  'trophy': '<svg viewBox="0 0 32 32" width="24" height="24"><path d="M11 6h10l-1 9a4 4 0 0 1-8 0z" fill="#F97316"/><path d="M11 8c-3 0-4 2-4 4s1 4 4 4" fill="none" stroke="#F97316" stroke-width="1.6"/><path d="M21 8c3 0 4 2 4 4s-1 4-4 4" fill="none" stroke="#F97316" stroke-width="1.6"/><rect x="13" y="20" width="6" height="3" fill="#F97316"/><rect x="10" y="23" width="12" height="2.4" rx="1" fill="#F97316"/></svg>',
  'ball': '<svg viewBox="0 0 32 32" width="24" height="24"><circle cx="16" cy="16" r="13" fill="#fff" stroke="#999" stroke-width=".5"/><polygon points="16,7 20.5,11 16,15 11.5,11" fill="#1a1a1a"/><polygon points="25,12 28,16 23,20 19.5,15.5" fill="#1a1a1a"/><polygon points="7,12 4,16 9,20 12.5,15.5" fill="#1a1a1a"/><polygon points="23,24 16,27 9,24 11.5,17 20.5,17" fill="#1a1a1a"/></svg>',
  'cup-gold': '<svg viewBox="0 0 32 32" width="24" height="24"><path d="M11 6h10l-1.2 10a3.8 3.8 0 0 1-7.6 0z" fill="#F0B429"/><path d="M11 8c-3 0-4 2-4 4s1.5 4 4.5 4.2" fill="none" stroke="#F0B429" stroke-width="1.6"/><path d="M21 8c3 0 4 2 4 4s-1.5 4-4.5 4.2" fill="none" stroke="#F0B429" stroke-width="1.6"/><rect x="13" y="20" width="6" height="3" fill="#F0B429"/><rect x="10" y="23" width="12" height="2.4" rx="1" fill="#F0B429"/></svg>',
  'cup-green': '<svg viewBox="0 0 32 32" width="24" height="24"><path d="M11 6h10l-1.2 10a3.8 3.8 0 0 1-7.6 0z" fill="#22C55E"/><path d="M11 8c-3 0-4 2-4 4s1.5 4 4.5 4.2" fill="none" stroke="#22C55E" stroke-width="1.6"/><path d="M21 8c3 0 4 2 4 4s-1.5 4-4.5 4.2" fill="none" stroke="#22C55E" stroke-width="1.6"/><rect x="13" y="20" width="6" height="3" fill="#22C55E"/><rect x="10" y="23" width="12" height="2.4" rx="1" fill="#22C55E"/></svg>',
  'star': '<svg viewBox="0 0 32 32" width="24" height="24"><path fill="#a78bfa" d="M16 3l3.6 7.7 8.4 1.1-6.1 5.9 1.5 8.3L16 22.2 8.6 26l1.5-8.3-6.1-5.9 8.4-1.1z"/></svg>',
  'flag-en': '<svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" fill="#012169"/><path d="M0 0L32 32M32 0L0 32" stroke="#fff" stroke-width="4"/><path d="M0 0L32 32M32 0L0 32" stroke="#C8102E" stroke-width="2"/><path d="M16 0V32M0 16H32" stroke="#fff" stroke-width="6"/><path d="M16 0V32M0 16H32" stroke="#C8102E" stroke-width="3"/></svg>',
  'flag-es': '<svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" fill="#AA151B"/><rect width="32" height="16" y="8" fill="#F1BF00"/></svg>',
  'flag-it': '<svg viewBox="0 0 32 32" width="24" height="24"><rect width="10.67" height="32" fill="#009246"/><rect width="10.67" height="32" x="10.67" fill="#fff"/><rect width="10.67" height="32" x="21.33" fill="#CE2B37"/></svg>',
  'flag-de': '<svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="10.6" fill="#000"/><rect width="32" height="10.6" y="10.6" fill="#DD0000"/><rect width="32" height="10.8" y="21.2" fill="#FFCE00"/></svg>',
};

/* ================================================================
   CANALES OFICIALES POR PAÍS
   Solo señales públicas / oficiales / abiertas, sin registro,
   sin pago, sin Telegram. La programación deportiva varía
   según cada canal — siempre verifica en la fuente oficial.
   ================================================================ */
const CHANNELS = [
  // Colombia
  { id:'co-caracol', country:'Colombia', flag:'🇨🇴', name:'Caracol Play', tag:'Oficial · Abierto', url:'https://www.caracoltv.com/senal-en-vivo', color:'#003082', init:'C' },
  { id:'co-win',     country:'Colombia', flag:'🇨🇴', name:'Win Sports Online', tag:'Oficial · Deportivo', url:'https://winsportsonline.com/', color:'#FFD700', init:'W' },
  { id:'co-rcn',     country:'Colombia', flag:'🇨🇴', name:'Canal RCN', tag:'Oficial · Abierto', url:'https://www.canalrcn.com/senal-en-vivo/', color:'#E30613', init:'R' },
  // Argentina
  { id:'ar-tvpublica', country:'Argentina', flag:'🇦🇷', name:'TV Pública', tag:'Público · Abierto', url:'https://www.tvpublica.com.ar/vivo/', color:'#75AADB', init:'TVP' },
  { id:'ar-tyc',     country:'Argentina', flag:'🇦🇷', name:'TyC Sports Play', tag:'Deportivo', url:'https://www.tycsports.com/tyc-sports-play.html', color:'#0033A0', init:'TyC' },
  // Chile
  { id:'cl-tvn',     country:'Chile', flag:'🇨🇱', name:'TVN', tag:'Público · Abierto', url:'https://www.tvn.cl/senal-en-vivo', color:'#D52B1E', init:'TVN' },
  { id:'cl-mega',    country:'Chile', flag:'🇨🇱', name:'Mega', tag:'Abierto', url:'https://www.mega.cl/en-vivo', color:'#E4002B', init:'M' },
  // Perú
  { id:'pe-tvperu',  country:'Perú', flag:'🇵🇪', name:'TV Perú', tag:'Público · Abierto', url:'https://www.tvperu.gob.pe/envivo', color:'#D91023', init:'TVP' },
  { id:'pe-latina',  country:'Perú', flag:'🇵🇪', name:'Latina', tag:'Abierto', url:'https://www.latina.pe/envivo', color:'#E4002B', init:'L' },
  // Ecuador
  { id:'ec-ecuavisa',country:'Ecuador', flag:'🇪🇨', name:'Ecuavisa', tag:'Abierto', url:'https://www.ecuavisa.com/envivo', color:'#0033A0', init:'E' },
  { id:'ec-teleamazonas', country:'Ecuador', flag:'🇪🇨', name:'Teleamazonas', tag:'Abierto', url:'https://www.teleamazonas.com/envivo/', color:'#FFD100', init:'T' },
  // Bolivia
  { id:'bo-boliviatv', country:'Bolivia', flag:'🇧🇴', name:'Bolivia TV', tag:'Público · Abierto', url:'https://www.boliviatv.bo/envivo/', color:'#D52B1E', init:'BTV' },
  { id:'bo-reduno', country:'Bolivia', flag:'🇧🇴', name:'Red Uno', tag:'Abierto', url:'https://www.reduno.com.bo/envivo', color:'#F7941D', init:'R1' },
  // Paraguay
  { id:'py-telefuturo', country:'Paraguay', flag:'🇵🇾', name:'Telefuturo', tag:'Abierto', url:'https://www.telefuturo.com.py/envivo', color:'#0038A8', init:'TF' },
  { id:'py-paravision', country:'Paraguay', flag:'🇵🇾', name:'Paravisión', tag:'Abierto', url:'https://www.paravision.com.py/envivo', color:'#D52B1E', init:'PV' },
  // Uruguay
  { id:'uy-tnu', country:'Uruguay', flag:'🇺🇾', name:'TNU Canal 5', tag:'Público · Abierto', url:'https://tnu.com.uy/vivo/', color:'#0038A8', init:'TNU' },
  { id:'uy-teledoce', country:'Uruguay', flag:'🇺🇾', name:'Teledoce', tag:'Abierto', url:'https://www.teledoce.com/vivo/', color:'#E4002B', init:'12' },
  // Venezuela
  { id:'ve-vtv', country:'Venezuela', flag:'🇻🇪', name:'VTV', tag:'Público · Abierto', url:'https://www.vtv.gob.ve/senal-en-vivo/', color:'#FFCC00', init:'VTV' },
  // España
  { id:'es-rtve1', country:'España', flag:'🇪🇸', name:'RTVE Play · La 1', tag:'Público · Abierto', url:'https://www.rtve.es/play/directo/la-1/', color:'#AA151B', init:'1' },
  { id:'es-teledeporte', country:'España', flag:'🇪🇸', name:'Teledeporte', tag:'Público · Deportivo', url:'https://www.rtve.es/play/directo/teledeporte/', color:'#F1BF00', init:'TD' },
];

const COUNTRIES = [...new Set(CHANNELS.map(c => c.country))];

/* ================================================================
   MOCK MATCHES — Partidos representativos por día de semana
   Estado live/next/done calculado en tiempo real (hora Colombia)
   ================================================================ */
const MOCK_MATCHES_BY_DOW = {
  0: [
    { hora:'14:00', local:'Atlético Nacional',      visitante:'Deportivo Cali',     liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'16:05', local:'Junior FC',               visitante:'Santa Fe',           liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'18:00', local:'Real Madrid',             visitante:'Barcelona',          liga:'LaLiga',                       donde:'ESPN',         cat:'laliga' },
    { hora:'20:30', local:'Flamengo',                visitante:'Palmeiras',          liga:'Copa Libertadores',           donde:'DAZN',         cat:'libertadores' },
  ],
  1: [
    { hora:'16:00', local:'Millonarios FC',          visitante:'América de Cali',    liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'19:00', local:'Manchester City',         visitante:'Arsenal',            liga:'Premier League',              donde:'ESPN',         cat:'premier' },
    { hora:'21:00', local:'Inter Miami',             visitante:'LA Galaxy',          liga:'MLS',                          donde:'Apple TV',     cat:'otros' },
    { hora:'23:30', local:'América de Cali',         visitante:'Junior FC',          liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
  ],
  2: [
    { hora:'14:30', local:'Deportes Tolima',         visitante:'Envigado FC',        liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'19:00', local:'Juventus',                visitante:'AC Milan',           liga:'Serie A',                      donde:'ESPN',         cat:'seriea' },
    { hora:'21:00', local:'Bayern Múnich',           visitante:'Borussia Dortmund',  liga:'Bundesliga',                   donde:'ESPN',         cat:'bundesliga' },
    { hora:'23:00', local:'Santa Fe',                visitante:'Deportivo Cali',     liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
  ],
  3: [
    { hora:'14:00', local:'Independiente Medellín',  visitante:'Peñarol',            liga:'Copa Sudamericana',           donde:'DAZN',         cat:'sudamericana' },
    { hora:'16:00', local:'Atlético Bucaramanga',    visitante:'Once Caldas',        liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'21:00', local:'PSG',                     visitante:'Lyon',                liga:'Ligue 1',                      donde:'ESPN',         cat:'otros' },
    { hora:'23:00', local:'Junior FC',               visitante:'Deportes Tolima',    liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
  ],
  4: [
    { hora:'14:00', local:'Sporting Cristal',        visitante:'Alianza Lima',       liga:'Copa Libertadores',           donde:'DAZN',         cat:'libertadores' },
    { hora:'16:00', local:'Deportivo Pasto',         visitante:'Águilas Doradas',    liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'19:00', local:'Sevilla',                 visitante:'Valencia',           liga:'LaLiga',                       donde:'ESPN',         cat:'laliga' },
    { hora:'21:00', local:'Atlético Nacional',       visitante:'Millonarios FC',     liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'23:00', local:'LA Galaxy',               visitante:'Inter Miami',        liga:'MLS',                          donde:'Apple TV',     cat:'otros' },
  ],
  5: [
    { hora:'15:00', local:'Boca Juniors',            visitante:'River Plate',        liga:'Copa Libertadores',           donde:'DAZN',         cat:'libertadores' },
    { hora:'16:00', local:'Selección Colombia',      visitante:'Por confirmar',      liga:'Eliminatorias / Mundial 2026', donde:'Caracol Play', cat:'seleccion' },
    { hora:'19:00', local:'Atlético de Madrid',      visitante:'Getafe',             liga:'LaLiga',                       donde:'ESPN',         cat:'laliga' },
    { hora:'21:00', local:'Chelsea',                 visitante:'Liverpool',          liga:'Premier League',              donde:'ESPN',         cat:'premier' },
  ],
  6: [
    { hora:'11:00', local:'Independiente Santa Fe',  visitante:'La Equidad',         liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'13:30', local:'Manchester United',       visitante:'Tottenham',          liga:'Premier League',              donde:'ESPN',         cat:'premier' },
    { hora:'16:00', local:'Atlético Nacional',       visitante:'Junior FC',          liga:'Liga BetPlay Dimayor',        donde:'Win Sports',   cat:'betplay' },
    { hora:'18:00', local:'Real Madrid',             visitante:'Atlético de Madrid', liga:'LaLiga',                       donde:'ESPN',         cat:'laliga' },
    { hora:'20:30', local:'Fluminense',              visitante:'Nacional',           liga:'Copa Libertadores',           donde:'DAZN',         cat:'libertadores' },
  ],
};

let CURRENT_MATCHES = [];
let ACTIVE_FILTER   = 'all';
let ACTIVE_COUNTRY  = 'all';
let SHOW_FAV_ONLY   = false;

/* ================================================================
   UTILIDADES
   ================================================================ */
function showToast(msg, type = 'ok', duration = 2500) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.setAttribute('role', 'alert');
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), duration + 400);
}
function horaCOL() {
  return new Date().toLocaleTimeString('es-CO', { hour:'2-digit', minute:'2-digit', timeZone:'America/Bogota' });
}
function nowCOL() {
  return new Date(new Date().toLocaleString('en-US', { timeZone:'America/Bogota' }));
}
function dowCOL() { return nowCOL().getDay(); }

/* ── localStorage helpers ─────────────────────────────────────── */
function getFavorites() {
  try { return JSON.parse(localStorage.getItem('konfio_sports_favorites') || '[]'); }
  catch { return []; }
}
function setFavorites(arr) {
  try { localStorage.setItem('konfio_sports_favorites', JSON.stringify(arr)); } catch {}
}
function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) favs = favs.filter(f => f !== id);
  else favs.push(id);
  setFavorites(favs);
  return favs;
}
function getHistory() {
  try { return JSON.parse(localStorage.getItem('konfio_sports_history') || '[]'); }
  catch { return []; }
}
function pushHistory(id) {
  let h = getHistory().filter(x => x !== id);
  h.unshift(id);
  h = h.slice(0, 6);
  try { localStorage.setItem('konfio_sports_history', JSON.stringify(h)); } catch {}
  renderHistory();
}

/* ================================================================
   SPLASH
   ================================================================ */
function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  const delay = window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 200 : 1600;
  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), 500);
  }, delay);
}

/* ================================================================
   PWA
   ================================================================ */
let deferredInstallPrompt = null;
function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/konfio-sports/service-worker.js')
        .then(reg => console.log('[SW] OK:', reg.scope))
        .catch(err => console.warn('[SW]', err));
    });
  }
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    document.getElementById('install-banner')?.classList.add('visible');
  });
  document.getElementById('btn-install')?.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') showToast('✓ KONFÍO SPORTS instalada');
    deferredInstallPrompt = null;
    document.getElementById('install-banner')?.classList.remove('visible');
  });
  document.getElementById('btn-dismiss')?.addEventListener('click', () => {
    document.getElementById('install-banner')?.classList.remove('visible');
  });
}

/* ================================================================
   CATEGORÍAS — render + filtro
   ================================================================ */
function renderCategories() {
  const grid = document.getElementById('cat-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card" role="listitem" tabindex="0" data-filter="${c.id}"
         aria-label="Ver partidos de ${c.name}">
      <div class="cat-ic" aria-hidden="true">${ICONS[c.icon] || ''}</div>
      <span>${c.name}</span>
    </div>`).join('');

  grid.querySelectorAll('.cat-card').forEach(card => {
    const go = () => {
      ACTIVE_FILTER = card.dataset.filter;
      applyMatchFilter();
      syncChips();
      document.getElementById('partidos')?.scrollIntoView({ behavior:'smooth' });
    };
    card.addEventListener('click', go);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
}

/* ================================================================
   QUICK CATS — tira de categorías en el hero (primer pantallazo)
   ================================================================ */
function renderQuickCats() {
  const wrap = document.getElementById('quick-cats');
  if (!wrap) return;
  wrap.innerHTML = CATEGORIES.map(c => `
    <button class="qc-chip" type="button" data-filter="${c.id}" role="listitem"
            aria-label="Ver partidos de ${c.name}">
      ${ICONS[c.icon] || ''}<span>${c.name}</span>
    </button>`).join('');
  wrap.querySelectorAll('.qc-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      ACTIVE_FILTER = chip.dataset.filter;
      applyMatchFilter();
      syncChips();
      document.getElementById('partidos')?.scrollIntoView({ behavior:'smooth' });
    });
  });
}

/* ================================================================
   CHIPS de filtro en Partidos
   ================================================================ */
function renderChips() {
  const chips = document.getElementById('chips');
  if (!chips) return;
  const items = [{ id:'all', name:'Todos' }, ...CATEGORIES.filter(c =>
    CURRENT_MATCHES.some(m => m.cat === c.id)
  )];
  chips.innerHTML = items.map(c =>
    `<button class="chip" data-filter="${c.id}" role="listitem">${c.name}</button>`
  ).join('');
  chips.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      ACTIVE_FILTER = chip.dataset.filter;
      applyMatchFilter();
      syncChips();
    });
  });
  syncChips();
}
function syncChips() {
  document.querySelectorAll('#chips .chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.filter === ACTIVE_FILTER);
  });
}
function applyMatchFilter() {
  document.querySelectorAll('#match-list .match').forEach(el => {
    const cat = el.dataset.cat;
    el.classList.toggle('hidden', ACTIVE_FILTER !== 'all' && cat !== ACTIVE_FILTER);
  });
}

/* ================================================================
   PARTIDOS DEL DÍA
   ================================================================ */
async function reloadMatches() {
  const loading = document.getElementById('match-loading');
  const list    = document.getElementById('match-list');
  const stamp   = document.getElementById('match-stamp');
  const btn     = document.getElementById('btn-reload');

  if (list)   { list.innerHTML = ''; list.style.display = 'none'; }
  if (stamp)  stamp.style.display = 'none';
  if (loading) loading.style.display = 'flex';
  if (btn)    { btn.classList.add('loading'); btn.disabled = true; }

  try {
    let matches = MOCK_MATCHES_BY_DOW[dowCOL()] || [];

    const now    = nowCOL();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    matches = matches.map(m => {
      const [hh, mm] = (m.hora || '00:00').split(':').map(Number);
      const matchMin = hh * 60 + mm;
      let estado;
      if      (matchMin <= nowMin && nowMin < matchMin + 105) estado = 'live';
      else if (nowMin >= matchMin + 105)                       estado = 'done';
      else                                                     estado = 'next';
      return { ...m, estado };
    });

    matches.sort((a, b) => (a.hora || '').localeCompare(b.hora || ''));
    CURRENT_MATCHES = matches;

    if (loading) loading.style.display = 'none';

    if (!matches.length) {
      if (list) {
        list.innerHTML = `<div class="today-err"><b>Sin partidos confirmados hoy</b>Vuelve mañana o consulta los canales oficiales.</div>`;
        list.style.display = 'block';
      }
    } else {
      if (list) {
        list.innerHTML = matches.map(m => renderMatch(m)).join('');
        list.style.display = 'block';
      }
    }

    if (stamp) {
      const txt = document.getElementById('stamp-text');
      if (txt) txt.textContent = `programación · ${horaCOL()} Bogotá`;
      stamp.style.display = 'flex';
    }

    const liveCount = matches.filter(m => m.estado === 'live').length;
    const liveTag = document.getElementById('live-count');
    if (liveTag) {
      liveTag.textContent = liveCount > 0 ? `🔴 ${liveCount} en vivo` : `${matches.length} partidos hoy`;
    }
    const liveBadge = document.getElementById('live-badge');
    if (liveBadge) {
      liveBadge.classList.toggle('show', liveCount > 0);
      const lbText = liveBadge.querySelector('.lb-text');
      if (lbText) lbText.textContent = liveCount > 1 ? `${liveCount} EN VIVO` : 'EN VIVO';
    }
    if (liveCount > 0) showToast(`🔴 ${liveCount} partido${liveCount>1?'s':''} en vivo ahora`);

    renderChips();
    applyMatchFilter();
    updateCountdown();
    renderMundialSection();
    renderFeaturedFlags();

  } catch (err) {
    console.warn('[KONFÍO SPORTS]', err.message);
    if (loading) loading.style.display = 'none';
    if (list) {
      list.innerHTML = `<div class="today-err"><b>No se pudo cargar</b>Intenta de nuevo.</div>`;
      list.style.display = 'block';
    }
  } finally {
    if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
  }
}

function teamInitials(name) {
  return (name || '?').replace(/FC|CD|CF|SC|AC|SD|UD/g,'').trim().substring(0,2).toUpperCase();
}

function renderMatch(m) {
  const labels = { live:'En vivo', next:'Próximo', done:'Finalizado' };
  const estado  = m.estado || 'next';
  const initL   = teamInitials(m.local);
  const initV   = teamInitials(m.visitante);
  return `
  <div class="match" role="listitem" data-cat="${m.cat || 'otros'}"
       aria-label="${m.local} vs ${m.visitante}, ${labels[estado]}">
    <div class="match-time" aria-label="Hora ${m.hora} Colombia">
      ${m.hora || '--:--'}<span class="tz">COL</span>
    </div>
    <div class="match-crests" aria-hidden="true">
      <div class="crest" title="${m.local}">${initL}</div>
      <span class="crest-vs">vs</span>
      <div class="crest" title="${m.visitante}">${initV}</div>
    </div>
    <div class="match-info">
      <strong>${m.local} vs ${m.visitante}</strong>
      <small>${m.liga || ''}</small>
    </div>
    <div class="match-meta">
      <span class="match-where">${m.donde || '—'}</span>
      <span class="match-status ${estado}">${labels[estado] || estado}</span>
    </div>
  </div>`;
}

/* ================================================================
   COUNTDOWN — próximo partido importante
   ================================================================ */
let countdownInterval = null;
function getNextImportantMatch() {
  const now    = nowCOL();
  const nowMin = now.getHours()*60 + now.getMinutes();
  const priority = ['seleccion','mundial','libertadores','champions','betplay'];

  // 1. Buscar entre los partidos de hoy que aún no empiezan
  const todays = (CURRENT_MATCHES.length ? CURRENT_MATCHES : MOCK_MATCHES_BY_DOW[dowCOL()] || [])
    .filter(m => {
      const [hh,mm] = m.hora.split(':').map(Number);
      return (hh*60+mm) > nowMin;
    });

  let pool = todays;
  for (const p of priority) {
    const found = todays.filter(m => m.cat === p);
    if (found.length) { pool = found; break; }
  }
  if (pool.length) {
    const m = pool.sort((a,b)=>a.hora.localeCompare(b.hora))[0];
    const [hh,mm] = m.hora.split(':').map(Number);
    const target = new Date(now);
    target.setHours(hh, mm, 0, 0);
    return { match:m, target, daysOffset:0 };
  }

  // 2. Si no hay más hoy, tomar el primero de mañana
  const tomorrowDow = (dowCOL() + 1) % 7;
  const tomorrowMatches = (MOCK_MATCHES_BY_DOW[tomorrowDow] || []).slice().sort((a,b)=>a.hora.localeCompare(b.hora));
  if (tomorrowMatches.length) {
    const m = tomorrowMatches[0];
    const [hh,mm] = m.hora.split(':').map(Number);
    const target = new Date(now);
    target.setDate(target.getDate()+1);
    target.setHours(hh, mm, 0, 0);
    return { match:m, target, daysOffset:1 };
  }
  return null;
}

function updateCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  const next = getNextImportantMatch();
  const crestsEl = document.getElementById('countdown-crests');
  const textEl   = document.getElementById('countdown-text');
  if (!next) {
    if (textEl) textEl.textContent = 'Sin partidos próximos por ahora';
    if (crestsEl) crestsEl.innerHTML = '';
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
      const el = document.getElementById(id); if (el) el.textContent = '--';
    });
    return;
  }
  if (crestsEl) {
    crestsEl.innerHTML = `
      <div class="crest" title="${next.match.local}">${teamInitials(next.match.local)}</div>
      <span class="crest-vs">vs</span>
      <div class="crest" title="${next.match.visitante}">${teamInitials(next.match.visitante)}</div>`;
  }
  if (textEl) {
    textEl.innerHTML = `<b>${next.match.local} vs ${next.match.visitante}</b><small>${next.match.liga} · ${next.match.donde} · ${next.match.hora} COL</small>`;
  }
  const tick = () => {
    const now  = nowCOL();
    let diff = next.target.getTime() - now.getTime();
    if (diff < 0) diff = 0;
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = String(val).padStart(2,'0'); };
    set('cd-days', days); set('cd-hours', hours); set('cd-mins', mins); set('cd-secs', secs);
    if (diff <= 0) { clearInterval(countdownInterval); reloadMatches(); }
  };
  tick();
  countdownInterval = setInterval(tick, 1000);
}

/* ================================================================
   CANALES — render, búsqueda, filtro país, favoritos, historial
   ================================================================ */
function renderCountryTabs() {
  const tabs = document.getElementById('country-tabs');
  if (!tabs) return;
  const items = ['all', ...COUNTRIES];
  tabs.innerHTML = items.map(c => {
    const flag = c === 'all' ? '🌎' : (CHANNELS.find(ch => ch.country === c)?.flag || '');
    const label = c === 'all' ? 'Todos' : c;
    return `<button class="ctab" data-country="${c}" role="listitem">${flag} ${label}</button>`;
  }).join('');
  tabs.querySelectorAll('.ctab').forEach(tab => {
    tab.addEventListener('click', () => {
      ACTIVE_COUNTRY = tab.dataset.country;
      syncCountryTabs();
      applyChannelFilter();
    });
  });
  syncCountryTabs();
}
function syncCountryTabs() {
  document.querySelectorAll('#country-tabs .ctab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.country === ACTIVE_COUNTRY);
  });
}

function renderChannels() {
  const grid = document.getElementById('channel-grid');
  if (!grid) return;
  const favs = getFavorites();
  grid.innerHTML = CHANNELS.map(ch => `
    <div class="channel-card" role="listitem" data-id="${ch.id}" data-country="${ch.country}" data-name="${ch.name.toLowerCase()}">
      <div class="channel-top">
        <div class="channel-logo" style="background:${ch.color}">${ch.init}</div>
        <div class="channel-name">
          <strong>${ch.flag} ${ch.name}</strong>
          <small>${ch.country}</small>
        </div>
        <button class="btn-fav ${favs.includes(ch.id) ? 'active':''}" data-id="${ch.id}"
                aria-pressed="${favs.includes(ch.id)}" aria-label="Marcar ${ch.name} como favorito">
          <svg viewBox="0 0 24 24" fill="${favs.includes(ch.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="channel-tags"><span class="ch-tag">${ch.tag}</span></div>
      <div class="channel-actions">
        <a class="btn-channel" href="${ch.url}" target="_blank" rel="noopener noreferrer" data-id="${ch.id}">Ver canal →</a>
        <a class="btn-channel-yt" href="https://www.youtube.com/results?search_query=${encodeURIComponent(ch.name + ' ' + ch.country + ' en vivo')}"
           target="_blank" rel="noopener noreferrer" aria-label="Buscar ${ch.name} en vivo en YouTube" title="Buscar en YouTube">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z"/></svg>
        </a>
      </div>
    </div>`).join('');

  grid.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const favs = toggleFavorite(id);
      const active = favs.includes(id);
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
      btn.querySelector('svg').setAttribute('fill', active ? 'currentColor' : 'none');
      showToast(active ? '✓ Agregado a favoritos' : 'Eliminado de favoritos');
      if (SHOW_FAV_ONLY) applyChannelFilter();
    });
  });
  grid.querySelectorAll('.btn-channel').forEach(a => {
    a.addEventListener('click', () => pushHistory(a.dataset.id));
  });
}

function renderHistory() {
  const row = document.getElementById('history-row');
  if (!row) return;
  const hist = getHistory();
  if (!hist.length) { row.style.display = 'none'; return; }
  row.style.display = 'flex';
  row.innerHTML = `<span class="share-label" style="padding:6px 0">Recientes:</span>` + hist.map(id => {
    const ch = CHANNELS.find(c => c.id === id);
    if (!ch) return '';
    return `<a class="history-chip" href="${ch.url}" target="_blank" rel="noopener noreferrer">
      <span class="hc-logo" style="background:${ch.color}">${ch.init.substring(0,1)}</span>${ch.name}
    </a>`;
  }).join('');
}

function applyChannelFilter() {
  const q = (document.getElementById('channel-search')?.value || '').trim().toLowerCase();
  const favs = getFavorites();
  let visibleCount = 0;
  document.querySelectorAll('#channel-grid .channel-card').forEach(card => {
    const matchesCountry = ACTIVE_COUNTRY === 'all' || card.dataset.country === ACTIVE_COUNTRY;
    const matchesSearch  = !q || card.dataset.name.includes(q) || card.dataset.country.toLowerCase().includes(q);
    const matchesFav     = !SHOW_FAV_ONLY || favs.includes(card.dataset.id);
    const visible = matchesCountry && matchesSearch && matchesFav;
    card.classList.toggle('hidden', !visible);
    if (visible) visibleCount++;
  });
  let empty = document.getElementById('channel-empty');
  const grid = document.getElementById('channel-grid');
  if (visibleCount === 0) {
    if (!empty) {
      empty = document.createElement('div');
      empty.id = 'channel-empty';
      empty.className = 'empty-state';
      empty.textContent = 'No se encontraron canales con esos filtros.';
      grid.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }
}

function initChannelControls() {
  document.getElementById('channel-search')?.addEventListener('input', applyChannelFilter);
  document.getElementById('fav-toggle')?.addEventListener('click', (e) => {
    SHOW_FAV_ONLY = !SHOW_FAV_ONLY;
    e.currentTarget.classList.toggle('active', SHOW_FAV_ONLY);
    e.currentTarget.setAttribute('aria-pressed', String(SHOW_FAV_ONLY));
    applyChannelFilter();
  });
}

/* ================================================================
   BALÓN 3D — generar pentágonos + parallax con el mouse
   ================================================================ */
function initBall() {
  const wrap = document.getElementById('ball-photo-wrap');
  const hero = document.querySelector('.hero-right');
  if (!wrap || !hero) return;

  // Parallax (solo desktop) — desplazamiento máximo de 15px por eje.
  // El hover 3D (rotateY/rotateX/scale) lo maneja CSS en :hover,
  // por lo que aquí solo aplicamos traslación para no pisar esa transición.
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const MAX_PARALLAX = 15; // px

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 .. 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 .. 1
    const tx = Math.max(-MAX_PARALLAX, Math.min(MAX_PARALLAX, dx * MAX_PARALLAX));
    const ty = Math.max(-MAX_PARALLAX, Math.min(MAX_PARALLAX, dy * MAX_PARALLAX));
    wrap.style.setProperty('--parallax-x', `${tx}px`);
    wrap.style.setProperty('--parallax-y', `${ty}px`);
  });
  hero.addEventListener('mouseleave', () => {
    wrap.style.setProperty('--parallax-x', '0px');
    wrap.style.setProperty('--parallax-y', '0px');
  });
}

/* ================================================================
   PARTÍCULAS — fondo global y zona del balón
   ================================================================ */
function initParticles(canvasId, colors, density, confined) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let W,H,particles=[];
  const resize = () => {
    const parent = canvas.parentElement;
    W = canvas.width  = confined ? parent.offsetWidth  : innerWidth;
    H = canvas.height = confined ? parent.offsetHeight : innerHeight;
  };
  const init = () => {
    particles = [];
    const n = Math.max(8, Math.floor((W*H) / (confined ? 9000 : 22000)));
    for (let i=0;i<n;i++) particles.push({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
      r:Math.random()*1.6+.5, c:colors[i%colors.length]
    });
  };
  const draw = () => {
    ctx.clearRect(0,0,W,H);
    for (const p of particles) {
      p.x+=p.vx; p.y+=p.vy;
      if (p.x<0||p.x>W) p.vx*=-1;
      if (p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c; ctx.globalAlpha=.6; ctx.fill();
    }
    if (!confined) {
      ctx.globalAlpha=.08;
      for (let i=0;i<particles.length;i++)
        for (let j=i+1;j<particles.length;j++){
          const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
          if (Math.hypot(dx,dy)<95){
            ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle=particles[i].c; ctx.lineWidth=.5; ctx.stroke();
          }
        }
    }
    requestAnimationFrame(draw);
  };
  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
}

/* ================================================================
   MUNDIAL — próximos encuentros de Selección + selecciones destacadas
   ================================================================ */
function renderMundialSection() {
  const box = document.getElementById('mundial-matches');
  if (box) {
    const featured = CURRENT_MATCHES.filter(m =>
      (m.cat === 'seleccion' || m.cat === 'mundial') && m.estado !== 'done'
    );
    if (!featured.length) {
      box.innerHTML = `<div class="mundial-empty">
        Hoy no hay partidos de la Selección Colombia ni del Mundial.
        Revisa el <a href="https://www.fifa.com/es/tournaments/mens/worldcup" target="_blank" rel="noopener noreferrer">calendario oficial FIFA</a>
        o vuelve a <a href="#partidos">Partidos de Hoy</a>.
      </div>`;
    } else {
      box.innerHTML = featured.map(m => renderMatch(m)).join('');
    }
  }
}

function renderFeaturedFlags() {
  const grid = document.getElementById('flag-grid');
  if (!grid) return;
  grid.innerHTML = FEATURED_TEAMS.map(t =>
    `<span class="flag-chip" role="listitem">${t.flag} ${t.name}</span>`
  ).join('');
}

/* ================================================================
   COMPARTIR
   ================================================================ */
function initShare() {
  const shareUrl = encodeURIComponent(SITE_URL);
  const shareTxt = encodeURIComponent('⚽ Fútbol gratis y legal en Colombia y Latinoamérica 🇨🇴 Sin piratería, solo canales oficiales. KONFÍO SPORTS 👇');

  document.getElementById('s-wa')?.setAttribute('href', `https://wa.me/?text=${shareTxt}%20${shareUrl}`);
  document.getElementById('s-fb')?.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
  document.getElementById('s-tt')?.setAttribute('href', `https://www.tiktok.com/share?url=${shareUrl}&text=${shareTxt}`);
  document.getElementById('s-yt')?.setAttribute('href', `https://www.youtube.com/results?search_query=futbol+gratis+en+vivo`);

  document.getElementById('s-cp')?.addEventListener('click', () => {
    navigator.clipboard.writeText(SITE_URL).then(() => {
      document.getElementById('icon-copy').style.display  = 'none';
      document.getElementById('icon-check').style.display = 'block';
      showToast('✓ Enlace copiado');
      setTimeout(() => {
        document.getElementById('icon-copy').style.display  = 'block';
        document.getElementById('icon-check').style.display = 'none';
      }, 2500);
    }).catch(() => showToast('No se pudo copiar', 'err'));
  });

  setTimeout(() => document.getElementById('share-bar')?.classList.add('show'), 2000);
}

/* ================================================================
   CTAs → WhatsApp KONFÍO SPORTS
   ================================================================ */
function initCTA() {
  const msg = encodeURIComponent('Hola, vi KONFÍO SPORTS y quiero una tarjeta digital como esa');
  const url = `https://wa.me/${WA_NUM}?text=${msg}`;
  document.getElementById('nav-cta')?.setAttribute('href', url);
  document.getElementById('footer-cta')?.setAttribute('href', url);
}

/* ================================================================
   COMUNIDAD — canal de WhatsApp (sin Telegram)
   ================================================================ */
function initCommunity() {
  const msg = encodeURIComponent('Hola, quiero unirme a la comunidad de KONFÍO SPORTS para recibir avisos de partidos');
  document.getElementById('community-wa')?.setAttribute('href', `https://wa.me/${WA_NUM}?text=${msg}`);
}

/* ================================================================
   NAV — resaltar sección activa al hacer scroll
   ================================================================ */
function initNavScrollSpy() {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => obs.observe(s));
}

/* ================================================================
   INIT
   ================================================================ */
window.reloadMatches = reloadMatches;

document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initPWA();
  renderCategories();
  renderQuickCats();
  renderCountryTabs();
  renderChannels();
  renderHistory();
  initChannelControls();
  initBall();
  initParticles('fx', ['#FF8C00','#2ECC71','#00FF88','#FFA726'], 1, false);
  initParticles('hero-fx', ['#FF8C00','#FFA726','#00FF88','#2ECC71'], 1, true);
  initShare();
  initCTA();
  initCommunity();
  initNavScrollSpy();
  reloadMatches();

  document.getElementById('btn-reload')?.addEventListener('click', reloadMatches);
});
