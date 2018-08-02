<template>
    <div class="About">
        <span @click="filter.strot=''">全部商品</span>
        <span @click="filter.strot=2">上架</span>
        <span @click="filter.strot=1">未上架</span>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      filter: {
        strot: ""
      }
    };
  },
  created() {
    this.$store.dispatch("commodity/list/get_Commodity_Data", {
      page: 0
    });
  },
  watch: {
    "filter.strot"(newVal) {
      console.log(newVal);
      this.$store.dispatch("commodity/list/set_filters", this.filter);
    }
  }
};
</script>
<style scoped>
.About {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: #fff;
}
span {
  width: 100px;
  height: 40px;
  background: #cccc;
  text-align: center;
  line-height: 40px;
  color: #ffff;
  font-weight: 600;
  margin-left: 10px;
}
</style>
