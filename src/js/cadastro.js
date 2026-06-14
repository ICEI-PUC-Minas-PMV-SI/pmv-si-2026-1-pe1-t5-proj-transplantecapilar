document.getElementById("cadastroForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const dataNascimento = document.getElementById("dataNascimento").value;
  const telefone = document.getElementById("telefone").value.trim();
  const sexo = document.getElementById("sexo").value;
  const email = document.getElementById("emailCadastro").value.trim();
  const senha = document.getElementById("senhaCadastro").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const tipoSanguineo = document.getElementById("tipoSanguineo").value;
  const contatoEmergencia = document.getElementById("contatoEmergencia").value.trim();
  const termos = document.getElementById("termos").checked;
  const mensagem = document.getElementById("cadastroMessage");

  mensagem.style.color = "#D02828";
  mensagem.textContent = "";

  if (
    nome === "" ||
    cpf === "" ||
    dataNascimento === "" ||
    telefone === "" ||
    sexo === "" ||
    email === "" ||
    senha === "" ||
    confirmarSenha === ""
  ) {
    mensagem.textContent = "Preencha todos os campos obrigatórios.";
    return;
  }

  if (senha.length < 8) {
    mensagem.textContent = "A senha deve ter no mínimo 8 caracteres.";
    return;
  }

  if (senha !== confirmarSenha) {
    mensagem.textContent = "As senhas não coincidem.";
    return;
  }

  if (!termos) {
    mensagem.textContent = "Você precisa aceitar os termos de uso.";
    return;
  }

  let pacientes = JSON.parse(localStorage.getItem("pacientesCadastrados")) || [];

  const cpfJaCadastrado = pacientes.some(function (paciente) {
    return paciente.cpf === cpf;
  });

  if (cpfJaCadastrado) {
    mensagem.textContent = "Este CPF já está cadastrado.";
    return;
  }

  const emailJaCadastrado = pacientes.some(function (paciente) {
    return paciente.email.toLowerCase() === email.toLowerCase();
  });

  if (emailJaCadastrado) {
    mensagem.textContent = "Este e-mail já está cadastrado.";
    return;
  }

  const novoPaciente = {
    id: Date.now(),
    perfil: "paciente",
    nome: nome,
    cpf: cpf,
    dataNascimento: dataNascimento,
    telefone: telefone,
    sexo: sexo,
    email: email,
    senha: senha,
    tipoSanguineo: tipoSanguineo,
    contatoEmergencia: contatoEmergencia
  };

  pacientes.push(novoPaciente);

  localStorage.setItem("pacientesCadastrados", JSON.stringify(pacientes));

  mensagem.style.color = "#21A134";
  mensagem.textContent = "Cadastro realizado com sucesso! Redirecionando para o login...";

  document.getElementById("cadastroForm").reset();

  setTimeout(function () {
    window.location.href = "../../index.html";
  }, 1500);
});
/* SUPORTE */

const suporteLink = document.getElementById("suporteLink");

if (suporteLink) {
  suporteLink.addEventListener("click", function (event) {
    event.preventDefault();

    alert(
      "Suporte HairCare Pro\n\nE-mail: suporte@haircarepro.com"
    );
  });
}

/* CONTATO */

const contatoLink = document.getElementById("contatoLink");

if (contatoLink) {
  contatoLink.addEventListener("click", function (event) {
    event.preventDefault();

    alert(
      "Contato HairCare Pro\n\nTelefone: (31) 99999-9999\nE-mail: contato@haircarepro.com\nHorário: Segunda a sexta • 08h às 18h"
    );
  });
}