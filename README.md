# Personalized  movie recommendation system
This project is a web-based application designed to help users discover and explore movies based on their preferences. It leverages the The Movie Database (TMDB) API to fetch movie data, including popular movies, genres, and search results. The application provides a user-friendly interface with features like search, genre filtering, and sorting options.

# Key Features:
Search Movies: Users can search for movies by title or even by actor/actress names. The system fetches relevant results from TMDB.
Genre Filtering: Users can filter movies by genre to narrow down their search.
Sorting Options: Movies can be sorted by popularity, release date, or rating in ascending or descending order.
Responsive Design: The application is designed to be visually appealing and responsive across different devices.
Loading Indicator: A loading indicator is displayed while fetching data to enhance user experience.
# File Breakdown
# 1. index.html
Purpose: The main HTML file that structures the web application.
Key Components:
Header: Contains the title (Film Fuse) and a tagline (Your next favourite film, just a click away).
Search Bar: Allows users to input search queries.
Filters: Includes a genre dropdown and a sorting dropdown.
Movie List: Displays the recommended movies in a grid layout.
Loading Indicator: Shown while data is being fetched.
# 2. script.js
Purpose: Handles the logic for fetching and displaying movie data.
Key Functionalities:
Fetch Popular Movies: Fetches and displays popular movies from TMDB.
Fetch Genres: Retrieves and populates the genre dropdown with available genres.
Search Movies: Searches for movies or actors based on user input.
Filter by Genre: Filters movies based on the selected genre.
Sort Movies: Sorts movies based on the selected sorting option (popularity, release date, or rating).
Display Movies: Renders the movie cards in the movie list section.
# 3. styles.css
Purpose: Defines the visual styling of the application.
Key Styling Features:
Background: Uses gradient and background images for a visually appealing design.
Search Bar: Styled with curved edges and a hover effect on the search button.
Movie Cards: Displays movie posters, titles, release dates, and ratings in a card layout with hover effects.
Responsive Layout: Uses CSS Grid to ensure the movie list is responsive and adapts to different screen sizes.
# How It Works
Initialization: On page load, the application fetches and displays popular movies and genres.
Search: Users can search for movies or actors. If an actor is searched, the system fetches movies associated with that actor.
Filtering: Users can filter movies by genre using the dropdown.
Sorting: Users can sort movies by popularity, release date, or rating.
Display: The results are dynamically displayed in a grid of movie cards.
Technologies Used
Frontend: HTML, CSS, JavaScript
API: The Movie Database (TMDB) API
Styling: Google Fonts, CSS Grid, and custom CSS for animations and effects
# How to Use
Open the index.html file in a web browser.
Use the search bar to find movies or actors.
Filter movies by genre or sort them using the dropdowns.
Explore the recommended movies displayed in the grid.
This project is ideal for movie enthusiasts who want a personalized and interactive way to discover new films.
 
