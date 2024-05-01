/********************   변수 선언  ********************/
let searchInput;
let searchButton;
let fetchedMovies;
// option for fetching movie data using TMDB's open API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTczMGIyZmQyNTAzYjM2ZWI4ZjFlNzEyYTg3MGJmNyIsInN1YiI6IjY2MjY0YTRkMmUyYjJjMDE4NzY4YmIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juGftcAcZYfpUAIkI_0vyyur1hz2VtQez05Th_g5ZnQ"
  }
};

/********************   영화 정보 fecth 및 영화카드 생성 함수  ********************/
function fetchMovies() {
  //fetchedMovies 목록을 초기화 합니다.
  fetchedMovies = [];
  fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach((element) => {
        // API를 이용해 TMDB에서 fetch로 가져온 영화목록을 "fetchedMovies" 배열에 하나씩 차례대로 push
        fetchedMovies.push({
          id: element.id,
          poster: element.poster_path,
          title: element.title,
          overview: element.overview,
          vote: element.vote_average
        });
        // 영화카드 생성
        makeCard(element.id, element.poster_path, element.title, element.overview, element.vote_average);
      });
    })
    .catch((err) => console.error(err));
}

/********************   영화카드 템플릿 생성 함수  ********************/
async function makeCard(id, posterPath, title, overview, rating) {
  const movieList = document.getElementById("movie-list");
  const newCard = document.createElement("article");
  const newImgbox = document.createElement("div");
  const newPoster = document.createElement("img");
  const newTitle = document.createElement("h3");
  const newOverview = document.createElement("div");
  const newRating = document.createElement("p");

  let movieCard = movieList.appendChild(newCard);
  let movieImgbox = movieCard.appendChild(newImgbox);
  let moviePoster = movieImgbox.appendChild(newPoster);
  let movieTitle = movieCard.appendChild(newTitle);
  let movieOverview = movieCard.appendChild(newOverview);
  let movieRating = movieCard.appendChild(newRating);

  movieCard.classList.add("card");
  movieCard.setAttribute("id", id); //영화 id를 영화카드(article)의 id로 할당
  movieImgbox.classList.add("image-box");
  movieImgbox.setAttribute("id", id); //영화 id를 영화카드(article)의 id로 할당
  moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/" + "w" + "300" /*poster_size*/ + "/" + posterPath);
  movieTitle.textContent = title;
  movieOverview.classList.add("overview");
  movieOverview.textContent = overview;
  movieRating.classList.add("rating");
  movieRating.textContent = "rating: " + rating;

  // 영화 카드 이미지를 클릭했을 때의 이벤트 생성
  movieImgbox.addEventListener("click", (event) => {
    // 영화 id 알려주는 alert 창 띄우기
    alert("영화 id: " + event.currentTarget.id);
  });
}

/********************   검색 함수  ********************/
function searchMovies() {
  //검색창과 검색버튼 각각 할당해주기
  searchInput = document.getElementById("search-input");
  //검색어(검색창에 입력된 글자)가 non-empty일 때만 실행
  if (searchInput.value !== "") {
    //검색어의 모든 알파벳을 소문자로 변환
    const loweredSearching = searchInput.value.toLowerCase();

    fetchedMovies.forEach((element) => {
      //영화 제목의 모든 알파벳을 소문자로 변환
      const loweredTitle = element.title.toLowerCase();
      // 영화 id로 해당 카드 찾아내기
      const card = document.getElementById(element.id);
      if (loweredTitle.includes(loweredSearching)) {
        // 검색어가 포함된 영화라면 카드를 보이도록 설정
        card.style.display = "block";
      } else {
        // 검색어가 포함되지 않은 영화라면 카드를 숨기도록 설정
        card.style.display = "none";
      }
    });
  } else if (searchInput.value === "") {
    //토스트 메시지 띄우기
    toastMsg();
    //입력창에 focus
    searchInput.focus();
  } else {
    // do nothing
  }
}
/********************   이벤트 핸들러 생성 함수  ********************/
function addEvents() {
  //이벤트 생성해줄 대상을 각각 할당해주기
  pageTitle = document.querySelector(".title > span");
  searchInput = document.getElementById("search-input");
  searchButton = document.getElementById("search-button");
  //페이지 타이틀을 클릭했을 때의 이벤트 생성
  pageTitle?.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
  });
  //검색 버튼을 클릭했을 때의 이벤트 생성
  searchButton?.addEventListener("click", (event) => {
    event.preventDefault();
    searchMovies();
  });
  //Enter 키를 눌렀을 때의 이벤트 생성
  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchMovies();
    }
  });
}

/********************   토스트 메시지 함수  ********************/
function toastMsg() {
  let toastMessage = document.getElementById("toast_message");
  toastMessage.classList.add("active");
  setTimeout(function () {
    toastMessage.classList.remove("active");
  }, 1000);
}

/********************   Initialise  ********************/
document.addEventListener(
  // 페이지가 로드되고 난 뒤에 실행
  "DOMContentLoaded",
  function () {
    //fetchMovies 함수를 사용해 TMDB에서 영화 목록을 불러와 웹페이지에 영화카드를 표시합니다.
    fetchMovies();
    //클릭 이벤트를 모두 생성해줍니다.
    addEvents();
  },
  false
);
