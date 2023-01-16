<template lang="kr">
  <div class="container sticky-top ">
    <nav class="bg-primary py-1 bg-white">
      <div class="d-flex">
        <ul class="nav flex-fill">
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link custom-tab active" aria-current="page"
              >홈</a
            >
          </li>
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark">랭킹</a>
          </li>
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark">단독</a>
          </li>
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark">매거진</a>
          </li>
          <li class="flex-fill nav-item text-center">
            <a href="#" class="nav-link link-dark">스토어</a>
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
.custom-tab.active {
  color: rgb(201, 151, 77);
  text-decoration: rgb(201, 151, 77);
  background: transparent !important;
  border-bottom: 2px solid rgb(201, 151, 77) !important;
  border-radius: 0px !important;
}
</style>
