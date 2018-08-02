<template>
    <div class="product_list">
           <div class="list_tile">
               <el-button @click="dialogInput=true">添加商品</el-button>
                <b>商品列表</b>
                <el-dialog :visible.sync="dialogInput" size="samll">
                  <Additive/>
                </el-dialog>
             </div> 
             <About/>
            <List/>
           <Ination/>
    </div>
</template>
<script>
import List from "./components/list_product";
import Additive from "./components/additive"
import Ination from "./components/pagination"
import About from "./components/aboutTabel"
export default {
  data() {
    return {
        dialogInput:false
    };
  },
  components: {
    List,
    Additive,
    Ination,
    About
  }
};
</script>
<style scoped lang="less">
.product_list {
  width: 100%;
  .list_tile {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    b {
      font-size: 18px;
      color: red;
    }
    .el-button {
      margin-left: 10px;
      margin-right: 10px;
      background: #eee;
      color: #ccc;
    }
  }
}
</style>
