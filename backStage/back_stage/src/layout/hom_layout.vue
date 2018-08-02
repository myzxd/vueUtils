<template>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246),height:100%">
           <hederOut :routerList="routerList"/>
      </el-aside>
      <tiltOut/>
    </el-container>
</template>

<script>
  import tiltOut from "../components/loyoutChilren/tile_layout"
  import hederOut from "./hedrs_layouts"
  export default {
    components:{
       tiltOut,
       hederOut
    },
    mounted() {
      console.log(this.$route.path)
    },
    computed:{
        routerList(){
           return this.$router.options.routes[0].children
        }
    }
  };
</script>
  
<style scoped>
.hove:hover {
  background: red;
}
.hom {
  display: flex;
  align-items: center;
}
.hom p {
  width: 5px;
  height: 30px;
  background: red;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
