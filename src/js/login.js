let perfilSelecionado = "paciente";

const botoesPerfil = document.querySelectorAll(".profile");
const criarContaLink = document.getElementById("criarContaLink");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");

function atualizarLinkCadastro() {
  if (perfilSelecionado === "paciente") {
    criarContaLink.href = "cadastro.html";
  } else {
    criarContaLink.href = "cad-med.html";
  }
}

botoesPerfil.forEach(function (botao) {
  botao.addEventListener("click", function () {
    botoesPerfil.forEach(function (item) {
      item.classList.remove("active");
    });

    botao.classList.add("active");
    perfilSelecionado = botao.dataset.profile;

    atualizarLinkCadastro();
  });
});

atualizarLinkCadastro();

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const loginDigitado = document.getElementById("login").value.trim();
  const senhaDigitada = document.getElementById("senha").value.trim();
  const manterConectado = document.getElementById("manterConectado").checked;
  const mensagem = document.getElementById("loginMessage");

  mensagem.style.color = "#D02828";
  mensagem.textContent = "";

  if (loginDigitado === "" || senhaDigitada === "") {
    mensagem.textContent = "Preencha todos os campos para continuar.";
    return;
  }

  /* LOGIN PACIENTE */

  if (perfilSelecionado === "paciente") {
    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    const pacienteEncontrado = pacientes.find(function (paciente) {
      return (
        (paciente.email === loginDigitado || paciente.cpf === loginDigitado) &&
        paciente.senha === senhaDigitada
      );
    });

    if (!pacienteEncontrado) {
      mensagem.textContent = "Paciente não encontrado ou senha incorreta.";
      return;
    }

    const usuarioLogado = {
      id: pacienteEncontrado.id,
      nome: pacienteEncontrado.nome,
      email: pacienteEncontrado.email,
      cpf: pacienteEncontrado.cpf,
      perfil: "paciente",
      manterConectado: manterConectado
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    mensagem.style.color = "#21A134";
    mensagem.textContent = "Login realizado com sucesso! Redirecionando...";

    setTimeout(function () {
      window.location.href = "PainelPaciente.html";
    }, 1000);

    return;
  }

    /* LOGIN MÉDICO */

  if (perfilSelecionado === "profissional") {
    const medicos = JSON.parse(localStorage.getItem("medicosCadastrados")) || [];

    const medicoEncontrado = medicos.find(function (medico) {
      return (
        (
          medico.email === loginDigitado ||
          medico.cpf === loginDigitado ||
          medico.dadosProfissionais?.crm === loginDigitado
        ) &&
        medico.senha === senhaDigitada
      );
    });

    if (!medicoEncontrado) {
      mensagem.textContent = "Médico não encontrado ou senha incorreta.";
      return;
    }

    const usuarioLogado = {
      id: medicoEncontrado.id,
      nome: medicoEncontrado.nome,
      email: medicoEncontrado.email,
      crm: medicoEncontrado.dadosProfissionais?.crm,
      perfil: "profissional",
      manterConectado: manterConectado
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    mensagem.style.color = "#21A134";
    mensagem.textContent = "Login realizado com sucesso! Redirecionando...";

    setTimeout(function () {
      window.location.href = "PainelMedico.html";
    }, 1000);
  }
});

/* ESQUECI A SENHA */

if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", function (event) {
    event.preventDefault();

    alert(
      "Para recuperar sua senha, entre em contato com a equipe médica ou com o suporte do sistema HairCare Pro."
    );
  });
}
/* SUPORTE */

document.getElementById("suporteLink")
  .addEventListener("click", function (event) {

    event.preventDefault();

    alert(
      "Suporte HairCare Pro\n\nE-mail: suporte@haircarepro.com"
    );

});

/* CONTATO */

document.getElementById("contatoLink")
  .addEventListener("click", function (event) {

    event.preventDefault();

    alert(
      "Contato HairCare Pro\n\nTelefone: (31) 99999-9999\nE-mail: contato@haircarepro.com\nHorário: Segunda a sexta • 08h às 18h"
    );

});