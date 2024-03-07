<template>
  <div id="app">
    <div id="aplayer"></div>
    <div class="lrc">
      <div>
        <div class="img">
          <img :src="obj.cover" alt="Cover Image" width="160">      </div>
        </div>
        <div class="lyric" ref="lyricContainer">
          <ul :style="ulstyle" class="lyr">
            <li
          v-for="(item, index) in obj.lrc"
          :key="index"
          :style="{ color: currentLine === index ? 'skyblue' : 'rgb(201,204,207)' }"
        >
          {{ item.words }}
        </li>
          </ul>
        
      </div>

    </div>
  </div>
</template>
  
  <script setup>
import "aplayer/dist/APlayer.min.css";
import { ref, reactive, onMounted } from "vue";
import APlayer from "aplayer";
import axios from "../hooks/request";
import bus from "../Bus/EventBus";
const obj = reactive({
  musics:[],
  lrc: [],
  cover:"img/default.png",
});
const ulstyle=reactive({
        transform:''
      });

const audio = reactive([
  {
    name: "悬溺",
    artist: "葛东琪",
    url: "http://localhost:8080/music/悬溺.mp3",
    cover: "http://localhost:8080/img/悬溺.jpg",
    lrc:`[00:00.000] 作词 : 葛东琪
[00:00.730] 作曲 : 葛东琪
[00:01.460] 编曲 : 葛东琪
[00:02.190] 制作人 : 葛东琪
[00:02.930]编曲 : 葛东琪
[00:31.430]我主张制止不了就放任
[00:38.070]这欲望与绝望之争
[00:44.640]余温她却喜欢过门
[00:50.260]临走呢
[00:52.130]还随手关了灯
[00:56.330]So funny
[00:57.140]Ya i ya i ya i ya i ya i ya i ya
[01:00.380]Ya i ya i ya i ya i
[01:03.670]Ya i ya i ya i ya i ya i ya i ya
[01:07.060]It's so funny ya i ya i
[01:10.400]Ya i ya i ya i ya i ya i ya i ya
[01:13.640]Ya i ya i ya i ya i
[01:17.090]It's so funny ya i ya i ya i ya i ya
[01:20.430]Ya i ya i ya i ya i
[01:51.390]我主张克制不了就放任
[01:58.110]悬上该有的天真
[02:04.690]起伏在于喜怒哀乐
[02:10.360]松了绳
[02:12.180]大不了无人问
[02:17.130]Ya i ya i ya i ya i ya i ya i ya
[02:20.430]Ya i ya i ya i ya i
[02:23.720]Ya i ya i ya i ya i ya i ya i ya
[02:27.050]It's so funny ya i ya i
[02:30.450]Ya i ya i ya i ya i ya i ya i ya
[02:33.740]Ya i ya i ya i ya
[02:37.080]It's so funny ya i ya i ya i ya i ya
[02:40.410]Ya i ya i ya i ya
[02:42.290]有什么话要说
[03:14.190]录音师 : 葛东琪
[03:15.220]混音师 : 葛东琪
[03:16.050]制作人 : 葛东琪
`
  },
]);

const lyricContainer = ref(null);
const currentLine = ref(0);

let ap; // 声明 APlayer 实例

onMounted(() => {
  axios.get("/music/getAll").then(res=>{
    obj.musics=res.data.data;
  })
  addMyAudio();
  bus.on("addMusic", (a) => {
    addMusic(a);
  });
  bus.on("changeMusic",(a)=>{
    changeMusic(a)
    })
  ap.audio.addEventListener("timeupdate", function () {
    // 获取当前播放时间
    var currentTime = ap.audio.currentTime;
    updateLyric(currentTime);
  });
  ap.on("loadstart",(e)=>{
    changeLy(ap.list);
  })

});

function changeLy(i){
  console.log(i);
  if (i.player) {
    const coverUrl = ap.list.audios[i.index].cover;
    obj.cover = coverUrl; // 设置封面图片
    let index = obj.musics.findIndex(a => a.title == ap.list.audios[i.index].name);
    bus.emit("changeBackground",obj.musics[index].musicId)
    formatLrc(obj.musics[index].lyrics);
  }
}

function addMusic(a){
  let index = -1;
    ap.list.audios.forEach((music, i) => {
      if (music.name === a.title) {
        index = i;
      }
    });
    if (index < 0) {
      let cover1 = a.fileUrl.replace("music/", "img/").replace("mp3", "jpg");
      ap.list.add([
        {
          name: a.title,
          artist: a.artist,
          url: "http://localhost:8080/" + a.fileUrl,
          cover: "http://localhost:8080/" + cover1,
          lrc: a.lyrics.replace(/(\r\n|\n|\r)/gm, ""),
          theme: "#ebd0c2",
        },
      ]);
    } else {
      ap.list.remove(index);
    }
    ap.play();
}

function changeMusic(a){
    let index = -1;
    ap.list.audios.forEach((music, i) => {
      if (music.name === a.title) {
        index = i;
      }
    });
    if (index < 0) {
      let cover1 = a.fileUrl.replace("music/", "img/").replace("mp3", "jpg");
      ap.list.add([
        {
          name: a.title,          
          artist: a.artist,
          url: "http://localhost:8080/" + a.fileUrl,
          cover: "http://localhost:8080/" + cover1,
          lrc: a.lyrics.replace(/(\r\n|\n|\r)/gm, ""),
          theme: "#ebd0c2",
        },
      ]);
      ap.list.audios.forEach((music, i) => {
        if (music.name === a.title) {
        index = i;
      }
    });
    } 
    ap.list.switch(index);    
    ap.play();
    obj.cover=ap.list.audios[index].cover;
    formatLrc(a.lyrics)
  }



const formatTime = (time) => {
  const parts = time.split(":");
  return +parts[0] * 60 + +parts[1];
};

function updateLyric(currentTime) {
  for (let i = 0; i < obj.lrc.length; i++) {
    if (currentTime >= obj.lrc[i].time) {
      currentLine.value = i;
      // 滚动到当前歌词行
      const lyricContainer = document.getElementById("lyricContainer");
      ulstyle.transform=`translateY(${165 - (50 * (i + 1))}px)`
    }
  }
}

const formatLrc = (a) => {
  const strLrc = a.split("\n");
  let arr = [];
  for (let i = 0; i < strLrc.length; i++) {
    const str = strLrc[i];
    const parts = str.split("]");
    const timeStr = parts[0].substring(1);
    const obj2 = {
      time: formatTime(timeStr),
      words: parts[1],
    };
    arr.push(obj2);
  }
  obj.lrc=arr;
};

function addMyAudio() {
  ap = new APlayer({
    container: document.getElementById("aplayer"),
    fixed: true,
    audio: audio,
    listMaxHeight: "90px",
    listFolded: false,
    lrcType: 2,
    mutex:true,
  });
}






</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}

.lrc{
  width: 300px;
  position: fixed;
  right: 2%;
  top: 10%;
  text-align: center;

}
.lyric{
  overflow: hidden;
 
}
.lyr{
  list-style: none;
  height: 330px;
  text-align: center;
}
.lyr li{
  height: 50px;
}
.img{}

</style>

  