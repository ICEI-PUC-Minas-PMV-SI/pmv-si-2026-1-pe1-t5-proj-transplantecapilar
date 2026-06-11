document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.botao-enviar-duvida').addEventListener('click', function () {
        const arquivo = document.getElementById('input-imagens').files[0];
        function salvar(imagemBase64) {
            const dados = {
                texto: document.querySelector('.duvida-textarea').value,
                imagem: imagemBase64 || null,
                data: new Date().toLocaleDateString('pt-BR')
            };
            localStorage.setItem('registrarDuvida', JSON.stringify(dados));
        }
        if (arquivo) {
            const reader = new FileReader();
            reader.onload = function (e) { salvar(e.target.result); };
            reader.readAsDataURL(arquivo);
        } else {
            salvar(null);
        }
    });
});
