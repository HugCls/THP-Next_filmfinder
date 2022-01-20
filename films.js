const movieDiv = document.querySelector('#movies');
const modalDiv = document.getElementsByClassName('modal-content')[0];
const form = document.querySelector('form');
const input = document.querySelector('input');
const apiUrl = ` https://www.omdbapi.com/?i=tt3896198&apikey=${apikey}`;

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    let inputReadyForUrl = formatInput(input.value);
    postRequest(inputReadyForUrl);
}

function formatInput(value) {
    let useableString = '';
    return value.toLowerCase().split(' ').join('+');
}

const postRequest = async (searchedMovie) => {
    const response = await fetch(`${apiUrl}&s=${searchedMovie}`);
    const data = await response.json();
    showMovies(data.Search);
    console.log(data.Search);

    let allMovies = document.getElementsByClassName('movie');
    Array.from(allMovies).forEach(movie => {
        observer.observe(movie)
    });
}

const showMovies = (movies) => {
    movieDiv.innerHTML = '';
    return movies.map((movie, index) => {
        movieDiv.innerHTML += `
        <div class="m-2 card border-0 d-flex flex-column align-items-center movie">
        <h4 class="card-title contain">${movie.Title}</h4>
        <p>${movie.Year}</p>
        <img class="card-text" src="${movie.Poster}">
        <button type="button" class="m-2 btn btn-outline-primary" onclick="showMovie('${movie.imdbID}')">See more</button>
        </div>
        `;
    });
};

async function showMovie(id) {
    const searchForASpecificMovie = await fetch(` https://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&i=${id}`);
    const data = await searchForASpecificMovie.json();
    $('#modal').modal('show');
    showModal(data);
    console.log(data);
}

function hideMovie() {
    $('#modal').modal('hide');
}

const showModal = (data) => {
    modalDiv.innerHTML = "";
    modalDiv.innerHTML = `
        <div class="p-4 d-flex flex-column align-items-center">
            <h1>${data.Title}</h1>
            <p class="m-3">Note : ${data.imdbRating}/10</p>
            <img src="${data.Poster}">
            <p class="text-center mt-5">${data.Plot}</p>
            <button onclick="hideMovie()" class="mt-3 btn btn-danger">Close</button>
        </div>
        `;
};

let options = {
    rootMargin: '0px',
    threshold: [0, 0.25, 0.5, 0.75, 1]
}

function intersectionCallback(entries) {
    entries.forEach(entry => {
        if (entry.intersectionRatio === 0) {
            entry.target.style.opacity="0";
        } else if (entry.intersectionRatio > 0 && entry.intersectionRatio < 0.25) {
            entry.target.style.opacity="0.25";
        } else if (entry.intersectionRatio >= 0.25 && entry.intersectionRatio < 0.5) {
            entry.target.style.opacity="0.5";
        } else if (entry.intersectionRatio >= 0.5 && entry.intersectionRatio < 0.75) {
            entry.target.style.opacity="0.75";
        } else if (entry.intersectionRatio >= 0.75) {
            entry.target.style.opacity="1";
        }
    });
};


let observer = new IntersectionObserver(intersectionCallback, options);