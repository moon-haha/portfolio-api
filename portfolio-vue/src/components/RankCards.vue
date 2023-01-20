<template>
  <div
    class="row row-cols-2 row-cols-md-2 g-4 mt-3"
    v-if="RankingDropdownState == 1"
  >
    <div
      v-for="(a, i) in $store.state.datasetByCountForRank"
      :key="i"
      class="col-6"
    >
      <router-link
        :to="{ path: '/products/' + a.id }"
        class="text-decoration-none text-dark"
      >
        <div class="card h-100">
          <img
            :src="a.image"
            class="card-img-top"
            style="height: 20rem; object-fit: cover"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">{{ a.category }}</p>
            <h3 class="card-title">{{ a.title }}</h3>
            <p class="card-text">{{ a.description }}</p>
            <h3 class="card-text">{{ a.price }} $</h3>
            <p class="card-text">{{ a.rating.count }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div
    class="row row-cols-2 row-cols-md-2 g-4 mt-3"
    v-if="RankingDropdownState == 2"
  >
    <div
      v-for="(a, i) in $store.state.datasetByIdForRank"
      :key="i"
      class="col-6"
    >
      <div class="card h-100">
        <img
          :src="a.image"
          class="card-img-top"
          style="height: 20rem; object-fit: cover"
          alt="..."
        />
        <div class="card-body">
          <p class="card-text">{{ a.category }}</p>
          <h3 class="card-title">{{ a.title }}</h3>
          <p class="card-text">{{ a.description }}</p>
          <h3 class="card-text">{{ a.price }} $</h3>
          <p class="card-text">{{ a.rating.count }}</p>
        </div>
      </div>
    </div>
  </div>
  <div></div>
  <div
    class="row row-cols-2 row-cols-md-2 g-4 mt-3"
    v-if="RankingDropdownState == 3"
  >
    <div
      v-for="(a, i) in $store.state.datasetByRateForRank"
      :key="i"
      class="col-6"
    >
      <div class="card h-100">
        <img
          :src="a.image"
          class="card-img-top"
          style="height: 20rem; object-fit: cover"
          alt="..."
        />
        <div class="card-body">
          <p>{{ a.rating.rate }}</p>
          <p class="card-text">{{ a.category }}</p>
          <h3 class="card-title">{{ a.title }}</h3>
          <p class="card-text">{{ a.description }}</p>
          <h3 class="card-text">{{ a.price }} $</h3>
          <p class="card-text">{{ a.rating.count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RankCards',
  props: {
    RankingDropdownState: Number,
  },
  created() {
    this.$store.dispatch('getData');
  },
};
</script>
<style>
.card-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.card-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
