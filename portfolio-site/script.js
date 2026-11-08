// =====================================================================
// Kirill Makarov (FReeM1409) — Interactive Script & Internationalization
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initI18n();
  initSmoothScroll();
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
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox');
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
    'nav.stack': 'Tech Stack',
    'nav.education': 'Research & VAK',
    'nav.contacts': 'Contacts',
    'btn.pdf': 'PDF Resume',
    'hero.badge': 'Available for Hire: Python / QA Automation / Backend',
    'hero.greeting': 'Hi, I am',
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
