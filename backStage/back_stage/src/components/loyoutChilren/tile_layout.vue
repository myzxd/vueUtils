<template>
  <el-container style="background:#eee">
      <el-header style="text-align: left; font-size: 18px;color:red;font-weight:600;width:100%;height:50px;lineHeight:50px;">
         <div class="homsild">
           <p></p><span>首页</span>
         </div>
      </el-header>
      <el-main class="rout">
        <router-view/>
      </el-main>
  </el-container>
</template>
<script>
    export default{

    }    
</script>
<style scoped>
   .rout{
     margin-left:20px;
     height: 100%;
     padding: 0;
   }
   .homsild{
     display: flex;
     align-items: center;
     width: 100%;
     height: 40px;
   }
   .homsild p{
     width: 5px;
     background: red;
     height:30px;
     margin-right: 10px;
   }
</style>
