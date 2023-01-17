<template>
  <swiper
    :slidesPerView="2"
    :grid="{
      rows: '2',
      fill: 'column',
    }"
    :slidesPerGroup="4"
    :direction="horizontal"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="GridSwiper"
  >
    <swiper-slide>Slide 1</swiper-slide><swiper-slide>Slide 2</swiper-slide
    ><swiper-slide>Slide 3</swiper-slide><swiper-slide>Slide 4</swiper-slide
    ><swiper-slide>Slide 5</swiper-slide><swiper-slide>Slide 6</swiper-slide
    ><swiper-slide>Slide 7</swiper-slide><swiper-slide>Slide 8</swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js componentss
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Grid, Pagination } from 'swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Grid, Pagination],
    };
  },
};
</script>
<style scope>
.GridSwiper {
  height: 840px;
}
.swiper-slide {
  height: calc((100% - 30px) / 2) !important;

  /* Center slide text vertically */
}
</style>
