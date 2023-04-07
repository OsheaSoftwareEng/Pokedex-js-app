
let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Mewtwo', height: 2, type: 'Psychic'},
        { name:'Hitmonlee', height: 1.5, type: 'Fighting'},
        { name:'Raichu', height: 0.8, type: 'Eletric'}
    ];
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    } 
    return {
        add: add,
        getAll: getAll
    }
    })();
   
    pokemonRepository.getAll().forEach(function(item){
        document.write(item.name  + " height:" + item.height);
    if(item.height > 1.9) {
        document.write("Wow, that's big!");
    }
});
   
   
