var topics = ["Football", "Weightlifting", "Bodybuilding", "Cardio"];
var topic;

function renderButtons() {

    $("#topic-view").empty();

    // Looping through the array of movies//
    for (var i = 0; i < topics.length; i++) {

      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)//
      var a = $("<button>");

      // Adding a class to append in the topic view div//
      a.addClass("topic");

      //Adding a data-attribute with a value of the movie at index i?//
      a.attr("data-name", topics[i]);

      //Creates text for each button (i) in the array above//
      a.text(topics[i]);

      //Appends button to topic view Div//
      $("#topic-view").append(a);
    }
}

  // On click of the button enter the name of the data name of the button into Jify request function and run //
  $("#topic-view").on("click", function(event){
    jifyRequest(event.target.dataset.name);
  });


//On click function for submit button//
$("#submit").on("click", function(event) {
//Rather than hitting the button the user can press enter to generate the button//
    event.preventDefault();

//Grabs value from topic input field and trims excess spaces//
    var topic = $("#topic-input").val().trim();

//Pushes whatever was entered into the array//
    topics.push(topic);

    renderButtons();
});
renderButtons();


function jifyRequest (topic) {

    // Clear the images div //
    $("#images").empty();

    // Loop to get 10 images //
    for ( var i = 0; i < 10; i++){

      // Variable to store the giphy website url and enter the topic //
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=LfsSAsc2EFXOzzChu9ONb5oazTS4RjT5"


      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {

        // Variable to target still image url in response call in the repsonse from API //
        var stillImage = response.data[i].images.original_still.url;

        // Variable to target the animated gif url in the repsonse from API  //
        var animateImage = response.data[i++].images.original.url;

        // Variable to target the rating in the repsonse from API //
        var rating = response.data[i].rating;

        // Create an div that holds image and rating  //
        var resultContainer = $("<div class='gif-container'>");

        // Create Image Element //
        var imageDiv = $("<img>");

        // Create id inside image for gif //
        imageDiv.attr("id", "gif");

        // Create src tag to embed the url for the still image //
        imageDiv.attr("src", stillImage);

        // Create data state tag and set it to still so the image doesn't move //
        imageDiv.attr("data-state", "still");

        // Create data still tag to embed the still image url //
        imageDiv.attr("data-still", stillImage);

        // Create data animate tage to embed the animated url //
        imageDiv.attr("data-animate", animateImage);

        // Alternative text if the image doesn't appear //
        imageDiv.attr("alt", "user requested gify image");


        // Create rating element //
        var ratingElement = $("<p>");

        // Create text that specifies the rating of gif //
        ratingElement.text("Rating :" + rating);

        // Append rating to container //
        resultContainer.append(ratingElement);

        // Append image to container //
        resultContainer.append(imageDiv);

        // Prepend container to DOM //
        $("#images").prepend(resultContainer);
      });
    }
};


    // On click function for gif image //
    $("#images").on("click", "#gif", function() {
      // Set variable to hold the current gifs data state atribute//
      var state = $(this).attr("data-state");
      // If the state is still, then change the source atribut to the animated state url  and change data state to animate//
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      // Otherwise, change the source atribut to still state url  and change data state to still//
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });








