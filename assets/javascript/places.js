function findPlaces(cityCoords) {
    // In this case, the "this" keyword refers to the button that was clicked

    $("#search-bar").empty();
    var cityCoords = cityCoords;
    var type = $("#dropdownMenuButton").val();
    console.log(type);
    // default to restaurant
    if (type === "") {
        type = "restaurant";
    }
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cityCoords + "&radius=1500&type=" + type + "&key=AIzaSyADAEzhWG-Zr1lJeCo5mJmk6Oh_JPIDjUI"
    
    console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {
          $("#place-list").empty();
            // Storing an array of results in the results variable
            var results = response.results;
            console.log(response);
            // console.log(JSON.stringify(response.results[0]));

            var resultsLength = 5;
            if (results.length < 5) {
              resultsLength = results.length
            }
            for (var i = 0; i < resultsLength; i++) {
            //   console.log(results[i].name);
            //   console.log(results[i].rating);
              // TODO: update formatting for index.html
              var place = $("<p>").text(results[i].name); 
              place.addClass("place-name");
              var ratingPrice = $("<p>").text(results[i].rating + " " + priceToDollar(results[i].price_level));
              ratingPrice.addClass("place-rating-price");
              var div = $("<div>");
              div.addClass("place-info");
              div.addClass("card-body");
              div.append(place);
              div.append(ratingPrice);
              $("#place-list").append(div);
            }              
      });
  };

  // convert our price value to a dolar amount, $/$$/$$$ etc
  function priceToDollar(price) {
      var prices = "";
      for (var i = 0; i < price; i++) {
          prices += "$";
      }
      return prices;
  }

// dropdown listener for category
$(document).ready(function() { 
  $("#dropdown-list a").on("click", function() {
      var val = $(this).attr("value");
      var text = $(this).text();
      $("#dropdownMenuButton").val(val);
      $("#dropdownMenuButton").text(text);
  })
});