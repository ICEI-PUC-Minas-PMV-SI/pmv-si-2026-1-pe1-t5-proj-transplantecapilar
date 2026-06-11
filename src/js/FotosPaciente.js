document.addEventListener("DOMContentLoaded", function () {

    const btnVoltar = document.getElementById("btnVoltar");
    const btnSair = document.getElementById("btnSair");

    const btnAlertas = document.getElementById("btnAlertas");
    const btnMensagens = document.getElementById("btnMensagens");
    const btnConfiguracoes = document.getElementById("btnConfiguracoes");

    const btnMenuMobile = document.getElementById("btnMenuMobile");
    const menuLateral = document.getElementById("menuLateral");
    const overlayMenu = document.getElementById("overlayMenu");

    const linkDetalhesPaciente = document.getElementById("linkDetalhesPaciente");

    const modalFoto = document.getElementById("modalFoto");
    const fecharModal = document.getElementById("fecharModal");
    const modalImagemArea = document.getElementById("modalImagemArea");
    const cardsFotos = document.getElementById("cardsFotos");

    function abrirMenu() {
        if (menuLateral && overlayMenu) {
            menuLateral.classList.add("aberto");
            overlayMenu.classList.add("ativo");
        }
    }

    function fecharMenu() {
        if (menuLateral && overlayMenu) {
            menuLateral.classList.remove("aberto");
            overlayMenu.classList.remove("ativo");
        }
    }

    function abrirModal(imagem) {
        if (!modalFoto || !modalImagemArea) {
            return;
        }

        if (imagem) {
            modalImagemArea.innerHTML = `
                <img src="${imagem}" alt="Foto ampliada do paciente" class="imagem-modal-foto">
            `;
        } else {
            modalImagemArea.innerHTML = `
                <i class="fa-regular fa-user imagem-modal-icone"></i>
            `;
        }

        modalFoto.classList.add("abrir");
    }

    function fecharModalFoto() {
        if (modalFoto) {
            modalFoto.classList.remove("abrir");
        }
    }

    function ativarBotoesAmpliar() {
        const botoesAmpliar = document.querySelectorAll(".botao-ampliar");

        botoesAmpliar.forEach(function (botao) {
            botao.addEventListener("click", function () {
                const imagem = botao.getAttribute("data-imagem");
                abrirModal(imagem);
            });
        });
    }

    function carregarFotosDoLocalStorage() {
        const fotosSalvas = JSON.parse(localStorage.getItem("fotosPaciente")) || [];

        if (!cardsFotos || fotosSalvas.length === 0) {
            return;
        }

        cardsFotos.innerHTML = "";

        fotosSalvas.forEach(function (foto, index) {
            const dataFoto = foto.data || new Date().toLocaleDateString("pt-BR");
            const diaFoto = foto.dia || `DIA ${String(index + 1).padStart(2, "0")}`;
            const imagemFoto = foto.imagem || foto.foto || foto.url || "";

            cardsFotos.innerHTML += `
                <div class="card-foto">
                    <div class="foto-area">
                        <img src="${imagemFoto}" class="foto-paciente" alt="Foto do paciente">
                    </div>

                    <div class="card-info">
                        <div>
                            <span class="data">${dataFoto}</span>
                            <h3>${diaFoto}</h3>
                        </div>

                        <button class="botao-ampliar" data-imagem="${imagemFoto}">
                            Ampliar
                        </button>
                    </div>
                </div>
            `;
        });
    }

    if (btnMenuMobile) {
        btnMenuMobile.addEventListener("click", abrirMenu);
    }

    if (overlayMenu) {
        overlayMenu.addEventListener("click", fecharMenu);
    }

    if (btnVoltar) {
        btnVoltar.addEventListener("click", function () {
            history.back();
        });
    }

    if (linkDetalhesPaciente) {
        linkDetalhesPaciente.addEventListener("click", function (event) {
            event.preventDefault();
            history.back();
        });
    }

    if (btnSair) {
        btnSair.addEventListener("click", function (event) {
            event.preventDefault();

            localStorage.removeItem("usuarioLogado");
            window.location.href = "login.html";
        });
    }

    if (btnAlertas) {
        btnAlertas.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Página de alertas ainda não foi criada.");
        });
    }

    if (btnMensagens) {
        btnMensagens.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Página de mensagens ainda não foi criada.");
        });
    }

    if (btnConfiguracoes) {
        btnConfiguracoes.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Página de configurações ainda não foi criada.");
        });
    }

    if (fecharModal) {
        fecharModal.addEventListener("click", fecharModalFoto);
    }

    if (modalFoto) {
        modalFoto.addEventListener("click", function (event) {
            if (event.target === modalFoto) {
                fecharModalFoto();
            }
        });
    }

    carregarFotosDoLocalStorage();
    ativarBotoesAmpliar();

});