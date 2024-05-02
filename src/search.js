export { searchMovies };

// 영화 검색 함수
function searchMovies(fetchedMovies) {
  //검색창과 검색버튼 각각 할당해주기
  let searchInput = document.getElementById("search-input");
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
    //입력창에 focus 시키기
    searchInput.focus();
  } else {
    // do nothing
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
