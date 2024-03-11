<template>
<div class="notfount">
  <img @click="$router.push('/')" src="../assets/404.webp" alt=""/>
</div>
</template>
<script>
export default {
}
</script>
<style scoped lang='scss'>
.notfount{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: #1f2c3e;
}
</style>