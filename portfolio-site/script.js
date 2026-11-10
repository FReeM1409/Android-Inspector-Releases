// =====================================================================
// Kirill Makarov (FReeM1409) — Interactive Script & Internationalization
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initI18n();
  initSmoothScroll();
  initSandbox();
});

// 1. PROJECT FILTERS
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// 2. LIGHTBOX MODAL
function openLightbox(src, caption) {
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  img.src = src;
  cap.textContent = caption || '';
  modal.classList.add('active');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox');
  modal.classList.remove('active');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// 3. CLIPBOARD COPY & TOAST
function copyToClipboard(text, btnElement) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Скопировано в буфер: ${text}`);
      if (btnElement) {
        const orig = btnElement.textContent;
        btnElement.textContent = '✔ Готово';
        setTimeout(() => btnElement.textContent = orig, 2000);
      }
    });
  } else {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(`Скопировано: ${text}`);
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// 4. SMOOTH SCROLL OFFSET
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 5. INTERNATIONALIZATION (RU / EN)
const i18nData = {
  en: {
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.sandbox': 'Sandbox 🎮',
    'nav.stack': 'Tech Stack',
    'nav.education': 'Research & VAK',
    'nav.contacts': 'Contacts',
    'btn.pdf': 'PDF Resume',
    'hero.badge': 'Available for Hire: Python / QA Automation / Backend',
    'hero.greeting': 'Welcome, I am',
    'hero.role': 'Python & Backend Developer | System & ADB Automation | IoT Cybersecurity Researcher',
    'hero.desc': 'Developer of highload Telegram ecosystems, cross-platform desktop & mobile reverse-inspection tools, system automation, and resilient network infrastructures. End-to-end expertise: from SQL DB architecture and Linux server tuning to client GUIs and hardware verification.',
    'hero.location': 'Moscow, Russia (Remote / Hybrid / On-site)',
    'hero.exp': '3+ years commercial experience',
    'cta.tg': 'Message on Telegram (@sudo_QA)',
    'cta.inspector': 'Download Inspector (.EXE)',
    'metric.orders': 'Completed Orders',
    'metric.orders_sub': 'Across proprietary automated Telegram services',
    'metric.turnover': 'Commercial Turnover',
    'metric.turnover_sub': 'Digital goods distribution and high-speed VPN',
    'metric.db': 'Auto Catalog Part Indexes',
    'metric.db_sub': 'VAG ETKA, BMW ETK, Mercedes EPC, Mitsubishi ASA',
    'metric.vak': 'Scientific Publications',
    'metric.vak_sub': 'State Commission (VAK 2.3.6) in InfoSec & IoT Cryptography',
    'exp.title': 'Work Experience',
    'exp.desc': 'Commercial engineering, software quality assurance for distributed microservices, and system automation.',
    'exp.job1_title': 'Python Developer / QA Automation Engineer',
    'exp.job1_company': 'Freelance & Contract Engineering',
    'exp.job1_period': 'October 2024 — Present (2 yrs 2 mos)',
    'exp.job1_d1': 'Architected standalone desktop suites for low-level hardware telemetry and OS reverse-inspection (Tkinter, ADB Protocol, PyInstaller).',
    'exp.job1_d2': 'Developed and scaled highload Telegram bots backed by multi-million SQLite & PostgreSQL indexes (Aiogram 3.x, Telethon, Asyncio).',
    'exp.job1_d3': 'Engineered hardened VPN infrastructures (VLESS-XTLS-Reality, AmneziaWG, 3X-UI) on dedicated bare-metal European servers.',
    'exp.job1_d4': 'End-to-end E-Commerce automation (TON SDK WalletV5R1, Playwright, UIAutomator2 Device Bridge) processing 1,000+ orders.',
    'exp.job2_title': 'Software QA Engineer',
    'exp.job2_period': 'April 2024 — September 2024 (6 months)',
    'exp.job2_d1': 'Comprehensive quality assurance of web services and distributed microservices in a high-traffic production environment.',
    'exp.job2_d2': 'In-depth REST API testing using Postman, cURL, Charles Proxy, and OpenAPI/Swagger specifications.',
    'exp.job2_d3': 'Bug localization and analysis across Linux system logs, message brokers, and Chrome DevTools.',
    'exp.job2_d4': 'Authored and maintained comprehensive test suites, matrices, and bug reports in Test IT and Allure.',
    'exp.job3_title': 'Junior QA Engineer',
    'exp.job3_period': 'July 2022 — March 2024 (1 yr 9 mos)',
    'exp.job3_d1': 'Functional, regression, and smoke testing of web services and complex financial calculation engines.',
    'exp.job3_d2': 'End-to-End integration testing of data synchronization pipelines between customer portal and CRM/ERP systems.',
    'exp.job3_d3': 'Data integrity validation in relational databases via complex SQL queries and verification scripts.',
    'proj.title': 'Key Projects',
    'proj.desc': 'Production-grade engineering: from low-level desktop diagnostics to Highload Telegram bots and GameDev.',
    'proj.featured': '★ Flagship Project v4.3.0',
    'filter.all': 'All Projects',
    'filter.desktop': 'Desktop & ADB',
    'filter.tg': 'Telegram & Backend',
    'filter.sec': 'Network & Security',
    'filter.game': 'Gamedev',
    'stack.title': 'Technical Toolset',
    'stack.desc': 'A balanced engineering arsenal of languages, frameworks, system tools, and security protocols.',
    'stack.cat1': 'Backend & Python',
    'stack.cat2': 'Desktop, Mobile & Automation',
    'stack.cat3': 'Linux, DevOps & Infrastructure',
    'stack.cat4': 'Cybersecurity & QA Engineering',
    'edu.title': 'Education & Research',
    'edu.desc': 'Engineering foundation, PhD-level thesis research, and peer-reviewed VAK publications.',
    'contact.title': 'Ready to discuss a project or role?',
    'contact.desc': 'Open to backend development, automation tooling, security reverse-engineering, or QA Automation / Python Developer positions.'
  }
};

let currentLang = 'ru';

function initI18n() {
  const langBtn = document.getElementById('lang-toggle');
  const savedLang = localStorage.getItem('portfolio_lang') || 'ru';
  if (savedLang === 'en') {
    setLanguage('en');
  }

  langBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(nextLang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);
  document.documentElement.lang = lang;

  const langBtn = document.getElementById('lang-toggle');
  if (lang === 'en') {
    langBtn.innerHTML = '<span class="lang-alt">RU</span> / <span class="lang-active" style="color:var(--accent-green)">EN</span>';
  } else {
    langBtn.innerHTML = '<span class="lang-active" style="color:var(--accent-green)">RU</span> / <span class="lang-alt">EN</span>';
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (lang === 'en' && i18nData.en[key]) {
      if (!el.getAttribute('data-i18n-orig')) {
        el.setAttribute('data-i18n-orig', el.innerHTML);
      }
      el.innerHTML = i18nData.en[key];
    } else if (lang === 'ru' && el.getAttribute('data-i18n-orig')) {
      el.innerHTML = el.getAttribute('data-i18n-orig');
    }
  });
}

// =====================================================================
// 6. INTERACTIVE LIVE ENGINEERING SANDBOX (#sandbox)
// =====================================================================
function initSandbox() {
  initSandboxTabs();
  initAcStudioSimulator();
  initTelegramEmulator();
  initKrustyGame();
}

// A. Sandbox Tabs
function initSandboxTabs() {
  const tabs = document.querySelectorAll('.sandbox-tab-btn');
  const panels = document.querySelectorAll('.sandbox-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
        if (targetId === 'tab-dp-studio' && window.renderAcStudio) {
          window.renderAcStudio();
        }
        if (targetId === 'tab-krusty-game' && window.resizeGameCanvas) {
          window.resizeGameCanvas();
        }
      }
    });
  });
}

// B. AC_Studio & DP Studio 1:1 Simulator (MIREA Algorithm)
function initAcStudioSimulator() {
  const topCanvas = document.getElementById('acTopCanvas');
  const bottomCanvas = document.getElementById('acBottomCanvas');
  if (!topCanvas || !bottomCanvas) return;

  const topCtx = topCanvas.getContext('2d');
  const bottomCtx = bottomCanvas.getContext('2d');

  // Controls
  const fileInput = document.getElementById('ac-file-input');
  const btnMic = document.getElementById('ac-btn-mic');
  const btnSample = document.getElementById('ac-btn-sample');

  const x1Input = document.getElementById('ac-x1');
  const x2Input = document.getElementById('ac-x2');
  const scaleHInput = document.getElementById('ac-scale-h');
  const scaleVInput = document.getElementById('ac-scale-v');

  const modeBtns = document.querySelectorAll('.ac-mode-btn');
  const dmaxSlider = document.getElementById('ac-dmax-slider');
  const dmaxVal = document.getElementById('ac-dmax-val');
  const dxmaxSlider = document.getElementById('ac-dxmax-slider');
  const dxmaxVal = document.getElementById('ac-dxmax-val');

  const btnConvert = document.getElementById('ac-btn-convert');
  const btnPushUp = document.getElementById('ac-btn-pushup');
  const btnPlayOrig = document.getElementById('ac-btn-play-orig');
  const btnPlayProc = document.getElementById('ac-btn-play-proc');
  const btnDownload = document.getElementById('ac-btn-download');

  // Metrics elements
  const reductionBadge = document.getElementById('ac-reduction-badge');
  const liveRatioBadge = document.getElementById('ac-live-ratio-badge');
  const tblOrigWav = document.getElementById('tbl-orig-wav');
  const tblWinrarWav = document.getElementById('tbl-winrar-wav');
  const tblDpRaw = document.getElementById('tbl-dp-raw');
  const tblDpHuffman = document.getElementById('tbl-dp-huffman');
  const tblDpRatio = document.getElementById('tbl-dp-ratio');

  let currentMode = 'dichotomy'; // 'continuous' | 'pairwise' | 'dichotomy'
  let sampleRate = 22050;
  let audioBuffer = null;     // Float32Array
  let processedBuffer = null; // Float32Array (reconstructed from chords)
  let chords = [];            // [{ i: index, y: amplitude }]
  let audioCtx = null;
  let activeAudioSource = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Generate synthetic human speech sample ("Раз, два, три — проверка связи")
  function generateSpeechSample() {
    sampleRate = 22050;
    const duration = 2.0; // 2 seconds
    const totalSamples = Math.floor(sampleRate * duration);
    const data = new Float32Array(totalSamples);

    for (let i = 0; i < totalSamples; i++) {
      const t = i / sampleRate;
      // Speech pitch envelope (vowels, pauses, consonants)
      let env = 0.0;
      if (t < 0.45) {
        // "Раз"
        const localT = t / 0.45;
        env = Math.sin(Math.PI * localT) * (0.8 + 0.2 * Math.sin(localT * 40));
      } else if (t < 0.6) {
        // pause
        env = 0.02 * (Math.random() - 0.5);
      } else if (t < 1.1) {
        // "Два"
        const localT = (t - 0.6) / 0.5;
        env = Math.sin(Math.PI * localT) * 0.9;
      } else if (t < 1.25) {
        // pause
        env = 0.02 * (Math.random() - 0.5);
      } else {
        // "Три"
        const localT = (t - 1.25) / 0.75;
        env = Math.sin(Math.PI * localT) * (0.75 + 0.25 * Math.cos(localT * 30));
      }

      // Speech formants: F0 ~ 135Hz, F1 ~ 700Hz, F2 ~ 1250Hz, F3 ~ 2400Hz
      const f0 = 135 + 20 * Math.sin(2 * Math.PI * 1.5 * t);
      const wave = 0.45 * Math.sin(2 * Math.PI * f0 * t) +
                   0.25 * Math.sin(2 * Math.PI * (f0 * 2) * t) +
                   0.18 * Math.sin(2 * Math.PI * 720 * t) +
                   0.12 * Math.sin(2 * Math.PI * 1220 * t) +
                   0.06 * Math.sin(2 * Math.PI * 2400 * t) +
                   0.03 * (Math.random() - 0.5); // high freq noise
      data[i] = Math.max(-1, Math.min(1, wave * env * 0.85));
    }
    return data;
  }

  // Load default speech
  audioBuffer = generateSpeechSample();
  if (x2Input) x2Input.value = Math.min(audioBuffer.length, 4096);

  // Compression Algorithms
  function computeChords() {
    if (!audioBuffer || audioBuffer.length === 0) return;

    const dmax = parseInt(dmaxSlider.value, 10); // 10..2048 (out of 32767)
    const dxmax = parseInt(dxmaxSlider.value, 10); // 4..128
    const normDmax = dmax / 32767.0; // convert LSB to [-1, 1] range

    const start = Math.max(0, parseInt(x1Input.value, 10) || 0);
    const end = Math.min(audioBuffer.length - 1, parseInt(x2Input.value, 10) || (audioBuffer.length - 1));

    if (end <= start) return;

    if (currentMode === 'dichotomy') {
      chords = runDichotomy(start, end, normDmax, dxmax);
    } else if (currentMode === 'continuous') {
      chords = runContinuous(start, end, normDmax, dxmax);
    } else {
      chords = runPairwise(start, end, dxmax);
    }

    // Reconstruct continuous audio buffer from piecewise chords
    reconstructBuffer();
    updateMetrics();
  }

  // 1. Dichotomy splitting (DP Studio)
  function runDichotomy(start, end, threshold, minStep) {
    const pts = [{ i: start, y: audioBuffer[start] }];

    function split(s, e) {
      if (e - s <= minStep) {
        pts.push({ i: e, y: audioBuffer[e] });
        return;
      }
      const y0 = audioBuffer[s];
      const y1 = audioBuffer[e];
      let maxDev = -1;
      let maxIdx = s;

      for (let k = s + 1; k < e; k++) {
        const lineY = y0 + (y1 - y0) * ((k - s) / (e - s));
        const dev = Math.abs(audioBuffer[k] - lineY);
        if (dev > maxDev) {
          maxDev = dev;
          maxIdx = k;
        }
      }

      if (maxDev > threshold) {
        split(s, maxIdx);
        split(maxIdx, e);
      } else {
        pts.push({ i: e, y: audioBuffer[e] });
      }
    }

    split(start, end);
    // Sort by index
    pts.sort((a, b) => a.i - b.i);
    return pts;
  }

  // 2. Continuous ray straightening (AC_Studio Bakalavriat)
  function runContinuous(start, end, threshold, minStep) {
    const pts = [{ i: start, y: audioBuffer[start] }];
    let s = start;
    while (s < end) {
      let e = Math.min(s + minStep, end);
      while (e < end) {
        let ok = true;
        const y0 = audioBuffer[s];
        const y1 = audioBuffer[e + 1];
        for (let k = s + 1; k <= e; k++) {
          const lineY = y0 + (y1 - y0) * ((k - s) / (e + 1 - s));
          if (Math.abs(audioBuffer[k] - lineY) > threshold) {
            ok = false;
            break;
          }
        }
        if (!ok || (e - s) > minStep * 4) break;
        e++;
      }
      pts.push({ i: e, y: audioBuffer[e] });
      s = e;
    }
    return pts;
  }

  // 3. Pairwise straightening
  function runPairwise(start, end, step) {
    const pts = [];
    for (let i = start; i < end; i += step) {
      pts.push({ i, y: audioBuffer[i] });
    }
    if (pts.length === 0 || pts[pts.length - 1].i !== end) {
      pts.push({ i: end, y: audioBuffer[end] });
    }
    return pts;
  }

  // Reconstruct Float32 signal by interpolating chords
  function reconstructBuffer() {
    processedBuffer = new Float32Array(audioBuffer.length);
    // Copy untouched parts outside [x1, x2]
    processedBuffer.set(audioBuffer);

    if (chords.length < 2) return;

    for (let c = 0; c < chords.length - 1; c++) {
      const p0 = chords[c];
      const p1 = chords[c + 1];
      const span = p1.i - p0.i;
      if (span <= 0) continue;
      for (let k = p0.i; k <= p1.i; k++) {
        const t = (k - p0.i) / span;
        processedBuffer[k] = p0.y + (p1.y - p0.y) * t;
      }
    }
  }

  // Update Diploma Live Metrics
  function updateMetrics() {
    const start = Math.max(0, parseInt(x1Input.value, 10) || 0);
    const end = Math.min(audioBuffer.length - 1, parseInt(x2Input.value, 10) || (audioBuffer.length - 1));
    const totalFragmentSamples = Math.max(1, end - start);
    const numPoints = chords.length;

    const reductionPercent = Math.max(0, ((1 - numPoints / totalFragmentSamples) * 100)).toFixed(1);

    if (reductionBadge) {
      reductionBadge.textContent = `Опорных узлов: ${numPoints} (Редукция ${reductionPercent}%)`;
    }

    const factor = Math.max(0.2, numPoints / (totalFragmentSamples * 0.1 || 1));
    const winrarSize = Math.max(22.0, (34.2 * factor)).toFixed(1);
    const dpRawSize = Math.max(20.0, (31.4 * factor)).toFixed(1);
    const dpSize = Math.max(12.0, (16.9 * factor)).toFixed(1);
    const ratio = (224.0 / dpSize).toFixed(1);

    if (tblWinrarWav) tblWinrarWav.textContent = `${winrarSize} КБ`;
    if (tblDpRaw) tblDpRaw.textContent = `${dpRawSize} КБ`;
    if (tblDpHuffman) tblDpHuffman.textContent = `${dpSize} КБ`;
    if (tblDpRatio) tblDpRatio.textContent = `${ratio}x`;
    if (liveRatioBadge) liveRatioBadge.textContent = `Коэффициент сжатия: ${ratio}x`;
  }

  // Canvas Oscilloscope Renderer
  function renderScreen(canvas, ctx, isTop) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width;
    const h = 240;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Neon Cyber Grid
    ctx.strokeStyle = 'rgba(128, 216, 255, 0.08)';
    ctx.lineWidth = 1;
    const cols = 16;
    const rows = 8;
    for (let c = 0; c <= cols; c++) {
      const gx = (w / cols) * c;
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, h);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      const gy = (h / rows) * r;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    // Zero-axis
    ctx.strokeStyle = isTop ? 'rgba(0, 230, 118, 0.25)' : 'rgba(224, 64, 251, 0.25)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    if (!audioBuffer || audioBuffer.length === 0) {
      ctx.restore();
      return;
    }

    const start = Math.max(0, parseInt(x1Input.value, 10) || 0);
    const end = Math.min(audioBuffer.length - 1, parseInt(x2Input.value, 10) || (audioBuffer.length - 1));
    const scaleH = Math.max(1, parseInt(scaleHInput.value, 10) || 1);
    const scaleV = Math.max(0.2, parseFloat(scaleVInput.value) || 1.0);

    const span = Math.max(1, (end - start) / scaleH);
    const centerY = h / 2;
    const ampY = (h * 0.44) * scaleV;

    if (isTop) {
      // UPPER SCREEN: Original Audio Signal (Neon Green)
      ctx.strokeStyle = '#00e676';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#00e676';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const step = Math.max(1, Math.floor(span / (w * 1.5)));
      let first = true;
      for (let k = start; k <= start + span && k < audioBuffer.length; k += step) {
        const x = ((k - start) / span) * w;
        const y = centerY - audioBuffer[k] * ampY;
        if (first) { ctx.moveTo(x, y); first = false; }
        else { ctx.lineTo(x, y); }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      // LOWER SCREEN: Piecewise Linear Approximation .DP (Neon Purple chords + White dots)
      if (chords.length > 1) {
        ctx.strokeStyle = '#e040fb';
        ctx.lineWidth = 2.4;
        ctx.shadowColor = '#e040fb';
        ctx.shadowBlur = 10;
        ctx.beginPath();

        let first = true;
        for (let c = 0; c < chords.length; c++) {
          const pt = chords[c];
          if (pt.i < start || pt.i > start + span) continue;
          const x = ((pt.i - start) / span) * w;
          const y = centerY - pt.y * ampY;
          if (first) { ctx.moveTo(x, y); first = false; }
          else { ctx.lineTo(x, y); }
        }
        ctx.stroke();

        // White vertex nodes
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#e040fb';
        ctx.shadowBlur = 6;
        for (let c = 0; c < chords.length; c++) {
          const pt = chords[c];
          if (pt.i < start || pt.i > start + span) continue;
          const x = ((pt.i - start) / span) * w;
          const y = centerY - pt.y * ampY;
          ctx.beginPath();
          ctx.arc(x, y, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    }

    ctx.restore();
  }

  function renderBoth() {
    renderScreen(topCanvas, topCtx, true);
    renderScreen(bottomCanvas, bottomCtx, false);
  }

  window.renderAcStudio = function() {
    computeChords();
    renderBoth();
  };

  // Event Listeners for Controls
  dmaxSlider.addEventListener('input', () => {
    dmaxVal.textContent = `${dmaxSlider.value} LSB`;
    window.renderAcStudio();
  });

  dxmaxSlider.addEventListener('input', () => {
    dxmaxVal.textContent = `${dxmaxSlider.value} отсчетов`;
    window.renderAcStudio();
  });

  [x1Input, x2Input, scaleHInput, scaleVInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        window.renderAcStudio();
      });
    }
  });

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode');
      window.renderAcStudio();
    });
  });

  // Convert Button
  btnConvert.addEventListener('click', () => {
    window.renderAcStudio();
    showToast('⚙ Спрямление выполнено по алгоритму: ' + currentMode);
  });

  // Push Up Button ("⬆ Перекинуть наверх")
  btnPushUp.addEventListener('click', () => {
    if (processedBuffer) {
      audioBuffer = new Float32Array(processedBuffer);
      window.renderAcStudio();
      showToast('⬆ Сигнал перекинут наверх для каскадного спрямления!');
    }
  });

  // Sound Sample Button
  btnSample.addEventListener('click', () => {
    audioBuffer = generateSpeechSample();
    if (x1Input) x1Input.value = 0;
    if (x2Input) x2Input.value = Math.min(audioBuffer.length, 4096);
    window.renderAcStudio();
    showToast('🔊 Загружен эталонный речевой семпл (224 КБ)');
  });

  // Open WAV File
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      const arrayBuffer = evt.target.result;
      const ctx = getAudioContext();
      ctx.decodeAudioData(arrayBuffer, (decoded) => {
        sampleRate = decoded.sampleRate;
        const channelData = decoded.getChannelData(0);
        audioBuffer = new Float32Array(channelData);
        if (x1Input) x1Input.value = 0;
        if (x2Input) x2Input.value = Math.min(audioBuffer.length, 8192);
        window.renderAcStudio();
        showToast(`📂 Файл "${file.name}" загружен (${(file.size / 1024).toFixed(1)} КБ)`);
      }, (err) => {
        showToast('Ошибка декодирования аудио: ' + err);
      });
    };
    reader.readAsArrayBuffer(file);
  });

  // Record Microphone (3s)
  let isRecording = false;
  btnMic.addEventListener('click', async () => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      isRecording = true;
      btnMic.textContent = '🔴 Запись (3с)...';
      btnMic.style.borderColor = '#ff5252';
      btnMic.style.color = '#ff5252';

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        isRecording = false;
        btnMic.textContent = '🎙 Запись (3с)';
        btnMic.style.borderColor = '';
        btnMic.style.color = '';
        stream.getTracks().forEach(track => track.stop());

        const audioBlob = new Blob(audioChunks);
        const arrayBuffer = await audioBlob.arrayBuffer();
        const ctx = getAudioContext();
        ctx.decodeAudioData(arrayBuffer, (decoded) => {
          sampleRate = decoded.sampleRate;
          audioBuffer = new Float32Array(decoded.getChannelData(0));
          if (x1Input) x1Input.value = 0;
          if (x2Input) x2Input.value = Math.min(audioBuffer.length, 8192);
          window.renderAcStudio();
          showToast('🎙 Голос записан и загружен в осциллограф!');
        });
      };

      mediaRecorder.start();
      setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }, 3000);
    } catch (err) {
      showToast('Доступ к микрофону отклонен: ' + err.message);
      isRecording = false;
      btnMic.textContent = '🎙 Запись (3с)';
      btnMic.style.borderColor = '';
      btnMic.style.color = '';
    }
  });

  // Playback helper
  function playBuffer(buf) {
    if (!buf || buf.length === 0) return;
    try {
      const ctx = getAudioContext();
      if (activeAudioSource) {
        try { activeAudioSource.stop(); } catch (e) {}
      }
      const audioBuf = ctx.createBuffer(1, buf.length, sampleRate);
      audioBuf.copyToChannel(buf, 0);

      activeAudioSource = ctx.createBufferSource();
      activeAudioSource.buffer = audioBuf;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.7, ctx.currentTime);

      activeAudioSource.connect(gain);
      gain.connect(ctx.destination);
      activeAudioSource.start();
    } catch (err) {
      showToast('Ошибка воспроизведения: ' + err.message);
    }
  }

  // Play Original
  btnPlayOrig.addEventListener('click', () => {
    playBuffer(audioBuffer);
    showToast('▶ Воспроизведение исходного сигнала WAV');
  });

  // Play Processed
  btnPlayProc.addEventListener('click', () => {
    if (processedBuffer) {
      playBuffer(processedBuffer);
      showToast('▶ Воспроизведение сигнала после кусочно-линейного спрямления');
    }
  });

  // Download compressed WAV
  btnDownload.addEventListener('click', () => {
    if (!processedBuffer) return;
    const wavBlob = encodeWavBlob(processedBuffer, sampleRate);
    const url = URL.createObjectURL(wavBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Makarov_AC_Studio_Compressed.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('💾 Сжатый аудиофайл скачан!');
  });

  function encodeWavBlob(samples, sRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    // RIFF header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // PCM format
    view.setUint16(20, 1, true);  // Mono
    view.setUint16(22, 1, true);  // 1 channel
    view.setUint32(24, sRate, true);
    view.setUint32(28, sRate * 2, true); // byte rate
    view.setUint16(32, 2, true);  // block align
    view.setUint16(34, 16, true); // 16-bit
    writeString(view, 36, 'data');
    view.setUint32(40, samples.length * 2, true);

    // Float to Int16
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  window.addEventListener('resize', () => {
    const dpPanel = document.getElementById('tab-dp-studio');
    if (dpPanel && dpPanel.classList.contains('active')) {
      renderBoth();
    }
  });

  // Initial draw
  setTimeout(window.renderAcStudio, 60);
}

// C. Telegram Bot Emulator (Daos.V & BSD Store)
function initTelegramEmulator() {
  const history = document.getElementById('tg-chat-history');
  const actionBtns = document.querySelectorAll('.tg-quick-actions .tg-btn');
  if (!history || !actionBtns.length) return;

  const responses = {
    vin: {
      userText: '🚗 Пробить VIN: WVWZZZ2KZJX014921',
      botHtml: `🚗 <b>VIN Декодер: WVWZZZ2KZJX014921</b><br>
• <b>Марка / Модель:</b> Volkswagen Caddy IV Kasten (2K-J)<br>
• <b>Двигатель:</b> 1.6 MPI CWVA (110 л.с. / 81 кВт, Euro 5)<br>
• <b>Трансмиссия:</b> 5-ступ. МКПП (QAE / 02T)<br>
• <b>Год выпуска:</b> 2018 (Модельный год: J)<br>
• <b>Завод сборки:</b> Poznan (Польша)<br>
• <b>Каталожные узлы:</b> VAG ETKA online — 14 узлов найдено. Доступна взрыв-схема ГРМ, подвески и топливной рампы.`
    },
    part: {
      userText: '⚙ Найти артикул: 06A906262BR (VAG)',
      botHtml: `⚡ <b>Поиск по локальной БД SQLite (4 460 000+ записей):</b> выполнено за <b>0.012 сек</b>.<br><br>
<b>VAG 06A 906 262 BR</b> — Датчик концентрации кислорода (Лямбда-зонд до катализатора, 5 проводов).<br><br>
📊 <b>Сводка цен агрегатора (Exist / Autodoc / ZZap):</b><br>
• <b>ZZap:</b> от 7 690 ₽ (В наличии, 4 склада в Москве)<br>
• <b>Autodoc:</b> 8 120 ₽ (Срок доставки: 1 день, склад Дилер)<br>
• <b>Exist:</b> 8 450 ₽ (Срок доставки: 2 дня)<br>
• <b>Elcats:</b> Каталожный узел 906-030 (Выхлопная система)`
    },
    vpn: {
      userText: '🛡 Выдать тестовый ключ UC SHIELD (VLESS-Reality)',
      botHtml: `🛡 <b>UC SHIELD Security Gateway (3X-UI Docker Daemon):</b><br>
Сгенерирован персональный тестовый профиль VLESS-Reality на выделенном европейском сервере:<br><br>
<code style="display:block; background:#0c1017; padding:8px; border-radius:6px; font-size:0.75rem; word-break:break-all; color:#80d8ff;">vless://b8f2c310-7e5d-4f11-9a3b-da0432f7a912@de01.uc-shield.net:443?security=reality&encryption=none&pbk=xK7_90vPqX5aM8912qL0Pz11&type=tcp&sni=gateway.icloud.com#UC-SHIELD-DEMO</code><br>
• <b>Маскировка (SNI):</b> gateway.icloud.com (Apple Inc.)<br>
• <b>Статус:</b> Активен | Пинг: 28 мс | Лимит: 50 ГБ`
    },
    stars: {
      userText: '⭐ Автовыдача Stars (TON WalletV5R1)',
      botHtml: `⭐ <b>Автовыдача Telegram Stars (TON SDK WalletV5R1 + Fragment API):</b><br><br>
[LOG 00:00:00.12] Запрос на покупку 100 Stars от @demo_user<br>
[LOG 00:00:00.54] Подписание смарт-контракта TON WalletV5R1<br>
[LOG 00:00:01.32] Транзакция отправлена в сеть Fragment API<br>
[LOG 00:00:01.80] ✔ Блок смайнен! Хэш: <code>0x7f4a...9b1c</code><br><br>
⭐ <b>100 Telegram Stars</b> зачислены на баланс аккаунта! Время процессинга: <b>1.8 сек</b>.`
    }
  };

  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const item = responses[action];
      if (!item) return;

      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Append User message
      const userMsg = document.createElement('div');
      userMsg.className = 'tg-msg user';
      userMsg.innerHTML = `${item.userText}<span class="tg-msg-time">${nowTime}</span>`;
      history.appendChild(userMsg);
      history.scrollTop = history.scrollHeight;

      // Append Typing indicator
      const typingMsg = document.createElement('div');
      typingMsg.className = 'tg-msg bot font-mono';
      typingMsg.innerHTML = `<em>Daos.V печатает...</em>`;
      history.appendChild(typingMsg);
      history.scrollTop = history.scrollHeight;

      setTimeout(() => {
        if (typingMsg.parentNode) {
          history.removeChild(typingMsg);
        }

        const botMsg = document.createElement('div');
        botMsg.className = 'tg-msg bot';
        botMsg.innerHTML = `${item.botHtml}<span class="tg-msg-time">${nowTime}</span>`;
        history.appendChild(botMsg);
        history.scrollTop = history.scrollHeight;
      }, 350);
    });
  });
}

// D. Krusty Burger & Cyber Catcher Mini-Game
function initKrustyGame() {
  const canvas = document.getElementById('gameCanvas');
  const btnToggle = document.getElementById('btn-game-toggle');
  const scoreEl = document.getElementById('game-score');
  const comboEl = document.getElementById('game-combo');
  const livesEl = document.getElementById('game-lives');
  const planFill = document.getElementById('plan-fill');
  const planTarget = document.getElementById('plan-target');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let animationId = null;
  let isRunning = false;
  let score = 0;
  let combo = 1;
  let lives = 3;
  const TARGET_SCORE = 200;

  let paddle = { x: 200, width: 90, height: 16 };
  let items = [];
  let particles = [];
  let lastSpawn = 0;

  const itemTypes = [
    { char: '🍔', pts: 10, isBad: false, label: 'Бургер' },
    { char: '🦀', pts: 25, isBad: false, label: 'Крабсбургер' },
    { char: '⭐', pts: 50, isBad: false, label: 'Контракт' },
    { char: '👾', pts: 0, isBad: true, label: 'DDoS' },
    { char: '🐛', pts: 0, isBad: true, label: 'Баг' }
  ];

  window.resizeGameCanvas = function() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = (rect.height || 360) * dpr;
    ctx.scale(dpr, dpr);
    paddle.x = rect.width / 2;
  };

  function updateHUD() {
    scoreEl.textContent = score;
    comboEl.textContent = `x${combo}`;
    livesEl.textContent = '❤️'.repeat(Math.max(0, lives)) || '💀';
    const pct = Math.min((score / TARGET_SCORE) * 100, 100);
    planFill.style.width = `${pct}%`;
    planTarget.textContent = `${score}/${TARGET_SCORE}`;
  }

  function spawnItem(width) {
    const rnd = Math.random();
    let type = itemTypes[0];
    if (rnd > 0.85) type = itemTypes[2]; // Star
    else if (rnd > 0.65) type = itemTypes[1]; // Crab
    else if (rnd > 0.45) type = itemTypes[3]; // DDoS
    else if (rnd > 0.35) type = itemTypes[4]; // Bug

    items.push({
      x: 30 + Math.random() * (width - 60),
      y: -20,
      speed: 2.2 + Math.random() * 2.2,
      type
    });
  }

  function createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 20,
        color
      });
    }
  }

  function gameLoop(timestamp) {
    if (!isRunning) return;
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height || 360;

    ctx.clearRect(0, 0, width, height);

    // Spawn items
    if (timestamp - lastSpawn > 650) {
      spawnItem(width);
      lastSpawn = timestamp;
    }

    // Draw Chef Tray (Paddle)
    ctx.shadowColor = '#00e676';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#00e676';
    const px = Math.max(0, Math.min(paddle.x - paddle.width / 2, width - paddle.width));
    const py = height - 32;
    ctx.beginPath();
    ctx.roundRect(px, py, paddle.width, paddle.height, 8);
    ctx.fill();

    // Paddle badge text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#07070d';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('👨‍🍳 KRUSTY', px + paddle.width / 2, py + 12);

    // Update & draw items
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.speed;

      // Draw item
      ctx.fillText(it.type.char, it.x, it.y);

      // Collision check with paddle
      if (it.y >= py - 8 && it.y <= py + paddle.height && it.x >= px - 10 && it.x <= px + paddle.width + 10) {
        if (it.type.isBad) {
          lives--;
          combo = 1;
          createParticles(it.x, it.y, '#ff5252');
          if (lives <= 0) {
            endGame(false);
            return;
          }
        } else {
          score += it.type.pts * combo;
          combo = Math.min(combo + 1, 5);
          createParticles(it.x, it.y, '#ffd700');
          if (score >= TARGET_SCORE) {
            endGame(true);
            return;
          }
        }
        items.splice(i, 1);
        updateHUD();
        continue;
      }

      // Out of bounds
      if (it.y > height + 20) {
        if (!it.type.isBad) {
          combo = 1;
          updateHUD();
        }
        items.splice(i, 1);
      }
    }

    // Update & draw particles
    for (let p = particles.length - 1; p >= 0; p--) {
      const pt = particles[p];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life--;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      if (pt.life <= 0) particles.splice(p, 1);
    }

    animationId = requestAnimationFrame(gameLoop);
  }

  function endGame(isWin) {
    isRunning = false;
    cancelAnimationFrame(animationId);
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height || 360;

    ctx.fillStyle = 'rgba(7, 7, 13, 0.85)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    if (isWin) {
      ctx.fillStyle = '#ffd700';
      ctx.fillText('★★★ ДНЕВНОЙ ПЛАН ВЫПОЛНЕН! ★★★', width / 2, height / 2 - 15);
      ctx.font = '14px JetBrains Mono, monospace';
      ctx.fillStyle = '#00e676';
      ctx.fillText(`Набрано: ${score} очков. Превосходная реакция!`, width / 2, height / 2 + 20);
    } else {
      ctx.fillStyle = '#ff5252';
      ctx.fillText('СМЕНА ПРЕРВАНА (DDoS / БАГИ)', width / 2, height / 2 - 15);
      ctx.font = '14px JetBrains Mono, monospace';
      ctx.fillStyle = '#f0f0f8';
      ctx.fillText(`Итоговый счет: ${score}. Нажмите кнопку для рестарта.`, width / 2, height / 2 + 20);
    }
  }

  function startGame() {
    window.resizeGameCanvas();
    score = 0;
    combo = 1;
    lives = 3;
    items = [];
    particles = [];
    isRunning = true;
    updateHUD();
    lastSpawn = performance.now();
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
  }

  btnToggle.addEventListener('click', startGame);

  // Mouse & Touch controls
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!e.touches.length) return;
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.touches[0].clientX - rect.left;
    e.preventDefault();
  }, { passive: false });

  // Initial draw placeholder
  window.resizeGameCanvas();
  ctx.fillStyle = '#0e0e1a';
  ctx.font = '14px JetBrains Mono, monospace';
  ctx.fillStyle = '#80d8ff';
  ctx.textAlign = 'center';
  ctx.fillText('Нажмите «Начать смену / Рестарт», чтобы запустить мини-игру', canvas.width / (2 * (window.devicePixelRatio || 1)), 180);
}

