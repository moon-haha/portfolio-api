<template>
  <SwiperImageSlide />
  <section>
    <div class="container mt-3">
      <h3 class="float-md-start ml-5 mb-0">Today 랭킹</h3>
      <div class="nav nav-masthead justify-content-center float-md-end">
        <router-link to="/ranking">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="black"
            class="bi bi-arrow-right-square-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"
            />
          </svg>
        </router-link>
      </div>
      <div class="clearfix"></div>
      <TabSwiper class="mt-3" />
      <GridSwiper class="mt-3" />
      <hr />
    </div>
    <br />
  </section>

  <section class="container mt-3">
    <h3 class="float-md-start ml-5 mb-0">신상 모아보기</h3>
    <div class="nav nav-masthead justify-content-center float-md-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-arrow-right-square-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"
        />
      </svg>
    </div>
    <div class="clearfix"></div>
    <div>카테고리 별 검색 기능 Swiper Button</div>
    <div>
      <h1>Grid Swiper 2 * 2 이미지 슬라이드</h1>
    </div>
  </section>
  <section class="container mt-3">
    <h3 class="float-md-start ml-5 mb-0">당신을 위한 추천</h3>
    <div class="nav nav-masthead justify-content-center float-md-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-arrow-right-square-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"
        />
      </svg>
    </div>
    <div class="clearfix"></div>
    <div></div>
    <h1>Grid Swiper 2 * 2 이미지 슬라이드</h1>
  </section>
  <section class="container mt-3">
    <h3 class="float-md-start ml-5 mb-0">MD's PICK</h3>
    <div class="nav nav-masthead justify-content-center float-md-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-arrow-right-square-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"
        />
      </svg>
    </div>
    <div class="clearfix"></div>
    <div></div>
    <h1>1*2 이미지 카드</h1>
  </section>
  <section class="container mt-3">
    <div v-for="(data, i) in this.$store.state.dataset" :key="i">
      <p>title : {{ data.title }}</p>
      <p>description : {{ data.description }}</p>
      <p>category : {{ data.category }}</p>
      <img class="w-50" :src="data.image" alt="" />
      <p>price : {{ data.price }}</p>
      <p>rate : {{ data.rating.rate }}</p>
      <p>count : {{ data.rating.count }}</p>
    </div>
  </section>
</template>

<script>
import SwiperImageSlide from '../components/SwiperImageSlide.vue';
import TabSwiper from '../components/TabSwiper.vue';
import GridSwiper from '../components/GridSwiper.vue';

export default {
  components: {
    SwiperImageSlide: SwiperImageSlide,
    TabSwiper: TabSwiper,
    GridSwiper: GridSwiper,
  },
  props: {
    dataset: Array,
  },
  created() {
    this.$store.dispatch('getData');
  },
};
</script>
<style></style>
