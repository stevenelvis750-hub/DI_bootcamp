/* =========================================================
   POKÉDEX JAVASCRIPT
   ========================================================= */


// =========================================================
// GET HTML ELEMENTS
// =========================================================

const pokemonImage = document.querySelector("#pokemon-image");

const pokemonId = document.querySelector("#pokemon-id");

const pokemonName = document.querySelector("#pokemon-name");

const pokemonTypes = document.querySelector("#pokemon-types");

const pokemonHeight = document.querySelector("#pokemon-height");

const pokemonWeight = document.querySelector("#pokemon-weight");

const pokemonDescription =
    document.querySelector("#pokemon-description");

const loading =
    document.querySelector("#loading");

const message =
    document.querySelector("#message");

const randomButton =
    document.querySelector("#random");

const previousButton =
    document.querySelector("#previous");

const nextButton =
    document.querySelector("#next");

const visualNumber =
    document.querySelector("#visual-number");


// =========================================================
// POKÉMON LIMITS
// =========================================================

const firstPokemonId = 1;

const lastPokemonId = 1025;


// =========================================================
// CURRENT POKÉMON
// =========================================================

let currentPokemonId = 1;


// =========================================================
// LOADING STATE
// =========================================================

function setLoading(isLoading) {

    loading.hidden = !isLoading;

    randomButton.disabled = isLoading;

    previousButton.disabled =
        isLoading ||
        currentPokemonId === firstPokemonId;

    nextButton.disabled =
        isLoading ||
        currentPokemonId === lastPokemonId;


    if (isLoading) {

        pokemonImage.hidden = true;

        message.textContent = "";

    }

}


// =========================================================
// CREATE TYPE BADGES
// =========================================================

function createTypeBadges(types) {

    pokemonTypes.innerHTML = "";


    types.forEach(({ type }) => {

        const badge =
            document.createElement("span");


        badge.classList.add(
            "type",
            `type-${type.name}`
        );


        badge.textContent = type.name;


        pokemonTypes.appendChild(badge);

    });

}


// =========================================================
// SHOW POKÉMON
// =========================================================

function showPokemon(pokemon) {

    // Save current ID
    currentPokemonId = pokemon.id;


    // Pokémon image
    const artwork =
        pokemon.sprites.other?.["official-artwork"]?.front_default
        || pokemon.sprites.front_default;


    pokemonImage.src = artwork;

    pokemonImage.alt =
        `${pokemon.name} artwork`;


    // ID
    pokemonId.textContent =
        `#${String(pokemon.id).padStart(3, "0")}`;


    // Name
    pokemonName.textContent =
        pokemon.name;


    // Visual number
    visualNumber.textContent =
        String(pokemon.id).padStart(3, "0");


    // Types
    createTypeBadges(pokemon.types);


    // Height
    pokemonHeight.textContent =
        `${(pokemon.height / 10).toFixed(1)} m`;


    // Weight
    pokemonWeight.textContent =
        `${(pokemon.weight / 10).toFixed(1)} kg`;


    // Description
    pokemonDescription.textContent =
        `A ${pokemon.types[0].type.name}-type Pokémon. ` +
        `Explore its profile and discover more about this species.`;


    // Show image
    pokemonImage.hidden = false;


    // Navigation
    previousButton.disabled =
        currentPokemonId === firstPokemonId;


    nextButton.disabled =
        currentPokemonId === lastPokemonId;


    // Clear message
    message.textContent = "";

}


// =========================================================
// FETCH POKÉMON
// =========================================================

async function fetchPokemon(pokemonIdToFetch) {

    setLoading(true);


    try {

        const response =
            await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonIdToFetch}`
            );


        if (!response.ok) {

            throw new Error(
                "Pokémon unavailable"
            );

        }


        const pokemon =
            await response.json();


        showPokemon(pokemon);


    } catch (error) {

        console.error(error);


        pokemonName.textContent =
            "Unavailable";


        pokemonId.textContent =
            "#---";


        pokemonTypes.innerHTML = "";


        pokemonHeight.textContent =
            "--";


        pokemonWeight.textContent =
            "--";


        pokemonDescription.textContent =
            "We couldn't retrieve this Pokémon right now.";


        pokemonImage.hidden = true;


        message.textContent =
            "Oops! Pokémon data could not be loaded.";


    } finally {

        setLoading(false);

    }

}


// =========================================================
// RANDOM POKÉMON
// =========================================================

function fetchRandomPokemon() {

    let randomId;


    do {

        randomId =
            Math.floor(
                Math.random() *
                lastPokemonId
            ) + firstPokemonId;

    } while (
        randomId === currentPokemonId
        && lastPokemonId > 1
    );


    fetchPokemon(randomId);

}


// =========================================================
// PREVIOUS BUTTON
// =========================================================

previousButton.addEventListener(
    "click",
    () => {

        if (
            currentPokemonId >
            firstPokemonId
        ) {

            fetchPokemon(
                currentPokemonId - 1
            );

        }

    }
);


// =========================================================
// NEXT BUTTON
// =========================================================

nextButton.addEventListener(
    "click",
    () => {

        if (
            currentPokemonId <
            lastPokemonId
        ) {

            fetchPokemon(
                currentPokemonId + 1
            );

        }

    }
);


// =========================================================
// RANDOM BUTTON
// =========================================================

randomButton.addEventListener(
    "click",
    fetchRandomPokemon
);


// =========================================================
// KEYBOARD CONTROLS
// =========================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowLeft") {

            previousButton.click();

        }


        if (event.key === "ArrowRight") {

            nextButton.click();

        }


        if (event.key === " ") {

            event.preventDefault();

            randomButton.click();

        }

    }
);


// =========================================================
// START APPLICATION
// =========================================================

fetchPokemon(currentPokemonId);