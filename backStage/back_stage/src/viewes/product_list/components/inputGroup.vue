<template>
  <div class="group_input">
      <div class="conten">
         <p v-for="(item,index) in list" :key="index">
            <el-input size="mini" v-model="item.label"></el-input>
            <el-input size="mini" v-model="item.value"></el-input>
            <span class="el-icon-circle-close" v-show="list.length>=2" @click="delet(index)"></span>
         </p>
      </div>
     <el-button @click="buBtn">添加</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[{
           label: '',
           value: ''
         }
       ]
    };
  },
  props: {
      value: String
  },
  created() {
      if(this.value!==""){
          this.list = JSON.parse(this.value)
      }
      this.watchList ()
  },
  watch:{
     list(newVal){
         console.log(newVal)
     }
  },
  methods:{
      buBtn(){
        this.list.push({
             label: '',
             value: ''
        })
        this.watchList ()
      },
      delet(index){
          this.list.splice(index,1)
      },
      watchList () {
        this.list.forEach((item) => {
          this.$watch(() => {
            return item.label + item.value
          }, (newVal) => {
            const emitVal = this.list.map((item, index) => {
              return {
                label: item.label,
                value: item.value
              }
            })
            this.$emit('input', JSON.stringify(emitVal))
          })
        })
      }
   }
};
</script>
<style scoped lang="less">
  .group_input {
    width: 100%;
    .conten {
      width: 100%;
       p{
          width: 100%; 
          display: flex;
          align-items: center;
          justify-content: space-between;
       }
      
    }
  }
</style>
