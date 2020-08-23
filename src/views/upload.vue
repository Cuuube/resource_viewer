<template>
<div class="wrap">
  <img src="../assets/logo.png" alt="" style="margin-left:200px">
  <div class="inputaddress">
  <el-input v-model="value" placeholder="输入文件要上传位置" @input="getvalue($event)"></el-input>
</div>
<div class="upload">
  <input class="style_file_content"  type="file" id="upload_file_id"  @change="getvalues()"/>
  <span>{{names}}</span>
</div>
<div class="submit" @click="submit()">
  <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
</div>
</div>
</template>

<script lang="ts">
 import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
 import {getfalt} from '../service/FileService'
export default class upload extends Vue{
  public value:string='';
  private values?:any='';
  private names?:string="点击上传";
  private isright:any=false;
   getvalues(){
     let ele=Object(document.getElementById("upload_file_id"))
     if(ele.value!=null &&ele.files[0].name!=null){
       this.values=ele.value
       this.names=ele.files[0].name
       this.$forceUpdate()
     }
console.log(this.names+this.values);

  };
  getvalue($event:any){
this.value=$event
this.$forceUpdate();
  }
  submit(){
    let Data=new FormData();
    Data.append('file',this.values)
   this.isright= getfalt(Data);
   console.log(this.isright);
   
  };
/*   @Watch('name')
  showname(newvalue:string,oldvalue:string){
    console.log(newvalue);
    
this.names=newvalue

  } */
}
</script>
<style>
.wrap{
  position: relative;
  width: 600px;
  margin: 100px auto;
}
.wrap div{
    margin-top: 10px;
}
.wrap .upload{
  cursor: pointer;
  margin-top: 30px;
  width: 100px;
  height: 30px;
  background: #01a8a8;
  border-radius: 5px;
  color: aliceblue;
  line-height: 30px;
  text-align: center;
}
.upload span{
  width: 100px;
  height: 30px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 6px;
}
.upload .style_file_content{
  position: absolute;
width: 100px;
height: 30px;
  opacity: 0;
  left: 0;
  right: 0;
}
.submit{
  position: absolute;
  right: -90px;
   bottom: 60px;
}
</style>