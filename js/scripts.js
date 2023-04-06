    //creates a repository function to hold pokemon in the future
    let pokemonRepository = (function () {
        //creates a empty array to add pokemon in later.
        let pokemonList = [];
        //function to add pokemon into the array the push method adds to an array
        function add(pokemon) {
            pokemonList.push(pokemon);
        }
        //function to grab all the pokemon in the list with just getAll function
        function getAll(){
            return pokemonList;
        } 
        return {
            add: add,
            getAll: getAll
        }
        })();
        //adding the pokemon into the repository function
    pokemonRepository.add({name: 'Mewtwo', height: 2, type: 'Psychic'});
    pokemonRepository.add({name:'Hitmonlee', height: 1.5, type: 'Fighting'});
    pokemonRepository.add({name:'Raichu', height: 0.8, type: 'Eletric'});
    //logging all the pokemon in the array into the console
    console.log(pokemonRepository.getAll());
    //using pokemonRepository and calling function getAll() calls the array, then adding forEach method works and passing item stays within an IIFE since its within the function.   
    pokemonRepository.getAll().forEach(function(item){
        //since pokemonRespository grabbed the array through getAll, it now put the array in the function that holds the parameter item.
        //item is now each "item" in the array. So you can do item. and retrieve the values from the array.
        document.write(item.name  + " height:" + item.height);
    if(item.height > 1.9) {
        document.write("Wow, that's big!");
    }
});



    
    
  