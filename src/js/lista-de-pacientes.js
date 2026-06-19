
document.addEventListener('DOMContentLoaded', function () {
    const select = document.querySelector('.filter-select');
    const searchInput = document.getElementById('searchInput');
    const rows = Array.from(document.querySelectorAll('.patient-row'));
    

    function normalizeText(str) {
        return (str || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    }

    function filterRows() {
        const filterVal = select.value; // 'todos', 'estavel', 'pendente', 'atencao'
        const query = normalizeText(searchInput.value.trim());

        rows.forEach(row => {
            const statusEl = row.querySelector('.status');
            const nameEl = row.querySelector('.patient-name');
            const statusClassMatch = statusEl && statusEl.classList.contains(filterVal);
            const nameMatch = normalizeText(nameEl ? nameEl.textContent : '').includes(query);

            const showByStatus = (filterVal === 'todos') || statusClassMatch;
            if (showByStatus && nameMatch) row.style.display = '';
            else row.style.display = 'none';
        });
    }

    select.addEventListener('change', filterRows);
    searchInput.addEventListener('input', filterRows);

    const listMedic = localStorage.getItem('medicosCadastrados');
    const userLogin = localStorage.getItem('usuarioLogado');

    const user = JSON.parse(userLogin)

    const campoUsuario = document.getElementById('user')
    const avatarUsuario = document.getElementById('user-avatar')

    function normalizeAvatarName(name) {
        const parts = name.trim().split(/\s+/); //  user.name =  [['Wesley' 'Henrique'], 'pedro'] => 

        if (parts.length > 1) {
            const firstName = parts[0][0];
            const lastName = parts[parts.length - 1][0];

            return (firstName + lastName).toUpperCase();
        }

        return parts[0].slice(0, 2).toUpperCase();
    }


    campoUsuario.textContent = user.nome;
    avatarUsuario.textContent = normalizeAvatarName(user.nome);

    console.log(`usuario => ${user.nome}, lista de medicos: ${listMedic}`);

});


document.addEventListener('DOMContentLoaded', function () {

    const user = localStorage.getItem("usuarioLogado") 

    if (!user) {
        window.location.href = '../../index.html';
    }

    const botaoSair = document.getElementById('logout');

    if (botaoSair) {
        botaoSair.addEventListener('click', function(e) {
            e.preventDefault();

            localStorage.removeItem('usuarioLogado'); 

            window.location.href = '../../index.html';
        });
    }

});

