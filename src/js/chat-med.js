function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

const CHAVE_CHAT = 'historico_chat';
const chatMessages = document.getElementById('chat-messages');
const chatEmpty    = document.getElementById('chat-empty');
const chatInput    = document.getElementById('chat-input');
const btnSend      = document.getElementById('btn-send');

// Retorna a hora atual formatada em HH:MM
function horaAgora() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Retorna a data/hora completa para salvar no localStorage
function dataHoraAgora() {
  return new Date().toLocaleString('pt-BR');
}

// Remove o estado vazio na primeira mensagem
function removerEstadoVazio() {
  const vazio = document.getElementById('chat-empty');
  if (vazio) vazio.remove();
}

// Cria e adiciona um balão de mensagem na tela
function renderizarMensagem(texto, tipo, hora) {
  removerEstadoVazio();

  const wrapper = document.createElement('div');
  wrapper.className = `msg-wrapper ${tipo}`;

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = texto;

  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = hora;

  wrapper.appendChild(bubble);
  wrapper.appendChild(time);
  chatMessages.appendChild(wrapper);

  // Rola para a última mensagem
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Salva uma nova mensagem no histórico LOCALSTORAGE
function salvarMensagem(texto, tipo) {
  const historico = carregarHistorico();

  historico.push({
    texto,
    tipo,        // 'paciente' ou 'medico'
    dataHora: dataHoraAgora()
  });

  localStorage.setItem(CHAVE_CHAT, JSON.stringify(historico));
}

// Carrega o histórico salvo (retorna array vazio se não houver nada)
function carregarHistorico() {
  return JSON.parse(localStorage.getItem(CHAVE_CHAT) || '[]');
}

// Restaura as mensagens salvas ao carregar a página
function restaurarHistorico() {
  const historico = carregarHistorico();

  if (historico.length === 0) return;

  historico.forEach(item => {
    // Extrai só a hora do campo dataHora para exibir no balão
    const hora = item.dataHora.split(' ')[1]?.slice(0, 5) || item.dataHora;
    renderizarMensagem(item.texto, item.tipo, hora);
  });

  console.log(`💬 ${historico.length} mensagem(ns) restaurada(s) do histórico.`);
}

// ENVIO DE MENSAGEM

function enviarMensagem() {
  const texto = chatInput.value.trim();
  if (!texto) return;

  const hora = horaAgora();

  // Renderiza na tela
  renderizarMensagem(texto, 'paciente', hora);

  // Salva no localStorage
  salvarMensagem(texto, 'paciente');

  // Limpa o campo e reseta o tamanho
  chatInput.value = '';
  chatInput.style.height = 'auto';
  btnSend.disabled = true;
}


// Botão enviar
btnSend.addEventListener('click', enviarMensagem);

// Enter envia, Shift+Enter quebra linha
chatInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarMensagem();
  }
});

// Habilita/desabilita botão e faz auto-resize da textarea
chatInput.addEventListener('input', function () {
  btnSend.disabled = this.value.trim() === '';
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// RESETAR

document.addEventListener('DOMContentLoaded', () => {
  btnSend.disabled = true;
  restaurarHistorico();
});