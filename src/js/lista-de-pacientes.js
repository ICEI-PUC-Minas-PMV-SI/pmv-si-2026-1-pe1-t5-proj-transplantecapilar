document.addEventListener('DOMContentLoaded', function() {
    const select = document.querySelector('.filter-select');
    const searchInput = document.getElementById('searchInput');
    const rows = Array.from(document.querySelectorAll('.patient-row'));

    function normalizeText(str){
        return (str||'').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    }

    function filterRows(){
        const filterVal = select.value; // 'todos', 'estavel', 'pendente', 'atencao'
        const query = normalizeText(searchInput.value.trim());

        rows.forEach(row => {
            const statusEl = row.querySelector('.status');
            const nameEl = row.querySelector('.patient-name');
            const statusClassMatch = statusEl && statusEl.classList.contains(filterVal);
            const nameMatch = normalizeText(nameEl ? nameEl.textContent : '').includes(query);

            const showByStatus = (filterVal === 'todos') || statusClassMatch;
            if(showByStatus && nameMatch) row.style.display = '';
            else row.style.display = 'none';
        });
    }

    select.addEventListener('change', filterRows);
    searchInput.addEventListener('input', filterRows);
});
