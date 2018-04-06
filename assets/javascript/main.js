$(document).ready(function(){ 
  $("#searchBtn").on("click", function(event) {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    event.preventDefault();
  });    
});

  function getMovies(searchText) {
    axios
      .get("https://omdbapi.com?s=" + searchText + "&apikey=trilogy")
      .then(res => {
        let movies = res.data.Search;
        let output = "";
        $.each(movies, (index, movie) => {
          output += `
          <div class = "col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick ="movieSelected('${movie.imdbID}')" class="btn btn-primary"
                href="#">Details</a>
            </div>
          </div>
        `;
        });
        $("#movies").html(output);
      });
  }

  function movieSelected(id) {
    sessionStorage.setItem("movieId", id);
    window.location = "movie_info.html";
    return false;
  }

  function getMovie() {
    let movieId = sessionStorage.getItem("movieId");
    debugger;
    axios.get("https://www.omdbapi.com?i=" + movieId + "&apikey=trilogy")
      .then(res => {
        let movie = res.data;
        let movieName=movie.Title;

        let moviePoster=movie.Poster;          
        if (moviePoster === 'N/A'){
          moviePoster = "assets/images/movie_info.jpg";
        }

        sessionStorage.setItem('movieName', movieName);
        let output = `
        <div class="row">
          <div class="panel panel-default">
            <div id="review-body-0" class="panel-body">
            <div class="col-md-4">
            <img src="${moviePoster}" class="thumbnail">
          </div>
          <div class="col-md-8"> 
              <ul class="list-group">
                <li class="list-group-item movie-title">${movie.Title}</li>     
                <li class="list-group-item">Rated:&nbsp; ${movie.Rated}</li>    
                <li class="list-group-item">Released On:&nbsp; ${movie.Released}</li>                           
                <li class="list-group-item">Genre:&nbsp; ${movie.Genre}</li>
                <li class="list-group-item">Language:&nbsp; ${movie.Language}</li>              
                <li class="list-group-item">Run Time:&nbsp; ${movie.Runtime}</li>
                <li class="list-group-item">Writer:&nbsp; ${movie.Writer}</li>                   
                <li class="list-group-item">Director:&nbsp; ${movie.Director}</li>          
                <li class="list-group-item">Production:&nbsp; ${movie.Production}</li>    
                <li class="list-group-item">Awards:&nbsp; ${movie.Awards}</li>   
                <li class="list-group-item">Actors:&nbsp; ${movie.Actors}</li>                      
                <li class="list-group-item">Plot:&nbsp; ${movie.Plot}</li>                   
            </ul>
            </div>
          </div>
        </div>
         `;

        $("#movie").html(output);
      });
  }




