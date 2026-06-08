document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.botao-enviar-duvida').addEventListener('click', function () {
        localStorage.setItem('duvida', document.querySelector('.duvida-textarea').value);
    });
});
