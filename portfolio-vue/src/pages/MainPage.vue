<template>
  <SwiperSlide />
  <div v-for="(a, i) in dataset" :key="i">
    <div>
      <h4>{{ dataset[i] }}</h4>
    </div>
  </div>
</template>
<script>
import SwiperSlide from '../components/SwiperSlide.vue';
export default {
  components: {
    SwiperSlide: SwiperSlide,
  },
  props: {
    dataset: Array,
  },
};
</script>
<style></style>
