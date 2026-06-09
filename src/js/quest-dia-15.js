// ==========================================
// TELA : QUESTIONÁRIO dia 15
// ==========================================

// 1. Função do menu lateral (Mobile)
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

// ==========================================
// 2. Feedback visual (mensagem na página)
// ==========================================
function mostrarFeedback(mensagem, tipo = 'sucesso') {
  // Remove feedback anterior se existir
  const feedbackExistente = document.querySelector('.feedback-msg');
  if (feedbackExistente) feedbackExistente.remove();

  const feedback = document.createElement('div');
  feedback.className = 'feedback-msg';

  // Define cor e ícone conforme o tipo
  const config = {
    sucesso: {
      bg: '#f0fdf4',
      border: '#10b981',
      cor: '#065f46',
      icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>`
    },
    erro: {
      bg: '#fef2f2',
      border: '#ef4444',
      cor: '#991b1b',
      icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12" y2="16"></line>
              </svg>`
    }
  };

  const { bg, border, cor, icone } = config[tipo];

  feedback.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: ${bg};
    border: 1.5px solid ${border};
    border-radius: 8px;
    color: ${cor};
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 24px;
    animation: fadeIn 0.3s ease;
  `;

  feedback.innerHTML = `${icone}<span>${mensagem}</span>`;

  // Injeta a animação se ainda não existir
  if (!document.querySelector('#feedback-style')) {
    const style = document.createElement('style');
    style.id = 'feedback-style';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  // Insere antes do botão de envio
  const formFooter = document.querySelector('.form-footer');
  if (formFooter) formFooter.insertAdjacentElement('beforebegin', feedback);

  // Remove automaticamente após 5 segundos
  setTimeout(() => feedback.remove(), 5000);
}

// ==========================================
// 3. Salvar questionário no localStorage
// ==========================================
function salvarQuestionario(dados) {
  const CHAVE = 'historico_questionarios';

  // Recupera o histórico existente ou inicia um array vazio
  const historicoAtual = JSON.parse(localStorage.getItem(CHAVE) || '[]');

  // Adiciona a nova resposta com data/hora
  const novaResposta = {
    ...dados,
    dataHora: new Date().toLocaleString('pt-BR')
  };

  historicoAtual.push(novaResposta);

  // Salva de volta no localStorage
  localStorage.setItem(CHAVE, JSON.stringify(historicoAtual));

  console.log('✅ Questionário salvo. Histórico atual:', historicoAtual);
}

// ==========================================
// Aguarda o carregamento completo da tela
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  const btnSubmit = document.querySelector('.btn-submit');

  if (btnSubmit) {
    btnSubmit.addEventListener('click', function (event) {
      event.preventDefault();

      // Captura os valores
      const sintomaSelecionado = document.querySelector('input[name="sintomas"]:checked')?.value;
      const infeccaoSelecionada = document.querySelector('input[name="infeccao"]:checked')?.value;
      const observacao = document.querySelector('textarea')?.value.trim() || '';

      // Validação: ambas as perguntas devem ser respondidas
      if (!sintomaSelecionado || !infeccaoSelecionada) {
        mostrarFeedback('Por favor, responda todas as perguntas antes de enviar.', 'erro');
        return;
      }

      // Monta o objeto com as respostas
      const dadosQuestionario = {
        dia: 15,
        sintomas: sintomaSelecionado,
        infeccao: infeccaoSelecionada,
        observacao: observacao
      };

      // Salva no localStorage
      salvarQuestionario(dadosQuestionario);

      // Feedback visual de sucesso
      mostrarFeedback('Questionário enviado com sucesso! Suas respostas foram registradas.');

      // Limpa a textarea
      const textarea = document.querySelector('textarea');
      if (textarea) textarea.value = '';
    });
  }

});