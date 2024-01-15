const filter = {
    init: function () {
        filter.handleFilters();
    },

    handleFilters: function () {
        const typeSelect = document.getElementById('type-select');
        const generationSelect = document.getElementById('generation-select');

        const applyFilters = () => {
            const selectedType = typeSelect.value.toLowerCase();
            const selectedGeneration = generationSelect.value;

            const pokemonCard = document.getElementsByClassName('pokemon-card');

            for (let i = 0; i < pokemonCard.length; i++) {
                const pokemonType = pokemonCard[i].querySelector('#types-filter p').textContent.toLowerCase();
                const pokemonGeneration = pokemonCard[i].querySelector('#generation-filter').textContent;

                const typeFilter = selectedType === 'all' || pokemonType === selectedType;
                const generationFilter = selectedGeneration === 'all' || pokemonGeneration === selectedGeneration;

                if (typeFilter && generationFilter) {
                    pokemonCard[i].style.display = 'block';
                } else {
                    pokemonCard[i].style.display = 'none';
                }
            }
        };

        typeSelect.addEventListener('change', applyFilters);
        generationSelect.addEventListener('change', applyFilters);
    },
};

document.addEventListener('DOMContentLoaded', filter.init);
