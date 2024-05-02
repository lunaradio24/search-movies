import { fetchMovies } from "./fetch.js";
import { makeCard } from "./card.js";
import { searchMovies } from "./search.js";

/********************   이벤트 핸들러 생성 함수  ********************/
function addEvents(fetchedMovies) {
  //이벤트 생성해줄 대상을 각각 할당해주기
  let pageTitle = document.querySelector(".title > span");
  let searchForm = document.getElementById("search-form");
  //페이지 타이틀을 클릭했을 때의 이벤트 생성
  pageTitle?.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
  });
  //검색 버튼을 클릭했을 때의 이벤트 생성
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    searchMovies(fetchedMovies);
  });
}

/********************   Initialise  ********************/
document.addEventListener(
  //페이지가 로드되고 난 뒤에 실행
  "DOMContentLoaded",
  async () => {
    //영화데이터 불러와서 저장
    const fetchedMovies = await fetchMovies(); // fetchMovies() 함수의 비동기 호출을 기다림
    //영화카드 생성
    makeCard(fetchedMovies);
    //클릭 이벤트를 모두 생성
    addEvents(fetchedMovies);
  },
  false
);
