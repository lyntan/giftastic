//docready function and initial moodCats array that users can add onto

$(document).ready(function() {
  var moodCats = [
    "happy cat",
    "playful cat",
    "angry cat",
    "sad cat",
    "sleepy cat",
    "hungry cat",
    "anime cat",
    "cartoon cat"
  ];

  //function to display buttons for initial array

  function renderButtons() {
    $("#catButtons").empty();
    for (i = 0; i < moodCats.length; i++) {
      $("#catButtons").append(
        "<button class='btn btn-success' catData='" +
          moodCats[i] +
          "'>" +
          moodCats[i] +
          "</button>"
      );
    }
  }

  renderButtons();

  //onclick listener for submit button when user adds new mood cats 

  $("#addMoodCat").on("click", function() {
    event.preventDefault();
    var cats = $("#moodCatInput")
      .val()
      .trim();
    moodCats.push(cats);
    renderButtons();
    return;
  });

  // display gif and rating functionality for buttons created from initial array and user input. linked to personal Giphy API but can be replaced by those grading or borrowing

  $("button").on("click", function() {
    var cats = $(this).attr("catData");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      cats +
      "&api_key=sR6FZGJSM3wn0J5t3l6THamHVEF9dv0q&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      $("#moodCats").empty();
      for (var i = 0; i < results.length; i++) {
        var catContainer = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var catImage = $("<img>");
        catImage.attr("src", results[i].images.original_still.url);
        catImage.attr("data-still", results[i].images.original_still.url);
        catImage.attr("data-animate", results[i].images.original.url);
        catImage.attr("data-state", "still");
        catImage.attr("class", "gif");
        catContainer.append(p);
        catContainer.append(catImage);
        $("#moodCats").append(catContainer);
      }
    });
  });

  //change animation state when user clicks on image. default is set to still in the initial functionality code 

  function changeState() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate");
    } else if (state == "animate") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }
  $(document).on("click", ".gif", changeState);
});
