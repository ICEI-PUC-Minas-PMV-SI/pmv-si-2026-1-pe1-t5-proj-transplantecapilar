// ==========================================
// INÍCIO DO PACIENTE
// ==========================================

// ── Toggle sidebar ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

// ══════════════════════════════════════════
// CONFIGURAÇÃO DO PACIENTE
// Futuramente esses dados virão do localStorage
// preenchido pelo médico no cadastro.
// Por enquanto estão fixos para fins de exemplo.
// ══════════════════════════════════════════
const CONFIG = {
  nomePaciente: 'Fulano',
  diaAtual: 15,        // dia em que o paciente se encontra
  totalDias: 25,       // duração total do acompanhamento
  // Dias que terão formulário (definidos pelo médico futuramente)
  diasComFormulario: [1, 3, 5, 7, 10, 12, 15, 18, 20, 22, 25]
};

// ==========================================
// BOAS-VINDAS
// ==========================================
function renderizarBoasVindas() {
  document.getElementById('welcome-titulo').textContent = `Olá, ${CONFIG.nomePaciente}!`;
  document.getElementById('badge-dia').textContent = CONFIG.diaAtual;
  document.querySelector('.welcome-badge .badge-sub').textContent = `de ${CONFIG.totalDias} dias`;
  document.getElementById('card-questao-titulo').textContent = `Questionário do Dia ${CONFIG.diaAtual}`;
}

// ==========================================
// BARRA DE PROGRESSO
// ==========================================
function renderizarProgresso() {
  const pct = Math.round((CONFIG.diaAtual / CONFIG.totalDias) * 100);
  document.getElementById('progress-pct').textContent = `${pct}%`;
  document.getElementById('progress-bar').style.width = `${pct}%`;
}

// ==========================================
// TIMELINE DE DIAS
// ==========================================
function renderizarTimeline() {
  const timeline = document.getElementById('timeline');

  for (let d = 1; d <= CONFIG.totalDias; d++) {
    const temForm = CONFIG.diasComFormulario.includes(d);
    const item = document.createElement('div');

    let classe = 'timeline-item';
    if (!temForm)                   classe += ' sem-form';
    else if (d < CONFIG.diaAtual)   classe += ' done';
    else if (d === CONFIG.diaAtual) classe += ' current';

    item.className = classe;
    item.style.minWidth = '36px';

    const dot = document.createElement('div');
    dot.className = 'timeline-dot';

    if (temForm && d < CONFIG.diaAtual) {
      // Ícone de check para dias concluídos
      dot.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else {
      dot.textContent = d;
    }

    const label = document.createElement('div');
    label.className = 'timeline-label';
    label.textContent = `D${d}`;

    item.appendChild(dot);
    item.appendChild(label);
    timeline.appendChild(item);
  }

  // Rola a timeline para o dia atual
  const dotAtual = timeline.children[CONFIG.diaAtual - 1];
  if (dotAtual) {
    setTimeout(() => dotAtual.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 200);
  }
}

// ==========================================
// HISTÓRICO RECENTE (lê do localStorage)
// ==========================================
function renderizarHistorico() {
  const CHAVE = 'historico_questionarios';
  const historico = JSON.parse(localStorage.getItem(CHAVE) || '[]');
  const lista = document.getElementById('historico-lista');

  if (historico.length === 0) return; // mantém o estado vazio já no HTML

  lista.innerHTML = '';

  // Mostra os 3 mais recentes
  const recentes = [...historico].reverse().slice(0, 3);

  recentes.forEach(item => {
    const temAlerta  = item.sintomas === 'forte' || item.infeccao === 'forte';
    const temAtencao = item.sintomas === 'leve'  || item.infeccao === 'leve';

    const badgeClass = temAlerta  ? 'badge-alerta'
                     : temAtencao ? 'badge-atencao'
                     :              'badge-ok';

    const badgeTexto = temAlerta  ? 'Requer atenção'
                     : temAtencao ? 'Leve incômodo'
                     :              'Sem sintomas';

    const el = document.createElement('div');
    el.className = 'historico-item';
    el.innerHTML = `
      <div class="historico-dia">Dia ${item.dia}</div>
      <div class="historico-info">
        <div class="historico-data">${item.dataHora}</div>
        <div class="historico-resumo">${item.observacao || 'Sem observações adicionais'}</div>
      </div>
      <div class="historico-badge ${badgeClass}">${badgeTexto}</div>
    `;
    lista.appendChild(el);
  });
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderizarBoasVindas();
  renderizarProgresso();
  renderizarTimeline();
  renderizarHistorico();
});