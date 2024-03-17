<template>
  <div>
    <NavTop></NavTop>
    <Playing></Playing>
    <div class="down">
      <DownMusic></DownMusic>
    </div>
      </div>
</template>

<script setup>
import Playing from "../views/Playing.vue";
import NavTop from "../views/NavTop.vue"
import DownMusic from "../views/DownMusic.vue";
import axios from '../hooks/request'
import { onMounted } from "vue";

onMounted(() =>{
  axios.get("users/function/getOne").then(res=>{
    console.log(res.data);
  })
})
</script>

<style lang="scss" scoped>

</style>