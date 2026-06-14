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

  summary.classList.add('open');
}

function clearSummary() {
  const summary = document.querySelector('.summary');
  if (!summary) return;
  summary.classList.remove('open');
  summary.innerHTML = '<h3>Resumo das informações</h3>' +
    '<div class="summary-empty">Nenhuma seleção ainda.</div>';
}

document.addEventListener('click', (e) => {
  const cards = document.querySelectorAll('.history .day-card, .card-container .day-card');
  const anyOpen = Array.from(cards).some(c => c.classList.contains('open'));
  if (!anyOpen) clearSummary();
});
