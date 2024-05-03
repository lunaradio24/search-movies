export { makeCard };

// 영화카드 생성 함수
function makeCard(fetchedMovies) {
  //DOM에서 영화 카드를 생성할 "movie-list"라는 id를 가진 <ul> element를 movieList라는 이름으로 지정합니다.
  let movieList = document.getElementById("movie-list");
  //매개변수로 받은 fetchedMovies라는 영화 목록 array를 탐색합니다.
  fetchedMovies.forEach((movie) => {
    //movieList에 <li>를 생성하고 movieCard라는 이름으로 지정합니다.
    let movieCard = movieList.appendChild(document.createElement("li"));
    //<li>에 class를 부여합니다.
    movieCard.classList.add("card");
    //<li>에 id를 부여합니다.
    movieCard.setAttribute("id", movie.id);
    //<li> 속에 넣을 html 템플릿을 만듭니다.
    const innerCard = `
        <figure class="image-box">
            <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
        </figure>
        <h3>${movie.title}</h3>
        <p class="overview">${movie.overview}</p>
        <p class="rating">rating: ${movie.vote_average}</p>
    `;
    //위에서 만든 innerCard 템플릿을 <li> 속에 넣습니다.
    movieCard.innerHTML += innerCard;
    //<li>에 클릭 이벤트 핸들러를 부여합니다.
    movieCard?.addEventListener("click", (event) => {
      //영화 id를 알려주는 알림창을 띄웁니다.
      let openWin = window.open("../details.html?" + movie.id); // 새탭에서 열림
      openWin.document.getElementsByClassName("about-movie")[0].id = movie.id;
    });
  });
}
