// 이벤트 핸들러 생성 함수
function addEvents() {
  //이벤트 생성해줄 대상을 각각 할당해주기
  let reviewForm = document.getElementById("review-form");
  let reviewInput = document.getElementById("review-input");
  let password = document.getElementById("password");
  let movieID = document.getElementsByClassName("about-movie")[0].id;

  //검색 버튼을 클릭했을 때의 이벤트 생성
  reviewForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("");
  });
}

// Initialise
document.addEventListener(
  //페이지가 로드되고 난 뒤에 실행
  "DOMContentLoaded",
  async () => {
    //클릭 이벤트를 모두 생성
    addEvents();
    console.log(document.getElementsByClassName("about-movie")[0].id);
  },
  false
);
