<template>
  <EventHeader />
  <LogoHeader />
  <StickeyHeader />
  <FooterBar />
  <CarouselContainer />
  <div class="container">
    <h3 class="float-md-start mb-0">Today 랭킹</h3>
    <div class="nav nav-masthead justify-content-center float-md-end">>></div>
  </div>
  <div class="container">
    <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
      <div
        class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden"
      >
        <div class="my-3 py-3">
          <h2 class="display-5">Another headline</h2>
          <p class="lead">And an even wittier subheading.</p>
        </div>
        <div
          class="bg-light box-shadow mx-auto"
          style="width: 80%; height: 300px; border-radius: 21px 21px 0 0"
        ></div>
      </div>
      <div
        class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
      >
        <div class="my-3 p-3">
          <h2 class="display-5">Another headline</h2>
          <p class="lead">And an even wittier subheading.</p>
        </div>
        <div
          class="bg-dark box-shadow mx-auto"
          style="width: 80%; height: 300px; border-radius: 21px 21px 0 0"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import EventHeader from './components/EventHeader.vue';
import StickeyHeader from './components/StickeyHeader.vue';
import LogoHeader from './components/LogoHeader.vue';
import FooterBar from './components/FooterBar.vue';
import CarouselContainer from './components/CarouselContainer.vue';
export default {
  name: 'App',
  components: {
    EventHeader: EventHeader,
    StickeyHeader: StickeyHeader,
    LogoHeader: LogoHeader,
    FooterBar: FooterBar,
    CarouselContainer: CarouselContainer,
  },
};
</script>

<style>
#app {
}
</style>
