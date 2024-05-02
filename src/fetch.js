export { fetchMovies };

// option for fetching movie data using TMDB's open API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTczMGIyZmQyNTAzYjM2ZWI4ZjFlNzEyYTg3MGJmNyIsInN1YiI6IjY2MjY0YTRkMmUyYjJjMDE4NzY4YmIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juGftcAcZYfpUAIkI_0vyyur1hz2VtQez05Th_g5ZnQ"
  }
};

const url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

// 영화 정보 fetch 및 영화카드 생성 함수
async function fetchMovies() {
  //await로 fetch 함수가 영화 데이터를 다 불러올 때까지 기다리고 난뒤, then을 통해 Promise의 response를 json형태로 반환하도록 처리합니다.
  const response = await fetch(url, options).then((response) => response.json());
  //response의 json 객체 중에 "results" 라는 key의 value만 저장합니다.
  const fetchedMovies = response.results;
  //fetchedMovies에 저장된 영화 데이터 목록을 반환합니다. (Array type)
  return fetchedMovies;
}
