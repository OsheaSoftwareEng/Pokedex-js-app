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
    //This code makes the button a child to the <ul> element in the index.html
    newPokemonList.append(button);
    //this makes the button a child to the listitem variable which is a <li> element.
    listItem.append(button);
    //this makes the list item which is a <li> element a child to the <ul> element.
    newPokemonList.append(listItem);
    //this sets an event for the button to listen for mouse clicks on the element.
    //once someone clicks the button, it'll log the pokemon name on the console.
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
        item.type = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //function to log the entire pokemon array of objects with their details.
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      button.addEventListener("click", () => {
        showModal(item);
      });
    });
  }

  function showModal(item) {
    pokemonRepository.loadDetails(item).then(function () {
      let modalContent = $(".modal-content");
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");

      modalBody.empty();
      modalTitle.empty();

      let pokemonName = $("<h1>" + item.name + "</h1>");
      let pokemonImage = $('<img class= "modal-image" style=width:50%">');
      pokemonImage.attr("src", item.imageUrl);
      let pokemonHeight = $("<p>" + "Height: " + item.height + "</p>");
      let pokemonWeight = $("<p>" + "Weight: " + item.weight + "</p>");
      let pokemonType = $("<p>" + "Types: " + item.type + "</p>");
      let pokemonAbilities = $("<p>" + "Abilities: " + item.abilities + "</p>");

      //putting modal in container and elements are put in modal.
      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonWeight);
      modalBody.append(pokemonType);
      modalBody.append(pokemonAbilities);
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
  };
})();

//this iterates through each object in the pokemon array and and adds all the pokemon to the ul as list items and buttons with an event listener.
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
