// TMDB에서 영화 정보 가져오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTczMGIyZmQyNTAzYjM2ZWI4ZjFlNzEyYTg3MGJmNyIsInN1YiI6IjY2MjY0YTRkMmUyYjJjMDE4NzY4YmIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juGftcAcZYfpUAIkI_0vyyur1hz2VtQez05Th_g5ZnQ",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    response.results.forEach((element) => {
      console.log(element);
      make_card(
        element.id,
        element.poster_path,
        300, //poster_size
        element.title,
        element.overview,
        element.vote_average
      );
    });
  })
  .catch((err) => console.error(err));

//Template for making a movie card
async function make_card(
  movie_id,
  poster_img,
  poster_size,
  title,
  overview,
  rating
) {
  const movie_list = document.getElementById("movie-list");
  const new_card = document.createElement("article");
  const new_imgbox = document.createElement("div", { class: "image-box" });
  const new_poster = document.createElement("img", { src: poster_img });
  const new_title = document.createElement("h3");
  const new_overview = document.createElement("div", { class: "overview" });
  const new_rating = document.createElement("p");

  let movie_card = movie_list.appendChild(new_card);
  let movie_imgbox = movie_card.appendChild(new_imgbox);
  let movie_poster = movie_imgbox.appendChild(new_poster);
  let movie_title = movie_card.appendChild(new_title);
  let movie_overview = movie_card.appendChild(new_overview);
  let movie_rating = movie_card.appendChild(new_rating);

  movie_card.classList.add("card");
  movie_card.setAttribute("id", movie_id);
  movie_imgbox.classList.add("image-box");
  movie_poster.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/" + "w" + poster_size + "/" + poster_img
  );
  movie_title.textContent = title;
  movie_overview.textContent = overview;
  movie_rating.textContent = "rating: " + rating;

  movie_card.addEventListener("click", (event) => {
    alert("영화 id: " + event.currentTarget.id);
  });
}
