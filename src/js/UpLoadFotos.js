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
                const reader = new FileReader();
                reader.onload = function (e) {
                    dados.fotos[id] = e.target.result;
                    pendentes--;
                    if (pendentes === 0) {
                        localStorage.setItem('uploadFotos', JSON.stringify(dados));
                    }
                };
                reader.readAsDataURL(arquivo);
            }
        });

        if (pendentes === 0) {
            localStorage.setItem('uploadFotos', JSON.stringify(dados));
        }
    });
});
