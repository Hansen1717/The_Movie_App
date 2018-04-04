$(document).ready(function () {
    let movieId = sessionStorage.getItem('movieId')
    var queryURL = "https://www.omdbapi.com/?i=" + movieId + "&y=&plot=short&apikey=trilogy";
    console.log(movieId);

    // Creating an AJAX call for the specific movie button being clicked
    var showReviewAndLinks = function () {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.Ratings.length; i++) {
                var panelHeading = '#review-heading-' + i;
                var panelBody = '#review-body-' + i;
                var heading = response.Ratings[i].Source;
                var review = heading + " scores " + "<span class='title-span'>" + response.Title + "</span>" + " at " + response.Ratings[i].Value;
                $(panelHeading).html(heading);
                $(panelBody).html(review);
            }
        });
    };
    showReviewAndLinks();
})