var usuario = JSON.parse(localStorage.getItem('usuarioLogado')) || {};

if (!usuario.nome || usuario.perfil !== 'paciente') {
  window.location.href = "../../index.html";
}

var _iniciais     = (usuario.nome || 'PA').split(' ').filter(function(p){ return p.length > 0; }).slice(0, 2).map(function(p){ return p[0].toUpperCase(); }).join('');
var _primeiroNome = (usuario.nome || '').split(' ')[0];

var topbarNome   = document.querySelector('.user-name');
var topbarAvatar = document.querySelector('.user-profile .avatar');
var heroH1       = document.querySelector('.hero-text h1');

if (topbarNome)   topbarNome.textContent   = usuario.nome;
if (topbarAvatar) topbarAvatar.textContent = _iniciais;
if (heroH1)       heroH1.textContent       = 'Olá, ' + _primeiroNome + '! 👋';

var dadosPaciente = JSON.parse(localStorage.getItem('paciente_dados')) || {
  diaAtual:  1,
  totalDias: 30,
  faseNome:  'Recuperação',
  nomeMedico: 'Dr. João da Silva'
};

var tarefasLS   = JSON.parse(localStorage.getItem('paciente_tarefas'))   || [];
var historicoLS = JSON.parse(localStorage.getItem('paciente_historico'))  || [];
var notifLS     = JSON.parse(localStorage.getItem('paciente_notif'))      || [];

var _tarefaState = JSON.parse(localStorage.getItem('paciente_tarefa_state')) || {};
tarefasLS.forEach(function(t) {
  if (_tarefaState[t.id]) t.status = _tarefaState[t.id];
});

(function() {
  var heroP        = document.querySelector('.hero-text p');
  var progressSpan = document.querySelectorAll('.progress-header span');
  var progressFill = document.querySelector('.progress-fill');
  var histBar      = document.querySelector('.hist-progress-bar');
  var histRow      = document.querySelector('.hist-progress-row strong');

  var dia   = dadosPaciente.diaAtual  || 1;
  var total = dadosPaciente.totalDias || 30;
  var pct   = Math.min(Math.round((dia / total) * 100), 100);

  if (heroP)          heroP.innerHTML   = 'Hoje é o seu <strong>' + dia + 'º dia</strong> de recuperação. Continue assim!';
  if (progressSpan[0]) progressSpan[0].textContent = dadosPaciente.faseNome || 'Recuperação';
  if (progressSpan[1]) progressSpan[1].textContent = 'Dia ' + dia + '/' + total;
  if (progressFill)    progressFill.style.width     = pct + '%';
  if (histBar)         histBar.style.width           = pct + '%';
  if (histRow)         histRow.textContent           = dia + ' / ' + total;
})();

(function() {
  var taskList = document.querySelector('.task-list');
  if (!taskList) return;

  if (tarefasLS.length === 0) {
    taskList.innerHTML = '<div class="task-item"><div class="task-content"><h3>Nenhuma tarefa para hoje.</h3></div></div>';
    return;
  }

  taskList.innerHTML = tarefasLS.map(function(t) {
    var done    = t.status === 'done';
    var iconSvg = getTaskIcon(t.tipo);
    var iconStyle = done ? 'style="background:var(--success-bg);color:var(--success);"' : '';
    var badge     = done
      ? '<span class="status-badge badge-success">Concluído</span>'
      : '<span class="status-badge badge-warning">Pendente</span>';
    var btnAttr   = done ? 'class="btn-action outline" disabled' : 'class="btn-action"';
    var btnLabel  = done ? 'Feito' : (t.btnLabel || 'Iniciar');
    var opacity   = done ? 'style="opacity:0.7;border-color:transparent;"' : '';

    return '<div class="task-item" id="' + escapar(t.id) + '" data-task-status="' + t.status + '" ' + opacity + '>'
      + '<div class="task-icon" ' + iconStyle + '>' + iconSvg + '</div>'
      + '<div class="task-content">'
      + '<h3>' + escapar(t.titulo) + '</h3>'
      + '<p>' + escapar(t.descricao) + '</p>'
      + '</div>'
      + badge
      + '<button ' + btnAttr + ' data-task-id="' + escapar(t.id) + '">' + escapar(btnLabel) + '</button>'
      + '</div>';
  }).join('');

taskList.querySelectorAll('.btn-action:not([disabled])').forEach(function(btn) {
  btn.addEventListener('click', function() {

    if (btn.dataset.taskId === 'task-avaliacao') {
      window.location.href = 'quest-dia-15.html';
      return;
    }

    if (btn.dataset.taskId === 'task-fotos') {
      window.location.href = 'UpLoadFotos.html';
      return;
    }

    concluirTarefa(btn.dataset.taskId, btn);
  });
});

  atualizarNotifPendentes();
})();

function concluirTarefa(taskId, btn) {
  var card = document.getElementById(taskId);
  if (!card || card.dataset.taskStatus === 'done') return;

  card.dataset.taskStatus = 'done';
  card.style.opacity      = '0.7';
  card.style.borderColor  = 'transparent';

  var icon  = card.querySelector('.task-icon');
  var badge = card.querySelector('.status-badge');
  if (icon)  { icon.style.background = 'var(--success-bg)'; icon.style.color = 'var(--success)'; }
  if (badge) { badge.textContent = 'Concluído'; badge.className = 'status-badge badge-success'; }
  btn.textContent = 'Feito';
  btn.className   = 'btn-action outline';
  btn.disabled    = true;

  _tarefaState[taskId] = 'done';
  localStorage.setItem('paciente_tarefa_state', JSON.stringify(_tarefaState));

  /* Atualiza tarefa no array e persiste */
  var t = tarefasLS.find(function(x){ return x.id === taskId; });
  if (t) t.status = 'done';
  localStorage.setItem('paciente_tarefas', JSON.stringify(tarefasLS));

  atualizarNotifPendentes();
}

(function() {
  var menu = document.getElementById('notification-menu');
  if (!menu) return;

  menu.querySelectorAll('.notification-item').forEach(function(n){ n.remove(); });

  var itens = notifLS.length > 0 ? notifLS : gerarNotifDeTarefas();

  itens.forEach(function(it) {
    var btn = document.createElement('button');
    btn.className = 'notification-item';
    btn.type = 'button';
    btn.dataset.targetSection = it.targetSection || 'inicio';
    btn.dataset.targetId      = it.targetId      || '';
    btn.innerHTML =
      '<div class="notification-icon ' + escapar(it.cor) + '"></div>'
      + '<div class="notification-text">'
      + '<strong>' + escapar(it.titulo) + '</strong>'
      + '<span>'   + escapar(it.texto)  + '</span>'
      + '</div>';

    menu.appendChild(btn);

    btn.addEventListener('click', function() {
      mostrarSecao(it.targetSection || 'inicio');
      menu.classList.remove('open');
      setTimeout(function(){ scrollToTarget(it.targetId); }, 80);
    });
  });

  atualizarNotificationDot();
})();

function gerarNotifDeTarefas() {
  return tarefasLS
    .filter(function(t){ return t.status === 'pending'; })
    .map(function(t) {
      return {
        cor: t.tipo === 'avaliacao' ? 'yellow' : 'blue',
        titulo: t.titulo,
        texto: t.descricao,
        targetSection: 'inicio',
        targetId: t.id
      };
    });
}

function atualizarNotifPendentes() {
  /* Esconde notificações cujas tarefas foram concluídas */
  document.querySelectorAll('.notification-item').forEach(function(item) {
    var targetId = item.dataset.targetId;
    if (!targetId) return;
    var card = document.getElementById(targetId);
    if (card && card.dataset.taskStatus === 'done') {
      item.classList.add('is-hidden');
    }
  });
  atualizarNotificationDot();
}

(function() {
  var timeline = document.getElementById('historico-timeline');
  if (!timeline) return;

  var emptyEl = document.getElementById('empty-historico');

  timeline.querySelectorAll('.timeline-group').forEach(function(g){ g.remove(); });

  if (historicoLS.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    calcularContadores();
    return;
  }

  var porDia = {};
  var ordemDias = [];
  historicoLS.forEach(function(entry) {
    var d = entry.dia || 0;
    if (!porDia[d]) { porDia[d] = []; ordemDias.push(d); }
    porDia[d].push(entry);
  });

  ordemDias.sort(function(a, b){ return b - a; });

  ordemDias.forEach(function(dia) {
    var entries = porDia[dia];
    var labelDia = entries[0].diaLabel || ('Dia ' + dia);

    var group = document.createElement('div');
    group.className = 'timeline-group';
    group.dataset.day = dia;

    var html = '<div class="timeline-day-label">' + escapar(labelDia) + '</div>';

    entries.forEach(function(e) {
      var iconClass = getIconClass(e.tipo);
      var iconHtml  = getIconFA(e.tipo);
      var badgeHtml = getBadge(e.tipo);
      var descHtml  = '';
      var botaoHtml = '';
      var chatHtml  = '';

      if (e.descricao) {
        descHtml = '<p class="timeline-desc">' + escapar(e.descricao) + '</p>';
      }
      if (e.temBotaoFotos) {
        botaoHtml = '<button class="btn-tl-action" type="button" data-open-fotos="' + escapar(e.fotosLabel || labelDia) + '">Ver fotos enviadas</button>';
      }
      if (e.chat) {
        chatHtml =
          '<div class="timeline-chat-bubble patient"><span class="bubble-label">Você perguntou:</span>' + escapar(e.chat.pergunta) + '</div>'
        + '<div class="timeline-chat-bubble doctor"><span class="bubble-label">' + escapar(dadosPaciente.nomeMedico || 'Médico') + ' respondeu:</span>' + escapar(e.chat.resposta) + '</div>';
      }

      html +=
        '<div class="timeline-entry" data-tipo="' + escapar(e.tipo) + '">'
        + '<div class="timeline-card">'
        + '<div class="timeline-card-header">'
        + '<div class="timeline-icon-wrap ' + iconClass + '">' + iconHtml + '</div>'
        + '<div><h4>' + escapar(e.titulo) + '</h4><span class="timeline-meta">' + escapar(e.meta || '') + '</span></div>'
        + badgeHtml
        + '</div>'
        + descHtml
        + chatHtml
        + botaoHtml
        + '</div>'
        + '</div>';
    });

    group.innerHTML = html;

    if (emptyEl && emptyEl.parentNode === timeline) {
      timeline.insertBefore(group, emptyEl);
    } else {
      timeline.appendChild(group);
    }

    group.querySelectorAll('.btn-tl-action[data-open-fotos]').forEach(function(btn) {
      btn.addEventListener('click', function(){ openPhotosForDay(btn.dataset.openFotos); });
    });
  });

  calcularContadores();
})();

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('active');
}

function closeSidebarOnMobile() {
  if (window.innerWidth <= 1000) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('active');
  }
}

var pageTitle = document.querySelector('.page-title');

var sections = {
  inicio:        document.getElementById('inicio-section'),
  historico:     document.getElementById('historico-section'),
  configuracoes: document.getElementById('configuracoes-section')
};

var navItems = {
  inicio:        document.getElementById('nav-inicio'),
  orientacoes:   document.getElementById('nav-orientacoes'),
  duvidas:       document.getElementById('nav-duvidas'),
  historico:     document.getElementById('nav-historico'),
  configuracoes: document.getElementById('nav-configuracoes')
};

var pageTitles = {
  inicio:        'Início',
  orientacoes:   'Orientações',
  duvidas:       'Registrar dúvidas',
  historico:     'Histórico',
  configuracoes: 'Configurações'
};

var currentHistFilter = 'todos';

function esconderPaginas() {
  Object.values(sections).forEach(function(s){ if(s) s.classList.add('hidden'); });
}

function limparMenu() {
  Object.values(navItems).forEach(function(n){ if(n) n.classList.remove('active'); });
}

function mostrarSecao(nome) {
  esconderPaginas(); limparMenu();
  if (sections[nome]) sections[nome].classList.remove('hidden');
  if (navItems[nome]) navItems[nome].classList.add('active');
  if (pageTitle) pageTitle.textContent = pageTitles[nome] || '';
  closeSidebarOnMobile();
  if (nome === 'historico') applyHistFilter(currentHistFilter);
}

Object.keys(navItems).forEach(function(key) {
  var el = navItems[key];
  if (!el) return;
  el.addEventListener('click', function(e) {
    e.preventDefault();
    if (key === 'orientacoes') { window.location.href = 'orientacaoes.html'; return; }
    if (key === 'duvidas')     { window.location.href = 'RegistrarDuvidas.html'; return; }
    mostrarSecao(key);
  });
});

var btnSairEl = Array.from(document.querySelectorAll('.nav-item')).find(function(el){ return el.textContent.trim().startsWith('Sair'); });
if (btnSairEl) {
  btnSairEl.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('usuarioLogado');
    window.location.href = "../../index.html";
  });
}

var btnSupport = document.querySelector('.btn-support');
if (btnSupport) {
  btnSupport.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'RegistrarDuvidas.html';
  });
}

var notificationBtn     = document.getElementById('notification-btn');
var notificationMenu    = document.getElementById('notification-menu');
var notificationDot     = document.getElementById('notification-dot');
var notificationWrapper = document.querySelector('.notification-wrapper');
var notificationCloseTimer;

if (notificationMenu) {
  notificationMenu.addEventListener('wheel', function(e) {
    var atTop    = notificationMenu.scrollTop === 0;
    var atBottom = notificationMenu.scrollHeight - notificationMenu.scrollTop <= notificationMenu.clientHeight + 1;
    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) e.preventDefault();
    e.stopPropagation();
  }, { passive: false });
}

if (notificationBtn && notificationMenu) {
  notificationBtn.addEventListener('click', function(e) { e.stopPropagation(); notificationMenu.classList.toggle('open'); });
  document.addEventListener('click', function(e) {
    if (!notificationMenu.contains(e.target) && !notificationBtn.contains(e.target)) notificationMenu.classList.remove('open');
  });
}

if (notificationWrapper && notificationMenu) {
  notificationWrapper.addEventListener('mouseenter', function(){ clearTimeout(notificationCloseTimer); notificationMenu.classList.add('open'); });
  notificationWrapper.addEventListener('mouseleave', function(){ notificationCloseTimer = setTimeout(function(){ notificationMenu.classList.remove('open'); }, 350); });
  notificationMenu.addEventListener('mouseenter',   function(){ clearTimeout(notificationCloseTimer); });
  notificationMenu.addEventListener('mouseleave',   function(){ notificationCloseTimer = setTimeout(function(){ notificationMenu.classList.remove('open'); }, 250); });
}

function atualizarNotificationDot() {
  if (!notificationDot) return;
  var visiveis = document.querySelectorAll('#notification-menu .notification-item:not(.is-hidden)').length;
  notificationDot.textContent   = visiveis;
  notificationDot.style.display = visiveis > 0 ? 'grid' : 'none';
}

var histFilterButtons  = document.querySelectorAll('.hist-filter');
var emptyHistorico     = document.getElementById('empty-historico');
var historicoTotal     = document.getElementById('historico-total');
var historicoListTitle = document.getElementById('historico-list-title');

var filterLabels = {
  todos:     'Todos os registros',
  tarefa:    'Tarefas concluídas',
  foto:      'Fotos enviadas',
  mensagem:  'Mensagens e respostas',
  medicacao: 'Medicações tomadas'
};

function applyHistFilter(filter) {
  currentHistFilter = filter;
  var visibleCount  = 0;

  histFilterButtons.forEach(function(btn){ btn.classList.toggle('active', btn.dataset.histFilter === filter); });

  document.querySelectorAll('.timeline-entry').forEach(function(entry) {
    var show = filter === 'todos' || entry.dataset.tipo === filter;
    entry.style.display = show ? 'block' : 'none';
    if (show) visibleCount++;
  });

  document.querySelectorAll('.timeline-group').forEach(function(group) {
    var vis = Array.from(group.querySelectorAll('.timeline-entry')).filter(function(e){ return e.style.display !== 'none'; });
    group.style.display = vis.length > 0 ? 'flex' : 'none';
  });

  if (emptyHistorico)     emptyHistorico.style.display  = visibleCount === 0 ? 'block' : 'none';
  if (historicoListTitle) historicoListTitle.textContent = filterLabels[filter] || 'Todos os registros';
  if (historicoTotal)     historicoTotal.textContent     = visibleCount;
}

histFilterButtons.forEach(function(btn) {
  btn.addEventListener('click', function(){ applyHistFilter(btn.dataset.histFilter); });
});

function calcularContadores() {
  ['tarefa','foto','mensagem','medicacao'].forEach(function(tipo) {
    var el = document.getElementById('count-' + tipo);
    if (el) el.textContent = document.querySelectorAll('.timeline-entry[data-tipo="' + tipo + '"]').length;
  });
  if (historicoTotal) historicoTotal.textContent = document.querySelectorAll('.timeline-entry').length;
}

var photosModal      = document.getElementById('photos-modal');
var imageViewerModal = document.getElementById('image-viewer-modal');
var photosModalTitle = document.getElementById('photos-modal-title');
var imageViewerTitle = document.getElementById('image-viewer-title');
var imageViewerLabel = document.getElementById('image-viewer-label');

function openModal(modal)  { if (modal) modal.classList.add('open'); }
function closeModal(modal) { if (modal) modal.classList.remove('open'); }

function openPhotosForDay(label) {
  if (photosModalTitle) photosModalTitle.textContent = 'Fotos enviadas — ' + (label || '');
  openModal(photosModal);
}

document.querySelectorAll('.photo-placeholder').forEach(function(photo) {
  photo.addEventListener('click', function() {
    var label = photo.dataset.photoLabel || 'Foto enviada';
    if (imageViewerTitle) imageViewerTitle.textContent = 'Imagem ampliada — ' + label;
    if (imageViewerLabel) imageViewerLabel.textContent = label;
    openModal(imageViewerModal);
  });
});

document.querySelectorAll('[data-close-modal]').forEach(function(btn) {
  btn.addEventListener('click', function(){ closeModal(document.getElementById(btn.dataset.closeModal)); });
});

document.querySelectorAll('.modal-overlay').forEach(function(modal) {
  modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(modal); });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function(m){ closeModal(m); });
    if (notificationMenu) notificationMenu.classList.remove('open');
  }
});

function scrollToTarget(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.add('focus-highlight');
  setTimeout(function(){ target.classList.remove('focus-highlight'); }, 1400);
}

var toastEl    = null;
var toastTimer = null;

function mostrarToast(msg) {
  if (!toastEl) { toastEl = document.createElement('div'); toastEl.id = 'toast-msg'; document.body.appendChild(toastEl); }
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, 2400);
}

function escapar(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function getTaskIcon(tipo) {
  switch (tipo) {
    case 'fotos':
      return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>';
    case 'medicacao':
      return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    default: /* avaliacao / outro */
      return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
  }
}

function getIconClass(tipo) {
  switch (tipo) {
    case 'foto':      return 'icon-foto';
    case 'mensagem':  return 'icon-mensagem';
    case 'medicacao': return 'icon-medicacao';
    default:          return 'icon-tarefa';
  }
}

function getIconFA(tipo) {
  switch (tipo) {
    case 'foto':      return '<i class="fa-solid fa-camera"></i>';
    case 'mensagem':  return '<i class="fa-solid fa-comment-medical"></i>';
    case 'medicacao': return '<i class="fa-solid fa-pills"></i>';
    default:          return '<i class="fa-solid fa-clipboard-check"></i>';
  }
}

function getBadge(tipo) {
  switch (tipo) {
    case 'foto':      return '<span class="tl-badge badge-info">Foto</span>';
    case 'mensagem':  return '<span class="tl-badge badge-mensagem">Mensagem</span>';
    case 'medicacao': return '<span class="tl-badge badge-success-tl">Medicação</span>';
    default:          return '<span class="tl-badge badge-success-tl">Tarefa</span>';
  }
}

applyHistFilter('todos');
atualizarNotificationDot();