$(document).ready(function() {
  let movieId = sessionStorage.getItem("movieId");
  var queryURL =
    "https://www.omdbapi.com/?i=" + movieId + "&y=&plot=short&apikey=trilogy";
  console.log(movieId);

  // Creating an AJAX call for the specific movie button being clicked
  var showReviewAndLinks = function() {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < response.Ratings.length; i++) {
        var panelHeading = "#review-heading-" + i;
        var panelBody = "#review-body-" + i;
        var heading = response.Ratings[i].Source;
        var review =
          heading +
          " scores " +
          "<span class='title-span'>" +
          response.Title +
          "</span>" +
          " at " +
          response.Ratings[i].Value;
        $(panelHeading).html(heading);
        $(panelBody).html(review);
      }
      var movieUrl = response.Title;
      var strLength = movieUrl.length;
      for (var i = 0; i < strLength; i++) {
        movieUrl = movieUrl.replace(" ", "+");
      }
      var movieLink = response.Website;
      var amazonLink =
        "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dmovies-tv&field-keywords=" +
        movieUrl;
      var ebayLink =
        "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2499334.m570.l1313.TR12.TRC2.A0.H0.X" +
        movieUrl +
        ".TRS0&_nkw=" +
        movieUrl +
        "&_sacat=617";
      $("#movie-link").attr("href", movieLink);
      $("#amazon-link").attr("href", amazonLink);
      $("#ebay-link").attr("href", ebayLink);
    });
  };
  showReviewAndLinks();
});
