<template lang="kr">
    <RankCards />
        <div class="container">
          <div>
            ranking page
            [ ] 평점 많은순, 
            [ ] 최신순, [ ] 평점 높은순
            <div v-for="(a, i) in dataset" :key="i">
              <div><h4>{{ dataset[i] }}</h4></div>
            </div>
          </div>
        </div>
</template>
<script>
export default {
  components: {
    RankCards: RankCards,
  },
  props: {
    dataset: Array,
  },
};
import RankCards from '../components/RankCards.vue';
</script>
<style lang=""></style>
