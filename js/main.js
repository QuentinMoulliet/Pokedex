const main = {

    currentInfoBubble: null,
    currentAboutBubble: null,

    init: function () {
        main.allItems();
        main.handleCreateAboutBubble();
        main.displayPokemons();
        main.handleClickPokemon();
        main.handleCreateInfoBubble();
        main.handleAddInfoBubble();
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

            main.handleCreateInfoBubble(cardElement, pokemon);
        });
    },

    handleCreateInfoBubble: function (cardElement, pokemon) {
        const infoBubble = document.createElement('div');
        infoBubble.classList.add('bubble');
        cardElement.appendChild(infoBubble);

        cardElement.addEventListener('click', function (event) {
            event.stopPropagation();
            console.log(pokemon);

            if (main.currentInfoBubble) {
                main.currentInfoBubble.style.display = 'none';
            }
            infoBubble.style.display = (infoBubble.style.display === 'none' || infoBubble.style.display === '') ? 'block' : 'none';
            main.currentInfoBubble = infoBubble;

            main.handleAddInfoBubble(infoBubble, pokemon);

            const closeButton = document.createElement('span');
            closeButton.textContent = '✖';
            closeButton.classList.add('close-button');
            infoBubble.appendChild(closeButton);

            closeButton.addEventListener('click', function (event) {
                event.stopPropagation();
                infoBubble.style.display = 'none';
            });
        });
    },

    handleAddInfoBubble: function (infoBubble, pokemon) {
        

        infoBubble.innerHTML = '';

        const info = document.createElement('div');
        info.classList.add('info');
        infoBubble.appendChild(info);

        const infoLeft = document.createElement('div');
        infoLeft.classList.add('info-left');
        info.appendChild(infoLeft);

        const image = document.createElement('img');
        image.id = 'image';
        image.src = pokemon.sprites.regular;
        infoLeft.appendChild(image);

        const infoRight = document.createElement('div');
        infoRight.classList.add('info-right');
        info.appendChild(infoRight);

        const infoHeader = document.createElement('div');
        infoHeader.classList.add('info-header');
        infoRight.appendChild(infoHeader);

        const name = document.createElement('p');
        name.id = 'name';
        name.textContent = '#' + pokemon.pokedex_id + ' ' + pokemon.name.fr;
        infoHeader.appendChild(name);

        const types = document.createElement('div');
        types.id = 'types';
        pokemon.types.forEach(type => {
            const typeElement = document.createElement('p');
            typeElement.textContent = type.name;
            types.appendChild(typeElement);

            const typeImage = document.createElement('img');
            typeImage.src = type.image;
            types.appendChild(typeImage);
        });
        infoHeader.appendChild(types);

        const generation = document.createElement('p');
        generation.id = 'generation';
        generation.textContent = 'Génération : ' + pokemon.generation;
        if (generation.textContent === 'Génération : 1') {
            generation.textContent = 'Génération : Rouge, Bleu, Jaune';
        } else if (generation.textContent === 'Génération : 2') {
            generation.textContent = 'Génération : Or, Argent';
        } else if (generation.textContent === 'Génération : 3') {
            generation.textContent = 'Génération : Rubis, Saphir,';
        } else if (generation.textContent === 'Génération : 4') {
            generation.textContent = 'Génération : Diamant, Perle, Platine';
        } else if (generation.textContent === 'Génération : 5') {
            generation.textContent = 'Génération : Noir, Blanc';
        } else if (generation.textContent === 'Génération : 6') {
            generation.textContent = 'Génération : X, Y';
        } else if (generation.textContent === 'Génération : 7') {
            generation.textContent = 'Génération : Soleil, Lune';
        } else if (generation.textContent === 'Génération : 8') {
            generation.textContent = 'Génération : Épée, Bouclier';
        } else if (generation.textContent === 'Génération : 9') {
            generation.textContent = 'Génération : Écarlate, Violet';
        }
        infoRight.appendChild(generation);

        const stat = document.createElement('div');
        stat.id = 'stat';
        infoRight.appendChild(stat);

        const statLeft = document.createElement('div');
        statLeft.id = 'stat-left';
        stat.appendChild(statLeft);

        const height = document.createElement('p');
        height.id = 'height';
        height.textContent = 'Taille : ' + pokemon.height;
        statLeft.appendChild(height);

        const weight = document.createElement('p');
        weight.id = 'weight';
        weight.textContent = 'Poids : ' + pokemon.weight;
        statLeft.appendChild(weight);

        const statRight = document.createElement('div');
        statRight.id = 'stat-right';
        stat.appendChild(statRight);

        const talents = document.createElement('div');
        talents.id = 'talents';
        if (pokemon.talents !== null) {
            pokemon.talents.forEach(talent => {
                const talentElement = document.createElement('p');
                talentElement.textContent = 'Compétence: ' + talent.name;
                talents.appendChild(talentElement);
            });
        } else {
            const talentElement = document.createElement('p');
            talentElement.textContent = 'Compétence: Aucune';
            talents.appendChild(talentElement);
        }
        statRight.appendChild(talents);

        const statBar = document.createElement('div');
        statBar.id = 'stat-bar';

        const hp = document.createElement('p');
        hp.textContent = 'PV : ' + pokemon.stats.hp;
        statBar.appendChild(hp);
        const hpBarContainer = document.createElement('div');
        hpBarContainer.classList.add('stat-bar-container');
        statBar.appendChild(hpBarContainer);
        const hpBar = document.createElement('div');
        hpBar.classList.add('stat-bar');
        hpBar.style.width = (pokemon.stats.hp * 100 / 255) + '%';
        hpBarContainer.appendChild(hpBar);

        const attack = document.createElement('p');
        attack.textContent = 'Attaque : ' + pokemon.stats.atk;
        statBar.appendChild(attack);
        const attackBarContainer = document.createElement('div');
        attackBarContainer.classList.add('stat-bar-container');
        statBar.appendChild(attackBarContainer);
        const attackBar = document.createElement('div');
        attackBar.classList.add('stat-bar');
        attackBar.style.width = (pokemon.stats.atk * 100 / 255) + '%';
        attackBarContainer.appendChild(attackBar);

        const defense = document.createElement('p');
        defense.textContent = 'Défense : ' + pokemon.stats.def;
        statBar.appendChild(defense);
        const defenseBarContainer = document.createElement('div');
        defenseBarContainer.classList.add('stat-bar-container');
        statBar.appendChild(defenseBarContainer);
        const defenseBar = document.createElement('div');
        defenseBar.classList.add('stat-bar');
        defenseBar.style.width = (pokemon.stats.def * 100 / 255) + '%';
        defenseBarContainer.appendChild(defenseBar);

        const specialAttack = document.createElement('p');
        specialAttack.textContent = 'Atq Spé : ' + pokemon.stats.spe_atk;
        statBar.appendChild(specialAttack);
        const specialAttackBarContainer = document.createElement('div');
        specialAttackBarContainer.classList.add('stat-bar-container');
        statBar.appendChild(specialAttackBarContainer);
        const specialAttackBar = document.createElement('div');
        specialAttackBar.classList.add('stat-bar');
        specialAttackBar.style.width = (pokemon.stats.spe_atk * 100 / 255) + '%';
        specialAttackBarContainer.appendChild(specialAttackBar);

        const specialDefense = document.createElement('p');
        specialDefense.textContent = 'Déf Spé : ' + pokemon.stats.spe_def;
        statBar.appendChild(specialDefense);
        const specialDefenseBarContainer = document.createElement('div');
        specialDefenseBarContainer.classList.add('stat-bar-container');
        statBar.appendChild(specialDefenseBarContainer);
        const specialDefenseBar = document.createElement('div');
        specialDefenseBar.classList.add('stat-bar');
        specialDefenseBar.style.width = (pokemon.stats.spe_def * 100 / 255) + '%';
        specialDefenseBarContainer.appendChild(specialDefenseBar);

        const speed = document.createElement('p');
        speed.textContent = 'Vitesse : ' + pokemon.stats.vit;
        statBar.appendChild(speed);
        const speedBarContainer = document.createElement('div');
        speedBarContainer.classList.add('stat-bar-container');
        statBar.appendChild(speedBarContainer);
        const speedBar = document.createElement('div');
        speedBar.classList.add('stat-bar');
        speedBar.style.width = (pokemon.stats.vit * 100 / 255) + '%';

        speedBarContainer.appendChild(speedBar);
        infoRight.appendChild(statBar);
    },

    handleCreateAboutBubble: function () {
        const about = document.getElementById('about');
        const aboutBubble = document.getElementById('about-bubble');
        about.addEventListener('click', function (event) {
            event.stopPropagation();

            console.log('testblick');

            if (main.currentAboutBubble) {
                main.currentAboutBubble.style.display = 'none';
            }
            aboutBubble.style.display = (aboutBubble.style.display === 'none' || aboutBubble.style.display === '') ? 'block' : 'none';

            const closeButton = document.createElement('span');
            closeButton.textContent = '✖';
            closeButton.classList.add('about-close-button');
            aboutBubble.appendChild(closeButton);

            closeButton.addEventListener('click', function (event) {
                event.stopPropagation();
                aboutBubble.style.display = 'none';
            });
        });
    },
};
