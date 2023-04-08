    //pokemonRepository is a function contains pokemonlist which has an array of objects.
        let pokemonRepository = (function () {
            let pokemonList = [
                { name: 'Mewtwo', height: 2, type: 'Psychic'},
                { name:'Hitmonlee', height: 1.5, type: 'Fighting'},
                { name:'Raichu', height: 0.8, type: 'Eletric'}
            ];
            //add pokemon to the array with the push method.
        function add(pokemon) {
            pokemonList.push(pokemon);
        }
        //function that grabs all pokemon stored in the pokemonList array.
        function getAll(){
            return pokemonList;
        } 

        function addListItem(pokemon) {
                //new variable that holds the <ul> element in the index.html
                let newPokemonList = document.querySelector('.pokemon-list');

                //new variable creating a virtual <li> element
                let listItem = document.createElement('li');

                //new variable creating an virtual button element
                let button = document.createElement('button');

                //This code makes the button a child to the <ul> element in the index.html
                newPokemonList.appendChild(button);

                //this code puts the name of the pokemon inside the button.
                button.innerText = pokemon.name;

                //this creates a virtual class for the button we made earlier that you can style in css.
                button.classList.add('pokemon-button');

                //this makes the button a child to the listitem variable which is a <li> element.
                button.appendChild(listItem);

                //this makes the list item which is a <li> element a child to the <ul> element.
                newPokemonList.appendChild(listItem);

                //this sets an event for the button to listen for mouse clicks on the element.
                //once someone clicks the button, it'll log the pokemon name on the console.
                button.addEventListener('click', function(showDetails) {
                    console.log(pokemon.name);
                });
            }
            //function to log the entire pokemon array of objects with their details.
        function showDetails(pokemon) {
            console.log(pokemon);
        }
        //allows you to access the functions outside of the IIFE.
        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
        }
    })();
        //this iterates through each object in the pokemon array and and adds all the pokemon to the ul as list items and buttons with an event listener.
        pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);   
        });
