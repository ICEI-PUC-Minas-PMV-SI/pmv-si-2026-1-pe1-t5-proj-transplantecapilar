function toggleSidebar() {
    document.getElementById('menu-lateral').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
    const ids = ['foto-1', 'foto-2', 'foto-3', 'foto-4', 'foto-5'];
    const arquivosSelecionados = {};

    function mostrarAviso(mensagem) {
        const aviso = document.createElement('div');
        aviso.textContent = mensagem;
        aviso.className = 'aviso-toast';
        document.body.appendChild(aviso);
        requestAnimationFrame(function () { aviso.style.opacity = '1'; });
        setTimeout(function () {
            aviso.style.opacity = '0';
            setTimeout(function () { aviso.remove(); }, 400);
        }, 2600);
    }

    ids.forEach(function (id) {
        const input = document.getElementById(id);
        const label = input.closest('.envio-de-foto');
        const titulo = label.querySelector('.envio-titulo').cloneNode(true);

        function aoSelecionarFoto() {
            const arquivo = this.files[0];
            if (arquivo) {
                arquivosSelecionados[id] = arquivo;
                const url = URL.createObjectURL(arquivo);
                label.innerHTML = '';
                label.classList.add('com-foto');
                label.appendChild(titulo.cloneNode(true));

                const img = document.createElement('img');
                img.src = url;
                img.className = 'preview-foto';
                label.appendChild(img);

                const trocar = document.createElement('span');
                trocar.textContent = 'Clique para trocar';
                trocar.className = 'trocar-foto';
                label.appendChild(trocar);

                const novoInput = document.createElement('input');
                novoInput.type = 'file';
                novoInput.id = id;
                novoInput.accept = 'image/*';
                novoInput.className = 'input-arquivo';
                novoInput.addEventListener('change', aoSelecionarFoto);
                label.appendChild(novoInput);
            }
        }

        input.addEventListener('change', aoSelecionarFoto);
    });

    document.querySelector('.botao-fotos').addEventListener('click', function () {
        const dados = {
            relato: document.querySelector('.relatos-textarea').value,
            fotos: {},
            data: new Date().toLocaleDateString('pt-BR')
        };

        const idsComFoto = Object.keys(arquivosSelecionados);
        let pendentes = idsComFoto.length;

        if (pendentes === 0) {
            salvarFotos(dados);
            return;
        }

        idsComFoto.forEach(function (id) {
            comprimirImagem(arquivosSelecionados[id], function (imagemComprimida) {
                dados.fotos[id] = imagemComprimida;
                pendentes--;
                if (pendentes === 0) { salvarFotos(dados); }
            });
        });
    });

    function comprimirImagem(arquivo, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const larguraMaxima = 500;
                const proporcao = larguraMaxima / img.width;
                canvas.width = larguraMaxima;
                canvas.height = img.height * proporcao;
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                callback(canvas.toDataURL('image/jpeg', 0.45));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(arquivo);
    }

    function salvarFotos(dados) {
        try {
            const historico = JSON.parse(localStorage.getItem('historicoUploadFotos')) || [];
            historico.push(dados);
            localStorage.setItem('historicoUploadFotos', JSON.stringify(historico));
            localStorage.setItem('uploadFotos', JSON.stringify(dados));
            mostrarAviso('✔ Fotos enviadas com sucesso!');
        } catch (erro) {
            alert('As fotos estão muito grandes para salvar. Tente enviar menos fotos.');
            console.error(erro);
        }
    }
});
