<template>
  <SwiperSlide />
  <h1>{{ this.$store.state.name }}</h1>
  <!-- <h1>{{ this.$store.state.dataset[0] }}</h1> -->
  <div v-for="(data, i) in this.$store.state.dataset" :key="i">
    <p>title : {{ data.title }}</p>
    <p>description : {{ data.description }}</p>
    <p>category : {{ data.category }}</p>
    <img class="w-100" :src="data.image" alt="" />
    <p>price : {{ data.price }}</p>
    <p>rate : {{ data.rating.rate }}</p>
    <p>count : {{ data.rating.count }}</p>
  </div>
  <!-- <div v-for="(a, i) in this.$store.state.dataset" :key="i">
      <div>{{ a.title }}</div>
    </div> -->
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
  created() {
    this.$store.dispatch('getData');
    console.log(this.$store.state);
  },
};
</script>
<style></style>
