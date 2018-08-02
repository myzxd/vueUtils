<template>
   
    <el-menu :default-active="$route.path" :router="true" >
      <div class="tile">
            <img src="../task/1.png" alt="" style="width:70px;height:70px;">
            <p style="fontSize:16px;fontWeight:600;color:red;margin-top:10px;">后台管理系统</p>
      </div>
    <template v-for="(item, index) in routerList">
        <el-menu-item
            v-if="!item.children"
            :key="index"
            :index="item.path"
            :route="{name: item.name}"
        >
            <i class="el-icon-menu"></i>
            {{item.meta.title}}
        </el-menu-item>
        <el-submenu v-else :index="item.path" :key="index" >
            <template slot="title"><i class="el-icon-menu"></i>{{item.meta.title}}</template>
            <el-menu-item 
                v-for="(i, inds) in item.children"
                :key="inds"
                :index="item.path+'/'+i.path"
                :route="{name: i.name}"
            >{{i.meta.title}}</el-menu-item>
        </el-submenu>
        </template>
    </el-menu>
</template>
<script>
    export default {
        props:{
             routerList:{
                 type:Array,
                 default(){
                     return []
                 }
             }
        }
    }
</script>
<style>
  .box{
      background: red;
  }
  .tile {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
}
</style>
