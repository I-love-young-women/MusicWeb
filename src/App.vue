<template>
  <div id="app">
    <div class="left">
      <router-view></router-view>
    </div>
  
    <div class="right">
      <Lyric></Lyric>
    </div>
    

  </div>
  
</template>

<script setup>
import Lyric from './views/Lyric.vue';

</script>

<style scoped>
/* 可以添加样式 */

.left{
  width: 75%;
}
.right{
  width: 20%;
  position: absolute;
  right: 0;
  top: 5%;
}
</style>
