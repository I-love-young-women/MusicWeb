<template>
  <div id="app">
    <div>
        <h2>偷心播放器</h2>
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
  router.replace(`/layout/${type}`);
}
</script>

<style lang="scss" scoped>

.el-button {
  background-color: transparent !important;
  color: rgba(254, 254, 254, 1) !important;
}
</style>