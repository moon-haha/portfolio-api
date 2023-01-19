<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-8">
        <EventHeader />
        <LogoHeader />
        <StickeyHeader />
        <router-view></router-view>

        <div class="container">
          <footer
            class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
          >
            <div class="px-4 py-5 my-5 text-left">
              <h1>하이버 고객센터</h1>
              <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">
                  Quickly design and customize responsive mobile-first sites
                  with Bootstrap, the world’s most popular front-end open source
                  toolkit, featuring Sass variables and mixins, responsive grid
                  system, extensive prebuilt components, and powerful JavaScript
                  plugins.
                </p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg px-4 gap-3"
                  >
                    입점문의
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-lg px-4"
                  >
                    셀러어드민
                  </button>
                </div>
              </div>
            </div>
            <p class="col-md-4 mb-0 text-muted">브렌디 드롭다운</p>

            <a
              href="/"
              class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <svg class="bi me-2" width="40" height="32">
                <use xlink:href="#bootstrap"></use>
              </svg>
            </a>

            <ul class="nav col-md-4 justify-content-end">
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">Faceboo</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">Features</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">FAQs</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">About</a>
              </li>
            </ul>
          </footer>
        </div>
        <FooterBar />
      </div>

      <FixedNavbar />
    </div>
  </div>
  <!-- modal -->
</template>

<script>
import EventHeader from './components/EventHeader.vue';
import StickeyHeader from './components/StickeyHeader.vue';
import LogoHeader from './components/LogoHeader.vue';
import FooterBar from './components/FooterBar.vue';
import FixedNavbar from './components/FixedNavbar.vue';

import axios from 'axios';
// 리소스 접근 허용
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// 서로 다른 도메인간 쿠키 전달 : false
axios.defaults.withCredentials = false;

export default {
  name: 'App',
  components: {
    EventHeader: EventHeader,
    StickeyHeader: StickeyHeader,
    LogoHeader: LogoHeader,
    FooterBar: FooterBar,
    FixedNavbar: FixedNavbar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.router-link-exact-active {
  color: rgb(201, 151, 77) !important;
  text-decoration: rgb(201, 151, 77);
  background: transparent !important;
  border-bottom: 2px solid rgb(201, 151, 77) !important;
  border-radius: 0px !important;
}
</style>
