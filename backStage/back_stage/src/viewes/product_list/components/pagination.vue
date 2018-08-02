<template>
   <div class="ination">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="cont"
        :page-size="pageSize"
        @current-change="currentChange"
        >
        </el-pagination>
   </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("commodity/list", ["cont", "pageSize"])
  },
  created() {
    this.$store.dispatch("commodity/list/get_Commodity_Data", {
        page: 0
      });
  },
  methods: {
    currentChange(index) {
      this.$store.dispatch("commodity/list/get_Commodity_Data", {
        page: index - 1
      });
    }
  }
};
</script>
<style>
   .ination{
       width:100%;
       height: 40px;
       background: #fff;
       display: flex;
       align-items: center;
   }
</style>
