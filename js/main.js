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
            cardElement.classList.add('pokemon-card', 'theme-red-linear');

            const localPokemonCardTheme = localStorage.getItem('colorTheme');
            if (localPokemonCardTheme) {
                cardElement.classList.remove('theme-red-linear', 'theme-blue-linear', 'theme-green-linear');
                cardElement.classList.add(localPokemonCardTheme + '-linear');
            }
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

            main.handleCreateInfoBubble(cardElement, pokemon, pokemons);
        });
    },

    handleCreateInfoBubble: function (cardElement, pokemon, pokemons) {
        const infoBubble = document.createElement('div');
        infoBubble.classList.add('bubble');
        cardElement.appendChild(infoBubble);
    
        // Fonction pour fermer la bulle d'information
        const closeInfoBubble = function() {
            if (main.currentInfoBubble) {
                main.currentInfoBubble.style.display = 'none';
            }
            infoBubble.style.display = 'none';
        };
    
        // Gestionnaire de clic sur la carte pour ouvrir la bulle
        cardElement.addEventListener('click', function (event) {
            event.stopPropagation();
    
            // Fermer la bulle d'information actuelle si elle est ouverte
            closeInfoBubble();
    
            // Afficher ou cacher la bulle en fonction de son état actuel
            infoBubble.style.display = (infoBubble.style.display === 'none' || infoBubble.style.display === '') ? 'block' : 'none';
            main.currentInfoBubble = infoBubble;
    
            // Appel de la fonction pour ajouter le contenu de la bulle d'information
            main.handleAddInfoBubble(infoBubble, pokemon, pokemons);
    
            // Ajouter un bouton de fermeture à la bulle
            const closeButton = document.createElement('span');
            closeButton.textContent = '✖';
            closeButton.classList.add('close-button');
            infoBubble.appendChild(closeButton);
    
            // Gestionnaire de clic sur le bouton de fermeture
            closeButton.addEventListener('click', function (event) {
                event.stopPropagation();
                closeInfoBubble();
            });
        });
    
        // Gestionnaire de clic sur le document pour fermer la bulle en dehors
        document.addEventListener('click', function (event) {
            if (main.currentInfoBubble && event.target !== cardElement && !cardElement.contains(event.target)) {
                closeInfoBubble();
            }
        });
    
        // Gestionnaire de touche échap pour fermer la bulle
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeInfoBubble();
            }
        });
    },

    handleAddInfoBubble: function (infoBubble, pokemon, pokemons) {
        
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
        infoRight.classList.add('info-right', 'theme-red-bgc');

        const localInfoRightTheme = localStorage.getItem('colorTheme');
            if (localInfoRightTheme) {
                infoRight.classList.remove('theme-red-bgc', 'theme-blue-bgc', 'theme-green-bgc');
                infoRight.classList.add(localInfoRightTheme + '-bgc');
            }

        info.appendChild(infoRight);

        const localTheme = localStorage.getItem('colorTheme');
        if (localTheme) {
            infoRight.classList.remove('theme-red');
            infoRight.classList.add(localTheme);
        }

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

        const statBarContainer = document.createElement('div');
        statBarContainer.className = 'stat-bar-container';
        infoRight.appendChild(statBarContainer);

        const statBarContainerLeft = document.createElement('div');
        statBarContainerLeft.className = 'stat-bar-container-left';
        statBarContainer.appendChild(statBarContainerLeft);

        const statTitle = document.createElement('h4');
        statTitle.textContent = 'Statistiques';
        statTitle.id = 'stat-title';
        statBarContainerLeft.appendChild(statTitle);

        const statBar = document.createElement('div');
        statBar.id = 'stat-bar';
        statBarContainerLeft.appendChild(statBar);

        const hp = document.createElement('p');
        hp.textContent = 'PV : ' + pokemon.stats.hp;
        statBar.appendChild(hp);
        const hpBarContainer = document.createElement('div');
        hpBarContainer.classList.add('stat-bar-details');
        statBar.appendChild(hpBarContainer);
        const hpBar = document.createElement('div');
        hpBar.classList.add('stat-bar');
        hpBar.style.width = (pokemon.stats.hp * 100 / 255) + '%';
        hpBarContainer.appendChild(hpBar);

        const attack = document.createElement('p');
        attack.textContent = 'Attaque : ' + pokemon.stats.atk;
        statBar.appendChild(attack);
        const attackBarContainer = document.createElement('div');
        attackBarContainer.classList.add('stat-bar-details');
        statBar.appendChild(attackBarContainer);
        const attackBar = document.createElement('div');
        attackBar.classList.add('stat-bar');
        attackBar.style.width = (pokemon.stats.atk * 100 / 255) + '%';
        attackBarContainer.appendChild(attackBar);

        const defense = document.createElement('p');
        defense.textContent = 'Défense : ' + pokemon.stats.def;
        statBar.appendChild(defense);
        const defenseBarContainer = document.createElement('div');
        defenseBarContainer.classList.add('stat-bar-details');
        statBar.appendChild(defenseBarContainer);
        const defenseBar = document.createElement('div');
        defenseBar.classList.add('stat-bar');
        defenseBar.style.width = (pokemon.stats.def * 100 / 255) + '%';
        defenseBarContainer.appendChild(defenseBar);

        const specialAttack = document.createElement('p');
        specialAttack.textContent = 'Atq Spé : ' + pokemon.stats.spe_atk;
        statBar.appendChild(specialAttack);
        const specialAttackBarContainer = document.createElement('div');
        specialAttackBarContainer.classList.add('stat-bar-details');
        statBar.appendChild(specialAttackBarContainer);
        const specialAttackBar = document.createElement('div');
        specialAttackBar.classList.add('stat-bar');
        specialAttackBar.style.width = (pokemon.stats.spe_atk * 100 / 255) + '%';
        specialAttackBarContainer.appendChild(specialAttackBar);

        const specialDefense = document.createElement('p');
        specialDefense.textContent = 'Déf Spé : ' + pokemon.stats.spe_def;
        statBar.appendChild(specialDefense);
        const specialDefenseBarContainer = document.createElement('div');
        specialDefenseBarContainer.classList.add('stat-bar-details');
        statBar.appendChild(specialDefenseBarContainer);
        const specialDefenseBar = document.createElement('div');
        specialDefenseBar.classList.add('stat-bar');
        specialDefenseBar.style.width = (pokemon.stats.spe_def * 100 / 255) + '%';
        specialDefenseBarContainer.appendChild(specialDefenseBar);

        const speed = document.createElement('p');
        speed.textContent = 'Vitesse : ' + pokemon.stats.vit;
        statBar.appendChild(speed);
        const speedBarContainer = document.createElement('div');
        speedBarContainer.classList.add('stat-bar-details');
        statBar.appendChild(speedBarContainer);
        const speedBar = document.createElement('div');
        speedBar.classList.add('stat-bar');
        speedBar.style.width = (pokemon.stats.vit * 100 / 255) + '%';
        speedBarContainer.appendChild(speedBar);

        const statBarContainerRight = document.createElement('div');
        statBarContainerRight.className = 'stat-bar-container-right';
        statBarContainer.appendChild(statBarContainerRight);

        const evolutionTitle = document.createElement('h4');
        evolutionTitle.textContent = 'Évolution';
        evolutionTitle.id = 'evolution-title';
        statBarContainerRight.appendChild(evolutionTitle);

        const evolutionConditionsContainer = document.createElement('div');
        evolutionConditionsContainer.id = 'evolution-conditions-container';

        if (pokemon.evolution.pre && pokemon.evolution.pre.length > 0) {
            pokemon.evolution.pre.forEach((preEvolution) => {

                const preEvolutionName = document.createElement('p');
                preEvolutionName.id = 'pre-evolution-name';
                preEvolutionName.textContent = preEvolution.name;
                evolutionConditionsContainer.appendChild(preEvolutionName);

                const preEvolutionImage = document.createElement('img');
                preEvolutionImage.id = 'pre-evolution-image';
                preEvolutionImage.src = pokemons[preEvolution.pokedex_id - 1].sprites.regular;
                evolutionConditionsContainer.appendChild(preEvolutionImage);

                const preEvolutionCondition = document.createElement('p');
                preEvolutionCondition.id = 'pre-evolution-condition';
                preEvolutionCondition.textContent = preEvolution.condition;
                evolutionConditionsContainer.appendChild(preEvolutionCondition);

            });
        }

        if (pokemon.evolution.next && pokemon.evolution.next.length > 0) {
            pokemon.evolution.next.forEach((nextEvolution) => {

                const nextEvolutionName = document.createElement('p');
                nextEvolutionName.id = 'next-evolution-name';
                nextEvolutionName.textContent = nextEvolution.name;
                evolutionConditionsContainer.appendChild(nextEvolutionName);

                const nextEvolutionImage = document.createElement('img');
                nextEvolutionImage.id = 'next-evolution-image';
                nextEvolutionImage.src = pokemons[nextEvolution.pokedex_id - 1].sprites.regular;
                evolutionConditionsContainer.appendChild(nextEvolutionImage);

                const nextEvolutionCondition = document.createElement('p');
                nextEvolutionCondition.id = 'next-evolution-condition';
                nextEvolutionCondition.textContent = nextEvolution.condition;
                evolutionConditionsContainer.appendChild(nextEvolutionCondition);
            });
        }
        statBarContainerRight.appendChild(evolutionConditionsContainer);

    },

    handleCreateAboutBubble: function () {
        const about = document.getElementById('about');
        const aboutBubble = document.getElementById('about-bubble');

        function closeAboutBubble() {
            aboutBubble.style.display = 'none';
            document.removeEventListener('keydown', handleEscapePress);
            document.removeEventListener('click', handleOutsideClick);
        }

        function handleEscapePress(event) {
            if (event.key === 'Escape') {
                closeAboutBubble();
            }
        }

        function handleOutsideClick(event) {
            if (!aboutBubble.contains(event.target) && event.target !== about) {
                closeAboutBubble();
            }
        }

        about.addEventListener('click', function (event) {
            event.stopPropagation();

            console.log('testblick');

            if (main.currentAboutBubble) {
                main.currentAboutBubble.style.display = 'none';
            }

            aboutBubble.style.display = (aboutBubble.style.display === 'none' || aboutBubble.style.display === '') ? 'block' : 'none';

            if (aboutBubble.style.display === 'block') {
                document.addEventListener('keydown', handleEscapePress);
                document.addEventListener('click', handleOutsideClick);
            }

            if (!aboutBubble.querySelector('.about-close-button')) {
                const closeButton = document.createElement('span');
                closeButton.textContent = '✖';
                closeButton.classList.add('about-close-button');
                aboutBubble.appendChild(closeButton);

                closeButton.addEventListener('click', function (event) {
                    event.stopPropagation();
                    closeAboutBubble();
                });
            }
        });
    },
};    
