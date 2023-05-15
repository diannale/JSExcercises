// Define variables to store the API URL and the Pokemon list
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";
let pokemonList;

// Fetch the list of Pokemon from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    pokemonList = data.results;
    displayPokemonList(pokemonList);
  });

// Define a function to display the list of Pokemon in the HTML
function displayPokemonList(pokemonList) {
  const listElement = document.getElementById("pokemon-list");

  pokemonList.forEach((pokemon) => {
    const listItemElement = document.createElement("li");
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    listItemElement.textContent = pokemonName;

    // Add a click event listener to each list item to fetch the detailed data for that Pokemon
    listItemElement.addEventListener("click", () => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;

      fetch(pokemonUrl)
        .then((response) => response.json())
        .then((data) => {
          const resultElement = document.getElementById("result");

          // Clear the result element before adding new data
          resultElement.innerHTML = "";

          // Create a new element for the selected Pokemon and display its information
          const pokemonElement = document.createElement("div");
          pokemonElement.classList.add("pokemon");

          const pokemonNameElement = document.createElement("h2");
          pokemonNameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

          const pokemonImageElement = document.createElement("img");
          pokemonImageElement.src = data.sprites.front_default;

          const pokemonNumberElement = document.createElement("p");
          pokemonNumberElement.textContent = `Pokedex Number: ${data.id}`;

          const pokemonTypesElement = document.createElement("p");
          const types = data.types.map((type) => type.type.name);
          pokemonTypesElement.textContent = `Type(s): ${types.join(", ")}`;

          pokemonElement.appendChild(pokemonNameElement);
          pokemonElement.appendChild(pokemonImageElement);
          pokemonElement.appendChild(pokemonNumberElement);
          pokemonElement.appendChild(pokemonTypesElement);

          resultElement.appendChild(pokemonElement);
        })
        .catch((error) => console.log(error));
    });

    listElement.appendChild(listItemElement);
  });
}
