    const listaPokemon = document.querySelector("#listaPokemon");
    const botonesHeader = document.querySelectorAll(".btn-header");
    const URL = "https://pokeapi.co/api/v2/pokemon/";


    function crearPokemonElemento(poke) {
    const tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');

    let pokeId = poke.id.toString();
    pokeId = pokeId.padStart(3, '0'); 

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">#${poke.name}</h2>
            </div>    
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    return div;
    }


    function cargarYMostrarPokemon(i, botonId) {
    fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
        if (botonId === "ver-todos" || data.types.some((tipo) => tipo.type.name.includes(botonId))) {
            const pokemonElemento = crearPokemonElemento(data);
            listaPokemon.append(pokemonElemento);
        }
        });
    }


    for (let i = 1; i <= 151; i++) {
    cargarYMostrarPokemon(i, "ver-todos");
    }


    botonesHeader.forEach((boton) => {
    boton.addEventListener("click", (event) => {
        const botonId = event.currentTarget.id;
        listaPokemon.innerHTML = ""; 

        for (let i = 1; i <= 151; i++) {
        cargarYMostrarPokemon(i, botonId);
        }
    });
    });

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) return;

  listaPokemon.innerHTML = "";

  const pokemonDataArray = await Promise.all(
    Array.from({ length: 151 }, (_, i) => fetch(URL + (i + 1)).then((response) => response.json()))
  );

  pokemonDataArray.forEach((data) => {
    const pokemonNombre = data.name.toLowerCase();
    if (searchTerm === "ver-todos" || pokemonNombre.includes(searchTerm)) {
      listaPokemon.appendChild(crearPokemonElemento(data));
    }
  });
});



