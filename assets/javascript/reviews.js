$(document).ready(function () {
    var movie = "The Lion King";
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    // Creating an AJAX call for the specific movie button being clicked
    var showReviewAndLinks = function () {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < response.Ratings.length; i++) {
                var panelHeading = '#review-heading-' + i;
                var panelBody = '#review-body-' + i;
                var heading = response.Ratings[i].Source;
                var review = heading + " scores " + "<span class='title-span'>" + movie + "</span>" + " at " + response.Ratings[i].Value;
                $(panelHeading).html(heading);
                $(panelBody).html(review);
            }
        });
    };
    showReviewAndLinks();
})