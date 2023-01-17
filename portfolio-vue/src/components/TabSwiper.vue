<template>
  <section class="swiper-container">
    <h5>클릭 수정해야함 $push로</h5>
    <Swiper
      class="swiper-wrapper"
      :slides-per-view="2.5"
      :space-between="6"
      :slides-offset-after="0"
      :slides-offset-before="0"
      :free-mode="true"
      :center-insufficient-slides="true"
      role="tablist"
    >
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
  color: skyblue;
}

.swiper-container {
  padding: 0 20px;
  &:before,
  &:after {
    display: block;
    position: absolute;
    top: 0;
    width: 20px;
    height: 100%;
    z-index: 10;
    content: '';
  }
  &:before {
    left: 0;
    background: linear-gradient(
      90deg,
      #fff -20.19%,
      rgba(255, 255, 255, 0.8) 18.31%,
      rgba(255, 255, 255, 0) 75%
    );
  }
  &:after {
    right: 0;
    background: linear-gradient(
      270deg,
      #fff -20.19%,
      rgba(255, 255, 255, 0.8) 18.31%,
      rgba(255, 255, 255, 0) 75%
    );
  }
}
.SwiperSlide {
  width: auto;
  min-width: 56px;
  padding: 0px 14px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  color: #84868c;
  border: 0;
  border-radius: 18px;
  background: #f3f4f7;
  appearance: none;
  cursor: pointer;
  &[aria-selected='true'] {
    color: #fff;
    background: #000;
  }
}
</style>
