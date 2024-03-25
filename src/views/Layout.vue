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
<<<<<<< HEAD
    obj.user=res.data.data
    sessionStorage.setItem("user",JSON.stringify(res.data.data))
=======
    sessionStorage.setItem("userId",res.data.data.userId);
>>>>>>> de0303f2a2f3bce23245d46656670a40e30d402a
  })
})
</script>

<style lang="scss" scoped>

</style>