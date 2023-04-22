//pokemonRepository is a function contains pokemonlist which has an array of objects.
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //add pokemon to the array with the push method.
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //function that grabs all pokemon stored in the pokemonList array.
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    //new variable that holds the <ul> element in the index.html
    let newPokemonList = $(".pokemon-list");

    //new variable creating a virtual <li> element
    let listItem = $('<li class= "list-group-item"> </li>');

    //new variable creating an virtual button element
    let button = $(
      '<button class="pokemon-button" data-toggle="modal" data-target="#myModal">' +
        pokemon.name +
        "</button>"
    );
    newPokemonList.append(button);
    listItem.append(button);
    newPokemonList.append(listItem);
    button.on("click", function (event) {
      showModal(pokemon);
    });
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
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

  function loadDetails(item) {
    let url = item.detailsUrl;
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
        console.log(item.types);
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

  function showModal(item) {
    //selecting the bootstrap modal content
    pokemonRepository.loadDetails(item).then(function () {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");

      modalBody.empty();
      modalTitle.empty();

      //declaring all the pokemon/stats that will be in the modal
      let pokemonName = $("<h1>" + item.name + "</h1>");
      let pokemonImage = $('<img class= "modal-image" style=width:50%">');
      pokemonImage.attr("src", item.imageUrl);
      let pokemonHeight = $("<p>" + "Height: " + item.height + "</p>");
      let pokemonWeight = $("<p>" + "Weight: " + item.weight + "</p>");
      // let pokemonAbilities = $("<p>" + "Abilities: " + item.abilities + "</p>");

      let pokemonTypes = "";
      item.types.forEach(function (types) {
        pokemonTypes += ["<p>" + types.type.name + "</p>"];
      });

      let pokemonAbilities = "";
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
  let searchbar = document.querySelector("#search-bar");
  searchbar.addEventListener("input", function () {
    pokemonRepository.filterSearch(searchbar);
  });

  function filterSearch(searchbar) {
    let filterValue = searchbar.value.toLowerCase();

    // filter the pokemonList array based on the filterValue
    let filteredPokemon = pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
    });

    // update the displayed list of Pokemon based on the filtered results
    let pokemonListElement = document.querySelector(".pokemon-list");
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
