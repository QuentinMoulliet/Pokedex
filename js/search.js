const search = {
    init: function () {
        search.searchBar();
    },

    searchBar: function () {
        const searchBar = document.getElementById('search-input');
        searchBar.addEventListener('keyup', (event) => {
            const searchValue = event.target.value.toLowerCase();
            const pokemonCard = document.getElementsByClassName('pokemon-card');
            for (let i = 0; i < pokemonCard.length; i++) {
                const pokemonName = pokemonCard[i].getElementsByTagName('p')[0].textContent.toLowerCase();
                if (pokemonName.includes(searchValue)) {
                    pokemonCard[i].style.display = 'block';
                } else {
                    pokemonCard[i].style.display = 'none';
                }
            }
        });
    },
}