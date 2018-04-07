//getting the movie name from the main search page
let movieName = sessionStorage.getItem("movieName");
var final_id = "";
function havefinal() {
  //first ajax call to get the movie id
  var queryURL =
    " https://api.themoviedb.org/3/search/movie?api_key=73e53def52ff9a718eda18d64097f3bc&query=" +
    movieName;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var first_id = JSON.stringify(response.results[0].id);
    final_id = eval(first_id);
    //second ajax call to get the video key and transfer to the youtube link
    var queryURL =
      "https://api.themoviedb.org/3/movie/" +
      final_id +
      "/videos?api_key=73e53def52ff9a718eda18d64097f3bc&language=en-US";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var num = JSON.stringify(response.results.length);
      for (var i = 0; i <= num; i++) {
        var key_first = JSON.stringify(response.results[i].key);
        var key_final = eval(key_first);
        var newdiv = $("<div>");
        //using that key we are showing youtube video
        newdiv.append(
          "<iframe width='560' height='315' src='https://www.youtube.com/embed/" +
            key_final +
            "' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"
        );
        newdiv.append("<br><br>");
        $("#movies-view").append(newdiv);
      }
    });
  });
}
havefinal();
