<template>
  <div>
    <button @click="goMain">进入主页</button>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from '../hooks/request'
const router = useRouter();
const user = reactive({})
onMounted(()=>{
getOne()
})
function getOne(){
    axios.get("users/function/getOne").then(res=>{
        console.log(res.data);
    })
}
const goMain = () => {
  router.push("/layout");
};
</script>
<style scoped>
</style>