const pageTitle = document.querySelector('.page-title');

const painelSection = document.getElementById('painel-section');
const mensagensSection = document.getElementById('mensagens-section');
const configuracoesSection = document.getElementById('configuracoes-section');

const navPainel = document.getElementById('nav-painel');
const navAlertas = document.getElementById('nav-alertas');
const navMensagens = document.getElementById('nav-mensagens');
const navConfiguracoes = document.getElementById('nav-configuracoes');

function esconderPaginas() {
  painelSection.classList.add('hidden');
  mensagensSection.classList.add('hidden');
  configuracoesSection.classList.add('hidden');
}

function limparMenu() {
  navPainel.classList.remove('active');
  navMensagens.classList.remove('active');
  navConfiguracoes.classList.remove('active');
}

function mostrarPainel() {
  esconderPaginas();
  limparMenu();

  painelSection.classList.remove('hidden');
  navPainel.classList.add('active');
  pageTitle.textContent = 'Bom dia, Dr. João!';
}

function mostrarMensagens() {
  esconderPaginas();
  limparMenu();

  mensagensSection.classList.remove('hidden');
  navMensagens.classList.add('active');
  pageTitle.textContent = 'Dúvidas dos Pacientes';

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
}

navPainel.addEventListener('click', function(event) {
  event.preventDefault();
  mostrarPainel();
});

navAlertas.addEventListener('click', function(event) {
  event.preventDefault();
});

navMensagens.addEventListener('click', function(event) {
  event.preventDefault();
  mostrarMensagens();
});

navConfiguracoes.addEventListener('click', function(event) {
  event.preventDefault();
  mostrarConfiguracoes();
});

const notificationBtn = document.getElementById('notification-btn');
const notificationMenu = document.getElementById('notification-menu');
const notificationWrapper = document.querySelector('.notification-wrapper');

let notificationCloseTimer;

if (notificationMenu) {
  notificationMenu.addEventListener('wheel', function(event) {
    const atTop = notificationMenu.scrollTop === 0;
    const atBottom = notificationMenu.scrollHeight - notificationMenu.scrollTop <= notificationMenu.clientHeight + 1;
    const scrollingUp = event.deltaY < 0;
    const scrollingDown = event.deltaY > 0;

    if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
      event.preventDefault();
    }

    event.stopPropagation();
  }, { passive:false });
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

const photosModal = document.getElementById('photos-modal');
const imageViewerModal = document.getElementById('image-viewer-modal');
const imageViewerTitle = document.getElementById('image-viewer-title');
const imageViewerLabel = document.getElementById('image-viewer-label');
const photosModalTitle = document.getElementById('photos-modal-title');

const btnAvaliarFotos = document.getElementById('btn-avaliar-fotos');
const btnResponderMensagem = document.getElementById('btn-responder-mensagem');
const viewPhotoButtons = document.querySelectorAll('.btn-view-photos');

function openModal(modal) {
  if (modal) {
    modal.classList.add('open');
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove('open');
  }
}

function openPhotosForPatient(patientName) {
  if (photosModalTitle) {
    photosModalTitle.textContent = 'Fotos enviadas - ' + patientName;
  }

  openModal(photosModal);
}

document.querySelectorAll('.photo-placeholder').forEach(function(photo) {
  photo.addEventListener('click', function() {
    const label = photo.dataset.photoLabel || 'Foto enviada';

    if (imageViewerTitle) {
      imageViewerTitle.textContent = 'Imagem ampliada - ' + label;
    }

    if (imageViewerLabel) {
      imageViewerLabel.textContent = label;
    }

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
    if (event.target === modal) {
      closeModal(modal);
    }
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

    setTimeout(function() {
      scrollToTarget('duvida-andre');
    }, 80);
  });
}

viewPhotoButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    openPhotosForPatient(button.dataset.patient || 'Paciente');
  });
});

const quickAnswers = document.querySelectorAll('.quick-answer');
const answerBoxes = document.querySelectorAll('.answer-box');
const sendAnswerButtons = document.querySelectorAll('.send-answer');
const draftButtons = document.querySelectorAll('.btn-save-draft');

const notificationItems = document.querySelectorAll('.notification-item[data-target-section]');
const notificationDot = document.querySelector('.notification-dot');

const questionFilterButtons = document.querySelectorAll('.question-filter-btn');
const questionCards = document.querySelectorAll('#mensagens-section .question-card');
const emptyQuestions = document.getElementById('empty-questions');
const questionsListTitle = document.getElementById('questions-list-title');

const duvidasBadge = document.querySelector('#nav-mensagens .badge-nav');
const messagesCounterNumber = document.querySelector('.messages-counter strong');

const pendingSummary = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(item) {
  return item.textContent.includes('Dúvidas pendentes');
});

const answeredSummary = Array.from(document.querySelectorAll('.questions-summary-item')).find(function(item) {
  return item.textContent.includes('Respondidas hoje');
});

let pendingQuestionsCount = document.querySelectorAll('.question-card[data-question-status="pending"]').length;
let answeredTodayCount = 3;
let currentQuestionFilter = 'todas';

const savedNotificationPreferences = {
  criticos:true,
  duvidas:true,
  atrasos:true
};

function applyQuestionFilter(filter) {
  currentQuestionFilter = filter;
  let visibleCount = 0;

  questionFilterButtons.forEach(function(button) {
    button.classList.toggle('active', button.dataset.questionFilter === filter);
  });

  questionCards.forEach(function(card) {
    const status = card.dataset.questionStatus;
    const shouldShow = filter === 'todas' || status === filter;

    card.style.display = shouldShow ? 'block' : 'none';

    if (shouldShow) {
      visibleCount++;
    }
  });

  if (emptyQuestions) {
    emptyQuestions.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  if (questionsListTitle) {
    if (filter === 'pending') {
      questionsListTitle.textContent = 'Dúvidas pendentes';
    } else if (filter === 'answered') {
      questionsListTitle.textContent = 'Dúvidas respondidas';
    } else {
      questionsListTitle.textContent = 'Todas as dúvidas';
    }
  }
}

function updateQuestionCounters() {
  if (duvidasBadge) {
    duvidasBadge.textContent = pendingQuestionsCount;
    duvidasBadge.style.display = pendingQuestionsCount > 0 ? 'inline-flex' : 'none';
  }

  if (messagesCounterNumber) {
    messagesCounterNumber.textContent = pendingQuestionsCount;
  }

  if (pendingSummary) {
    const value = pendingSummary.querySelector('strong');

    if (value) {
      value.textContent = pendingQuestionsCount;
    }
  }

  if (answeredSummary) {
    const value = answeredSummary.querySelector('strong');

    if (value) {
      value.textContent = answeredTodayCount;
    }
  }

  const questionNotifications = document.querySelectorAll('[data-question-notification="true"]');

  questionNotifications.forEach(function(item) {
    const isQuestionToggleOff = savedNotificationPreferences.duvidas === false;
    item.classList.toggle('is-hidden', pendingQuestionsCount === 0 || isQuestionToggleOff);
  });

  if (notificationDot) {
    const visibleNotifications = document.querySelectorAll('.notification-item:not(.is-hidden)').length;
    notificationDot.textContent = visibleNotifications;
    notificationDot.style.display = visibleNotifications > 0 ? 'grid' : 'none';
  }
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type:'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

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
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior:'smooth', block:'center' });
  target.classList.add('focus-highlight');

  setTimeout(function() {
    target.classList.remove('focus-highlight');
  }, 1400);
}

notificationItems.forEach(function(item) {
  item.addEventListener('click', function() {
    const section = item.dataset.targetSection;
    const targetId = item.dataset.targetId;

    if (section === 'duvidas') {
      mostrarMensagens();
    }

    if (notificationMenu) {
      notificationMenu.classList.remove('open');
    }

    setTimeout(function() {
      scrollToTarget(targetId);
    }, 80);
  });
});

quickAnswers.forEach(function(button) {
  button.addEventListener('click', function() {
    const firstEditableBox = Array.from(answerBoxes).find(function(box) {
      return !box.disabled && box.value.trim() === '';
    }) || Array.from(answerBoxes).find(function(box) {
      return !box.disabled;
    });

    if (!firstEditableBox) {
      return;
    }

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
    const card = button.closest('.question-card');
    const patientName = card.querySelector('.question-patient h3').textContent.trim();
    const questionText = card.querySelector('.question-text').textContent.trim();
    const textarea = card.querySelector('.answer-box');
    const answerText = textarea.value.trim();

    if (!answerText) {
      textarea.focus();
      return;
    }

    const fileContent =
      'Paciente: ' + patientName + '\n\n' +
      'Dúvida do paciente:\n' + questionText + '\n\n' +
      'Rascunho da resposta:\n' + answerText + '\n';

    const filename = 'rascunho-' + sanitizeFilename(patientName) + '.txt';

    downloadTextFile(filename, fileContent);
  });
});

sendAnswerButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const card = button.closest('.question-card');
    const textarea = card.querySelector('.answer-box');
    const badge = card.querySelector('.question-badge');

    if (card.dataset.questionStatus === 'answered') {
      return;
    }

    if (!textarea.value.trim()) {
      textarea.focus();
      return;
    }

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

const saveProfileSettings = document.getElementById('save-profile-settings');
const settingsSaveMessage = document.getElementById('settings-save-message');
const profilePhotoInput = document.getElementById('config-foto');
const resetProfilePhoto = document.getElementById('reset-profile-photo');
const profilePhotoPreview = document.getElementById('profile-photo-preview');
const topbarAvatar = document.querySelector('.user-profile .avatar');
const notificationToggles = document.querySelectorAll('[data-notification-toggle]');

let pendingProfileImageUrl = null;
let savedProfileImageUrl = null;
let pendingProfilePhotoReset = false;

notificationToggles.forEach(function(toggle) {
  savedNotificationPreferences[toggle.dataset.notificationToggle] = toggle.checked;
});

function showSettingsMessage(text, type) {
  if (!settingsSaveMessage) {
    return;
  }

  settingsSaveMessage.textContent = text;
  settingsSaveMessage.classList.remove('warning');

  if (type === 'warning') {
    settingsSaveMessage.classList.add('warning');
  }

  settingsSaveMessage.classList.add('show');

  setTimeout(function() {
    settingsSaveMessage.classList.remove('show');
  }, 2400);
}

if (profilePhotoInput && profilePhotoPreview && topbarAvatar) {
  profilePhotoInput.addEventListener('change', function() {
    const file = profilePhotoInput.files && profilePhotoInput.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      showSettingsMessage('Selecione um arquivo de imagem válido.', 'warning');
      profilePhotoInput.value = '';
      pendingProfileImageUrl = null;
      return;
    }

    const reader = new FileReader();

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
  const disabledCategories = new Set();

  notificationToggles.forEach(function(toggle) {
    const savedValue = savedNotificationPreferences[toggle.dataset.notificationToggle];

    if (!savedValue) {
      disabledCategories.add(toggle.dataset.notificationToggle);
    }
  });

  document.querySelectorAll('[data-notification-category]').forEach(function(item) {
    const category = item.dataset.notificationCategory;
    const isDisabled = disabledCategories.has(category);

    item.classList.toggle('is-hidden', isDisabled);
  });

  document.querySelectorAll('.settings-toggle').forEach(function(row) {
    const toggle = row.querySelector('[data-notification-toggle]');

    if (!toggle) {
      return;
    }

    row.classList.toggle('notification-disabled', !savedNotificationPreferences[toggle.dataset.notificationToggle]);
  });

  updateQuestionCounters();
}

notificationToggles.forEach(function(toggle) {
  toggle.addEventListener('change', function() {
    const label = toggle.closest('.settings-toggle').querySelector('strong').textContent.trim();
    const status = toggle.checked ? 'ativadas' : 'desativadas';

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

updateQuestionCounters();
updateNotificationPreferences();
applyQuestionFilter('todas');