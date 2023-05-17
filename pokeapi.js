/* 
Hacer variable del id "podekex"
Crear la funcion fetch para tener la info de la API
hacemos un bucle for 
creamos un map para limpiar la informacion 
creamos init para llamar a la funcion
Pintar la lista de elementos en el html 
crear el filtro
crear nuevo array de fav
crear el btn
pintar el boton 
hacer que funcione el boton 
...

*/

// All Query
const divContainer$$ = document.querySelector(".container");
const listPokedex$$ = document.querySelector("#pokedex");
const input$$ = document.querySelector(".search");
const favoritosDiv$$ = document.querySelector(".favoritosDiv");

const arrayPokemon = []; 
let favoritos = [];
//console.log(favoritos);

// funcion async 1º
const getPokeApi = async () => {  
    for (let i = 1; i <= 150; i++) {  
        const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + i);
        const resp = await response.json ();
        arrayPokemon.push(resp);
    };
    return arrayPokemon;
};


// Mapeo 2º
const mapPokeApi = (pokeApiSinMapear) => {
    return pokeApiSinMapear.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other.home['front_default'],
    type: pokemon.types.map((type) => type.type.name).join(`, `),
    }));
};


// pinto en el HTML los pokemones 4º
const drawPokemons = (pokemons) => {
    listPokedex$$.innerHTML="";

    for (const pokemon of pokemons){
        let li$$ = document.createElement("li");
        li$$.classList.add("card");
        listPokedex$$.appendChild(li$$);

        /*let id$$ = document.createElement ("p");
        id$$.innerHTML = pokemon.id;
        li$$.appendChild(id$$);*/

        // 7 creo el boton 
        let btnFav$$ = document.createElement("div");
        btnFav$$.setAttribute("data-id", pokemon.id);
        btnFav$$.classList.add("far", "fa-star");
        li$$.appendChild(btnFav$$);

        btnFav$$.addEventListener("click", () => {
            botonFavorite(pokemon);
        });

        let newDiv$$ = document.createElement("div");
        newDiv$$.innerHTML = pokemon.name;
        newDiv$$.classList.add("card-title");
        li$$.appendChild(newDiv$$);

        let img$$ = document.createElement("img");
        img$$.setAttribute("src", pokemon.image);
        img$$.setAttribute("alt", pokemon.name);
        img$$.classList.add("card-image");
        li$$.appendChild(img$$);

        let type$$ = document.createElement ("h3");
        type$$.textContent = pokemon.type; 
        type$$.classList.add("card-subtitle");
        li$$.appendChild(type$$);
    }
};


// pinto los favoritos
const renderFav = () => {
    favoritosDiv$$.innerHTML = "";
    
    for (const favPoke of favoritos) {
        const pokemon = arrayPokemon.find((p) => p.id === favPoke);

        if (pokemon) {
            favoritosDiv$$.innerHTML += `
                <div>
                    <h2>${pokemon.name}</h2>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                </div>
            `;
        }
    }
};

// Boton de favorito con 
const botonFavorite = (pokemon) => {
    const favId = pokemon.id;
    const findPosition = favoritos.indexOf(favId);
    const btnFav$$ = document.querySelector(`[data-id="${pokemon.id}"]`);

    if (findPosition === -1) {
        favoritos.push(favId);
        btnFav$$.classList.remove("far");
        btnFav$$.classList.add("fas");
        console.log(`Agregado a favoritos: ${favId}`);
    } else {
        favoritos.splice(findPosition, 1);
        btnFav$$.classList.remove("fas");
        btnFav$$.classList.add("far");
        console.log(`Eliminado de favoritos: ${favId}`);
    }

    localStorage.setItem("ObjetoFav", JSON.stringify(favoritos)) // new

    renderFav();
};

//listener / pinto input 6º
const drawInput = (pokemons) => {
    const input$$ = document.querySelector("input");
    input$$.addEventListener ("input", ()=> 
        searchPokemon(pokemons, input$$.value)
    );
};


//Search / filtro 5º
const searchPokemon = (pokemons, filtro) =>{
    let filteredPokemons = pokemons.filter ((pokemon)=> 
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
    );

    drawPokemons(filteredPokemons);
};


// funcion init 3º
const init = async () => {

        //new
        const getLocal = JSON.parse(localStorage.getItem("ObjetoFav"))

        if (getLocal){
            favoritos = getLocal;
        }  //new

    const pokemon = await getPokeApi();
    
    const mappedPokeApi = mapPokeApi(pokemon);
    drawPokemons(mappedPokeApi);
    drawInput(mappedPokeApi);
    renderFav();
};
init();