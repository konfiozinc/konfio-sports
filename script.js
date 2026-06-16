/* ================================================================
   KONFÍO SPORTS — script.js (v10)
   Centro informativo del Mundial FIFA 2026 (Canadá·México·EE.UU.)
   100% datos verificados — sorteo oficial 5/dic/2025 + calendario FIFA.
   Sin partidos, marcadores ni calendarios inventados.
   ================================================================ */

'use strict';

/* ── CONFIGURACIÓN ──────────────────────────────────────────────── */
const SITE_URL = 'https://konfiozinc.github.io/konfio-sports/';
const WA_NUM   = '573117811684';

/* ================================================================
   GRUPOS DEL MUNDIAL 2026 — sorteo oficial 5/dic/2025 (Washington D.C.)
   + repesca intercontinental 31/mar/2026. Fuente: FIFA / UEFA.
   Composición fija — no cambia durante el torneo.
   ================================================================ */
const WORLD_CUP_GROUPS = {
  A: ['🇲🇽 México','🇿🇦 Sudáfrica','🇰🇷 Corea del Sur','🇨🇿 Chequia'],
  B: ['🇨🇦 Canadá','🇶🇦 Catar','🇨🇭 Suiza','🇧🇦 Bosnia y Herzegovina'],
  C: ['🇧🇷 Brasil','🇲🇦 Marruecos','🇭🇹 Haití','🏴 Escocia'],
  D: ['🇺🇸 Estados Unidos','🇵🇾 Paraguay','🇦🇺 Australia','🇹🇷 Turquía'],
  E: ['🇩🇪 Alemania','🇨🇼 Curazao','🇨🇮 Costa de Marfil','🇪🇨 Ecuador'],
  F: ['🇳🇱 Países Bajos','🇯🇵 Japón','🇸🇪 Suecia','🇹🇳 Túnez'],
  G: ['🇧🇪 Bélgica','🇪🇬 Egipto','🇮🇷 Irán','🇳🇿 Nueva Zelanda'],
  H: ['🇪🇸 España','🇺🇾 Uruguay','🇸🇦 Arabia Saudita','🇨🇻 Cabo Verde'],
  I: ['🇫🇷 Francia','🇸🇳 Senegal','🇳🇴 Noruega','🇮🇶 Irak'],
  J: ['🇦🇷 Argentina','🇦🇹 Austria','🇩🇿 Argelia','🇯🇴 Jordania'],
  K: ['🇨🇴 Colombia','🇵🇹 Portugal','🇺🇿 Uzbekistán','🇨🇩 RD Congo'],
  L: ['🏴 Inglaterra','🇭🇷 Croacia','🇬🇭 Ghana','🇵🇦 Panamá'],
};
const COLOMBIA_GROUP = 'K';

/* ================================================================
   CALENDARIO OFICIAL — SELECCIÓN COLOMBIA, FASE DE GRUPOS
   Fuente: FIFA / Canal Trece / Señal Colombia (hora Colombia, UTC-5).
   Solo se incluyen fecha/hora cuando están confirmadas oficialmente.
   ================================================================ */
const COLOMBIA_MATCHES = [
  {
    jornada: 'Jornada 1 · Grupo K',
    rival: 'Uzbekistán', flagRival: '🇺🇿',
    fecha: '2026-06-17', hora: '21:00',
    horaConfirmada: true,
    sede: 'Estadio Banorte (Azteca) · Ciudad de México',
  },
  {
    jornada: 'Jornada 2 · Grupo K',
    rival: 'RD Congo', flagRival: '🇨🇩',
    fecha: '2026-06-23', hora: '12:00',
    horaConfirmada: true,
    sede: 'Estadio Akron · Guadalajara',
  },
  {
    jornada: 'Jornada 3 · Grupo K',
    rival: 'Portugal', flagRival: '🇵🇹',
    fecha: '2026-06-27', hora: '18:30',
    horaConfirmada: true,
    sede: 'Hard Rock Stadium · Miami',
  },
];

/* ================================================================
   SELECCIONES DESTACADAS — protagonistas habituales del torneo
   ================================================================ */
const FEATURED_TEAMS = [
  { flag:'🇨🇴', name:'Colombia · Grupo K' },
  { flag:'🇦🇷', name:'Argentina · Grupo J' },
  { flag:'🇧🇷', name:'Brasil · Grupo C' },
  { flag:'🇪🇸', name:'España · Grupo H' },
  { flag:'🇫🇷', name:'Francia · Grupo I' },
  { flag:'🇩🇪', name:'Alemania · Grupo E' },
  { flag:'🇵🇹', name:'Portugal · Grupo K' },
  { flag:'🏴', name:'Inglaterra · Grupo L' },
  { flag:'🇺🇾', name:'Uruguay · Grupo H' },
  { flag:'🇲🇽', name:'México · Grupo A' },
];

/* ================================================================
   CANALES OFICIALES — SOLO GRATUITOS, LEGALES, SIN SUSCRIPCIÓN
   Cobertura: Colombia, Latinoamérica y España.
   ================================================================ */
const CHANNELS = [
  // Colombia
  { id:'caracol', name:'Gol Caracol', tag:'Oficial · Colombia', url:'https://www.caracoltv.com/senal-vivo', color:'#003082', init:'C' },
  { id:'rcn',     name:'RCN',         tag:'Oficial · Colombia', url:'https://www.canalrcn.com', color:'#E30613', init:'R' },
  // Global
  { id:'fifa',    name:'FIFA+',       tag:'Oficial · Global',   url:'https://www.fifa.com/fifaplus', color:'#326295', init:'F' },
  { id:'pluto',   name:'Pluto TV Deportes', tag:'Streaming gratuito', url:'https://pluto.tv/es/live-tv/pluto-tv-deportes', color:'#6A1B9A', init:'P' },
  { id:'claro',   name:'Claro Sports', tag:'Streaming gratuito', url:'https://www.clarosports.com', color:'#1E88E5', init:'C' },
  // España
  { id:'rtve',    name:'RTVE Deportes', tag:'Oficial · España',  url:'https://www.rtve.es/deportes/', color:'#C62828', init:'R' },
  // México
  { id:'canal5',  name:'Canal 5 (Televisa)', tag:'Oficial · México', url:'https://www.televisa.com/envivo/canal5', color:'#F57C00', init:'5' },
  // Argentina
  { id:'telefe',  name:'Telefe',       tag:'Oficial · Argentina', url:'https://telefe.com/en-vivo/', color:'#1A237E', init:'T' },
  // Chile
  { id:'canal13', name:'Canal 13',     tag:'Oficial · Chile',   url:'https://www.13.cl/en-vivo', color:'#D32F2F', init:'13' },
];

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
function nowCOL() {
  return new Date(new Date().toLocaleString('en-US', { timeZone:'America/Bogota' }));
}
function teamInitials(name) {
  return (name || '?').replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g,'').trim().substring(0,2).toUpperCase();
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
   GRUPOS DEL MUNDIAL — grid de 12 + tira rápida en el hero
   ================================================================ */
function renderGroups() {
  const grid = document.getElementById('groups-grid');
  if (!grid) return;
  grid.innerHTML = Object.entries(WORLD_CUP_GROUPS).map(([letter, teams]) => {
    const isColombia = letter === COLOMBIA_GROUP;
    return `
    <div class="cat-card ${isColombia ? 'cat-card-co' : ''}" role="listitem"
         ${isColombia ? 'style="border-color:rgba(0,255,136,.4)"' : ''}>
      <div class="cat-ic" aria-hidden="true" style="font-family:'Cinzel',serif;font-weight:900;font-size:1.1rem;color:${isColombia ? 'var(--green2)' : 'var(--orange2)'}">
        ${letter}
      </div>
      <span>${teams.join('<br>')}</span>
    </div>`;
  }).join('');
}

function renderQuickCats() {
  const wrap = document.getElementById('quick-cats');
  if (!wrap) return;
  wrap.innerHTML = Object.keys(WORLD_CUP_GROUPS).map(letter => {
    const isColombia = letter === COLOMBIA_GROUP;
    return `<button class="qc-chip" type="button" data-group="${letter}" role="listitem"
            aria-label="Grupo ${letter}${isColombia ? ' — Colombia' : ''}"
            ${isColombia ? 'style="border-color:rgba(0,255,136,.4);color:var(--green2)"' : ''}>
      Grupo ${letter}${isColombia ? ' 🇨🇴' : ''}
    </button>`;
  }).join('');
  wrap.querySelectorAll('.qc-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('grupos')?.scrollIntoView({ behavior:'smooth' });
    });
  });
}

/* ================================================================
   SELECCIÓN COLOMBIA — calendario real + rivales del Grupo K
   ================================================================ */
function renderColombiaMatches() {
  const box = document.getElementById('colombia-matches');
  if (!box) return;
  const now = nowCOL();

  box.innerHTML = COLOMBIA_MATCHES.map(m => {
    const matchDate = new Date(`${m.fecha}T${m.hora || '00:00'}:00-05:00`);
    let estado, estadoLabel;
    if (m.horaConfirmada) {
      if (now < matchDate)                     { estado = 'next'; estadoLabel = 'Próximo'; }
      else if (now - matchDate < 2*3600*1000)  { estado = 'live'; estadoLabel = 'En curso'; }
      else                                       { estado = 'done'; estadoLabel = 'Jugado'; }
    } else {
      estado = 'next'; estadoLabel = 'Próximo';
    }
    const fechaFmt = new Date(`${m.fecha}T12:00:00-05:00`).toLocaleDateString('es-CO', { day:'2-digit', month:'short', timeZone:'America/Bogota' });
    const horaTxt = m.horaConfirmada ? `${m.hora} COL` : 'hora por confirmar';

    return `
    <div class="match" role="listitem" aria-label="Colombia vs ${m.rival}, ${m.jornada}">
      <div class="match-time" aria-label="${fechaFmt}, ${horaTxt}">
        ${fechaFmt}<span class="tz">${horaTxt}</span>
      </div>
      <div class="match-crests" aria-hidden="true">
        <div class="crest" title="Colombia">CO</div>
        <span class="crest-vs">vs</span>
        <div class="crest" title="${m.rival}">${teamInitials(m.rival)}</div>
      </div>
      <div class="match-info">
        <strong>Colombia ${m.flagRival} vs ${m.rival}</strong>
        <small>${m.jornada} · ${m.sede}</small>
      </div>
      <div class="match-meta">
        <span class="match-where">FIFA 2026</span>
        <span class="match-status ${estado}">${estadoLabel}</span>
      </div>
    </div>`;
  }).join('');
}

function renderGrupoKFlags() {
  const grid = document.getElementById('grupo-k-flags');
  if (!grid) return;
  grid.innerHTML = WORLD_CUP_GROUPS[COLOMBIA_GROUP].map(t =>
    `<span class="flag-chip" role="listitem">${t}</span>`
  ).join('');
}

function renderFeaturedFlags() {
  const grid = document.getElementById('featured-flags');
  if (!grid) return;
  grid.innerHTML = FEATURED_TEAMS.map(t =>
    `<span class="flag-chip" role="listitem">${t.flag} ${t.name}</span>`
  ).join('');
}

/* ================================================================
   COUNTDOWN — próximo partido CONFIRMADO de Colombia.
   Si no hay ningún partido con fecha/hora confirmada por venir,
   se muestra el mensaje "Consulta el calendario oficial FIFA".
   ================================================================ */
let countdownInterval = null;
function getNextColombiaMatch() {
  const now = nowCOL();
  const upcoming = COLOMBIA_MATCHES
    .filter(m => m.horaConfirmada)
    .map(m => ({ ...m, dt: new Date(`${m.fecha}T${m.hora}:00-05:00`) }))
    .filter(m => m.dt > now)
    .sort((a,b) => a.dt - b.dt);
  return upcoming[0] || null;
}

function updateCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  const next = getNextColombiaMatch();
  const crestsEl = document.getElementById('countdown-crests');
  const textEl   = document.getElementById('countdown-text');

  if (!next) {
    if (crestsEl) crestsEl.innerHTML = '';
    if (textEl) {
      textEl.innerHTML = `<b>Consulta el calendario oficial FIFA</b>
        <small><a href="https://www.fifa.com/es/tournaments/mens/worldcup/canadamexicousa2026/articles/calendario-fixture-mundial-2026-partidos-fechas" target="_blank" rel="noopener noreferrer" style="color:var(--green2)">fifa.com/calendario →</a></small>`;
    }
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
      const el = document.getElementById(id); if (el) el.textContent = '--';
    });
    return;
  }

  if (crestsEl) {
    crestsEl.innerHTML = `
      <div class="crest" title="Colombia">CO</div>
      <span class="crest-vs">vs</span>
      <div class="crest" title="${next.rival}">${teamInitials(next.rival)}</div>`;
  }
  if (textEl) {
    textEl.innerHTML = `<b>Colombia ${next.flagRival} vs ${next.rival}</b><small>${next.jornada} · ${next.sede} · ${next.hora} COL</small>`;
  }

  const tick = () => {
    const now = nowCOL();
    let diff = next.dt.getTime() - now.getTime();
    if (diff < 0) diff = 0;
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = String(val).padStart(2,'0'); };
    set('cd-days', days); set('cd-hours', hours); set('cd-mins', mins); set('cd-secs', secs);
    if (diff <= 0) { clearInterval(countdownInterval); updateCountdown(); }
  };
  tick();
  countdownInterval = setInterval(tick, 1000);
}

/* ================================================================
   CANALES — renderiza la lista de canales (nueva versión con más canales)
   ================================================================ */
function renderChannels() {
  const grid = document.getElementById('channel-grid');
  if (!grid) return;
  grid.innerHTML = CHANNELS.map(ch => `
    <div class="channel-card" role="listitem">
      <div class="channel-top">
        <div class="channel-logo" style="background:${ch.color}">${ch.init}</div>
        <div class="channel-name">
          <strong>${ch.name}</strong>
          <small>${ch.tag}</small>
        </div>
      </div>
      <div class="channel-actions">
        <a class="btn-channel" href="${ch.url}" target="_blank" rel="noopener noreferrer">Ver canal →</a>
      </div>
    </div>`).join('');
}

/* ================================================================
   BALÓN 3D — parallax (máx 15px por eje)
   ================================================================ */
function initBall() {
  const wrap = document.getElementById('ball-photo-wrap');
  const hero = document.querySelector('.hero-right');
  if (!wrap || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const MAX_PARALLAX = 15;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
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
   PARTÍCULAS
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
   COMPARTIR
   ================================================================ */
function initShare() {
  const shareUrl = encodeURIComponent(SITE_URL);
  const shareTxt = encodeURIComponent('🏆 Mundial FIFA 2026: grupos, calendario y Selección Colombia, todo verificado. KONFÍO SPORTS 👇');

  document.getElementById('s-wa')?.setAttribute('href', `https://wa.me/?text=${shareTxt}%20${shareUrl}`);
  document.getElementById('s-fb')?.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
  document.getElementById('s-tt')?.setAttribute('href', `https://www.tiktok.com/share?url=${shareUrl}&text=${shareTxt}`);
  document.getElementById('s-yt')?.setAttribute('href', `https://www.youtube.com/results?search_query=mundial+fifa+2026+colombia`);

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
   CTA → WhatsApp KONFÍO SPORTS
   ================================================================ */
function initCTA() {
  const msg = encodeURIComponent('Hola, vi KONFÍO SPORTS y quiero una tarjeta digital como esa');
  const url = `https://wa.me/${WA_NUM}?text=${msg}`;
  document.getElementById('nav-cta')?.setAttribute('href', url);
  document.getElementById('footer-cta')?.setAttribute('href', url);
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
document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initPWA();
  renderGroups();
  renderQuickCats();
  renderColombiaMatches();
  renderGrupoKFlags();
  renderFeaturedFlags();
  renderChannels();
  updateCountdown();
  initBall();
  initParticles('fx', ['#FF8C00','#2ECC71','#00FF88','#FFA726'], 1, false);
  initParticles('hero-fx', ['#FF8C00','#FFA726','#00FF88','#2ECC71'], 1, true);
  initShare();
  initCTA();
  initNavScrollSpy();
});
