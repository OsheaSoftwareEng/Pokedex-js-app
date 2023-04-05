
let pokemonList = [
    { name: 'Mewtwo', height: 2, type: 'Psychic'},
    { name:'Hitmonlee', height: 1.5, type: 'Fighting'},
    { name:'Raichu', height: 0.8, type: 'Eletric'}
];
//starts from 0 index and iterates over the 3 items in the array. Mewtwo being 0, Hitmonlee being 1, Raichu being 2.
for (let i = 0; i < pokemonList.length; i++){
    //writes the the list of pokemon into dom from the loop and adds the height next to each pokemon.
    document.write(pokemonList[i].name  + " height:" + pokemonList[i].height);
    //condition statement to write a string if the pokemon's height is greater than 1.9.
    if(pokemonList[i].height > 1.9) {
        document.write("Wow, that's big!");
    }   
}

