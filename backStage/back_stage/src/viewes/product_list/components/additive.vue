<template>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
        <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
         <el-form-item label="商品描述" prop="region">
           <el-input type="textarea"  v-model="ruleForm.region"></el-input>
        </el-form-item>
         <el-form-item label="商品价格" prop="price">
           <el-input-number v-model="ruleForm.price" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="商品数量" prop="sort">
           <el-input-number v-model="ruleForm.sort" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="产品背景图"  prop="dialogImageUrl">
             <el-upload
               action="/api/prodcot/upload"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"
               :on-success="bannerSuccess">
               <i class="el-icon-plus"></i>
             </el-upload>
             <el-dialog :visible.sync="dialogVisible">
               <img width="100%" :src="dialogImageUrl" alt="">
             </el-dialog>
        </el-form-item>
        <el-form-item label="产品缩略图">
          <el-upload
            class="avatar-uploader"
            v-model="ruleForm.imageUrl"
            action="/api/prodcot/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>
           <el-form-item label="配料">
            <el-transfer :titles="['配料列表', '使用配料']" :data="data" v-model="ruleForm.introduce"></el-transfer>
          </el-form-item>
          <el-form-item label="商品规格">
            <InputGroups v-model="ruleForm.burdening"/>
         </el-form-item>
         <el-form-item label="商品介绍">
            <quillEditor :options="editorOption" v-model="ruleForm.context"></quillEditor>
        </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
  </template>
<script>
import axios from "axios"
import InputGroups from "./inputGroup"
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
      const generateData = _ => {
      let data = ['生牛乳（＞80%）','蓝纹芝士酱（再制干酪）（添加量≥10%）','白砂糖','保加利亚乳杆菌','嗜热链球菌','乳双歧杆菌'];
      data = data.map((item) => {
        return {
          key: item,
          label: item
        }
      })
      return data;
    };
    return {
      data: generateData(),
      dialogImageUrl: '',
      dialogVisible: false,
      editorOption:{
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike', 'image'], 
              ['blockquote', 'code-block']
            ]
          }
      },
      ruleForm: {
        name: "",
        region: "",
        price: "",
        introduce:[],
        burdening:'[{"label":"重量","value":"100"}]',
        sort:"",
        background:"",
        imageUrl:"",
        context:"",
        content:""
      }
  }},
  watch:{
     "ruleForm.burdening"(val){
       console.log(val)
     }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm.context)
        if (valid) {
           axios.post("/api/prodcot/list_uploading",
                  {
                    name:this.ruleForm.name,
                    region:this.ruleForm.region,
                    price:this.ruleForm.price,
                    introduce:this.ruleForm.introduce,
                    burdening:this.ruleForm.burdening,
                    background:this.ruleForm.background,
                    imageUrl:this.ruleForm.imageUrl,
                    context:this.ruleForm.context,
                    sort:this.ruleForm.sort,
                    content:this.ruleForm.content
                  }).then(s=>{
                    console.log(s.data)
              })
          console.log(this.ruleForm)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
      handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = res.data;
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleChange(value) {
        console.log(value);
      },
     bannerSuccess (response, file, fileList) {
      this.ruleForm.background = fileList.map((item, index) => {
        return item.response.data
      }).join(',')
    }
  },
  components:{
        InputGroups,
        quillEditor
  },
  mounted() {
       console.log(this.ruleForm.burdening)
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed orange;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
     border: 1px dashed orange;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
