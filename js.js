var topics = ["Football", "Weightlifting", "Bodybuilding", "Cardio"];

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
});
//Calls the render button function to generate the buttons in the original array//
renderButtons();



/*        API Key: LfsSAsc2EFXOzzChu9ONb5oazTS4RjT5*/


    for ( var i = 0; i < 10; i++){
/*      var topic = "foo fighters"*/
/*          console.log(request);
          console.log(request.data[0].id);*/

      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {

        // Saving the image_original_url property
        var imageUrl = response.data[i++].images.fixed_height.url;
        console.log(imageUrl);
        // Creating and storing an image tag
        var catImage = $("<img>");

        // Setting the catImage src attribute to imageUrl
        catImage.attr("src", imageUrl);
        catImage.attr("alt", "cat image");

        // Prepending the catImage to the images div
        $("#images").prepend(catImage);
      });
    }
};





// (can be done at any time) -- figure out how to pause the gifs. 1.  see in-class exercise
// hint: use console.log to print response object and find what you need



// in giphy documentation, so you don't have to make 10 ajax calls per topic, look in giphy documentation
// and see how to specify the number of results (q)

