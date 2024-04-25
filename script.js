let search_input;
let search_button;
let fetched_movies;

// option for fetching movie data using TMDB's open API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTczMGIyZmQyNTAzYjM2ZWI4ZjFlNzEyYTg3MGJmNyIsInN1YiI6IjY2MjY0YTRkMmUyYjJjMDE4NzY4YmIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juGftcAcZYfpUAIkI_0vyyur1hz2VtQez05Th_g5ZnQ",
  },
};
// fetching function
function fetchMovies() {
  //fetched_movies 목록을 초기화 합니다.
  fetched_movies = [];
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach((element) => {
        // API를 이용해 TMDB에서 fetch로 가져온 영화목록을 "fetched_movies" 배열에 하나씩 차례대로 push
        fetched_movies.push({
          id: element.id,
          poster: element.poster_path,
          title: element.title,
          overview: element.overview,
          vote: element.vote_average,
        });
        // 영화카드 생성
        make_card(
          element.id,
          element.poster_path,
          element.title,
          element.overview,
          element.vote_average
        );
      });
    })
    .catch((err) => console.error(err));
}

// Template for making a movie card
async function make_card(movie_id, poster_img, title, overview, rating) {
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
  movie_card.setAttribute("id", movie_id); //영화 id를 영화카드(article)의 id로 할당
  movie_imgbox.classList.add("image-box");
  movie_poster.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/" +
      "w" +
      "300" /*poster_size*/ +
      "/" +
      poster_img
  );
  movie_title.textContent = title;
  movie_overview.textContent = overview;
  movie_rating.textContent = "rating: " + rating;

  // 영화 카드 클릭했을 때의 이벤트 생성
  movie_card.addEventListener("click", (event) => {
    // 영화 id 알려주는 alert 창 띄우기
    alert("영화 id: " + event.currentTarget.id);
  });
}

// 클릭 이벤트 생성
function addClickEvent() {
  //검색창과 검색버튼 각각 할당해주기
  search_input = document.getElementById("search-input");
  search_button = document.getElementById("search-button");
  //검색 버튼을 클릭했을 때의 이벤트 생성
  search_button.addEventListener("click", () => {
    //검색어(검색창에 입력된 글자)가 non-empty일 때만 실행
    if (search_input.value !== "") {
      //검색어의 모든 알파벳을 소문자로 변환
      const lowered_searching = search_input.value.toLowerCase();

      fetched_movies.forEach((element) => {
        //영화 제목의 모든 알파벳을 소문자로 변환
        const lowered_title = element.title.toLowerCase();
        // 영화 id로 해당 카드 찾아내기
        const card = document.getElementById(element.id);
        if (lowered_title.includes(lowered_searching)) {
          // 검색어가 포함된 영화라면 카드를 보이도록 설정
          card.style.display = "block";
        } else {
          // 검색어가 포함되지 않은 영화라면 카드를 숨기도록 설정
          card.style.display = "none";
        }
      });
    } else {
      //모든 영화카드를 보여주고
      fetched_movies.forEach((element) => {
        const card = document.getElementById(element.id);
        card.style.display = "block";
      });
      //alert창 띄우기
      alert("검색어를 입력해주세요.");
    }
  });
}

// 이니셜라이즈
function init_page() {
  //fetchMovies 함수를 사용해 TMDB에서 영화 목록을 불러와 웹페이지에 영화카드를 표시합니다.
  fetchMovies();
  //클릭 이벤트를 모두 생성해줍니다.
  addClickEvent();
}

//문서의 현재 상태가 로딩 중이 아니라면 아래를 바로 실행합니다.
if (document.readyState !== "loading") {
  init_page();
} else {
  //로딩 중이라면 DOM 컨텐츠 로딩을 모두 완료한 후, 실행합니다.
  document.addEventListener("DOMContentLoaded", function () {
    init_page();
  });
}
