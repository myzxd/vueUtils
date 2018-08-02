<template>
    <div class="hom">
        <div class="hom_data">
           <div class="block">
              <span class="demonstration">查询时间</span>
              <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions1">
              </el-date-picker>
          </div>
          <div class="block">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
          </div>
          <div class="select">
             <el-select
                  v-model="value10"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择文章标签">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
          </div>
          <div class="btn">
                 <el-button type="primary" @click="onSubmit" style="background:blue">查询</el-button>
          </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',
        options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value10: []
      };
    },
    methods:{
        onSubmit(){
            alert(1)
        }
    }
  };
</script>
<style lang="less" scoped>
.hom {
    width:100%;
    height: auto;
}
.hom_data{
    width: 100%;
    height: 200px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
