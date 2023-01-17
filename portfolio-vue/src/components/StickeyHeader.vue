<template>
  <div class="sticky-top">
    <nav class="py-1 bg-white">
      <div class="d-flex">
        <ul class="nav flex-fill">
          <li class="flex-fill nav-item text-center">
            <router-link to="/" class="nav-link link">홈</router-link>
          </li>
          <li class="flex-fill nav-item text-center">
            <router-link to="/ranking" class="nav-link link">랭킹</router-link>
          </li>
          <li class="flex-fill nav-item text-center">
            <router-link to="/special" class="nav-link link">단독</router-link>
          </li>
          <li class="flex-fill nav-item text-center">
            <router-link to="/event" class="nav-link link">매거진</router-link>
          </li>
          <li class="flex-fill nav-item text-center">
            <router-link to="/store" class="nav-link link">스토어</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'StickeyHeader',
};
</script>
<style>
.nav-link {
  color: black !important;
}
</style>
