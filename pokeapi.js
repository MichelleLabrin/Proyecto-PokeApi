/* 
Hacer variable del id "podekex"
Crear la funcion fetch para tener la info de la API
hacemos un bucle for para indicar endpoints
creamos un map para limpiar la informacion 
Pintar la lista de elementos en el html 
creamos init para llamar a la funcion

...

*/
const divContainer$$ = document.querySelector(".container");
const listPokedex$$ = document.querySelector("#pokedex");
const input$$ = document.querySelector(".search");

const arrayPokemon = []; 

// funcion async
const getPokeApi = async () => {  
    for (let i = 1; i <= 150; i++) {  
        const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + i);
        const resp = await response.json ();
        arrayPokemon.push(resp);
    };
    return arrayPokemon;
};
//getPokeApi().then(() => console.log(arrayPokemon)); // aqui compruebo que me regrese datos

// Mapeo
const mapPokeApi = (pokeApiSinMapear) => {
    return pokeApiSinMapear.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites['front_default'],
    type: pokemon.types.map((type) => type.type.name).join(`, `),
    }));
};

// pinto en el HTML
const drawPokemons = (pokemons) => {
    listPokedex$$.innerHTML="";

    for (const pokemon of pokemons){
        let li$$ = document.createElement("li");
        li$$.classList.add("card")
        listPokedex$$.appendChild(li$$);

        let newDiv$$ = document.createElement("div");
        newDiv$$.innerHTML = pokemon.name;
        li$$.appendChild(newDiv$$);

        let img$$ = document.createElement("img");
        img$$.setAttribute("src", pokemon.image);
        img$$.setAttribute("alt", pokemon.name);
        li$$.appendChild(img$$);
        
    }
};

// funcion init
const init = async () => {
    const pokemon = await getPokeApi();
    //   console.log(characters);
    const mappedPokeApi = mapPokeApi(pokemon);
    drawPokemons(mappedPokeApi);
};
init();