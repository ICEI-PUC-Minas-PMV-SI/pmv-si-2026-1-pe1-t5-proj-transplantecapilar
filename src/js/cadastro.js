document.getElementById("cadastroForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const telefone = document.getElementById("telefone").value;
  const sexo = document.getElementById("sexo").value;
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const tipoSanguineo = document.getElementById("tipoSanguineo").value;
  const contatoEmergencia = document.getElementById("contatoEmergencia").value;
  const mensagem = document.getElementById("cadastroMessage");

  if (senha !== confirmarSenha) {
    mensagem.textContent = "As senhas não coincidem.";
    return;
  }

  let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  const novoPaciente = {
    id: Date.now(),
    nome,
    cpf,
    dataNascimento,
    telefone,
    sexo,
    email,
    senha,
    tipoSanguineo,
    contatoEmergencia
  };

  pacientes.push(novoPaciente);

  localStorage.setItem("pacientes", JSON.stringify(pacientes));

  mensagem.style.color = "green";
  mensagem.textContent = "Cadastro realizado com sucesso!";

  document.getElementById("cadastroForm").reset();
});