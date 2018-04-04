$(document).ready(() => {

    $('#searchForm').on('submit', (e) =>{
      let searchText = $('#searchText').val();
      getMovies(searchText);
      e.preventDefault();
    });
});

function getMovies(searchText){
  debugger;

 axios.get('https://omdbapi.com?s='+ searchText + '&apikey=thewdb')
 .then((res) => {
      let movies = res.data.Search;
      let output = '';
      $.each (movies, (index,movie) =>{
        output += `
          <div class = "col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">﻿
              <h5>${movie.Title}</h5>
              <a onclick ="movieSelected('${movie.imdbID}')" class="btn btn-primary"
                href="#">Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
debugger;

let movieId = sessionStorage.getItem('movieId');
  axios.get('https://www.omdbapi.com?i='+ movieId +'&apikey=thewdb')
    .then((res) => {
      let movie = res.data;
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
          <div class="panel panel-default text-center">
          <div id="review-heading-0" class="panel-heading">${movie.Title}</div>
            <div id="review-body-0" class="panel-body">
              <ul class="list-group">

                <li class="list-group-item"><strong>Genre:&nbsp;&nbsp; </strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Language:&nbsp;&nbsp; </strong> ${movie.Language}</li>              
                <li class="list-group-item"><strong>Released On:&nbsp;&nbsp; </strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:&nbsp;&nbsp; </strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>Run Time:&nbsp;&nbsp; </strong> ${movie.Runtime}</li>
                <li class="list-group-item"><strong>IMDB Rating:&nbsp;&nbsp; </strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:&nbsp;&nbsp; </strong>  ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:&nbsp;&nbsp; </strong>  ${movie.Writer}</li>          
                <li class="list-group-item"><strong>DVD Released On:&nbsp;&nbsp; </strong>  ${movie.DVD}</li>     
                <li class="list-group-item"><strong>Production:&nbsp;&nbsp;</strong> ${movie.Production}</li>    
                <li class="list-group-item"><strong>Awards:&nbsp;&nbsp;</strong> ${movie.Awards}</li>     
 
              <li class="list-group-item"><hr><a href="index.html" class="btn btn-primary">Go Back To Search</a></li>                                                    
            </ul>
            </div>
          </div>
        </div>
         `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
//            <a href="#" class="btn btn-primary">View&nbsp;${movie.Title}&nbsp;Trailer</a>
//<a href="#" class="btn btn-primary">Buy ${movie.Title} DVD</a>    
//<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>