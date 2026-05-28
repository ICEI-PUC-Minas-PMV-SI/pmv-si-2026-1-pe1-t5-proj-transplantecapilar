function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

var pageTitle = document.querySelector('.page-title');

var painelSection = document.getElementById('painel-section');
var alertasSection = document.getElementById('alertas-section');
var mensagensSection = document.getElementById('mensagens-section');
var configuracoesSection = document.getElementById('configuracoes-section');

var navPainel = document.getElementById('nav-painel');
var navAlertas = document.getElementById('nav-alertas');
var navMensagens = document.getElementById('nav-mensagens');
var navConfiguracoes = document.getElementById('nav-configuracoes');

function closeSidebarOnMobile() {
  if (window.innerWidth <= 1000) {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
}

function esconderPaginas() {
  painelSection.classList.add('hidden');
  if (alertasSection) alertasSection.classList.add('hidden');
  mensagensSection.classList.add('hidden');
  configuracoesSection.classList.add('hidden');
}

function limparMenu() {
  navPainel.classList.remove('active');
  if (navAlertas) navAlertas.classList.remove('active');
  navMensagens.classList.remove('active');
  navConfiguracoes.classList.remove('active');
}

function mostrarPainel() {
  esconderPaginas();
  limparMenu();
  painelSection.classList.remove('hidden');
  navPainel.classList.add('active');
  pageTitle.textContent = 'Início';
  closeSidebarOnMobile();
}

function mostrarAlertas() {
  esconderPaginas();
  limparMenu();
  if (alertasSection) alertasSection.classList.remove('hidden');
  if (navAlertas) navAlertas.classList.add('active');
  pageTitle.textContent = 'Alertas';
  closeSidebarOnMobile();
  applyAlertFilter(currentAlertFilter);
}

function mostrarMensagens() {
  esconderPaginas();
  limparMenu();
  mensagensSection.classList.remove('hidden');
  navMensagens.classList.add('active');
  pageTitle.textContent = 'Dúvidas';
  closeSidebarOnMobile();
  if (typeof applyQuestionFilter === 'function') {
    applyQuestionFilter('todas');
  }
}

function mostrarConfiguracoes() {
  esconderPaginas();
  limparMenu();
  configuracoesSection.classList.remove('hidden');
  navConfiguracoes.classList.add('active');
  pageTitle.textContent = 'Configurações';
  closeSidebarOnMobile();
}

navPainel.addEventListener('click', function(event) {
  event.preventDefault();
  mostrarPainel();
});

navAlertas.addEventListener('click', function(event) {
  event.preventDefault();
  mostrarAlertas();
});

navMensagens.addEventListener('click', function(event) {
  event.preventDefault();
  mostrarMensagens();
});

navConfiguracoes.addEventListener('click', function(event) {
  event.preventDefault();
  mostrarConfiguracoes();
});

var notificationBtn = document.getElementById('notification-btn');
var notificationMenu = document.getElementById('notification-menu');
var notificationWrapper = document.querySelector('.notification-wrapper');
var notificationCloseTimer;

if (notificationMenu) {
  notificationMenu.addEventListener('wheel', function(event) {
    var atTop = notificationMenu.scrollTop === 0;
    var atBottom = notificationMenu.scrollHeight - notificationMenu.scrollTop <= notificationMenu.clientHeight + 1;
    var scrollingUp = event.deltaY < 0;
    var scrollingDown = event.deltaY > 0;
    if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
      event.preventDefault();
    }
    event.stopPropagation();
  }, { passive: false });
}

if (notificationBtn && notificationMenu) {
  notificationBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    notificationMenu.classList.toggle('open');
  });

  document.addEventListener('click', function(event) {
    if (!notificationMenu.contains(event.target) && !notificationBtn.contains(event.target)) {
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
    notificationMenu.classList.add('open');
  });

  notificationMenu.addEventListener('mouseleave', function() {
    notificationCloseTimer = setTimeout(function() {
      notificationMenu.classList.remove('open');
    }, 250);
  });
}

var photosModal = document.getElementById('photos-modal');
var imageViewerModal = document.getElementById('image-viewer-modal');
var imageViewerTitle = document.getElementById('image-viewer-title');
var imageViewerLabel = document.getElementById('image-viewer-label');
var photosModalTitle = document.getElementById('photos-modal-title');

var btnAvaliarFotos = document.getElementById('btn-avaliar-fotos');
var btnResponderMensagem = document.getElementById('btn-responder-mensagem');
var viewPhotoButtons = document.querySelectorAll('.btn-view-photos');

function openModal(modal) {
  if (modal) modal.classList.add('open');
}

function closeModal(modal) {
  if (modal) modal.classList.remove('open');
}

function openPhotosForPatient(patientName) {
  if (photosModalTitle) {
    photosModalTitle.textContent = 'Fotos enviadas - ' + patientName;
  }
  openModal(photosModal);
}

document.querySelectorAll('.photo-placeholder').forEach(function(photo) {
  photo.addEventListener('click', function() {
    var label = photo.dataset.photoLabel || 'Foto enviada';
    if (imageViewerTitle) imageViewerTitle.textContent = 'Imagem ampliada - ' + label;
    if (imageViewerLabel) imageViewerLabel.textContent = label;
    openModal(imageViewerModal);
  });
});

document.querySelectorAll('[data-close-modal]').forEach(function(button) {
  button.addEventListener('click', function() {
    closeModal(document.getElementById(button.dataset.closeModal));
  });
});

document.querySelectorAll('.modal-overlay').forEach(function(modal) {
  modal.addEventListener('click', function(event) {
    if (event.target === modal) closeModal(modal);
  });
});

if (btnAvaliarFotos) {
  btnAvaliarFotos.addEventListener('click', function() {
    openPhotosForPatient('Gabriel Victor');
  });
}

if (btnResponderMensagem) {
  btnResponderMensagem.addEventListener('click', function() {
    mostrarMensagens();
    setTimeout(function() { scrollToTarget('duvida-andre'); }, 80);
  });
}

viewPhotoButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    openPhotosForPatient(button.dataset.patient || 'Paciente');
  });
});

var quickAnswers = document.querySelectorAll('.quick-answer');
var answerBoxes = document.querySelectorAll('.answer-box');
var sendAnswerButtons = document.querySelectorAll('.send-answer');
var draftButtons = document.querySelectorAll('.btn-save-draft');
var notificationItems = document.querySelectorAll('.notification-item[data-target-section]');
var notificationDot = document.querySelector('.notification-dot');
var questionFilterButtons = document.querySelectorAll('.question-filter-btn');
var questionCards = document.querySelectorAll('#mensagens-section .question-card');
var emptyQuestions = document.getElementById('empty-questions');
var questionsListTitle = document.getElementById('questions-list-title');
var duvidasBadge = document.querySelector('#nav-mensagens .badge-nav');
var messagesCounterNumber = document.querySelector('.messages-counter strong');

var pendingSummary = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(item) {
  return item.textContent.includes('Dúvidas pendentes');
});

var answeredSummary = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(item) {
  return item.textContent.includes('Respondidas hoje');
});

var pendingQuestionsCount = document.querySelectorAll('.question-card[data-question-status="pending"]').length;
var answeredTodayCount = 3;
var currentQuestionFilter = 'todas';

var savedNotificationPreferences = { criticos: true, duvidas: true, atrasos: true };

function applyQuestionFilter(filter) {
  currentQuestionFilter = filter;
  var visibleCount = 0;

  questionFilterButtons.forEach(function(button) {
    button.classList.toggle('active', button.dataset.questionFilter === filter);
  });

  questionCards.forEach(function(card) {
    var status = card.dataset.questionStatus;
    var shouldShow = filter === 'todas' || status === filter;
    card.style.display = shouldShow ? 'block' : 'none';
    if (shouldShow) visibleCount++;
  });

  if (emptyQuestions) {
    emptyQuestions.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  if (questionsListTitle) {
    if (filter === 'pending') questionsListTitle.textContent = 'Dúvidas pendentes';
    else if (filter === 'answered') questionsListTitle.textContent = 'Dúvidas respondidas';
    else questionsListTitle.textContent = 'Todas as dúvidas';
  }
}

function updateQuestionCounters() {
  if (duvidasBadge) {
    duvidasBadge.textContent = pendingQuestionsCount;
    duvidasBadge.style.display = pendingQuestionsCount > 0 ? 'inline-flex' : 'none';
  }

  if (messagesCounterNumber) messagesCounterNumber.textContent = pendingQuestionsCount;

  if (pendingSummary) {
    var v = pendingSummary.querySelector('strong');
    if (v) v.textContent = pendingQuestionsCount;
  }

  if (answeredSummary) {
    var v2 = answeredSummary.querySelector('strong');
    if (v2) v2.textContent = answeredTodayCount;
  }

  var questionNotifications = document.querySelectorAll('[data-question-notification="true"]');
  questionNotifications.forEach(function(item) {
    var isOff = savedNotificationPreferences.duvidas === false;
    item.classList.toggle('is-hidden', pendingQuestionsCount === 0 || isOff);
  });

  if (notificationDot) {
    var visibleNotifications = document.querySelectorAll('.notification-item:not(.is-hidden)').length;
    notificationDot.textContent = visibleNotifications;
    notificationDot.style.display = visibleNotifications > 0 ? 'grid' : 'none';
  }
}

function downloadTextFile(filename, content) {
  var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function sanitizeFilename(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function scrollToTarget(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.add('focus-highlight');
  setTimeout(function() { target.classList.remove('focus-highlight'); }, 1400);
}

notificationItems.forEach(function(item) {
  item.addEventListener('click', function() {
    var section = item.dataset.targetSection;
    var targetId = item.dataset.targetId;
    if (section === 'duvidas') mostrarMensagens();
    if (section === 'alertas') mostrarAlertas();
    if (notificationMenu) notificationMenu.classList.remove('open');
    setTimeout(function() { scrollToTarget(targetId); }, 80);
  });
});

quickAnswers.forEach(function(button) {
  button.addEventListener('click', function() {
    var firstEditableBox = Array.from(answerBoxes).find(function(box) {
      return !box.disabled && box.value.trim() === '';
    }) || Array.from(answerBoxes).find(function(box) {
      return !box.disabled;
    });
    if (!firstEditableBox) return;
    firstEditableBox.value = button.textContent.trim();
    firstEditableBox.focus();
  });
});

questionFilterButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    applyQuestionFilter(button.dataset.questionFilter);
  });
});

draftButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var card = button.closest('.question-card');
    var patientName = card.querySelector('.question-patient h3').textContent.trim();
    var questionText = card.querySelector('.question-text').textContent.trim();
    var textarea = card.querySelector('.answer-box');
    var answerText = textarea.value.trim();
    if (!answerText) { textarea.focus(); return; }
    var fileContent =
      'Paciente: ' + patientName + '\n\n' +
      'Dúvida do paciente:\n' + questionText + '\n\n' +
      'Rascunho da resposta:\n' + answerText + '\n';
    downloadTextFile('rascunho-' + sanitizeFilename(patientName) + '.txt', fileContent);
  });
});

sendAnswerButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var card = button.closest('.question-card');
    var textarea = card.querySelector('.answer-box');
    var badge = card.querySelector('.question-badge');
    if (card.dataset.questionStatus === 'answered') return;
    if (!textarea.value.trim()) { textarea.focus(); return; }
    card.dataset.questionStatus = 'answered';
    card.classList.add('is-answered');
    badge.textContent = 'Respondida';
    badge.style.background = 'var(--success-bg)';
    badge.style.color = 'var(--success)';
    textarea.disabled = true;
    button.textContent = 'Resposta enviada';
    button.disabled = true;
    pendingQuestionsCount = Math.max(0, pendingQuestionsCount - 1);
    answeredTodayCount = answeredTodayCount + 1;
    updateQuestionCounters();
    updateNotificationPreferences();
    applyQuestionFilter(currentQuestionFilter);
  });
});

var saveProfileSettings = document.getElementById('save-profile-settings');
var settingsSaveMessage = document.getElementById('settings-save-message');
var profilePhotoInput = document.getElementById('config-foto');
var resetProfilePhoto = document.getElementById('reset-profile-photo');
var profilePhotoPreview = document.getElementById('profile-photo-preview');
var topbarAvatar = document.querySelector('.user-profile .avatar');
var notificationToggles = document.querySelectorAll('[data-notification-toggle]');

var pendingProfileImageUrl = null;
var savedProfileImageUrl = null;
var pendingProfilePhotoReset = false;

notificationToggles.forEach(function(toggle) {
  savedNotificationPreferences[toggle.dataset.notificationToggle] = toggle.checked;
});

function showSettingsMessage(text, type) {
  if (!settingsSaveMessage) return;
  settingsSaveMessage.textContent = text;
  settingsSaveMessage.classList.remove('warning');
  if (type === 'warning') settingsSaveMessage.classList.add('warning');
  settingsSaveMessage.classList.add('show');
  setTimeout(function() { settingsSaveMessage.classList.remove('show'); }, 2400);
}

if (profilePhotoInput && profilePhotoPreview && topbarAvatar) {
  profilePhotoInput.addEventListener('change', function() {
    var file = profilePhotoInput.files && profilePhotoInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showSettingsMessage('Selecione um arquivo de imagem válido.', 'warning');
      profilePhotoInput.value = '';
      pendingProfileImageUrl = null;
      return;
    }
    var reader = new FileReader();
    reader.onload = function(event) {
      pendingProfileImageUrl = event.target.result;
      pendingProfilePhotoReset = false;
      profilePhotoPreview.innerHTML = '<img src="' + pendingProfileImageUrl + '" alt="Prévia da foto de perfil"/>';
      showSettingsMessage('Foto carregada. Salve para aplicar.', 'success');
    };
    reader.readAsDataURL(file);
  });
}

if (resetProfilePhoto && profilePhotoPreview && profilePhotoInput) {
  resetProfilePhoto.addEventListener('click', function() {
    pendingProfileImageUrl = null;
    pendingProfilePhotoReset = true;
    profilePhotoInput.value = '';
    profilePhotoPreview.textContent = 'JS';
    showSettingsMessage('Foto redefinida. Salve para aplicar.', 'success');
  });
}

function updateNotificationPreferences() {
  var disabledCategories = new Set();
  notificationToggles.forEach(function(toggle) {
    var savedValue = savedNotificationPreferences[toggle.dataset.notificationToggle];
    if (!savedValue) disabledCategories.add(toggle.dataset.notificationToggle);
  });

  document.querySelectorAll('[data-notification-category]').forEach(function(item) {
    var category = item.dataset.notificationCategory;
    item.classList.toggle('is-hidden', disabledCategories.has(category));
  });

  document.querySelectorAll('.settings-toggle').forEach(function(row) {
    var toggle = row.querySelector('[data-notification-toggle]');
    if (!toggle) return;
    row.classList.toggle('notification-disabled', !savedNotificationPreferences[toggle.dataset.notificationToggle]);
  });

  updateQuestionCounters();
}

notificationToggles.forEach(function(toggle) {
  toggle.addEventListener('change', function() {
    var label = toggle.closest('.settings-toggle').querySelector('strong').textContent.trim();
    var status = toggle.checked ? 'ativadas' : 'desativadas';
    showSettingsMessage('Preferência de ' + label + ' ' + status + '. Salve para aplicar.', 'success');
  });
});

if (saveProfileSettings && settingsSaveMessage) {
  saveProfileSettings.addEventListener('click', function() {
    notificationToggles.forEach(function(toggle) {
      savedNotificationPreferences[toggle.dataset.notificationToggle] = toggle.checked;
    });

    if (pendingProfilePhotoReset && topbarAvatar && profilePhotoPreview) {
      savedProfileImageUrl = null;
      pendingProfileImageUrl = null;
      pendingProfilePhotoReset = false;
      profilePhotoInput.value = '';
      topbarAvatar.textContent = 'JS';
      profilePhotoPreview.textContent = 'JS';
    } else if (pendingProfileImageUrl && topbarAvatar && profilePhotoPreview) {
      savedProfileImageUrl = pendingProfileImageUrl;
      topbarAvatar.innerHTML = '<img class="avatar-img" src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
      profilePhotoPreview.innerHTML = '<img src="' + savedProfileImageUrl + '" alt="Foto de perfil"/>';
      pendingProfileImageUrl = null;
    }

    updateNotificationPreferences();
    showSettingsMessage('Configurações salvas com sucesso.', 'success');
  });
}

/* ── ALERTAS ── */
var alertasBadge = document.querySelector('#nav-alertas .badge-nav');
var alertFilterButtons = document.querySelectorAll('.alert-filter-btn');
var alertCards = document.querySelectorAll('#alertas-section .alert-card');
var emptyAlerts = document.getElementById('empty-alerts');
var alertsListTitle = document.getElementById('alerts-list-title');
var currentAlertFilter = 'todos';
var activeAlertsCount = document.querySelectorAll('.alert-card[data-alert-status="active"]').length;

function updateAlertBadge() {
  if (alertasBadge) {
    alertasBadge.textContent = activeAlertsCount;
    alertasBadge.style.display = activeAlertsCount > 0 ? 'inline-flex' : 'none';
  }

  var alertNotifications = document.querySelectorAll('.notification-item[data-notification-category="criticos"], .notification-item[data-notification-category="atrasos"]');
  alertNotifications.forEach(function(item) {
    var category = item.dataset.notificationCategory;
    var isOff = savedNotificationPreferences[category] === false;
    var remainingInCategory = document.querySelectorAll(
      '.alert-card[data-alert-status="active"][data-alert-type="' + category + '"]'
    ).length;
    item.classList.toggle('is-hidden', remainingInCategory === 0 || isOff);
  });

  if (notificationDot) {
    var visibleNotifications = document.querySelectorAll('.notification-item:not(.is-hidden)').length;
    notificationDot.textContent = visibleNotifications;
    notificationDot.style.display = visibleNotifications > 0 ? 'grid' : 'none';
  }
}

function applyAlertFilter(filter) {
  currentAlertFilter = filter;
  var visibleCount = 0;

  alertFilterButtons.forEach(function(button) {
    button.classList.toggle('active', button.dataset.alertFilter === filter);
  });

  alertCards.forEach(function(card) {
    var type = card.dataset.alertType;
    var matchesFilter = filter === 'todos' || type === filter;
    card.style.display = matchesFilter ? 'block' : 'none';
    if (matchesFilter) visibleCount++;
  });

  if (emptyAlerts) {
    emptyAlerts.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  if (alertsListTitle) {
    if (filter === 'criticos') alertsListTitle.textContent = 'Alertas críticos';
    else if (filter === 'atrasos') alertsListTitle.textContent = 'Atrasos de envio';
    else alertsListTitle.textContent = 'Todos os alertas';
  }
}

alertFilterButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    applyAlertFilter(button.dataset.alertFilter);
  });
});



document.querySelectorAll('.btn-view-alert-photos').forEach(function(button) {
  button.addEventListener('click', function() {
    var card = button.closest('.alert-card');
    var patientName = card ? card.querySelector('.alert-patient-name') : null;
    openPhotosForPatient(patientName ? patientName.textContent.trim() : 'Paciente');
  });
});

updateQuestionCounters();
updateNotificationPreferences();
applyQuestionFilter('todas');
updateAlertBadge();
