function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeSidebarOnMobile() {
  if (window.innerWidth <= 1000) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('active');
  }
}

var pageTitle = document.querySelector('.page-title');

var sections = {
  inicio:         document.getElementById('inicio-section'),
  orientacoes:    document.getElementById('orientacoes-section'),
  chat:           document.getElementById('chat-section'),
  historico:      document.getElementById('historico-section'),
  configuracoes:  document.getElementById('configuracoes-section')
};

var navItems = {
  inicio:        document.getElementById('nav-inicio'),
  orientacoes:   document.getElementById('nav-orientacoes'),
  chat:          document.getElementById('nav-chat'),
  historico:     document.getElementById('nav-historico'),
  configuracoes: document.getElementById('nav-configuracoes')
};

var pageTitles = {
  inicio:        'Início',
  orientacoes:   'Orientações',
  chat:          'Chat com médico',
  historico:     'Histórico',
  configuracoes: 'Configurações'
};

function esconderPaginas() {
  Object.values(sections).forEach(function(s) {
    if (s) s.classList.add('hidden');
  });
}

function limparMenu() {
  Object.values(navItems).forEach(function(n) {
    if (n) n.classList.remove('active');
  });
}

function mostrarSecao(nome) {
  esconderPaginas();
  limparMenu();
  if (sections[nome]) sections[nome].classList.remove('hidden');
  if (navItems[nome]) navItems[nome].classList.add('active');
  if (pageTitle) pageTitle.textContent = pageTitles[nome] || '';
  closeSidebarOnMobile();

  if (nome === 'historico') {
    applyHistFilter(currentHistFilter);
  }
}

var abasBloqueadas = ['orientacoes', 'chat', 'configuracoes'];

Object.keys(navItems).forEach(function(key) {
  var el = navItems[key];
  if (!el) return;
  el.addEventListener('click', function(e) {
    e.preventDefault();
    if (abasBloqueadas.indexOf(key) !== -1) {
      mostrarToast('Seção em construção.');
      return;
    }
    mostrarSecao(key);
  });
});

var notificationBtn     = document.getElementById('notification-btn');
var notificationMenu    = document.getElementById('notification-menu');
var notificationDot     = document.getElementById('notification-dot');
var notificationWrapper = document.querySelector('.notification-wrapper');
var notificationCloseTimer;

if (notificationMenu) {
  notificationMenu.addEventListener('wheel', function(e) {
    var atTop    = notificationMenu.scrollTop === 0;
    var atBottom = notificationMenu.scrollHeight - notificationMenu.scrollTop <= notificationMenu.clientHeight + 1;
    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
      e.preventDefault();
    }
    e.stopPropagation();
  }, { passive: false });
}

if (notificationBtn && notificationMenu) {
  notificationBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    notificationMenu.classList.toggle('open');
  });

  document.addEventListener('click', function(e) {
    if (!notificationMenu.contains(e.target) && !notificationBtn.contains(e.target)) {
      notificationMenu.classList.remove('open');
    }
  });
}

if (notificationWrapper && notificationMenu) {
  notificationWrapper.addEventListener('mouseenter', function() {
    clearTimeout(notificationCloseTimer);
    notificationMenu.classList.add('open');
  });

  notificationWrapper.addEventListener('mouseleave', function() {
    notificationCloseTimer = setTimeout(function() {
      notificationMenu.classList.remove('open');
    }, 350);
  });

  notificationMenu.addEventListener('mouseenter', function() {
    clearTimeout(notificationCloseTimer);
  });

  notificationMenu.addEventListener('mouseleave', function() {
    notificationCloseTimer = setTimeout(function() {
      notificationMenu.classList.remove('open');
    }, 250);
  });
}

document.querySelectorAll('.notification-item[data-target-section]').forEach(function(item) {
  item.addEventListener('click', function() {
    var section  = item.dataset.targetSection;
    var targetId = item.dataset.targetId;

    mostrarSecao(section);
    if (notificationMenu) notificationMenu.classList.remove('open');
    setTimeout(function() { scrollToTarget(targetId); }, 80);
  });
});

function atualizarNotificationDot() {
  if (!notificationDot) return;
  var visiveis = document.querySelectorAll('.notification-item:not(.is-hidden)').length;
  notificationDot.textContent = visiveis;
  notificationDot.style.display = visiveis > 0 ? 'grid' : 'none';
}

function scrollToTarget(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.add('focus-highlight');
  setTimeout(function() { target.classList.remove('focus-highlight'); }, 1400);
}

var currentHistFilter = 'todos';

var histFilterButtons = document.querySelectorAll('.hist-filter');
var timelineEntries   = document.querySelectorAll('.timeline-entry');
var timelineGroups    = document.querySelectorAll('.timeline-group');
var emptyHistorico    = document.getElementById('empty-historico');
var historicoTotal    = document.getElementById('historico-total');
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
  var visibleCount = 0;

  histFilterButtons.forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.histFilter === filter);
  });

  timelineEntries.forEach(function(entry) {
    var tipo = entry.dataset.tipo;
    var show = filter === 'todos' || tipo === filter;
    entry.style.display = show ? 'grid' : 'none';
    if (show) visibleCount++;
  });

  timelineGroups.forEach(function(group) {
    var visEntries = Array.from(group.querySelectorAll('.timeline-entry')).filter(function(e) {
      return e.style.display !== 'none';
    });
    group.style.display = visEntries.length > 0 ? 'flex' : 'none';
  });

  /* Estado vazio */
  if (emptyHistorico) {
    emptyHistorico.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  /* Título da lista */
  if (historicoListTitle) {
    historicoListTitle.textContent = filterLabels[filter] || 'Todos os registros';
  }

  /* Contador do hero */
  if (historicoTotal) {
    historicoTotal.textContent = visibleCount;
  }
}

histFilterButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    applyHistFilter(btn.dataset.histFilter);
  });
});

function calcularContadores() {
  var tipos = ['tarefa', 'foto', 'mensagem', 'medicacao'];
  tipos.forEach(function(tipo) {
    var count = document.querySelectorAll('.timeline-entry[data-tipo="' + tipo + '"]').length;
    var el = document.getElementById('count-' + tipo);
    if (el) el.textContent = count;
  });

  var totalAll = document.querySelectorAll('.timeline-entry').length;
  if (historicoTotal) historicoTotal.textContent = totalAll;
}

var photosModal      = document.getElementById('photos-modal');
var imageViewerModal = document.getElementById('image-viewer-modal');
var photosModalTitle = document.getElementById('photos-modal-title');
var imageViewerTitle = document.getElementById('image-viewer-title');
var imageViewerLabel = document.getElementById('image-viewer-label');

function openModal(modal) { if (modal) modal.classList.add('open'); }
function closeModal(modal) { if (modal) modal.classList.remove('open'); }

function openPhotosForDay(label) {
  if (photosModalTitle) {
    photosModalTitle.textContent = 'Fotos enviadas — ' + (label || 'Paciente');
  }
  openModal(photosModal);
}

document.querySelectorAll('.btn-tl-action[data-open-fotos]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    openPhotosForDay(btn.dataset.openFotos);
  });
});

document.querySelectorAll('.photo-placeholder').forEach(function(photo) {
  photo.addEventListener('click', function() {
    var label = photo.dataset.photoLabel || 'Foto enviada';
    if (imageViewerTitle) imageViewerTitle.textContent = 'Imagem ampliada — ' + label;
    if (imageViewerLabel) imageViewerLabel.textContent = label;
    openModal(imageViewerModal);
  });
});

document.querySelectorAll('[data-close-modal]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    closeModal(document.getElementById(btn.dataset.closeModal));
  });
});

document.querySelectorAll('.modal-overlay').forEach(function(modal) {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function(modal) {
      closeModal(modal);
    });
    if (notificationMenu) notificationMenu.classList.remove('open');
  }
});

var toastEl = null;
var toastTimer = null;

function mostrarToast(msg) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'toast-msg';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toastEl.classList.remove('show');
  }, 2400);
}

calcularContadores();
applyHistFilter('todos');
atualizarNotificationDot();