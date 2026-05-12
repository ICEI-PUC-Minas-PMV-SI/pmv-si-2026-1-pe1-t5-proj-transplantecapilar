// Validação básica do formulário de cadastro
document.querySelector('.btn-login').addEventListener('click', function () {
  const senha    = document.getElementById('senha').value;
  const confirma = document.getElementById('confirma').value;
  const termos   = document.getElementById('termos').checked;

  if (senha.length > 0 && senha.length < 8) {
    alert('A senha deve ter no mínimo 8 caracteres.');
    return;
  }

  if (senha && confirma && senha !== confirma) {
    alert('As senhas não coincidem. Verifique e tente novamente.');
    return;
  }

  if (!termos) {
    alert('Você precisa aceitar os Termos de Uso para continuar.');
    return;
  }
});