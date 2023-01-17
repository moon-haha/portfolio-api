<template>
  <SwiperSlide />
  <h1>{{ $store.state.name }}</h1>
  <button @click="$store.dispatch('getData')">버튼</button>
  {{ $store.state.dataset }}
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
