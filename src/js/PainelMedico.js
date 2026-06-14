var usuario = JSON.parse(localStorage.getItem('usuarioLogado')) || {};

if (!usuario.nome || usuario.perfil !== 'profissional') {
  window.location.href = "../../index.html";
}

var medicosCadastrados = JSON.parse(localStorage.getItem('medicosCadastrados')) || [];
var medicoCompleto = medicosCadastrados.find(function(m){ return m.email === usuario.email; }) || {};

var _iniciais = (usuario.nome || 'MD')
  .split(' ').filter(function(p){ return p.length > 0; })
  .slice(0, 2).map(function(p){ return p[0].toUpperCase(); }).join('');

var topbarNome   = document.querySelector('.user-name');
var topbarAvatar = document.querySelector('.user-profile .avatar');

if (topbarNome)   topbarNome.textContent   = usuario.nome;
if (topbarAvatar) topbarAvatar.textContent = _iniciais;

var savedProfileImageUrl = localStorage.getItem('medico_foto_perfil') || null;
if (savedProfileImageUrl && topbarAvatar) {
  topbarAvatar.innerHTML = '<img class="avatar-img" src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
}

var pacientes  = JSON.parse(localStorage.getItem('pacientes'))       || [];
var alertasLS  = JSON.parse(localStorage.getItem('alertas_medico'))  || [];
var duvidasLS  = JSON.parse(localStorage.getItem('duvidas_medico'))  || [];

var _duvidaState = JSON.parse(localStorage.getItem('medico_duvidas_state')) || {};

duvidasLS.forEach(function(d) {
  if (_duvidaState[d.id]) {
    d.status   = _duvidaState[d.id].status   || d.status;
    d.resposta = _duvidaState[d.id].resposta  || d.resposta;
  }
});

var totalPacientesAtivos  = pacientes.filter(function(p){ return p.status === 'ativo'; }).length;
var atualizacoesHoje      = pacientes.filter(function(p){ return p.atualizacaoHoje; }).length;
var alertasAbertos        = alertasLS.filter(function(a){ return a.status === 'active'; }).length;

(function() {
  var kpis = document.querySelectorAll('.kpi-info h3');
  if (kpis[0]) kpis[0].textContent = totalPacientesAtivos;
  if (kpis[1]) kpis[1].textContent = atualizacoesHoje;
  if (kpis[2]) kpis[2].textContent = alertasAbertos;
})();

(function() {
  var feedList = document.querySelector('.feed-list');
  if (!feedList) return;

  var comAtualizacao = pacientes
    .filter(function(p){ return p.atualizacaoHoje && p.ultimaAtualizacao; })
    .slice(0, 5); /* máximo 5 itens no feed */

  if (comAtualizacao.length === 0) {
    feedList.innerHTML = '<div class="feed-item"><div class="feed-content"><p class="feed-text">Nenhuma atualização registrada hoje.</p></div></div>';
    return;
  }

  feedList.innerHTML = comAtualizacao.map(function(p) {
    var ini = p.iniciais || gerarIniciais(p.nome);
    var atu = p.ultimaAtualizacao;
    var botao = '';

    if (atu.tipo === 'fotos') {
      botao = '<button class="btn-small btn-avaliar-fotos-feed" data-paciente="' + escapar(p.nome) + '">'
            + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Avaliar Fotos</button>';
    } else if (atu.tipo === 'duvida') {
      var duvidaId = encontrarDuvidaId(p.id);
      botao = '<button class="btn-small btn-responder-feed" data-duvida-id="' + duvidaId + '">Responder Mensagem</button>';
    }

    return '<div class="feed-item">'
      + '<div class="feed-avatar">' + ini + '</div>'
      + '<div class="feed-content">'
      + '<div class="feed-header"><span class="feed-name">' + escapar(p.nome) + ' (Dia ' + (p.diaPos || '?') + ')</span>'
      + '<span class="feed-time">' + escapar(atu.tempo || '') + '</span></div>'
      + '<p class="feed-text">' + escapar(atu.texto || '') + '</p>'
      + botao
      + '</div></div>';
  }).join('');

  feedList.querySelectorAll('.btn-avaliar-fotos-feed').forEach(function(btn) {
    btn.addEventListener('click', function(){ openPhotosForPatient(btn.dataset.paciente); });
  });
  feedList.querySelectorAll('.btn-responder-feed').forEach(function(btn) {
    btn.addEventListener('click', function(){
      mostrarMensagens();
      if (btn.dataset.duvidaId) setTimeout(function(){ scrollToTarget(btn.dataset.duvidaId); }, 80);
    });
  });
})();

(function() {
  var alertList = document.querySelector('.alert-list');
  if (!alertList) return;

  var ativos = alertasLS.filter(function(a){ return a.status === 'active'; }).slice(0, 4);

  if (ativos.length === 0) {
    alertList.innerHTML = '<div class="alert-item"><div class="alert-info"><div class="alert-text"><p>Nenhuma pendência no momento.</p></div></div></div>';
    return;
  }

  alertList.innerHTML = ativos.map(function(a) {
    var dotClass = a.tipo === 'criticos' ? 'dot-red' : 'dot-yellow';
    var btnClass = a.tipo === 'criticos' ? 'btn-action red' : 'btn-action';
    var label    = a.tipo === 'criticos' ? 'Atender' : 'Cobrar';
    return '<div class="alert-item">'
      + '<div class="alert-info">'
      + '<div class="alert-dot ' + dotClass + '"></div>'
      + '<div class="alert-text"><h4>' + escapar(a.pacienteNome) + '</h4><p>' + escapar(a.descricao) + '</p></div>'
      + '</div>'
      + '<button class="' + btnClass + ' btn-painel-atender" data-alerta-id="' + a.id + '">' + label + '</button>'
      + '</div>';
  }).join('');

  alertList.querySelectorAll('.btn-painel-atender').forEach(function(btn) {
    btn.addEventListener('click', function(){
      mostrarAlertas();
      setTimeout(function(){ scrollToTarget(btn.dataset.alertaId); }, 80);
    });
  });
})();

(function() {
  var grid = document.querySelector('.alerts-grid section .panel');
  if (!grid) return;

  var heroCont = document.querySelector('.alerts-counter strong');
  if (heroCont) heroCont.textContent = alertasAbertos;

  var criticos = alertasLS.filter(function(a){ return a.status==='active' && a.tipo==='criticos'; }).length;
  var atrasos  = alertasLS.filter(function(a){ return a.status==='active' && a.tipo==='atrasos'; }).length;
  var summaryItems = document.querySelectorAll('#alertas-section .summary-item .summary-number');
  if (summaryItems[0]) summaryItems[0].textContent = criticos;
  if (summaryItems[1]) summaryItems[1].textContent = atrasos;

  var emptyEl = document.getElementById('empty-alerts');

  document.querySelectorAll('#alertas-section .alert-card').forEach(function(c){ c.remove(); });

  if (alertasLS.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  alertasLS.forEach(function(a) {
    var card = document.createElement('article');
    card.className = 'alert-card';
    card.id        = a.id;
    card.dataset.alertStatus = a.status;
    card.dataset.alertType   = a.tipo;

    var isCrit = a.tipo === 'criticos';
    var badge  = isCrit ? '<span class="status-badge badge-danger alert-badge">Crítico</span>'
                        : '<span class="status-badge badge-warning alert-badge">Atraso</span>';
    var iconClass = isCrit ? 'high' : 'medium';
    var iconSvg   = isCrit
      ? '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
      : '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>';
    var btnClass = isCrit ? 'btn-action red btn-resolve-alert' : 'btn-action btn-dismiss-alert';
    var btnLabel = isCrit ? 'Atender' : 'Cobrar';

    card.innerHTML =
      '<div class="severity-icon ' + iconClass + '">'
      + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + iconSvg + '</svg>'
      + '</div>'
      + '<div class="alert-content">'
      + '<h3 class="alert-patient-name">' + escapar(a.pacienteNome) + '</h3>'
      + '<div class="alert-meta"><span>Dia ' + (a.diaPosOp||'?') + ' pós-operatório</span><span>' + escapar(a.tempo||'') + '</span></div>'
      + '<p>' + escapar(a.descricao||'') + '</p>'
      + badge
      + '</div>'
      + '<div class="alert-actions"><button class="' + btnClass + '" type="button" data-alerta-id="' + a.id + '">' + btnLabel + '</button></div>';

    if (emptyEl && emptyEl.parentNode === grid) {
      grid.insertBefore(card, emptyEl);
    } else {
      grid.appendChild(card);
    }

    card.querySelector('.' + btnClass.split(' ')[0]).addEventListener('click', function() {
      resolverAlerta(a.id, card);
    });
  });
})();

(function() {
  var layout = document.querySelector('.questions-layout > section');
  if (!layout) return;

  var emptyEl = document.getElementById('empty-questions');

  document.querySelectorAll('#mensagens-section .question-card').forEach(function(c){ c.remove(); });

  var pendentes = duvidasLS.filter(function(d){ return d.status === 'pending'; }).length;
  var heroCount = document.querySelector('.messages-counter strong');
  if (heroCount) heroCount.textContent = pendentes;

  var pendSumEl = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(i){ return i.textContent.includes('pendentes'); });
  if (pendSumEl) { var v = pendSumEl.querySelector('strong'); if(v) v.textContent = pendentes; }

  if (duvidasLS.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  duvidasLS.forEach(function(d) {
    var card = document.createElement('article');
    card.className = 'question-card';
    card.id        = d.id;
    card.dataset.questionStatus = d.status;
    if (d.status === 'answered') card.classList.add('is-answered');

    var ini  = d.iniciais || gerarIniciais(d.pacienteNome);
    var badgeTxt   = d.status === 'answered' ? 'Respondida' : 'Aguardando resposta';
    var badgeStyle = d.status === 'answered'
      ? 'style="background:var(--success-bg);color:var(--success);"' : '';

    card.innerHTML =
      '<div class="question-header">'
      + '<div class="question-patient">'
      + '<div class="question-avatar">' + ini + '</div>'
      + '<div><h3>' + escapar(d.pacienteNome) + '</h3>'
      + '<span>Dia ' + (d.diaPosOp||'?') + ' pós-operatório · ' + escapar(d.tempo||'') + '</span></div>'
      + '</div>'
      + '<span class="question-badge" ' + badgeStyle + '>' + badgeTxt + '</span>'
      + '</div>'
      + '<div class="question-body">'
      + '<div class="question-label">Dúvida do paciente</div>'
      + '<div class="question-text">' + escapar(d.texto||'') + '</div>'
      + '<textarea class="answer-box" placeholder="Digite a orientação para o paciente..."'
      + (d.status === 'answered' ? ' disabled' : '') + '>'
      + (d.resposta ? escapar(d.resposta) : '')
      + '</textarea>'
      + '<div class="question-actions">'
      + '<button class="btn-secondary btn-view-photos" type="button" data-patient="' + escapar(d.pacienteNome) + '">Ver fotos enviadas</button>'
      + '<button class="btn-secondary btn-save-draft" type="button">Salvar rascunho</button>'
      + '<button class="btn-primary send-answer" type="button"'
      + (d.status === 'answered' ? ' disabled' : '') + '>'
      + (d.status === 'answered' ? 'Resposta enviada' : 'Enviar resposta')
      + '</button>'
      + '</div>'
      + '</div>';

    if (emptyEl && emptyEl.parentNode === layout) {
      layout.insertBefore(card, emptyEl);
    } else {
      layout.appendChild(card);
    }

    card.querySelector('.btn-view-photos').addEventListener('click', function() {
      openPhotosForPatient(d.pacienteNome);
    });

    card.querySelector('.btn-save-draft').addEventListener('click', function() {
      var ta = card.querySelector('.answer-box');
      var ans = ta.value.trim();
      if (!ans) { ta.focus(); return; }
      salvarDuvidaState(d.id, card.dataset.questionStatus, ans);
      downloadTextFile(
        'rascunho-' + sanitizeFilename(d.pacienteNome) + '.txt',
        'Paciente: ' + d.pacienteNome + '\n\nDúvida:\n' + d.texto + '\n\nRascunho:\n' + ans + '\n'
      );
    });

    card.querySelector('.answer-box').addEventListener('input', function() {
      salvarDuvidaState(d.id, card.dataset.questionStatus, card.querySelector('.answer-box').value);
    });

    card.querySelector('.send-answer').addEventListener('click', function() {
      enviarResposta(d.id, card);
    });
  });
})();

(function() {
  var menu = document.getElementById('notification-menu');
  if (!menu) return;

  /* Remove notificações estáticas existentes */
  menu.querySelectorAll('.notification-item').forEach(function(n){ n.remove(); });

  var alertasAtivos = alertasLS.filter(function(a){ return a.status === 'active'; });
  var duvidasPend   = duvidasLS.filter(function(d){ return d.status === 'pending'; });

  var itens = [];

  alertasAtivos.forEach(function(a) {
    var isCrit = a.tipo === 'criticos';
    itens.push({
      cor: isCrit ? 'red' : 'yellow',
      titulo: isCrit ? 'Alerta crítico' : 'Fotos atrasadas',
      texto: a.pacienteNome + ': ' + a.descricao.substring(0, 50) + (a.descricao.length > 50 ? '…' : ''),
      targetSection: 'alertas',
      targetId: a.id,
      category: a.tipo
    });
  });

  duvidasPend.forEach(function(d) {
    itens.push({
      cor: 'blue',
      titulo: 'Dúvida pendente',
      texto: d.pacienteNome + ' enviou uma dúvida.',
      targetSection: 'duvidas',
      targetId: d.id,
      category: 'duvidas',
      isDuvida: true
    });
  });

  itens.forEach(function(it) {
    var btn = document.createElement('button');
    btn.className = 'notification-item';
    btn.type = 'button';
    btn.dataset.targetSection = it.targetSection;
    btn.dataset.targetId      = it.targetId;
    btn.dataset.notificationCategory = it.category;
    if (it.isDuvida) btn.dataset.questionNotification = 'true';

    btn.innerHTML =
      '<div class="notification-icon ' + it.cor + '"></div>'
      + '<div class="notification-text">'
      + '<strong>' + escapar(it.titulo) + '</strong>'
      + '<span>' + escapar(it.texto) + '</span>'
      + '</div>';

    menu.appendChild(btn);

    btn.addEventListener('click', function() {
      if (it.targetSection === 'duvidas') mostrarMensagens();
      if (it.targetSection === 'alertas') mostrarAlertas();
      menu.classList.remove('open');
      setTimeout(function(){ scrollToTarget(it.targetId); }, 80);
    });
  });

  atualizarNotifDot();
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

var pageTitle            = document.querySelector('.page-title');
var painelSection        = document.getElementById('painel-section');
var alertasSection       = document.getElementById('alertas-section');
var mensagensSection     = document.getElementById('mensagens-section');
var configuracoesSection = document.getElementById('configuracoes-section');
var navPainel            = document.getElementById('nav-painel');
var navAlertas           = document.getElementById('nav-alertas');
var navMensagens         = document.getElementById('nav-mensagens');
var navConfiguracoes     = document.getElementById('nav-configuracoes');

function esconderPaginas() {
  [painelSection, alertasSection, mensagensSection, configuracoesSection].forEach(function(s){ if(s) s.classList.add('hidden'); });
}

function limparMenu() {
  [navPainel, navAlertas, navMensagens, navConfiguracoes].forEach(function(n){ if(n) n.classList.remove('active'); });
}

function mostrarPainel() {
  esconderPaginas(); limparMenu();
  painelSection.classList.remove('hidden');
  navPainel.classList.add('active');
  pageTitle.textContent = 'Início';
  closeSidebarOnMobile();
}

var currentAlertFilter = 'todos';

function mostrarAlertas() {
  esconderPaginas(); limparMenu();
  if (alertasSection) alertasSection.classList.remove('hidden');
  if (navAlertas) navAlertas.classList.add('active');
  pageTitle.textContent = 'Alertas';
  closeSidebarOnMobile();
  applyAlertFilter(currentAlertFilter);
}

var currentQuestionFilter = 'todas';

function mostrarMensagens() {
  esconderPaginas(); limparMenu();
  mensagensSection.classList.remove('hidden');
  navMensagens.classList.add('active');
  pageTitle.textContent = 'Dúvidas';
  closeSidebarOnMobile();
  applyQuestionFilter('todas');
}

function mostrarConfiguracoes() {
  esconderPaginas(); limparMenu();
  configuracoesSection.classList.remove('hidden');
  navConfiguracoes.classList.add('active');
  pageTitle.textContent = 'Configurações';
  carregarConfiguracoes();
  closeSidebarOnMobile();
}

if (navPainel)        navPainel.addEventListener('click',        function(e){ e.preventDefault(); mostrarPainel(); });
if (navAlertas)       navAlertas.addEventListener('click',       function(e){ e.preventDefault(); mostrarAlertas(); });
if (navMensagens)     navMensagens.addEventListener('click',     function(e){ e.preventDefault(); mostrarMensagens(); });
if (navConfiguracoes) navConfiguracoes.addEventListener('click', function(e){ e.preventDefault(); mostrarConfiguracoes(); });

/* Sair */
var btnSairEl = Array.from(document.querySelectorAll('.nav-item')).find(function(el){ return el.textContent.trim().startsWith('Sair'); });
if (btnSairEl) {
  btnSairEl.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('usuarioLogado');
    window.location.href = "../../index.html";
  });
}

var notificationBtn     = document.getElementById('notification-btn');
var notificationMenu    = document.getElementById('notification-menu');
var notificationWrapper = document.querySelector('.notification-wrapper');
var notificationDot     = document.querySelector('.notification-dot');
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
  notificationWrapper.addEventListener('mouseenter', function() { clearTimeout(notificationCloseTimer); notificationMenu.classList.add('open'); });
  notificationWrapper.addEventListener('mouseleave', function() { notificationCloseTimer = setTimeout(function(){ notificationMenu.classList.remove('open'); }, 350); });
  notificationMenu.addEventListener('mouseenter',   function() { clearTimeout(notificationCloseTimer); });
  notificationMenu.addEventListener('mouseleave',   function() { notificationCloseTimer = setTimeout(function(){ notificationMenu.classList.remove('open'); }, 250); });
}

var photosModal      = document.getElementById('photos-modal');
var imageViewerModal = document.getElementById('image-viewer-modal');
var imageViewerTitle = document.getElementById('image-viewer-title');
var imageViewerLabel = document.getElementById('image-viewer-label');
var photosModalTitle = document.getElementById('photos-modal-title');

function openModal(modal)  { if (modal) modal.classList.add('open'); }
function closeModal(modal) { if (modal) modal.classList.remove('open'); }

function openPhotosForPatient(name) {
  if (photosModalTitle) photosModalTitle.textContent = 'Fotos enviadas — ' + name;
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

var alertFilterButtons = document.querySelectorAll('.alert-filter-btn');
var alertsListTitle    = document.getElementById('alerts-list-title');
var emptyAlerts        = document.getElementById('empty-alerts');

function applyAlertFilter(filter) {
  currentAlertFilter = filter;
  var visibleCount = 0;
  alertFilterButtons.forEach(function(btn){ btn.classList.toggle('active', btn.dataset.alertFilter === filter); });
  document.querySelectorAll('#alertas-section .alert-card').forEach(function(card) {
    var show = filter === 'todos' || card.dataset.alertType === filter;
    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });
  if (emptyAlerts) emptyAlerts.style.display = visibleCount === 0 ? 'block' : 'none';
  if (alertsListTitle) {
    if (filter === 'criticos')     alertsListTitle.textContent = 'Alertas críticos';
    else if (filter === 'atrasos') alertsListTitle.textContent = 'Atrasos de envio';
    else                           alertsListTitle.textContent = 'Todos os alertas';
  }
}

alertFilterButtons.forEach(function(btn) {
  btn.addEventListener('click', function(){ applyAlertFilter(btn.dataset.alertFilter); });
});

var questionFilterButtons = document.querySelectorAll('.question-filter-btn');
var questionsListTitle    = document.getElementById('questions-list-title');
var emptyQuestions        = document.getElementById('empty-questions');

function applyQuestionFilter(filter) {
  currentQuestionFilter = filter;
  var visibleCount = 0;
  questionFilterButtons.forEach(function(btn){ btn.classList.toggle('active', btn.dataset.questionFilter === filter); });
  document.querySelectorAll('#mensagens-section .question-card').forEach(function(card) {
    var show = filter === 'todas' || card.dataset.questionStatus === filter;
    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });
  if (emptyQuestions) emptyQuestions.style.display = visibleCount === 0 ? 'block' : 'none';
  if (questionsListTitle) {
    if (filter === 'pending')       questionsListTitle.textContent = 'Dúvidas pendentes';
    else if (filter === 'answered') questionsListTitle.textContent = 'Dúvidas respondidas';
    else                            questionsListTitle.textContent = 'Todas as dúvidas';
  }
}

questionFilterButtons.forEach(function(btn) {
  btn.addEventListener('click', function(){ applyQuestionFilter(btn.dataset.questionFilter); });
});

document.querySelectorAll('.quick-answer').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var boxes = document.querySelectorAll('#mensagens-section .answer-box:not([disabled])');
    var box = Array.from(boxes).find(function(b){ return b.value.trim() === ''; })
           || Array.from(boxes).find(function(b){ return b; });
    if (!box) return;
    box.value = btn.textContent.trim();
    box.focus();
    var card = box.closest('.question-card');
    if (card) salvarDuvidaState(card.id, card.dataset.questionStatus, box.value);
  });
});

var savedNotificationPreferences = JSON.parse(localStorage.getItem('medico_notif_prefs')) || { criticos: true, duvidas: true, atrasos: true };
var saveProfileSettings  = document.getElementById('save-profile-settings');
var settingsSaveMessage  = document.getElementById('settings-save-message');
var profilePhotoInput    = document.getElementById('config-foto');
var resetProfilePhoto    = document.getElementById('reset-profile-photo');
var profilePhotoPreview  = document.getElementById('profile-photo-preview');
var notificationToggles  = document.querySelectorAll('[data-notification-toggle]');

var pendingProfileImageUrl   = null;
var pendingProfilePhotoReset = false;

notificationToggles.forEach(function(t) {
  var key  = t.dataset.notificationToggle;
  t.checked = savedNotificationPreferences[key] !== false;
});

function carregarConfiguracoes() {
  var configNome          = document.getElementById('config-nome');
  var configCrm           = document.getElementById('config-crm');
  var configEspecialidade = document.getElementById('config-especialidade');
  var configClinica       = document.getElementById('config-clinica');
  var configAssinatura    = document.getElementById('config-assinatura');
  var fotoPreview         = document.getElementById('profile-photo-preview');

  if (configNome)          configNome.value          = usuario.nome || '';
  if (configCrm)           configCrm.value           = usuario.crm || (medicoCompleto.dadosProfissionais && medicoCompleto.dadosProfissionais.crm) || '';
  if (configEspecialidade) configEspecialidade.value = (medicoCompleto.dadosProfissionais && medicoCompleto.dadosProfissionais.especialidade) || '';
  if (configClinica)       configClinica.value       = (medicoCompleto.dadosProfissionais && medicoCompleto.dadosProfissionais.clinica) || usuario.clinica || 'HairCare Pro';

  var assinaturaSalva = localStorage.getItem('medico_assinatura');
  if (configAssinatura) configAssinatura.value = assinaturaSalva || ('Atenciosamente, ' + (usuario.nome || '') + ' - HairCare Pro');

  if (savedProfileImageUrl && fotoPreview) {
    fotoPreview.innerHTML = '<img src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
    if (topbarAvatar) topbarAvatar.innerHTML = '<img class="avatar-img" src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
  } else if (fotoPreview) {
    fotoPreview.textContent = _iniciais;
  }
}

function showSettingsMessage(text, type) {
  if (!settingsSaveMessage) return;
  settingsSaveMessage.textContent = text;
  settingsSaveMessage.classList.remove('warning');
  if (type === 'warning') settingsSaveMessage.classList.add('warning');
  settingsSaveMessage.classList.add('show');
  setTimeout(function(){ settingsSaveMessage.classList.remove('show'); }, 2400);
}

if (profilePhotoInput && profilePhotoPreview) {
  profilePhotoInput.addEventListener('change', function() {
    var file = profilePhotoInput.files && profilePhotoInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showSettingsMessage('Selecione um arquivo de imagem válido.', 'warning'); profilePhotoInput.value=''; pendingProfileImageUrl=null; return; }
    var reader = new FileReader();
    reader.onload = function(e) {
      pendingProfileImageUrl   = e.target.result;
      pendingProfilePhotoReset = false;
      profilePhotoPreview.innerHTML = '<img src="' + pendingProfileImageUrl + '" alt="Prévia"/>';
      showSettingsMessage('Foto carregada. Salve para aplicar.', 'success');
    };
    reader.readAsDataURL(file);
  });
}

if (resetProfilePhoto && profilePhotoPreview && profilePhotoInput) {
  resetProfilePhoto.addEventListener('click', function() {
    pendingProfileImageUrl = null; pendingProfilePhotoReset = true; profilePhotoInput.value = '';
    profilePhotoPreview.textContent = _iniciais;
    showSettingsMessage('Foto redefinida. Salve para aplicar.', 'success');
  });
}

notificationToggles.forEach(function(t) {
  t.addEventListener('change', function() {
    var label  = t.closest('.settings-toggle').querySelector('strong').textContent.trim();
    var status = t.checked ? 'ativadas' : 'desativadas';
    showSettingsMessage('Preferência de ' + label + ' ' + status + '. Salve para aplicar.', 'success');
  });
});

if (saveProfileSettings) {
  saveProfileSettings.addEventListener('click', function() {
    notificationToggles.forEach(function(t){ savedNotificationPreferences[t.dataset.notificationToggle] = t.checked; });
    localStorage.setItem('medico_notif_prefs', JSON.stringify(savedNotificationPreferences));

    var configAssinatura = document.getElementById('config-assinatura');
    if (configAssinatura) localStorage.setItem('medico_assinatura', configAssinatura.value);

    if (pendingProfilePhotoReset) {
      savedProfileImageUrl = null; pendingProfileImageUrl = null; pendingProfilePhotoReset = false; profilePhotoInput.value = '';
      localStorage.removeItem('medico_foto_perfil');
      if (topbarAvatar)        topbarAvatar.textContent        = _iniciais;
      if (profilePhotoPreview) profilePhotoPreview.textContent = _iniciais;
    } else if (pendingProfileImageUrl) {
      savedProfileImageUrl = pendingProfileImageUrl;
      localStorage.setItem('medico_foto_perfil', savedProfileImageUrl);
      if (topbarAvatar)        topbarAvatar.innerHTML        = '<img class="avatar-img" src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
      if (profilePhotoPreview) profilePhotoPreview.innerHTML = '<img src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
      pendingProfileImageUrl = null;
    }

    atualizarNotifPreferencias();
    showSettingsMessage('Configurações salvas com sucesso.', 'success');
  });
}

var answeredTodayCount = parseInt(localStorage.getItem('medico_respondidas_hoje')) || 0;

function resolverAlerta(alertaId, card) {
  var alerta = alertasLS.find(function(a){ return a.id === alertaId; });
  if (alerta) alerta.status = 'resolved';

  localStorage.setItem('alertas_medico', JSON.stringify(alertasLS));

  card.style.transition = 'opacity .3s';
  card.style.opacity    = '0';
  setTimeout(function() {
    card.remove();
    var restantes = document.querySelectorAll('#alertas-section .alert-card[data-alert-status="active"]').length;
    if (restantes === 0 && emptyAlerts) emptyAlerts.style.display = 'block';
    atualizarAlertaBadge();
    atualizarNotifDot();
  }, 320);

  alertasAbertos = Math.max(0, alertasAbertos - 1);
  var kpis = document.querySelectorAll('.kpi-info h3');
  if (kpis[2]) kpis[2].textContent = alertasAbertos;
}

function enviarResposta(duvidaId, card) {
  if (card.dataset.questionStatus === 'answered') return;
  var textarea = card.querySelector('.answer-box');
  if (!textarea.value.trim()) { textarea.focus(); return; }

  var duvida = duvidasLS.find(function(d){ return d.id === duvidaId; });
  if (duvida) { duvida.status = 'answered'; duvida.resposta = textarea.value.trim(); }

  salvarDuvidaState(duvidaId, 'answered', textarea.value.trim());
  localStorage.setItem('duvidas_medico', JSON.stringify(duvidasLS));

  card.dataset.questionStatus = 'answered';
  card.classList.add('is-answered');
  var badge   = card.querySelector('.question-badge');
  var sendBtn = card.querySelector('.send-answer');
  if (badge)   { badge.textContent = 'Respondida'; badge.style.background = 'var(--success-bg)'; badge.style.color = 'var(--success)'; }
  textarea.disabled   = true;
  if (sendBtn) { sendBtn.textContent = 'Resposta enviada'; sendBtn.disabled = true; }

  answeredTodayCount++;
  localStorage.setItem('medico_respondidas_hoje', answeredTodayCount);

  var pendentes = duvidasLS.filter(function(d){ return d.status === 'pending'; }).length;
  var heroCount = document.querySelector('.messages-counter strong');
  if (heroCount) heroCount.textContent = pendentes;
  var duvidasBadge = document.querySelector('#nav-mensagens .badge-nav');
  if (duvidasBadge) { duvidasBadge.textContent = pendentes; duvidasBadge.style.display = pendentes > 0 ? 'inline-flex' : 'none'; }
  var pendSumEl = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(i){ return i.textContent.includes('pendentes'); });
  if (pendSumEl) { var v = pendSumEl.querySelector('strong'); if(v) v.textContent = pendentes; }
  var ansSumEl = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(i){ return i.textContent.includes('Respondidas'); });
  if (ansSumEl) { var v2 = ansSumEl.querySelector('strong'); if(v2) v2.textContent = answeredTodayCount; }

  atualizarNotifDot();
  applyQuestionFilter(currentQuestionFilter);
}

function gerarIniciais(nome) {
  return (nome || 'P').split(' ').filter(function(p){ return p.length > 0; }).slice(0, 2).map(function(p){ return p[0].toUpperCase(); }).join('');
}

function escapar(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function encontrarDuvidaId(pacienteId) {
  var d = duvidasLS.find(function(d){ return d.pacienteId === pacienteId && d.status === 'pending'; });
  return d ? d.id : '';
}

function salvarDuvidaState(id, status, resposta) {
  _duvidaState[id] = { status: status, resposta: resposta };
  localStorage.setItem('medico_duvidas_state', JSON.stringify(_duvidaState));
}

function scrollToTarget(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.add('focus-highlight');
  setTimeout(function(){ target.classList.remove('focus-highlight'); }, 1400);
}

function downloadTextFile(filename, content) {
  var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  var url  = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click();
  document.body.removeChild(link); URL.revokeObjectURL(url);
}

function sanitizeFilename(text) {
  return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-+|-+$/g,'').toLowerCase();
}

function atualizarAlertaBadge() {
  var count = alertasLS.filter(function(a){ return a.status==='active'; }).length;
  var badge = document.querySelector('#nav-alertas .badge-nav');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'inline-flex' : 'none'; }
}

function atualizarNotifDot() {
  var vis = document.querySelectorAll('.notification-item:not(.is-hidden)').length;
  if (notificationDot) {
    notificationDot.textContent  = vis;
    notificationDot.style.display = vis > 0 ? 'grid' : 'none';
  }
}

function atualizarNotifPreferencias() {
  notificationToggles.forEach(function(t) {
    var key = t.dataset.notificationToggle;
    var on  = savedNotificationPreferences[key] !== false;
    document.querySelectorAll('[data-notification-category="' + key + '"]').forEach(function(item) {
      item.classList.toggle('is-hidden', !on);
    });
    var row = t.closest('.settings-toggle');
    if (row) row.classList.toggle('notification-disabled', !on);
  });
  atualizarNotifDot();
}

(function() {
  var alertCount = alertasLS.filter(function(a){ return a.status==='active'; }).length;
  var pendentes  = duvidasLS.filter(function(d){ return d.status==='pending'; }).length;
  var aB = document.querySelector('#nav-alertas .badge-nav');
  var mB = document.querySelector('#nav-mensagens .badge-nav');
  if (aB) { aB.textContent = alertCount;  aB.style.display = alertCount  > 0 ? 'inline-flex' : 'none'; }
  if (mB) { mB.textContent = pendentes;   mB.style.display = pendentes   > 0 ? 'inline-flex' : 'none'; }
  atualizarNotifPreferencias();
  applyAlertFilter('todos');
  applyQuestionFilter('todas');
})();
