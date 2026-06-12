document.addEventListener('DOMContentLoaded', function () {
    const zonaUpload = document.querySelector('.zona-upload-duvida');
    let arquivoSelecionado = null;

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

    function aoSelecionarImagem() {
        const arquivo = this.files[0];
        if (arquivo) {
            arquivoSelecionado = arquivo;
            const url = URL.createObjectURL(arquivo);
            zonaUpload.innerHTML =
                '<img src="' + url + '" class="preview-duvida">' +
                '<span class="trocar-imagem">Clique para trocar a imagem</span>' +
                '<input type="file" id="input-imagens" multiple accept="image/*" class="input-arquivo">';
            zonaUpload.querySelector('#input-imagens').addEventListener('change', aoSelecionarImagem);
        }
    }

    document.getElementById('input-imagens').addEventListener('change', aoSelecionarImagem);

    document.querySelector('.botao-enviar-duvida').addEventListener('click', function () {
        function salvar(imagemBase64) {
            const dados = {
                texto: document.querySelector('.duvida-textarea').value,
                imagem: imagemBase64 || null,
                data: new Date().toLocaleDateString('pt-BR')
            };
            localStorage.setItem('registrarDuvida', JSON.stringify(dados));
            mostrarAviso('✔ Dúvida enviada com sucesso!');
        }

        if (arquivoSelecionado) {
            const reader = new FileReader();
            reader.onload = function (e) { salvar(e.target.result); };
            reader.readAsDataURL(arquivoSelecionado);
        } else {
            salvar(null);
        }
    });
});
