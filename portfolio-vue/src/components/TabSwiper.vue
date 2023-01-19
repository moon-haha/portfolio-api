<template>
  <section>
    <Swiper :slides-per-view="3" :space-between="6" role="tablist">
      <SwiperSlide class="SwiperSlide" role="tab">
        <router-link to="/categories/electronics">electronics</router-link>
      </SwiperSlide>

      <SwiperSlide class="SwiperSlide" role="tab">
        <router-link to="/categories/jewelery">jewelery</router-link>
      </SwiperSlide>

      <SwiperSlide class="SwiperSlide" role="tab"
        ><router-link to="/categories/men">men's</router-link></SwiperSlide
      >
      <SwiperSlide class="SwiperSlide" role="tab">
        <router-link to="/categories/women">women's</router-link>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script>
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: white;
}

.SwiperSlide {
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  color: white;
  border: 0;
  border-radius: 18px;
  background: #c9974d;
  font-weight: 500;
  appearance: none;
  cursor: pointer;
}
</style>
