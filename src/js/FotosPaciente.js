document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {
        nome: "Dr. João da Silva"
    };

    const cardsFotos = document.getElementById("cardsFotos");
    const modalFoto = document.getElementById("modalFoto");
    const fecharModal = document.getElementById("fecharModal");
    const modalImagemArea = document.getElementById("modalImagemArea");

    const btnVoltar = document.getElementById("btnVoltar");
    const btnSair = document.getElementById("btnSair");
    const btnAlertas = document.getElementById("btnAlertas");
    const btnMensagens = document.getElementById("btnMensagens");
    const btnConfiguracoes = document.getElementById("btnConfiguracoes");
    const btnMenuMobile = document.getElementById("btnMenuMobile");

    const menuLateral = document.getElementById("menuLateral");
    const overlayMenu = document.getElementById("overlayMenu");
    const linkDetalhesPaciente = document.getElementById("linkDetalhesPaciente");

    const nomeUsuarioTopo = document.getElementById("nomeUsuarioTopo");
    const perfilCirculo = document.getElementById("perfilCirculo");

    const notificationBtn = document.getElementById("notificationBtn");
    const notificationMenu = document.getElementById("notificationMenu");

    function pegarIniciais(nome) {
        return nome
            .split(" ")
            .filter(parte => parte.length > 0)
            .slice(0, 2)
            .map(parte => parte[0].toUpperCase())
            .join("");
    }

    if (nomeUsuarioTopo) nomeUsuarioTopo.textContent = usuario.nome;
    if (perfilCirculo) perfilCirculo.textContent = pegarIniciais(usuario.nome);

    function carregarFotosDoUpload() {
        const upload = JSON.parse(localStorage.getItem("uploadFotos"));

        if (!cardsFotos) return;

        cardsFotos.innerHTML = "";

        if (!upload || !upload.fotos || Object.keys(upload.fotos).length === 0) {
            cardsFotos.innerHTML = `
                <div class="card-foto">
                    <div class="foto-area">
                        <i class="fa-regular fa-image"></i>
                    </div>

                    <div class="card-info">
                        <div>
                            <span class="data">Nenhuma foto enviada</span>
                            <h3>Aguardando upload</h3>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const nomesFotos = {
            "foto-1": "Frente - Área Receptora",
            "foto-2": "Lateral Direita",
            "foto-3": "Lateral Esquerda",
            "foto-4": "Cima - Vértice",
            "foto-5": "Área Doadora - Nuca"
        };

        Object.keys(upload.fotos).forEach(function (idFoto) {
            const imagemFoto = upload.fotos[idFoto];

            if (!imagemFoto) return;

            const relato = upload.relato && upload.relato.trim() !== ""
                ? upload.relato
                : "Nenhum relato informado.";

            cardsFotos.innerHTML += `
                <div class="card-foto">
                    <div class="foto-area">
                        <img src="${imagemFoto}" class="foto-paciente" alt="${nomesFotos[idFoto]}">
                    </div>

                    <div class="card-info">
                        <div>
                            <span class="data">${upload.data}</span>
                            <h3>${nomesFotos[idFoto]}</h3>
                            <p class="relato-card">${relato}</p>
                        </div>

                        <button class="botao-ampliar" data-imagem="${imagemFoto}">
                            Ampliar
                        </button>
                    </div>
                </div>
            `;
        });

        ativarBotoesAmpliar();
    }

    function abrirModal(imagem) {
        if (!modalFoto || !modalImagemArea) return;

        modalImagemArea.innerHTML = `
            <img src="${imagem}" alt="Foto ampliada do paciente" class="imagem-modal-foto">
        `;

        modalFoto.classList.add("abrir");
    }

    function fecharModalFoto() {
        if (modalFoto) modalFoto.classList.remove("abrir");
    }

    function ativarBotoesAmpliar() {
        document.querySelectorAll(".botao-ampliar").forEach(function (botao) {
            botao.addEventListener("click", function () {
                abrirModal(botao.getAttribute("data-imagem"));
            });
        });
    }

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

    function irParaPainel(secao) {
        localStorage.setItem("secaoPainelMedico", secao);
        window.location.href = "PainelMedico.html";
    }

    if (btnMenuMobile) btnMenuMobile.addEventListener("click", abrirMenu);
    if (overlayMenu) overlayMenu.addEventListener("click", fecharMenu);

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
            window.location.href = "../../index.html";
        });
    }

    if (btnAlertas) {
        btnAlertas.addEventListener("click", function (event) {
            event.preventDefault();
            irParaPainel("alertas");
        });
    }

    if (btnMensagens) {
        btnMensagens.addEventListener("click", function (event) {
            event.preventDefault();
            irParaPainel("mensagens");
        });
    }

    if (btnConfiguracoes) {
        btnConfiguracoes.addEventListener("click", function (event) {
            event.preventDefault();
            irParaPainel("configuracoes");
        });
    }

    if (notificationBtn && notificationMenu) {
        notificationBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            notificationMenu.classList.toggle("open");
        });

        document.addEventListener("click", function (event) {
            if (!notificationMenu.contains(event.target) && !notificationBtn.contains(event.target)) {
                notificationMenu.classList.remove("open");
            }
        });
    }

    document.querySelectorAll(".notification-item").forEach(function (item) {

    item.addEventListener("click", function () {

        const secao = item.dataset.targetSection;
        const alvo = item.dataset.targetId;
        const categoria = item.dataset.notificationCategory;

        if (secao) {
            localStorage.setItem("secaoPainelMedico", secao);
        }

        if (alvo) {
            localStorage.setItem("alvoPainelMedico", alvo);
        }

        if (categoria) {
            localStorage.setItem("categoriaPainelMedico", categoria);
        }

        notificationMenu.classList.remove("open");

        window.location.href = "PainelMedico.html";

    });

});

    if (fecharModal) fecharModal.addEventListener("click", fecharModalFoto);

    if (modalFoto) {
        modalFoto.addEventListener("click", function (event) {
            if (event.target === modalFoto) fecharModalFoto();
        });
    }

    carregarFotosDoUpload();
});