let perfilSelecionado = "paciente";

const botoesPerfil = document.querySelectorAll(".profile");
const criarContaLink = document.getElementById("criarContaLink");

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

document.getElementById("loginForm")
  .addEventListener("submit", function (event) {

    event.preventDefault();

    const loginDigitado =
      document.getElementById("login").value.trim();

    const senhaDigitada =
      document.getElementById("senha").value.trim();

    const manterConectado =
      document.getElementById("manterConectado").checked;

    const mensagem =
      document.getElementById("loginMessage");

    mensagem.style.color = "#D02828";
    mensagem.textContent = "";

    if (loginDigitado === "" || senhaDigitada === "") {

      mensagem.textContent =
        "Preencha todos os campos para continuar.";

      return;

    }

    /* LOGIN PACIENTE */

    if (perfilSelecionado === "paciente") {

      const pacientes =
        JSON.parse(localStorage.getItem("pacientes")) || [];

      const pacienteEncontrado = pacientes.find(function (paciente) {

        return (
          (paciente.email === loginDigitado ||
            paciente.cpf === loginDigitado) &&
          paciente.senha === senhaDigitada
        );

      });

      if (!pacienteEncontrado) {

        mensagem.textContent =
          "Paciente não encontrado ou senha incorreta.";

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

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioLogado)
      );

      mensagem.style.color = "#21A134";

      mensagem.textContent =
        "Login realizado com sucesso! Redirecionando...";

      setTimeout(function () {

        window.location.href = "PainelPaciente.html";

      }, 1000);

      return;

    }

    /* LOGIN MÉDICO */

    if (perfilSelecionado === "profissional") {

      const medicos =
        JSON.parse(localStorage.getItem("medicos")) || [];

      const medicoEncontrado = medicos.find(function (medico) {

        return (
          (medico.email === loginDigitado ||
            medico.crm === loginDigitado ||
            medico.cpf === loginDigitado) &&
          medico.senha === senhaDigitada
        );

      });

      if (!medicoEncontrado) {

        mensagem.textContent =
          "Médico não encontrado ou senha incorreta.";

        return;

      }

      const usuarioLogado = {

        id: medicoEncontrado.id,
        nome: medicoEncontrado.nome,
        email: medicoEncontrado.email,
        crm: medicoEncontrado.crm,
        perfil: "profissional",
        manterConectado: manterConectado

      };

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioLogado)
      );

      mensagem.style.color = "#21A134";

      mensagem.textContent =
        "Login realizado com sucesso! Redirecionando...";

      setTimeout(function () {

        window.location.href = "PainelMedico.html";

      }, 1000);

    }

});