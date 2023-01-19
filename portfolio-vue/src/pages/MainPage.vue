<template>
  <SwiperImageSlide />
  <TodayRanking />
  <CollectionImage />
  <RecommandImage />
  <MagazineImage />
</template>

<script>
import SwiperImageSlide from '../components/SwiperImageSlide.vue';
import TodayRanking from '../components/TodayRanking.vue';
import CollectionImage from '../components/CollectionImage.vue';
import RecommandImage from '../components/RecommandImage.vue';
import MagazineImage from '../components/MagazineImage.vue';

export default {
  components: {
    SwiperImageSlide: SwiperImageSlide,
    TodayRanking: TodayRanking,
    CollectionImage: CollectionImage,
    RecommandImage: RecommandImage,
    MagazineImage: MagazineImage,
  },
  props: {},
  created() {
    this.$store.dispatch('getData');
  },
};
</script>
<style></style>
