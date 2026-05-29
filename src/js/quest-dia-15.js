// ==========================================
// TELA 1: QUESTIONÁRIO
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

// Aguarda o carregamento completo da tela
document.addEventListener('DOMContentLoaded', () => {

  // 2. Simulação do Formulário
  const btnSubmit = document.querySelector('.btn-submit');
  
  
  if (btnSubmit) {
    btnSubmit.addEventListener('click', function(event) {
      event.preventDefault(); // Impede o recarregamento da página

      // Captura os valores selecionados e digitados
      const sintomaSelecionado = document.querySelector('input[name="sintomas"]:checked')?.value || 'Não respondido';
      const infeccaoSelecionada = document.querySelector('input[name="infeccao"]:checked')?.value || 'Não respondido';
      const observacao = document.querySelector('textarea')?.value || '';

      // Mostra as respostas no console para avaliação do projeto
      console.group('--- Questionário Diário ---');
      console.log('Sintomas:', sintomaSelecionado);
      console.log('Infecção:', infeccaoSelecionada);
      console.log('Observação:', observacao);
      console.groupEnd();

      // Feedback visual para o usuário
      alert('Questionário enviado com sucesso! Acompanhe suas orientações na próxima aba.');

      // Limpa a caixa de texto
      const textarea = document.querySelector('textarea');
      if (textarea) textarea.value = '';
    });
  }

});