<template>
  <div class="container">
    <div class="h-100 p-3 text-bg-primary">
      <h2>하이버 첫 구매 혜택 OPEN</h2>
      <p>인기 상품 반값! + 10만원 쿠폰팩</p>
    </div>
  </div>
  <div class="container">
    <header class="mt-4 mb-auto">
      <div>
        <h3 class="float-md-start mb-0">HIVER.</h3>
        <nav class="nav nav-masthead justify-content-center float-md-end">
          장바구니
        </nav>
      </div>
    </header>
    <div class="clearfix"></div>
  </div>
  <div class="container sticky-top">
    <nav class="bg-primary py-2 bg-light">
      <div class="d-flex">
        <ul class="nav flex-fill">
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark active" aria-current="page"
              >홈</a
            >
          </li>
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark">랭킹</a>
          </li>
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark">단독</a>
          </li>
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark">매거진</a>
          </li>
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark">스토어</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="container navbar navbar-expand fixed-bottom bg-white">
    <nav class="d-flex flex-fill justify-content-center">
      <ul class="navbar-nav flex-fill me-auto mb-2 mb-md-0">
        <li class="flex-fill nav-item text-center">
          <a href="#" class="active nav-link link-dark">홈</a>
        </li>
        <li class="flex-fill nav-item text-center">
          <a href="#" class="active nav-link link-dark">스타일추천</a>
        </li>
        <li class="flex-fill nav-item text-center">
          <a href="#" class="active nav-link link-dark">카테고리/검색</a>
        </li>
        <li class="flex-fill nav-item text-center">
          <a href="#" class="active nav-link link-dark">찜</a>
        </li>
        <li class="flex-fill nav-item text-center">
          <a href="#" class="active nav-link link-dark"> 마이페이지</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          class=""
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          class="active"
          aria-current="true"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          class=""
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item">
          <svg
            class="bd-placeholder-img"
            width="100%"
            height="100vh"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777"></rect>
          </svg>

          <div class="container">
            <div class="carousel-caption text-start">
              <h1>Example headline.</h1>
              <p>
                Some representative placeholder content for the first slide of
                the carousel.
              </p>
            </div>
          </div>
        </div>
        <div class="carousel-item active">
          <svg
            class="bd-placeholder-img"
            width="100%"
            height="100vh"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777"></rect>
          </svg>

          <div class="container">
            <div class="carousel-caption">
              <h1>Another example headline.</h1>
              <p>
                Some representative placeholder content for the second slide of
                the carousel.
              </p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <svg
            class="bd-placeholder-img"
            width="100%"
            height="100vh"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777"></rect>
          </svg>

          <div class="container align-middle">
            <div class="carousel-caption text-end">
              <h1>One more for good measure.</h1>
              <p>
                Some representative placeholder content for the third slide of
                this carousel.
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <div class="container">
    <h3 class="float-md-start mb-0">Today 랭킹</h3>
    <div class="nav nav-masthead justify-content-center float-md-end">>></div>
  </div>
  <div class="container">
    <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
      <div
        class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden"
      >
        <div class="my-3 py-3">
          <h2 class="display-5">Another headline</h2>
          <p class="lead">And an even wittier subheading.</p>
        </div>
        <div
          class="bg-light box-shadow mx-auto"
          style="width: 80%; height: 300px; border-radius: 21px 21px 0 0"
        ></div>
      </div>
      <div
        class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
      >
        <div class="my-3 p-3">
          <h2 class="display-5">Another headline</h2>
          <p class="lead">And an even wittier subheading.</p>
        </div>
        <div
          class="bg-dark box-shadow mx-auto"
          style="width: 80%; height: 300px; border-radius: 21px 21px 0 0"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style>
#app {
}
</style>
