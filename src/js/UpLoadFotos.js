document.addEventListener('DOMContentLoaded', function () {
    const ids = ['foto-1', 'foto-2', 'foto-3', 'foto-4', 'foto-5'];

    document.querySelector('.botao-fotos').addEventListener('click', function () {
        const dados = {
            relato: document.querySelector('.relatos-textarea').value,
            fotos: {},
            data: new Date().toLocaleDateString('pt-BR')
        };

        let pendentes = 0;

        ids.forEach(function (id) {
            const arquivo = document.getElementById(id).files[0];

            if (arquivo) {
                pendentes++;

                comprimirImagem(arquivo, function (imagemComprimida) {
                    dados.fotos[id] = imagemComprimida;
                    pendentes--;

                    if (pendentes === 0) {
                        salvarFotos(dados);
                    }
                });
            }
        });
    });

    function comprimirImagem(arquivo, callback) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();

            img.onload = function () {
                const canvas = document.createElement("canvas");
                const larguraMaxima = 500;

                const proporcao = larguraMaxima / img.width;

                canvas.width = larguraMaxima;
                canvas.height = img.height * proporcao;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const imagemComprimida = canvas.toDataURL("image/jpeg", 0.45);

                callback(imagemComprimida);
            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(arquivo);
    }

    function salvarFotos(dados) {
        try {
            const historico = JSON.parse(localStorage.getItem("historicoUploadFotos")) || [];

            historico.push(dados);

            localStorage.setItem("historicoUploadFotos", JSON.stringify(historico));
            localStorage.setItem("uploadFotos", JSON.stringify(dados));

        } catch (erro) {
            alert("As fotos estão muito grandes para salvar. Tente enviar menos fotos.");
            console.error(erro);
        }
    }
});
