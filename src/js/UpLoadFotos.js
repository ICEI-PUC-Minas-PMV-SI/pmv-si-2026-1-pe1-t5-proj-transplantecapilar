document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.botao-fotos').addEventListener('click', function () {
        const relato = document.querySelector('.relatos-textarea').value;
        localStorage.setItem('fotos_relato', relato);
        const fotos = ['foto-1', 'foto-2', 'foto-3', 'foto-4', 'foto-5'];
        fotos.forEach(function (id) {
            const arquivo = document.getElementById(id).files[0];
            if (arquivo) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    localStorage.setItem(id, e.target.result);
                };
                reader.readAsDataURL(arquivo);
            }
        });
    });
});
