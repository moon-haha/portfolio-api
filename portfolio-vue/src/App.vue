<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-8">
        <EventHeader />
        <LogoHeader />
        <StickeyHeader />
        <SwiperSlide />
        <RankCards />
        <div class="container">
          <div>
            <div v-for="(a, i) in dataset" :key="i">
              <div>{{ dataset[i] }}</div>
            </div>
          </div>
        </div>
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
import RankCards from './components/RankCards.vue';
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
    RankCards: RankCards,
  },
  data() {
    return {
      dataset: [],
    };
  },
  methods: {
    test() {
      axios
        .get(
          'https://hozouhp9x8.execute-api.ap-northeast-2.amazonaws.com/dev/api/products',
          //{ withCredentials: true }, 쿠키가 필요할 경우에
        )
        .then((result) => {
          console.log(result.data);
          this.dataset = result.data;
        });
    },
  },
  mounted() {
    this.test();
  },
};
</script>

<style></style>
