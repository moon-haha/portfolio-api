<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-9">
        <EventHeader />
        <LogoHeader />
        <StickeyHeader />
        <CarouselContainer />
        <div class="container">
          <h3 class="float-md-start mb-0">Today 랭킹</h3>
          <div class="nav nav-masthead justify-content-center float-md-end">
            >>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="container">
          <div class="d-block">
            <div class="card" style="width: 18rem">
              <!-- <img src="..." class="card-img-top" alt="..." /> -->
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card" style="width: 18rem">
              <!-- <img src="..." class="card-img-top" alt="..." /> -->
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            <div class="card" style="width: 18rem">
              <!-- <img src="..." class="card-img-top" alt="..." /> -->
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>

        <FooterBar />
      </div>

      <div class="col-lg-3 d-lg-block d-md-none d-none">
        <!-- 992보다 크면 생기고 작으면 사라짐 -->
        <div class="position-fixed top-50 vh-50 translate-middle-y">
          <h1>HIVER</h1>
          <h3>국내 최초 남자쇼핑앱</h3>
          <div>Card</div>
          <div><p>앱으로 편하게 주문하세요</p></div>
          <div>다운로드 하기 Google Play</div>
          <div>다운로드 하기 App store</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventHeader from './components/EventHeader.vue';
import StickeyHeader from './components/StickeyHeader.vue';
import LogoHeader from './components/LogoHeader.vue';
import FooterBar from './components/FooterBar.vue';
import CarouselContainer from './components/CarouselContainer.vue';
export default {
  name: 'App',
  components: {
    EventHeader: EventHeader,
    StickeyHeader: StickeyHeader,
    LogoHeader: LogoHeader,
    FooterBar: FooterBar,
    CarouselContainer: CarouselContainer,
  },
};
</script>

<style></style>
