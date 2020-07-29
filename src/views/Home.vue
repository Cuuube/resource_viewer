<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>
        <el-input v-model="resource" placeholder="输入文件夹地址开始探索" style="width:500px">
        <el-button slot="append" :disabled="!resource" @click="toFiles">GO!</el-button>
      </el-input>
    </div>
    
  </div>
</template>

<script lang="ts">
  // @ is an alias to /src
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import HelloWorld from '@/components/HelloWorld.vue'

  @Component({ components: { HelloWorld } })
  export default class Home extends Vue {
    @Prop()
    private resource: string = ''

    private toFiles(): void {
      if (!this.resource) {
        this.$message.error("无输入")
      } else {
        const resource = this.resource.trim()
        this.$router.push({ name: 'Files', query: { resource } })
      }
    }
  }
</script>

<style>
  .home {
    text-align: center;
    margin-top: 60px;
  }
</style>