document.addEventListener('DOMContentLoaded', () => {
  const summary = document.querySelector('.summary');
  if (summary) summary.classList.remove('open');

  const cards = document.querySelectorAll('.history .day-card, .card-container .day-card');
  function closeAllExcept(except) {
    cards.forEach(c => {
      if (c !== except) c.classList.remove('open');
    });
  }

  cards.forEach(card => {
    let btn = card.querySelector('.open-day');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'open-day';
      btn.textContent = 'Abrir';
      card.insertBefore(btn, card.firstChild);
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = card.classList.contains('open');
      if (wasOpen) {
        card.classList.remove('open');
      } else {
        closeAllExcept(card);
        card.classList.add('open');
      }

      const isOpenNow = card.classList.contains('open');
      if (summary) {
        if (isOpenNow) summary.classList.add('open'); else summary.classList.remove('open');
      }

      cards.forEach(c => {
        const b = c.querySelector('.open-day');
        const topH3 = Array.from(c.children).find(n => n.tagName === 'H3');
        const dateEl = c.querySelector('.date');
        const cOpen = c.classList.contains('open');
        if (b) b.textContent = cOpen ? 'Fechar' : 'Abrir';
        if (topH3) topH3.style.display = cOpen ? 'none' : '';
        if (dateEl) dateEl.style.display = cOpen ? 'none' : '';
      });
    });
    
    card.addEventListener('click', (e) => {
      const target = e.target;
      if (target.matches('.tags button, .bottom-sintomas, .bottom-respostas')) {
        target.classList.toggle('active');
        if (card.classList.contains('open')) updateSummary(card);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('comentario-paciente');
  if (!btn) return;
  btn.addEventListener('click', (ev) => {
    ev.preventDefault();
    // make sure summary is visible
    const summary = document.querySelector('.summary');
    if (summary && !summary.classList.contains('open')) summary.classList.add('open');
    renderComentarios();
  });
});

function updateSummary(card) {
  const summary = document.querySelector('.summary');
  if (!summary) return;
  summary.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = 'Resumo das informações';
  summary.appendChild(title);

  const sintomas = Array.from(card.querySelectorAll('.tags button, .bottom-sintomas'))
    .filter(b => b.classList.contains('active'))
    .map(b => b.textContent.trim());

  const respostas = Array.from(card.querySelectorAll('.bottom-respostas'))
    .filter(b => b.classList.contains('active'))
    .map(b => b.textContent.trim());

  function makeGroup(label, items) {
    const grp = document.createElement('div');
    grp.className = 'summary-group';
    const lbl = document.createElement('div');
    lbl.className = 'summary-group-label';
    lbl.textContent = label;
    grp.appendChild(lbl);
    const wrap = document.createElement('div');
    wrap.className = 'summary-tags';
    items.forEach(it => {
      const span = document.createElement('span');
      span.className = 'summary-badge';
      span.textContent = it;
      wrap.appendChild(span);
    });
    grp.appendChild(wrap);
    return grp;
  }

  let added = false;
  if (sintomas.length) {
    summary.appendChild(makeGroup('Como o paciente está se sentindo', sintomas));
    added = true;
  }
  if (respostas.length) {
    summary.appendChild(makeGroup('Relato de desconforto', respostas));
    added = true;
  }

  if (!added) {
    const empty = document.createElement('div');
    empty.className = 'summary-empty';
    empty.textContent = 'Nenhuma seleção ainda.';
    summary.appendChild(empty);
  }

  // append persistent action buttons (use data-action for delegation)
  const fotosBtn = document.createElement('button');
  fotosBtn.type = 'button';
  fotosBtn.dataset.action = 'ver-fotos';
  fotosBtn.textContent = 'Ver fotos enviadas';
  const comentariosBtn = document.createElement('button');
  comentariosBtn.type = 'button';
  comentariosBtn.dataset.action = 'ver-comentarios';
  comentariosBtn.textContent = 'Ver comentários do paciente';
  summary.appendChild(fotosBtn);
  summary.appendChild(comentariosBtn);

  summary.classList.add('open');
}

function clearSummary() {
  const summary = document.querySelector('.summary');
  if (!summary) return;
  summary.classList.remove('open');
  summary.innerHTML = '<h3>Resumo das informações</h3>' +
    '<div class="summary-empty">Nenhuma seleção ainda.</div>' +
    '<button type="button" data-action="ver-fotos">Ver fotos enviadas</button>' +
    '<button type="button" data-action="ver-comentarios">Ver comentários do paciente</button>';
}

document.addEventListener('click', (e) => {
  const cards = document.querySelectorAll('.history .day-card, .card-container .day-card');
  const anyOpen = Array.from(cards).some(c => c.classList.contains('open'));
  if (!anyOpen) clearSummary();
});


const sintomas = JSON.parse(localStorage.getItem('historico_questionarios') || '[]');
console.log(`historico_questionarios =>`, sintomas);

document.addEventListener('DOMContentLoaded', () => {
  const listaSintomas = document.getElementById('lista-sintomas');
  const listaInfecoes = document.getElementById('lista-infeccoes');
  if (!listaSintomas) {
    console.warn('Elemento #lista-sentimentos não encontrado na página. Pulando renderização.');
    return;
  }

  sintomas.forEach(sintoma => {
    const li = document.createElement('li');
    li.textContent = sintoma.sintomas || sintoma.sintomas || JSON.stringify(sintoma);
    listaSintomas.appendChild(li);
  });

  

  console.log(`sintomas =>`, sintomas);
});

function renderComentarios() {
  const CHAVE = 'historico_questionarios';
  const historico = JSON.parse(localStorage.getItem(CHAVE) || '[]');
  const summary = document.querySelector('.summary');
  if (!summary) return;

  const existing = summary.querySelector('.comments-list');
  if (existing) { existing.remove(); return; }

  const listWrap = document.createElement('div');
  listWrap.className = 'comments-list';
  listWrap.style.marginTop = '12px';

  if (!historico.length) {
    const empty = document.createElement('div');
    empty.className = 'summary-empty';
    empty.textContent = 'Nenhum comentário registrado.';
    listWrap.appendChild(empty);
  } else {
    // Mostrar do mais recente para o mais antigo
    historico.slice().reverse().forEach(entry => {
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.style.padding = '8px 0';
      item.style.borderBottom = '1px solid rgba(0,0,0,0.06)';

      const hdr = document.createElement('div');
      hdr.className = 'comment-header';
      hdr.style.fontSize = '12px';
      hdr.style.color = '#666';
      hdr.textContent = `${entry.dataHora || ''} — Dia ${entry.dia || ''}`;
      item.appendChild(hdr);

      const fields = document.createElement('div');
      fields.className = 'comment-fields';
      fields.style.marginTop = '6px';

      const s = document.createElement('div');
      s.className = 'comment-field';
      s.innerHTML = `<strong>Sintomas:</strong> ${entry.sintomas || '—'}`;
      fields.appendChild(s);

      const i = document.createElement('div');
      i.className = 'comment-field';
      i.innerHTML = `<strong>Infecção:</strong> ${entry.infeccao || '—'}`;
      fields.appendChild(i);

      const o = document.createElement('div');
      o.className = 'comment-field';
      o.innerHTML = `<strong>Observação:</strong> ${entry.observacao || '—'}`;
      fields.appendChild(o);

      item.appendChild(fields);
      listWrap.appendChild(item);
    });
  }

  summary.appendChild(listWrap);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest && e.target.closest('button[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  if (action === 'ver-comentarios' || action === 'ver-comentarios') {
    renderComentarios();
  }
  if (action === 'ver-fotos') {
    const summary = document.querySelector('.summary');
    if (!summary) return;
    const existing = summary.querySelector('.photos-list');
    if (existing) { existing.remove(); return; }
    const wrap = document.createElement('div');
    wrap.className = 'photos-list';
    wrap.style.marginTop = '12px';
    wrap.textContent = 'Lista de fotos não implementada.';
    summary.appendChild(wrap);
  }
});
