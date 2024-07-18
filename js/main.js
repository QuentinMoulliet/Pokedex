const main = {

    init: function () {
        main.allItems();
        main.displayPokemons();
    },

    allItems: function () {
        const url = 'https://tyradex.vercel.app/api/v1/pokemon';
        api.requestAPI(url)
            .then(allPokemons => {
                main.displayPokemons(allPokemons);
                console.log(allPokemons);
            });
    },

    displayPokemons: function (pokemons) {
        const pokemonCardElement = document.querySelector('.display');
        pokemons.shift();
        pokemons.forEach(pokemon => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('pokemon-card');
            pokemonCardElement.appendChild(cardElement);

            const image = document.createElement('img');
            image.id = 'hover-image';
            image.src = pokemon.sprites.regular;

            const imageContainer = document.createElement('div');
            imageContainer.className = 'card-image';
            imageContainer.appendChild(image);
            cardElement.appendChild(imageContainer);


            const name = document.createElement('p');
            name.classList.add('pokemon-title');
            name.textContent = '#' + pokemon.pokedex_id + ' ' + pokemon.name.fr;
            cardElement.appendChild(name);

            const types = document.createElement('div');
            types.id = 'types-filter';
            pokemon.types.forEach(type => {
                const typeElement = document.createElement('p');
                typeElement.textContent = type.name;
                types.appendChild(typeElement);
            });
            cardElement.appendChild(types);

            const generation = document.createElement('p');
            generation.id = 'generation-filter';
            generation.textContent = pokemon.generation;
            cardElement.appendChild(generation);

            bubble.handleCreateInfoBubble(cardElement, pokemon, pokemons);
        });
    },
};
