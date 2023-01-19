<template>
  <div class="container">
    <TabSwiper class="mt-3" />
    <div class="dropdown">
      <button
        class="mt-3 float-end btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span v-if="RankingDropdownState == 1">판매순</span>
        <span v-if="RankingDropdownState == 2">최신순</span>
        <span v-if="RankingDropdownState == 3">평점순</span>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" @click="RankingDropdownState = 1" href="#"
            >판매순</a
          >
        </li>
        <li>
          <a class="dropdown-item" @click="RankingDropdownState = 2" href="#"
            >최신순</a
          >
        </li>
        <li>
          <a class="dropdown-item" @click="RankingDropdownState = 3" href="#"
            >평점 높은 순</a
          >
        </li>
      </ul>
    </div>
    <div class="clearfix"></div>
    <RankCards :RankingDropdownState="RankingDropdownState" />
  </div>
</template>
<script>
import TabSwiper from '../components/TabSwiper.vue';

export default {
  components: {
    RankCards: RankCards,
    TabSwiper: TabSwiper,
  },
  props: {},
  data() {
    return {
      RankingDropdownState: 1,
    };
  },
};
import RankCards from '../components/RankCards.vue';
</script>
<style lang=""></style>
