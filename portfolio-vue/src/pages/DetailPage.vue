<template lang="kr">
  <div>
    <img :src="detailData.image" style="width:512px ; height:512px; margin:auto;" />
    <h2>{{detailData.title}}</h2>
    <h2>{{detailData.price}}</h2>
    <h2>{{detailData.description}}</h2>
    <h2>{{detailData.category}}</h2>
    <h2>{{detailData.rating.rate}}</h2>
    <h2>{{detailData.rating.count}}</h2>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      detailData: {},
    };
  },
  created() {
    axios
      .get(
        `https://hozouhp9x8.execute-api.ap-northeast-2.amazonaws.com/dev/api/products/${this.$route.params.id}`,
      )
      .then((result) => {
        console.log(result);
        this.detailData = result.data;
        console.log(this.detailData);
      });
  },
};
</script>
<style lang=""></style>
