const main = document.querySelector(".main");

fetch(genres_list + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name)
    })
});

const fetchMoviesListByGenres = (id, genres) => {
    fetch(discover_movie + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() *3) +1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_movies`, data.results)
    })
    .catch(e => console.log(e));
}

const makeCategoryElement = (category, data) => {
    main.innerHTML += `
    <div class="movie-list">

        <button class="prev-btn">
        <img src="images/prev.png" alt="Previous button">
        </button>

        <h1 class="movie-category">${category.replace("_", " ")}</h1>

        <div class="movie-container" id="${category}">
           
        </div>

        <button class="next-btn">
            <img src="images/next.png" alt="Next button">
        </button>
    </div> 
    ` 

    makeCards(category, data);
}

const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);

    data.forEach((item, i) => {
        if(item.backdrop_path === null) {
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path === null){
                return
            }
        }

        movieContainer.innerHTML += `
            <div class="movie">
                <img src="${img_url}${item.backdrop_path}" alt="Poster Movie">
                <p class="movie-title">${item.title}</p>
            </div>
        `
    })
}