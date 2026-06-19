document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {
        nome: "Dr. João da Silva"
    };

    const cardsFotos = document.getElementById("cardsFotos");
    const modalFoto = document.getElementById("modalFoto");
    const fecharModal = document.getElementById("fecharModal");
    const modalImagemArea = document.getElementById("modalImagemArea");
    const btnVoltar = document.getElementById("btnVoltar");

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

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

    function fe
