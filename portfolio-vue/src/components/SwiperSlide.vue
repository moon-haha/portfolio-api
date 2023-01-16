<template>
  <div class="container">
    <Swiper>
      <SwiperSlide>
        <router-link to="event">
          <img class="w-100" src="/bannerImage01.jpg" />
        </router-link>
      </SwiperSlide>
      <SwiperSlide>
        <router-link to="event">
          <img class="w-100" src="/bannerImage02.jpg" />
        </router-link>
      </SwiperSlide>
      <SwiperSlide>
        <router-link to="event">
          <img class="w-100" src="/bannerImage03.jpg" />
        </router-link>
      </SwiperSlide>
      <SwiperSlide>
        <router-link to="event">
          <img class="w-100" src="/bannerImage04.jpg" />
        </router-link>
      </SwiperSlide>
      <SwiperSlide>
        <router-link to="event">
          <img class="w-100" src="/bannerImage05.jpg" />
        </router-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>
<style lang=""></style>
