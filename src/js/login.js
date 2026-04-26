let perfilSelecionado = "paciente";

const botoesPerfil = document.querySelectorAll(".profile");

botoesPerfil.forEach(function(botao) {
  botao.addEventListener("click", function() {
    botoesPerfil.forEach(function(item) {
      item.classList.remove("active");
    });

    botao.classList.add("active");
    perfilSelecionado = botao.dataset.profile;
  });
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const login = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("loginMessage");

  if (login === "" || senha === "") {
    mensagem.textContent = "Preencha todos os campos.";
    return;
  }

  const usuarioLogado = {
    login: login,
    perfil: perfilSelecionado,
    manterConectado: document.getElementById("manterConectado").checked
  };

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  mensagem.style.color = "green";
  mensagem.textContent = "Login realizado com sucesso!";
});