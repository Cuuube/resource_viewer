<template>
  <el-menu class="el-menu-demo" mode="horizontal" :router="true">
    <el-menu-item index="/">首页</el-menu-item>
    <el-submenu index="/creation">
      <template slot="title">创意</template>
      <el-menu-item index="2-1" to="/">TODO1</el-menu-item>
      <el-menu-item index="2-2">TODO2</el-menu-item>
      <el-menu-item index="2-3">TODO3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">TODO4</template>
        <el-menu-item index="2-4-1">TODO1</el-menu-item>
        <el-menu-item index="2-4-2">TODO2</el-menu-item>
        <el-menu-item index="2-4-3">TODO3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>未开发</el-menu-item>
    <el-menu-item index="/about">关于</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Menu extends Vue {
  }
</script>
