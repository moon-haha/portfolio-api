<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-8">
        <EventHeader />
        <LogoHeader />
        <StickeyHeader />
        <SwiperSlide />
        <div class="container">
          <h3 class="float-md-start ml-5 mb-0">Today 랭킹</h3>
          <div class="nav nav-masthead justify-content-center float-md-end">
            >>
          </div>
        </div>
        <div class="clearfix"></div>
        <button @click="test">클릭</button>
        <FooterBar />
      </div>
      <FixedNavbar />
    </div>
  </div>
  <!-- modal -->
</template>

<script>
import EventHeader from './components/EventHeader.vue';
import StickeyHeader from './components/StickeyHeader.vue';
import LogoHeader from './components/LogoHeader.vue';
import FooterBar from './components/FooterBar.vue';
import SwiperSlide from './components/SwiperSlide.vue';
import FixedNavbar from './components/FixedNavbar.vue';
import axios from 'axios';
// 리소스 접근 허용
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// 서로 다른 도메인간 쿠키 전달 : false
axios.defaults.withCredentials = false;

export default {
  name: 'App',
  components: {
    EventHeader: EventHeader,
    StickeyHeader: StickeyHeader,
    LogoHeader: LogoHeader,
    FooterBar: FooterBar,
    SwiperSlide: SwiperSlide,
    FixedNavbar: FixedNavbar,
  },
  methods: {
    test() {
      axios
        .get(
          'https://hozouhp9x8.execute-api.ap-northeast-2.amazonaws.com/dev/api/products',
          //{ withCredentials: true }, 쿠키가 필요할 경우에
        )
        .then((result) => {
          console.log(result);
        });
    },
  },
};
</script>

<style></style>
