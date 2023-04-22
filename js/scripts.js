//pokemonRepository is a function contains pokemonlist which has an array of objects.
const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //add pokemon to the array with the push method.
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //function that grabs all pokemon stored in the pokemonList array.
  function getAll() {
    return pokemonList;
  }

  //function to add pokemon to a list
  function addListItem(pokemon) {
    //new variable that holds the <ul> element in the index.html
    const newPokemonList = $(".pokemon-list");

    //new variable creating a virtual <li> element
    const listItem = $('<li class= "list-group-item"> </li>');

    //new variable creating an virtual button element
    const button = $(
      '<button class="pokemon-button" data-toggle="modal" data-target="#myModal">' +
        pokemon.name +
        "</button>"
    );

    //putting putting pokemon list in button
    newPokemonList.append(button);
    listItem.append(button);
    newPokemonList.append(listItem);

    //making so button shows modal details when clicked
    button.on("click", function (event) {
      showModal(pokemon);
    });
  }

  //loads the list of pokemon from the api
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  //loads pokemon details from apiUrl
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = details.abilities;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //function to log the entire pokemon array of objects with their details in the bootstrap modal.
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      button.addEventListener("click", () => {
        showModal(item);
      });
    });
  }

  //shows the modal card of the pokemon with it's details.
  function showModal(item) {
    //selecting the bootstrap modal content
    pokemonRepository.loadDetails(item).then(function () {
      const modalBody = $(".modal-body");
      const modalTitle = $(".modal-title");
      const modalHeader = $(".modal-header");

      //removing content from title and body
      modalBody.empty();
      modalTitle.empty();

      //declaring all the pokemon/stats that will be in the modal
      const pokemonName = $("<h1>" + item.name + "</h1>");
      const pokemonHeight = $("<p>" + "Height: " + item.height + "</p>");
      const pokemonWeight = $("<p>" + "Weight: " + item.weight + "</p>");

      //pokemon image declared
      const pokemonImage = $('<img class= "modal-image" style=width:50%">');
      pokemonImage.attr("src", item.imageUrl);

      //adding pokemon types to modal
      const pokemonTypes = "";
      item.types.forEach(function (types) {
        pokemonTypes += ["<p>" + types.type.name + "</p>"];
      });

      //adding pokemon abilities to modal
      const pokemonAbilities = "";
      item.abilities.forEach(function (abilities) {
        pokemonAbilities += [
          "<li>" + "Abilities: " + abilities.ability.name + "</li>",
        ];
      });

      //putting modal in container and elements are put in modal.
      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonWeight);
      modalBody.append(pokemonTypes);
      modalBody.append(pokemonAbilities);
    });
  }

  // search for a pokemon
  const searchbar = document.querySelector("#search-bar");
  searchbar.addEventListener("input", function () {
    pokemonRepository.filterSearch(searchbar);
  });

  //filter search to find pokemon
  function filterSearch(searchbar) {
    const filterValue = searchbar.value.toLowerCase();

    // filter the pokemonList array based on the filterValue
    const filteredPokemon = pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
    });

    // update the displayed list of Pokemon based on the filtered results
    const pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = "";
    filteredPokemon.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  }

  //allows you to access the functions outside of the IIFE.
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    filterSearch: filterSearch,
  };
})();

//this iterates through each object in the pokemon array and and adds all the pokemon to the ul as list items and buttons with an event listener.
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
