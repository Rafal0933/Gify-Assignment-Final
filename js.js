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

  $("#topic-view").on("click", function(event){
    var getButtonId = $("#topic-view");
    console.log(getButtonId);
  });


//On click function for submit button//
$("#submit").on("click", function(event) {
//Rather than hitting the button the user can press enter to generate the button//
    event.preventDefault();

//Grabs value from topic input field and trims excess spaces//
    var topic = $("#topic-input").val().trim();
//Pushes whatever was entered into the array//
    topics.push(topic);
//Calls renderButton Function//
    renderButtons();
    jifyRequest(topic);
});
//Calls the render button function to generate the buttons in the original array//
renderButtons();



/*        API Key: LfsSAsc2EFXOzzChu9ONb5oazTS4RjT5*/


function jifyRequest (topic) {

    // Clear the images div //
    $("#images").empty();

    // Loop to get 10 images //
    for ( var i = 0; i < 10; i++){

      // Variable to store the giphy website and enter the topic //
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=LfsSAsc2EFXOzzChu9ONb5oazTS4RjT5"


      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {
        console.log(response);
/*        var test = "data"+i;*/
/*        console.log(test);*/
        var stillImage = response.data[i].images.original_still.url;
        var animateImage = response.data[i++].images.original.url;
        var rating = response.data[i].rating;
        var imageDiv = $("<span>"+ rating + "</span><img height='350px' width='350px'>");

        // Setting the catImage src attribute to imageUrl
        imageDiv.attr("src", stillImage);
        imageDiv.attr("data-state", "still");
        imageDiv.attr("data-still", stillImage);
        imageDiv.attr("data-animate", animateImage);
        imageDiv.attr("alt", "cat image");
        imageDiv.attr("class", "gif");
        imageDiv.text("Rating:  " + rating);

        // Prepending the catImage to the images div
        $("#images").prepend(imageDiv);
      });
    }
};

    $("#images").on("click", ".gif", function() {
console.log("pressedByUser")
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });








