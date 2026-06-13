var usuario = JSON.parse(localStorage.getItem('usuarioLogado')) || {};

if (!usuario.nome || usuario.perfil !== 'profissional') {
  window.location.href = "../../index.html";
}

var medicosCadastrados = JSON.parse(localStorage.getItem('medicosCadastrados')) || [];
var medicoCompleto = medicosCadastrados.find(function(m) { return m.email === usuario.email; }) || {};

var _iniciais = (usuario.nome || 'MD').split(' ').filter(function(p){return p.length>0;}).slice(0,2).map(function(p){return p[0].toUpperCase();}).join('');

var topbarNome   = document.querySelector('.user-name');
var topbarAvatar = document.querySelector('.user-profile .avatar');

if (topbarNome)   topbarNome.textContent   = usuario.nome;
if (topbarAvatar) topbarAvatar.textContent = _iniciais;

var savedProfileImageUrl = localStorage.getItem('medico_foto_perfil') || null;
if (savedProfileImageUrl && topbarAvatar) {
  topbarAvatar.innerHTML = '<img class="avatar-img" src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
}

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

function mostrarAlertas() {
  esconderPaginas(); limparMenu();
  if (alertasSection) alertasSection.classList.remove('hidden');
  if (navAlertas) navAlertas.classList.add('active');
  pageTitle.textContent = 'Alertas';
  closeSidebarOnMobile();
  applyAlertFilter(currentAlertFilter);
}

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

navPainel.addEventListener('click',        function(e){e.preventDefault();mostrarPainel();});
navAlertas.addEventListener('click',       function(e){e.preventDefault();mostrarAlertas();});
navMensagens.addEventListener('click',     function(e){e.preventDefault();mostrarMensagens();});
navConfiguracoes.addEventListener('click', function(e){e.preventDefault();mostrarConfiguracoes();});

var btnSairIcon = document.querySelector('.nav-item .fa-right-from-bracket');
if (btnSairIcon) {
  btnSairIcon.closest('.nav-item').addEventListener('click', function(e) {
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
  notificationWrapper.addEventListener('mouseleave', function() { notificationCloseTimer = setTimeout(function(){notificationMenu.classList.remove('open');}, 350); });
  notificationMenu.addEventListener('mouseenter',   function() { clearTimeout(notificationCloseTimer); notificationMenu.classList.add('open'); });
  notificationMenu.addEventListener('mouseleave',   function() { notificationCloseTimer = setTimeout(function(){notificationMenu.classList.remove('open');}, 250); });
}

var photosModal      = document.getElementById('photos-modal');
var imageViewerModal = document.getElementById('image-viewer-modal');
var imageViewerTitle = document.getElementById('image-viewer-title');
var imageViewerLabel = document.getElementById('image-viewer-label');
var photosModalTitle = document.getElementById('photos-modal-title');
var btnAvaliarFotos  = document.getElementById('btn-avaliar-fotos');
var btnResponderMensagem = document.getElementById('btn-responder-mensagem');

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
  btn.addEventListener('click', function() { closeModal(document.getElementById(btn.dataset.closeModal)); });
});

document.querySelectorAll('.modal-overlay').forEach(function(modal) {
  modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(modal); });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function(m){ closeModal(m); });
    if (notificationMenu) notificationMenu.classList.remove('open');
  }
});

if (btnAvaliarFotos)      btnAvaliarFotos.addEventListener('click',      function() { openPhotosForPatient('Paciente'); });
if (btnResponderMensagem) btnResponderMensagem.addEventListener('click', function() { mostrarMensagens(); setTimeout(function(){scrollToTarget('duvida-andre');}, 80); });

document.querySelectorAll('.btn-view-photos').forEach(function(btn) {
  btn.addEventListener('click', function() { openPhotosForPatient(btn.dataset.patient || 'Paciente'); });
});

var quickAnswers          = document.querySelectorAll('.quick-answer');
var answerBoxes           = document.querySelectorAll('.answer-box');
var sendAnswerButtons     = document.querySelectorAll('.send-answer');
var draftButtons          = document.querySelectorAll('.btn-save-draft');
var notificationItems     = document.querySelectorAll('.notification-item[data-target-section]');
var questionFilterButtons = document.querySelectorAll('.question-filter-btn');
var questionCards         = document.querySelectorAll('#mensagens-section .question-card');
var emptyQuestions        = document.getElementById('empty-questions');
var questionsListTitle    = document.getElementById('questions-list-title');
var duvidasBadge          = document.querySelector('#nav-mensagens .badge-nav');
var messagesCounterNumber = document.querySelector('.messages-counter strong');

var pendingSummary  = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(i){return i.textContent.includes('Dúvidas pendentes');});
var answeredSummary = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(i){return i.textContent.includes('Respondidas hoje');});

var _duvidaState              = JSON.parse(localStorage.getItem('medico_duvidas_state')) || {};
var pendingQuestionsCount     = 0;
var answeredTodayCount        = parseInt(localStorage.getItem('medico_respondidas_hoje')) || 0;
var currentQuestionFilter     = 'todas';
var savedNotificationPreferences = JSON.parse(localStorage.getItem('medico_notif_prefs')) || { criticos: true, duvidas: true, atrasos: true };

questionCards.forEach(function(card) {
  var id = card.id;
  if (_duvidaState[id]) {
    var s        = _duvidaState[id];
    card.dataset.questionStatus = s.status;
    var textarea = card.querySelector('.answer-box');
    var badge    = card.querySelector('.question-badge');
    var sendBtn  = card.querySelector('.send-answer');
    if (s.resposta && textarea) textarea.value = s.resposta;
    if (s.status === 'answered') {
      card.classList.add('is-answered');
      if (badge)   { badge.textContent = 'Respondida'; badge.style.background = 'var(--success-bg)'; badge.style.color = 'var(--success)'; }
      if (textarea)  textarea.disabled = true;
      if (sendBtn) { sendBtn.textContent = 'Resposta enviada'; sendBtn.disabled = true; }
    }
  }
  if (card.dataset.questionStatus === 'pending') pendingQuestionsCount++;
});

function salvarDuvidaState(card) {
  var id       = card.id;
  var textarea = card.querySelector('.answer-box');
  _duvidaState[id] = { status: card.dataset.questionStatus, resposta: textarea ? textarea.value : '' };
  localStorage.setItem('medico_duvidas_state', JSON.stringify(_duvidaState));
}

function applyQuestionFilter(filter) {
  currentQuestionFilter = filter;
  var visibleCount = 0;
  questionFilterButtons.forEach(function(btn) { btn.classList.toggle('active', btn.dataset.questionFilter === filter); });
  questionCards.forEach(function(card) {
    var show = filter === 'todas' || card.dataset.questionStatus === filter;
    card.style.display = show ? 'block' : 'none';
    if (show) visibleCount++;
  });
  if (emptyQuestions) emptyQuestions.style.display = visibleCount === 0 ? 'block' : 'none';
  if (questionsListTitle) {
    if (filter === 'pending')       questionsListTitle.textContent = 'Dúvidas pendentes';
    else if (filter === 'answered') questionsListTitle.textContent = 'Dúvidas respondidas';
    else                            questionsListTitle.textContent = 'Todas as dúvidas';
  }
}

function updateQuestionCounters() {
  if (duvidasBadge)          { duvidasBadge.textContent = pendingQuestionsCount; duvidasBadge.style.display = pendingQuestionsCount > 0 ? 'inline-flex' : 'none'; }
  if (messagesCounterNumber)   messagesCounterNumber.textContent = pendingQuestionsCount;
  if (pendingSummary)  { var v  = pendingSummary.querySelector('strong');  if (v)  v.textContent = pendingQuestionsCount; }
  if (answeredSummary) { var v2 = answeredSummary.querySelector('strong'); if (v2) v2.textContent = answeredTodayCount; }
  document.querySelectorAll('[data-question-notification="true"]').forEach(function(item) {
    item.classList.toggle('is-hidden', pendingQuestionsCount === 0 || savedNotificationPreferences.duvidas === false);
  });
  if (notificationDot) {
    var vis = document.querySelectorAll('.notification-item:not(.is-hidden)').length;
    notificationDot.textContent = vis;
    notificationDot.style.display = vis > 0 ? 'grid' : 'none';
  }
}

function scrollToTarget(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({behavior:'smooth', block:'center'});
  target.classList.add('focus-highlight');
  setTimeout(function(){target.classList.remove('focus-highlight');}, 1400);
}

notificationItems.forEach(function(item) {
  item.addEventListener('click', function() {
    if (item.dataset.targetSection === 'duvidas') mostrarMensagens();
    if (item.dataset.targetSection === 'alertas') mostrarAlertas();
    if (notificationMenu) notificationMenu.classList.remove('open');
    setTimeout(function(){scrollToTarget(item.dataset.targetId);}, 80);
  });
});

quickAnswers.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var box = Array.from(answerBoxes).find(function(b){return !b.disabled && b.value.trim()==='';})
           || Array.from(answerBoxes).find(function(b){return !b.disabled;});
    if (!box) return;
    box.value = btn.textContent.trim();
    box.focus();
    var card = box.closest('.question-card');
    if (card) salvarDuvidaState(card);
  });
});

answerBoxes.forEach(function(box) {
  box.addEventListener('input', function() {
    var card = box.closest('.question-card');
    if (card) salvarDuvidaState(card);
  });
});

questionFilterButtons.forEach(function(btn) {
  btn.addEventListener('click', function() { applyQuestionFilter(btn.dataset.questionFilter); });
});

function downloadTextFile(filename, content) {
  var blob = new Blob([content], {type:'text/plain;charset=utf-8'});
  var url  = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click();
  document.body.removeChild(link); URL.revokeObjectURL(url);
}

function sanitizeFilename(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-+|-+$/g,'').toLowerCase();
}

draftButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var card     = btn.closest('.question-card');
    var name     = card.querySelector('.question-patient h3').textContent.trim();
    var question = card.querySelector('.question-text').textContent.trim();
    var textarea = card.querySelector('.answer-box');
    var answer   = textarea.value.trim();
    if (!answer) { textarea.focus(); return; }
    salvarDuvidaState(card);
    downloadTextFile('rascunho-' + sanitizeFilename(name) + '.txt', 'Paciente: ' + name + '\n\nDúvida:\n' + question + '\n\nRascunho:\n' + answer + '\n');
  });
});

sendAnswerButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var card     = btn.closest('.question-card');
    var textarea = card.querySelector('.answer-box');
    var badge    = card.querySelector('.question-badge');
    if (card.dataset.questionStatus === 'answered') return;
    if (!textarea.value.trim()) { textarea.focus(); return; }
    card.dataset.questionStatus = 'answered';
    card.classList.add('is-answered');
    badge.textContent      = 'Respondida';
    badge.style.background = 'var(--success-bg)';
    badge.style.color      = 'var(--success)';
    textarea.disabled      = true;
    btn.textContent        = 'Resposta enviada';
    btn.disabled           = true;
    pendingQuestionsCount  = Math.max(0, pendingQuestionsCount - 1);
    answeredTodayCount++;
    localStorage.setItem('medico_respondidas_hoje', answeredTodayCount);
    salvarDuvidaState(card);
    updateQuestionCounters();
    updateNotificationPreferences();
    applyQuestionFilter(currentQuestionFilter);
  });
});

var saveProfileSettings  = document.getElementById('save-profile-settings');
var settingsSaveMessage  = document.getElementById('settings-save-message');
var profilePhotoInput    = document.getElementById('config-foto');
var resetProfilePhoto    = document.getElementById('reset-profile-photo');
var profilePhotoPreview  = document.getElementById('profile-photo-preview');
var notificationToggles  = document.querySelectorAll('[data-notification-toggle]');

var pendingProfileImageUrl   = null;
var pendingProfilePhotoReset = false;

notificationToggles.forEach(function(t) {
  var key = t.dataset.notificationToggle;
  t.checked = savedNotificationPreferences[key] !== false;
  savedNotificationPreferences[key] = t.checked;
});

function carregarConfiguracoes() {
  var configNome          = document.getElementById('config-nome');
  var configCrm           = document.getElementById('config-crm');
  var configEspecialidade = document.getElementById('config-especialidade');
  var configAssinatura    = document.getElementById('config-assinatura');
  var fotoPreview         = document.getElementById('profile-photo-preview');

  if (configNome)          configNome.value          = usuario.nome || '';
  if (configCrm)           configCrm.value           = usuario.crm  || (medicoCompleto.dadosProfissionais && medicoCompleto.dadosProfissionais.crm) || '';
  if (configEspecialidade) configEspecialidade.value = (medicoCompleto.dadosProfissionais && medicoCompleto.dadosProfissionais.especialidade) || '';

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
  setTimeout(function(){settingsSaveMessage.classList.remove('show');}, 2400);
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

function updateNotificationPreferences() {
  var disabled = new Set();
  notificationToggles.forEach(function(t) { if (!savedNotificationPreferences[t.dataset.notificationToggle]) disabled.add(t.dataset.notificationToggle); });
  document.querySelectorAll('[data-notification-category]').forEach(function(item) {
    item.classList.toggle('is-hidden', disabled.has(item.dataset.notificationCategory));
  });
  document.querySelectorAll('.settings-toggle').forEach(function(row) {
    var t = row.querySelector('[data-notification-toggle]');
    if (t) row.classList.toggle('notification-disabled', !savedNotificationPreferences[t.dataset.notificationToggle]);
  });
  updateQuestionCounters();
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
    notificationToggles.forEach(function(t) { savedNotificationPreferences[t.dataset.notificationToggle] = t.checked; });
    localStorage.setItem('medico_notif_prefs', JSON.stringify(savedNotificationPreferences));

    var configAssinatura = document.getElementById('config-assinatura');
    if (configAssinatura) localStorage.setItem('medico_assinatura', configAssinatura.value);

    if (pendingProfilePhotoReset) {
      savedProfileImageUrl = null; pendingProfileImageUrl = null; pendingProfilePhotoReset = false; profilePhotoInput.value = '';
      localStorage.removeItem('medico_foto_perfil');
      if (topbarAvatar)       topbarAvatar.textContent       = _iniciais;
      if (profilePhotoPreview) profilePhotoPreview.textContent = _iniciais;
    } else if (pendingProfileImageUrl) {
      savedProfileImageUrl = pendingProfileImageUrl;
      localStorage.setItem('medico_foto_perfil', savedProfileImageUrl);
      if (topbarAvatar)        topbarAvatar.innerHTML        = '<img class="avatar-img" src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
      if (profilePhotoPreview) profilePhotoPreview.innerHTML = '<img src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
      pendingProfileImageUrl = null;
    }

    updateNotificationPreferences();
    showSettingsMessage('Configurações salvas com sucesso.', 'success');
  });
}

var alertasBadge       = document.querySelector('#nav-alertas .badge-nav');
var alertFilterButtons = document.querySelectorAll('.alert-filter-btn');
var alertCards         = document.querySelectorAll('#alertas-section .alert-card');
var emptyAlerts        = document.getElementById('empty-alerts');
var alertsListTitle    = document.getElementById('alerts-list-title');
var currentAlertFilter = 'todos';
var activeAlertsCount  = document.querySelectorAll('.alert-card[data-alert-status="active"]').length;

function updateAlertBadge() {
  if (alertasBadge) { alertasBadge.textContent = activeAlertsCount; alertasBadge.style.display = activeAlertsCount > 0 ? 'inline-flex' : 'none'; }
  document.querySelectorAll('.notification-item[data-notification-category="criticos"], .notification-item[data-notification-category="atrasos"]').forEach(function(item) {
    var cat       = item.dataset.notificationCategory;
    var isOff     = savedNotificationPreferences[cat] === false;
    var remaining = document.querySelectorAll('.alert-card[data-alert-status="active"][data-alert-type="' + cat + '"]').length;
    item.classList.toggle('is-hidden', remaining === 0 || isOff);
  });
  if (notificationDot) {
    var vis = document.querySelectorAll('.notification-item:not(.is-hidden)').length;
    notificationDot.textContent = vis;
    notificationDot.style.display = vis > 0 ? 'grid' : 'none';
  }
}

function applyAlertFilter(filter) {
  currentAlertFilter = filter;
  var visibleCount = 0;
  alertFilterButtons.forEach(function(btn) { btn.classList.toggle('active', btn.dataset.alertFilter === filter); });
  alertCards.forEach(function(card) {
    var show = filter === 'todos' || card.dataset.alertType === filter;
    card.style.display = show ? 'block' : 'none';
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
  btn.addEventListener('click', function() { applyAlertFilter(btn.dataset.alertFilter); });
});

document.querySelectorAll('.btn-view-alert-photos').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var card = btn.closest('.alert-card');
    var name = card ? card.querySelector('.alert-patient-name') : null;
    openPhotosForPatient(name ? name.textContent.trim() : 'Paciente');
  });
});

updateQuestionCounters();
updateNotificationPreferences();
applyQuestionFilter('todas');
updateAlertBadge();
