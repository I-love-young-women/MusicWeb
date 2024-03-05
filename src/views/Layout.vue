<template>
  <div>
    <NavTop></NavTop>
    <router-view></router-view>
    <div class="right">
      <Lyric></Lyric>
    </div>
  </div>
</template>

<script setup>
import NavTop from "../views/NavTop.vue"
import Lyric from '../views/Lyric.vue';
</script>

<style lang="scss" scoped>

.right{
  width: 20%;
  position: absolute;
  right: 0;
  top: 5%;
}
</style>