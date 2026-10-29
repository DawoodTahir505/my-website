/**
 * ====================================================================
 * PORTFOLIO APPLICATION - DAWOOD
 * Minimal, Simple, Professional
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.PORTFOLIO_CONFIG;
  if (!config) return;

  // 1. Render Sections
  renderProfile(config.profile);
  renderAbout(config.about);
  renderSkills(config.skills);
  renderInterests(config.interests);
  renderCertifications(config.certifications);
  renderContact(config.contact, config.profile);
  renderFooter(config.profile);

  // 2. Setup Interactions
  setupNavigation();
  setupCertificateLightbox(config.certifications);
  setupContactUtilities(config.profile);
});

function renderProfile(profile) {
  const nameEl = document.getElementById('hero-name');
  if (nameEl) nameEl.textContent = profile.name;

  const titleEl = document.getElementById('hero-title');
  if (titleEl) titleEl.textContent = profile.title;

  const statementEl = document.getElementById('hero-statement');
  if (statementEl) statementEl.textContent = profile.statement;

  // Links
  document.querySelectorAll('.js-github-link').forEach(el => {
    el.href = profile.githubUrl;
  });

  document.querySelectorAll('.js-linkedin-link').forEach(el => {
    el.href = profile.linkedinUrl;
  });

  document.querySelectorAll('.js-email-link').forEach(el => {
    el.href = `mailto:${profile.email}`;
  });

  document.querySelectorAll('.js-email-text').forEach(el => {
    el.textContent = profile.email;
  });
}

function renderAbout(about) {
  const headingEl = document.getElementById('about-heading');
  if (headingEl) headingEl.textContent = about.heading;

  const container = document.getElementById('about-paragraphs');
  if (container && about.paragraphs) {
    container.innerHTML = about.paragraphs
      .map(p => `<p class="text-slate-700 leading-relaxed text-base mb-4 last:mb-0">${escapeHtml(p)}</p>`)
      .join('');
  }
}

function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container || !skills) return;

  container.innerHTML = skills.map(group => `
    <div class="py-3 sm:py-4 border-b border-slate-100 last:border-b-0">
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline">
        <div class="sm:col-span-4 font-medium text-sm text-slate-900">
          ${escapeHtml(group.category)}
        </div>
        <div class="sm:col-span-8 text-sm text-slate-600">
          ${group.items.map(i => escapeHtml(i)).join(', ')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderInterests(interests) {
  const container = document.getElementById('interests-container');
  if (!container || !interests) return;

  container.innerHTML = interests.map(item => `
    <li class="flex items-center gap-2 text-sm text-slate-700">
      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
      <span>${escapeHtml(item)}</span>
    </li>
  `).join('');
}

function renderCertifications(certifications) {
  const container = document.getElementById('certifications-container');
  if (!container || !certifications) return;

  container.innerHTML = certifications.map((cert) => `
    <article class="p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
          <span>Certificate ${cert.number}</span>
          ${cert.credentialId ? `<span>${escapeHtml(cert.credentialId)}</span>` : ''}
        </div>
        
        <h3 class="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-1.5">
          ${escapeHtml(cert.title)}
        </h3>

        <p class="text-sm text-slate-700 font-medium mb-1">
          ${escapeHtml(cert.issuer)}
        </p>

        <p class="text-xs text-slate-500 mb-5">
          Issued / Duration: ${escapeHtml(cert.date)}
        </p>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button 
          type="button" 
          class="js-view-cert btn-outline text-xs py-1.5 px-3.5 inline-flex items-center gap-1.5"
          data-cert-id="${cert.id}"
        >
          <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          <span>View Certificate</span>
        </button>

        <a href="${cert.image}" target="_blank" rel="noopener noreferrer" class="text-xs text-slate-500 hover:text-slate-900 hover:underline">
          Original &nearr;
        </a>
      </div>
    </article>
  `).join('');
}

function setupCertificateLightbox(certifications) {
  const lightbox = document.getElementById('cert-lightbox');
  const backdrop = document.getElementById('cert-lightbox-backdrop');
  const closeBtn = document.getElementById('cert-lightbox-close');
  const imgEl = document.getElementById('cert-lightbox-img');
  const titleEl = document.getElementById('cert-lightbox-title');
  const issuerEl = document.getElementById('cert-lightbox-issuer');
  const openOriginalLink = document.getElementById('cert-lightbox-open-original');
  const zoomBtn = document.getElementById('cert-lightbox-zoom');

  if (!lightbox || !imgEl) return;

  let currentCert = null;

  const openLightbox = (certId) => {
    currentCert = certifications.find(c => c.id === certId);
    if (!currentCert) return;

    imgEl.src = currentCert.image;
    imgEl.alt = `${currentCert.title} - ${currentCert.issuer}`;
    imgEl.classList.remove('is-zoomed');
    if (zoomBtn) zoomBtn.textContent = 'Zoom In';

    imgEl.onerror = () => {
      // Fallback path check
      if (imgEl.src.includes('public/certificates/')) {
        imgEl.src = imgEl.src.replace('public/certificates/', 'assets/certificates/');
      }
    };

    if (titleEl) titleEl.textContent = currentCert.title;
    if (issuerEl) issuerEl.textContent = `${currentCert.issuer} · ${currentCert.date}`;
    if (openOriginalLink) {
      openOriginalLink.href = currentCert.image;
    }

    lightbox.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    closeBtn?.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    imgEl.classList.remove('is-zoomed');
  };

  // Toggle Zoom
  const toggleZoom = () => {
    imgEl.classList.toggle('is-zoomed');
    if (zoomBtn) {
      zoomBtn.textContent = imgEl.classList.contains('is-zoomed') ? 'Zoom Out' : 'Zoom In';
    }
  };

  // Event Listeners
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-view-cert');
    if (trigger) {
      const id = trigger.getAttribute('data-cert-id');
      if (id) openLightbox(id);
    }
  });

  closeBtn?.addEventListener('click', closeLightbox);
  backdrop?.addEventListener('click', closeLightbox);
  imgEl.addEventListener('click', toggleZoom);
  zoomBtn?.addEventListener('click', toggleZoom);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

function renderContact(contact, profile) {
  const headingEl = document.getElementById('contact-heading');
  if (headingEl) headingEl.textContent = contact.heading;

  const msgEl = document.getElementById('contact-message');
  if (msgEl) msgEl.textContent = contact.message;
}

function renderFooter(profile) {
  const yearEls = document.querySelectorAll('.js-current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);

  const titleEl = document.getElementById('footer-title');
  if (titleEl) titleEl.textContent = profile.title;
}

function setupNavigation() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

function setupContactUtilities(profile) {
  // Copy email button
  const copyBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(profile.email);
        if (copyFeedback) {
          copyFeedback.textContent = '(Copied to clipboard)';
          setTimeout(() => { copyFeedback.textContent = ''; }, 2000);
        }
      } catch {
        window.prompt('Copy email:', profile.email);
      }
    });
  }

  // Simple direct message form
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('input-name')?.value || '').trim();
      const email = (document.getElementById('input-email')?.value || '').trim();
      const message = (document.getElementById('input-message')?.value || '').trim();

      if (!name || !email || !message) {
        if (feedback) {
          feedback.innerHTML = `<span class="text-red-600 text-xs">Please provide your name, email, and message.</span>`;
        }
        return;
      }

      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

      if (feedback) {
        feedback.innerHTML = `<span class="text-slate-600 text-xs">Opening your mail client...</span>`;
      }

      window.location.href = mailtoUrl;
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
