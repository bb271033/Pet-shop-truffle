App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
  	if(window.ethereum) {
  		App.web3Provider = window.ethereum;
  		try {
  			await window.ethereum.enable();
  		} catch (error){
  			console.error("User denied account access")
  		}
  	}
  	else if (window.web3) {
  		App.web3Provider = window.web3.currentProvider;
  	}
  	else {
  		App.web3Provider = new Web3.providers.HttpProvider('http://192.168.1.42:7545');
  	}
  	web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
  	$.getJSON('Aadoption.json', function(data) {
  		var AdoptionArtifact = data;
  		App.contracts.Aadoption = TruffleContract(AdoptionArtifact);

  		App.contracts.Aadoption.setProvider(App.web3Provider);
  		return App.markAdopted();
  	});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
