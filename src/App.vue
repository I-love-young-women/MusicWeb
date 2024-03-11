<template>
  <div id="app">
      <router-view></router-view>
    </div>

    <!-- <div class="right">
      <Lyric></Lyric>
    </div>  -->

    <div class="right"></div>
    <div class="down">
      <DownMusic></DownMusic>
    </div>
    <div class="showtext"></div>
    <div class="blur-effect"></div>
    <div class="back"></div>
  </div>
</template>

<script setup>
import Lyric from "./views/Lyric.vue";
import DownMusic from "./views/DownMusic.vue";
import bus from "./Bus/EventBus";
import { onMounted, reactive } from "vue";
import axios from "./hooks/request";
import ColorThief from "colorthief";
const obj=reactive({
  playing:''
})
onMounted(() => {
  bus.on("changeBackground", (i) => {
    const colorThief = new ColorThief();
    axios.get("/music/getCover/" + i).then((res) => {
      var img = new Image();
      img.src = "data:image/jpeg;base64," + res.data.data;
      document.querySelector(".back").style.backgroundImage = `url(${img.src})`;
    });
  });
});
</script>

<style>
/* 可以添加样式 */
:root {
  --theme-color: #ebd0c2;
}
.left {
  width: 75%;
}
.right {
  width: 20%;
  position: absolute;
  right: 0;
  top: 5%;
}
.down {
  position: fixed;
  top: 76%;
}

.blur-effect {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(20px);
  z-index: -2;
}

.back {
  background-size: cover; /* 调整背景图片的大小以适应屏幕 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: -20px;
  left: 0;
  z-index: -3; /* 调整 z-index，使其位于模糊效果层之后 */
}
.showtext {
  background-color: black;
  opacity: 0.3;
  background-size: cover; /* 调整背景图片的大小以适应屏幕 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
/* body {
  text: rgb(201, 204, 207);
} */
</style>
