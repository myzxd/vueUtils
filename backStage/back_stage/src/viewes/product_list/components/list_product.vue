<template>
  <el-table
    :data="datas"
    border
    style="width: 100%"
    size="small"
    :max-height="400"
     height="600"
     >
    <el-table-column
      fixed
      prop="datas"
      label="商品信息"
      width="250"  class="message">
      <template slot-scope="scope">
          <dl>
            <dt><img :src="scope.row.pircer" class="image"></dt>
            <dd>
                <h5>{{scope.row.space}}</h5>
                <span>ID:{{scope.row.id}}</span>
            </dd>
          </dl>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="pirc"
      label="商品价格"
      width="250">
    </el-table-column>
    <el-table-column
      prop="city"
      label="时间"
      width="250">
    </el-table-column>
    <el-table-column
      prop="inventory"
      label="库存"
      width="300">
    </el-table-column>
    <el-table-column
      prop="strot"
      label="状态"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <template>
                <el-button  type="text" size="small" v-if="scope.row.strot == 1" @click="release(scope.row.id)">上架</el-button>
                <el-button  type="text" size="small" v-if="scope.row.strot == 2" @click="downline(scope.row.id)">下架</el-button>
            </template>
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import axios from "axios";
import {mapState} from "vuex";
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    release(id){
       console.log(id)
        this.$confirm('是否上架该商品，上架后用后即可购买该商品', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('commodity/list/get_Release', {
              id: id,
              strot: 2
            }).then(()=>{
              this.$message({
                type: 'success',
                message: '上架成功!'
              });
            })
        })
    },
    downline(id){
      this.$confirm('是否上架该商品，下架后用后即可购买该商品', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('commodity/list/get_Release', {
              id: id,
              strot: 1
            }).then(()=>{
              this.$message({
                type: 'success',
                message: '下架成功!'
              });
            })
        })
    }
  },
  computed:{
     ...mapState("commodity/list",["datas","page"])
  },
  created() {
      this.$store.dispatch("commodity/list/get_Commodity_Data",{
        page:0
      })
  },
  mounted(){
   console.log(this.page)
  }
};
</script>
<style scoped lang="less">
   .time {
     font-size: 13px;
     color: #999;
   }
   
   .bottom {
     margin-top: 13px;
     line-height: 12px;
   }
   
   .button {
     padding: 0;
     float: right;
   }
   
   .image {
     width: 100%;
     display: block;
   }
   
   .clearfix:before,
   .clearfix:after {
     display: table;
     content: "";
   }
   
   .clearfix:after {
     clear: both;
   }
   .card {
     width: 100%;
     height: 200px;
     margin-top: 10px;
   }
   
   dl {
     width: 240px;
     height: 100px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     dt {
       width: 100px;
       height: 100px;
       img {
         width: 100%;
         height: 100%;
       }
     }
     dd {
       flex: 1;
       height: 100%;
       display: flex;
       align-items: left;
       flex-direction: column;
       justify-content: center;
       margin-left: 10px;
       h5 {
         margin-top: 10px;
       }
     }
   }
</style>
