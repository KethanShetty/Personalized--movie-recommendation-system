const TMDB_API_KEY = "2cec53da8cc3ae5c6e88da965f640fcd"; // Replace with your API key
const TMDB_API_URL = "https://api.themoviedb.org/3";

let movies = [];
let allMovies = []; // Store all movies for filtering
let genres = [];
let selectedGenre = "";
let query = "";
let sortOption = "popularity.desc"; // Default sort option

const movieList = document.getElementById('movieList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const genreSelect = document.getElementById('genreSelect');
const sortSelect = document.getElementById('sortSelect');
const filterButton = document.getElementById('filterButton');
const sortButton = document.getElementById('sortButton');
const loadingIndicator = document.getElementById('loading');

// Initial fetch to display popular movies and genres
const init = async () => {
    await fetchPopularMovies();
    await fetchGenres();
};

const fetchPopularMovies = async () => {
    loadingIndicator.style.display = 'block'; // Show loading indicator
    try {
        const response = await fetch(`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        movies = data.results;
        allMovies = data.results; // Store all movies for filtering
        displayMovies(movies);
    } catch (error) {
        console.error("Error fetching popular movies:", error);
    } finally {
        loadingIndicator.style.display = 'none'; // Hide loading indicator
    }
};

const fetchGenres = async () => {
    try {
        const response = await fetch(`${TMDB_API_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        genres = data.genres;
        populateGenreSelect(genres);
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
};

const populateGenreSelect = (genres) => {
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
};

const searchMovies = async () => {
    if (query.trim() !== "") {
        try {
            const response = await fetch(`${TMDB_API_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}`);
            const data = await response.json();
            const movieResults = data.results.filter((result) => result.media_type === "movie");
            const personResults = data.results.filter((result) => result.media_type === "person");

            if (personResults.length > 0) {
                fetchMoviesByPerson(personResults[0].id);
            } else {
                movies = movieResults.length > 0 ? movieResults : [];
                allMovies = movieResults.length > 0 ? movieResults : []; // Store search results for filtering
                selectedGenre = ""; // Reset genre selection on new search
                displayMovies(movies);
            }
        } catch (error) {
            console.error("Error fetching movies or persons:", error);
        }
    }
};

const fetchMoviesByPerson = async (personId) => {
    try {
        const response = await fetch(`${TMDB_API_URL}/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        movies = data.cast.length > 0 ? data.cast : [];
        allMovies = data.cast.length > 0 ? data.cast : []; // Store person movies for filtering
        displayMovies(movies);
    } catch (error) {
        console.error("Error fetching movies by person:", error);
    }
};

const filterByGenre = () => {
    if (selectedGenre) {
        const filteredMovies = allMovies.filter(movie => movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre)));
        movies = filteredMovies;
    } else {
        // If no genre is selected, reset to the original movies list
        movies = allMovies;
    }
    displayMovies(movies);
};

const sortMovies = () => {
    const sortedMovies = [...movies].sort((a, b) => {
        switch (sortOption) {
            case "popularity.desc":
                return b.popularity - a.popularity;
            case "popularity.asc":
                return a.popularity - b.popularity;
            case "release_date.desc":
                return new Date(b.release_date) - new Date(a.release_date);
            case "release_date.asc":
                return new Date(a.release_date) - new Date(b.release_date);
            case "vote_average.desc":
                return b.vote_average - a.vote_average;
            case "vote_average.asc":
                return a.vote_average - b.vote_average;
            default:
                return 0;
        }
    return sortedMovies;
    });
    movies = sortedMovies;
    displayMovies(movies);
};

const displayMovies = (movies) => {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        `;
        movieList.appendChild(movieCard);
    });
};

// Event Listeners
searchButton.addEventListener('click', () => {
    query = searchInput.value;
    searchMovies();
});

// Add event listener for Enter key press
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        query = searchInput.value;
        searchMovies();
    }
});

genreSelect.addEventListener('change', (event) => {
    selectedGenre = event.target.value;
    filterByGenre();
});

sortSelect.addEventListener('change', (event) => {
    sortOption = event.target.value;
    sortMovies();
});

// Initialize the app
init();