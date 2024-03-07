<template>
  <div class="hello">
    <audio
      :src="music"
      @timeupdate="audioTime"
      controls
      class="custom-audio"
    ></audio>
    <div class="lyric">
      <div v-show="obj.played">
        <div v-show="isLoading" style="height: 160px; line-height: 160px">
          正在加载...
        </div>
        <img ref="imgRef" v-show="!isLoading" />
      </div>
      <div v-show="!obj.played" style="height: 160px; line-height: 160px">
        <h2>欢迎</h2>
      </div>

      <div class="out">
        <ul :style="ulstyle" v-if="music">
          <li
            v-for="(item, index) in lrcData"
            :key="index"
            :style="{ color: lrcindex == index + 1 ? 'skyblue' : 'black' }"
          >
            {{ item.words }}
          </li>
        </ul>
      </div>

      <div v-if="!music" style="height: 40vh; line-height: 40vh">暂无播放</div>
    </div>

    <div>
    <div id="aplayer"></div>
  </div>

  

    
  </div>

</template>
  <script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import axios from "../hooks/request";
import bus from "../Bus/EventBus.js";
import { watchEffect } from "vue";
// import "APlayer/dist/APlayer.min.css";
// import APlayer from "aplayer";

const obj = reactive({
  musics: [],
  audio: {
    name: "",
    artist: "",
    url: "",
    cover: '', // prettier-ignore
    lrc: "",
  },
});

const imgRef = ref(null);
const className = ref("text load");
const lrcTime = ref("");
const music = ref("");
const currenttime = ref("");
const LRC = ref(``);
const lrcData = ref("");
const dataWords = ref("");
const lrcindex = ref("");
const ulstyle = ref({
  transform: "",
  played: false,
});
const isLoading = ref(true);

// 歌词数据转化为数组
const formatLrc = () => {
  const strLrc = LRC.value.split("\n");
  let arr = [];
  for (let i = 0; i < strLrc.length; i++) {
    const str = strLrc[i];
    const parts = str.split("]");
    const timeStr = parts[0].substring(1);
    const obj = {
      time: formatTime(timeStr),
      words: parts[1],
    };
    arr.push(obj);
  }
  lrcData.value = arr;
};

// 时间转换（秒）
const formatTime = (time) => {
  const parts = time.split(":");
  return +parts[0] * 60 + +parts[1];
};

const audioTime = (e) => {
  const time = e.target.currentTime;
  for (let i = 0; i < lrcData.value.length; i++) {
    if (time < lrcData.value[i].time) {
      lrcTime.value = lrcData.value[i].time - lrcData.value[i - 1].time;
      dataWords.value = lrcData.value[i - 1].words;
      lrcindex.value = i;
      ulstyle.value.transform = `translateY(${160 - 40 * (i + 1)}px)`;
      return i - 1;
    }
  }
};

onMounted(() => {
  bus.on("changeLyc", (a) => {
    LRC.value = a.lrc;
    formatLrc();
    music.value = "http://localhost:8080/" + a.url;
    playM();
    getCover(a.musicId);
  });
});





function getCover(musicId) {
  isLoading.value = true; // 显示加载动画
  const timeout = setTimeout(() => {
    // 超时处理逻辑，切换至默认图片
    isLoading.value = false;
    imgRef.value.src = "@assets/default.png";
  }, 5000); // 设置超时时间为5秒（单位为毫秒）

  axios
    .get("/music/getCover/" + musicId)
    .then((res) => {
      clearTimeout(timeout); // 取消超时计时器
      if (res.data.code === 200) {
        var img = new Image();
        img.src = "data:image/jpeg;base64," + res.data.data;
        img.onload = function () {
          obj.played = true;
          img.width = 160;
          img.height = 160;
          imgRef.value.src = img.src;
          imgRef.value.width = img.width;
          imgRef.value.height = img.height;
          isLoading.value = false; // 隐藏加载动画
        };
      }
    })
    .catch((error) => {
      console.error("Failed to fetch cover image: ", error);
      isLoading.value = false; // 隐藏加载动画（如果发生错误也需要隐藏）
    });
}

function playM() {
  const audioElement = document.querySelector(".custom-audio");
  audioElement.play();
}

onBeforeUnmount(() => {
  bus.off("changeLyc");
});

watchEffect(() => {
  if (dataWords.value) {
    className.value = "text";
    setTimeout(() => {
      className.value = "text load";
    }, 50);
  }
});
</script>
  
<style scoped>
* {
  margin: 0;
  padding: 0;
}

@keyframes scan {
  0% {
    background-size: 0 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}

.text {
  background: #7e7e7e -webkit-linear-gradient(left, #76ca16, #0fa046) no-repeat 0
    0;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-size: 0 100%;
}

.out {
  overflow: hidden;
}
.load {
  background-size: 100% 100%;
  animation: scan linear;
}

.lyric {
  overflow: hidden;
  text-align: center;
}

ul {
  list-style: none;
  height: 330px;
}

li {
  height: 40px;
}
</style>
  