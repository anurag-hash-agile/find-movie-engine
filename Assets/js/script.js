const searchInput = document.getElementById("search-input");
const searchbutton = document.getElementById("submit-search");
const result = document.getElementById("result");

searchbutton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) { 
    return alert("Please enter a movie name!");}

    const apiKey = ("f7bedb1d73cdede5648a5405fe4d5752");
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    fetch(url)
        .then(x => x.json())
        .then(data => {
            if (data.results.length === 0) {
                result.textContent = "Movie not found!";
                return;
            }
            
            const movie = data.results[0];
             const lessLines = movie.overview
            ? movie.overview.split(" ").slice(0, 40).join(" ") + "..." : "No info";
            const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image";
            
        const movieCard = `
        <div class="movie-card">
        <img src="${poster}" style="width:200px; border-radius:1px;"><br><br>
        <strong>${movie.title}</strong> (${movie.release_date})<br><br>
        <strong>Rating:</strong> ${movie.vote_average}<br><br>
        <strong>Plot:</strong> ${lessLines}
        </div>
        `;
            result.innerHTML = `${movieCard}`;
        })

        .catch(() => {
            result.textContent = "Error fetching data!";
            alert("Something went error check api")
        });
});
