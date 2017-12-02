$(document).ready(function(){

// Initial array of sports
  var sports = ["SOCCER", "AMERICAN FOOTBALL", "SWIMMING", "DIVING", "TRACK", "HURDLES", "BASKETBALL", "CURLING", "GYMNASTICS", "DANCING", "SOFTBALL", "BASEBALL", 
              "VOLLEYBALL", "BEACH VOLLEYBALL", "SKIING", "POLE VAULTING", "ICE SKATING", "SPEED SKATING", "SNOW BOARDING", "SKEET SHOOTING", "PING PONG", 
              "BATON TWIRLING", "SPRINTING", "RUGBY", "CRICKET", "WEIGHT LIFTING", "BODY BUILDING", "CROSS COUNTRY SKIING", "CROSS COUNTRY RUNNING", "FENCING", 
              "BOXING", "MIXED MARTIAL ARTS", "KARATE", "GOLF", "CHEERLEADING"]; 

  // This function causes the HTML to display the appropriate content
  function displaySportInfo() {

    $("#sports-view").empty();

    var sport = $(this).attr("data-name");

       
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      sport + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific sport button being clicked
    $.ajax({
          url: queryURL,
          method: "GET"
    }).done(function(response) {

      var results = response.data;
      console.log (response);

      for (var i = 0; i < results.length; i++) {
          
          var gifDiv = $("<div class='item'>");

          var sportPic = $("<img>");
          sportPic.addClass("image");
          sportPic.attr("src", results[i].images.fixed_height_still.url);
          sportPic.attr("data-state", "still")
          sportPic.attr("data-animate", results[i].images.fixed_height.url);
          sportPic.attr("data-still", results[i].images.fixed_height_still.url);
          

          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          
           
          gifDiv.prepend(p);
          gifDiv.prepend(sportPic);

          $("#sports-view").prepend(gifDiv);
      }
    
    });


  }

  

      // Function for displaying sport data on the buttons.  
      
  function createButtons() {

    $("#buttons-view").empty();

      for (var i = 0; i < sports.length; i++) {
        var a = $("<button>");
     
          a.addClass("sport");
          a.attr("data-name", sports[i]);
          a.text(sports[i]);
              
        $("#buttons-view").append(a);
      }
  }

      // This function handles events where a sport button is clicked
  $("#add-sport").on("click", function(event) {
      event.preventDefault();
      var sport = $("#sport-input").val().toUpperCase().trim(); 
       
      sports.push(sport);

      createButtons();
               
  });

 

      //$("#clearButton").on("click", function(event) {

    
      //  event.preventDefault();
    //    $(".form-control").html("hi");
    //    console.log("clear");

          

   //   });


   //this function controls what happens when the image is clicked
 $(document).on("click", ".image", function changeGIF(){
       
    var state = $(this).attr("data-state");
      if (state === "still"){
      $(this).attr( "src", $(this).attr("data-animate"));
      $(this).attr ("data-state", "animate");
    }
    else {
      $(this).attr( "src", $(this).attr("data-still"));
      $(this).attr ("data-state", "still");
    }
  
});

      
      // Adding a click event listener to all elements with a class of "sport"
  $(document).on("click", ".sport", displaySportInfo);
 

      //Why does it run without the parenthesis after displaySportInfo?


      // Calling the renderButtons function to display the intial buttons
  createButtons();
 
});