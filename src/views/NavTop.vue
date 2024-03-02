<template>
  <div id="app">
    <div>
        <h2>xxx播放器</h2>
    </div>
    <div>
      <el-button @click="toPage('play')">正在播放</el-button>
      <el-button @click="toPage('recommend')">推荐</el-button>
      <el-button @click="toPage('search')">搜索</el-button>
      <el-button @click="toPage('myMusic')">我的歌单</el-button>
      <el-button @click="toPage('myRecent')">我听过的</el-button>
    </div>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();


const toPage=(type)=>{

  router.push(`/layout/${type}`);
}
</script>

<style lang="scss" scoped>

</style>