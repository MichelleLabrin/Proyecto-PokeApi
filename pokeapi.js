/* 
Hacer variable del id "podekex"
Crear la funcion fetch para tener la info de la API
hacemos un bucle for para indicar endpoints
creamos un map para limpiar la informacion 
Pintar la lista de elementos en el html 
creamos init para llamar a la funcion

...
*/

const divContainer = document.querySelector(".container");
const input = document.querySelector(".search");


let arrayPokemon = []; // mi primer array

const getPokeApi = async () => {  // mi función asincrona
    for (let i = 1; i < 150; i++) {  // veo mas claro que recorra hasta 150 con el for tradicional
        fetch('https://pokeapi.co/api/v2/pokemon/' + i)
        .then((response) => response.json()) // lo convierto a json
        .then((resp) => { // y con la respuesta
            arrayPokemon.push(resp); // lo meto en mi array con .push
        if (arrayPokemon.length === 150) { // hasta que llegue a 150
            goTo(arrayPokemon); // y lo mande a mi array
        }
        });
    }
};

getPokeApi(); // aqui ire renderizando 


