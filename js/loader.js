async function fetchFile(name) {
  try {
    const response = await fetch(`data/${name}`);
    if (!response.ok) {
      return '';
    }
    return await response.text();
  } catch (error) {
    return '';
  }
}

function parseKV(text) {
  const result = {};
  const lines = text.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) {
      continue;
    }
    const key = trimmed.substring(0, colonIndex).trim().toLowerCase();
    const value = trimmed.substring(colonIndex + 1).trim();
    result[key] = value;
  }
  return result;
}

function parseBlocks(text) {
  const chunks = text.split(/^---$/m);
  const blocks = chunks
    .map(chunk => chunk.trim())
    .filter(chunk => chunk.length > 0)
    .map(chunk => parseKV(chunk));
  return blocks;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value || '';
  }
}

async function loadPerfil() {
  const text = await fetchFile('perfil.txt');
  const data = parseKV(text);

  setText('hero-name', data.nombre);
  setText('hero-tagline', data.tagline);
  setText('hero-bio', data.bio);
  setText('hero-location', data.ubicacion);
  setText('hero-status', data.disponibilidad);
  setText('about-bio', data.bio);

  const photo = document.getElementById('hero-photo');
  if (photo) {
    photo.src = data.foto || '';
    photo.alt = data.nombre || 'Profile photo';
  }
}

async function loadExperiencia() {
  const text = await fetchFile('experiencia.txt');
  const blocks = parseBlocks(text);

  const html = blocks.map(block => {
    const period = block.periodo || '';
    const company = block.empresa || '';
    const role = block.cargo || '';
    const description = block.descripcion || '';
    const tags = block.tags ? block.tags.split(',').map(t => t.trim()) : [];

    const tagsHtml = tags.length > 0
      ? `<div class="pf-timeline-tags">${tags.map(tag => `<span class="pf-badge">${tag}</span>`).join('')}</div>`
      : '';

    return `
      <div class="pf-timeline-item reveal">
        <div class="pf-timeline-period">${period}</div>
        <div class="pf-timeline-company">${company}</div>
        <div class="pf-timeline-role">${role}</div>
        <p class="pf-timeline-desc">${description}</p>
        ${tagsHtml}
      </div>
    `;
  }).join('');

  const container = document.getElementById('experience-list');
  if (container) {
    container.innerHTML = html;
  }
}

async function loadEstudios() {
  const text = await fetchFile('estudios.txt');
  const blocks = parseBlocks(text);

  const html = blocks.map(block => {
    const tipo = block.tipo || '';
    const titulo = block.titulo || '';
    const institucion = block.institucion || '';
    const periodo = block.periodo || '';
    const descripcion = block.descripcion || '';

    return `
      <div class="col-md-6 col-lg-4">
        <div class="pf-card reveal h-100">
          <span class="pf-badge">${tipo}</span>
          <h5>${titulo}</h5>
          <div class="pf-edu-meta">
            <span>${institucion}</span>
            <span>${periodo}</span>
          </div>
          <p>${descripcion}</p>
        </div>
      </div>
    `;
  }).join('');

  const container = document.getElementById('education-grid');
  if (container) {
    container.innerHTML = html;
  }
}

async function loadHabilidades() {
  const text = await fetchFile('habilidades.txt');
  const lines = text.split('\n');

  const groups = [];
  let currentGroup = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    if (trimmed.startsWith('CATEGORIA:')) {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      currentGroup = {
        category: trimmed.substring('CATEGORIA:'.length).trim(),
        items: []
      };
    } else if (trimmed.startsWith('ITEMS:') && currentGroup) {
      const itemsStr = trimmed.substring('ITEMS:'.length).trim();
      currentGroup.items = itemsStr.split(',').map(item => item.trim());
    }
  }
  if (currentGroup) {
    groups.push(currentGroup);
  }

  const html = groups.map(group => {
    const badges = group.items.map(item => `<span class="pf-badge">${item}</span>`).join('');
    return `
      <div class="col-md-6 col-lg-4">
        <div class="pf-card pf-skill-group reveal">
          <div class="pf-skill-label">${group.category}</div>
          <div>${badges}</div>
        </div>
      </div>
    `;
  }).join('');

  const container = document.getElementById('skills-grid');
  if (container) {
    container.innerHTML = html;
  }
}

async function loadContacto() {
  const text = await fetchFile('contacto.txt');
  const data = parseKV(text);

  setText('contact-cta', data.mensaje_cta);

  const iconMap = {
    email: 'bi-envelope-fill',
    linkedin: 'bi-linkedin',
    github: 'bi-github',
    twitter: 'bi-twitter-x',
    website: 'bi-globe2',
    telefono: 'bi-telephone-fill'
  };

  const links = [];

  if (data.email) {
    links.push({ icon: iconMap.email, label: data.email, href: `mailto:${data.email}` });
  }
  if (data.linkedin) {
    links.push({ icon: iconMap.linkedin, label: 'LinkedIn', href: data.linkedin });
  }
  if (data.github) {
    links.push({ icon: iconMap.github, label: 'GitHub', href: data.github });
  }
  if (data.twitter) {
    links.push({ icon: iconMap.twitter, label: 'Twitter', href: data.twitter });
  }
  if (data.website) {
    links.push({ icon: iconMap.website, label: 'Website', href: data.website });
  }
  if (data.telefono) {
    links.push({ icon: iconMap.telefono, label: data.telefono, href: `tel:${data.telefono}` });
  }

  const html = links.map(link => `
    <a href="${link.href}" class="pf-contact-link" target="_blank" rel="noopener">
      <i class="bi ${link.icon}"></i>
      <span>${link.label}</span>
    </a>
  `).join('');

  const container = document.getElementById('contact-links');
  if (container) {
    container.innerHTML = html;
  }
}

export { loadPerfil, loadExperiencia, loadEstudios, loadHabilidades, loadContacto };
