<template>
  <div>
    <NavTop></NavTop>
    <router-view name="layout"></router-view>
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
import { onMounted, reactive } from "vue";

const obj = reactive({
  user:{}
})

onMounted(() =>{
  axios.get("users/function/getOne").then(res=>{
    sessionStorage.setItem("userId",res.data.data.userId);
  })
})
</script>

<style lang="scss" scoped>

</style>