<template>
  <div id="app">
    <Menu/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import HelloWorld from './components/HelloWorld.vue'
  import Menu from './components/Menu.vue'

  @Component({
    components: {
      HelloWorld,
      Menu,
    },
  })
  export default class App extends Vue {}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* margin-top: 60px; */
  }
</style>
