export { searchMovies };

// 영화 검색 함수
function searchMovies(fetchedMovies, fetchedCredits) {
  //검색옵션과 검색창 각각 할당해주기
  let searchOption = document.getElementById("search-option");
  let searchInput = document.getElementById("search-input");
  //검색어(검색창에 입력된 글자)가 non-empty일 때만 실행
  if (searchInput.value !== "") {
    //검색어의 모든 알파벳을 소문자로 변환
    const loweredSearching = searchInput.value.toLowerCase();

    fetchedMovies.forEach((movie) => {
      // 영화 id로 해당 카드 찾아내기
      const card = document.getElementById(movie.id);
      //title
      if (searchOption.selectedIndex === 0) {
        const loweredTitle = movie.title.toLowerCase();
        showAndHide(card, loweredTitle.includes(loweredSearching));
      }
      //overview
      else if (searchOption.selectedIndex === 1) {
        const loweredOverview = movie.overview.toLowerCase();
        showAndHide(card, loweredOverview.includes(loweredSearching));
      }
      //director
      else if (searchOption.selectedIndex === 2) {
        const credit = fetchedCredits.find((credit) => credit.id === movie.id);
        const loweredName = credit.director.name.toLowerCase();
        showAndHide(card, loweredName.includes(loweredSearching));
      }
      //cast
      else if (searchOption.selectedIndex === 3) {
        const credit = fetchedCredits.find((credit) => credit.id === movie.id);
        const matchedCast = credit.cast.find((cast) => cast.name.toLowerCase().includes(loweredSearching));
        showAndHide(card, matchedCast !== undefined);
      }
    });
    // 검색어가 공백이면
  } else if (searchInput.value === "") {
    //토스트 메시지 띄우기
    toastMsg();
    //입력창에 focus 시키기
    searchInput.focus();
  } else {
    // do nothing
  }
}
//
function showAndHide(card, isMatched) {
  if (isMatched) {
    // 검색어가 포함된 영화라면 카드를 보이도록 설정
    card.style.display = "block";
  } else {
    // 검색어가 포함되지 않은 영화라면 카드를 숨기도록 설정
    card.style.display = "none";
  }
}
// 토스트 메시지 함수
function toastMsg() {
  let toastMessage = document.getElementById("toast_message");
  //토스트 메시지 템플릿에 class="active"를 부여해서 메시지를 띄우고
  toastMessage.classList.add("active");
  setTimeout(function () {
    //1초 후에 class="active"를 삭제해서 메시지를 사라지게 합니다.
    toastMessage.classList.remove("active");
  }, 1000);
}
