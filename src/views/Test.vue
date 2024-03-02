<template>
  <div class="hello">
    <audio :src="music" @timeupdate="audioTime" controls></audio>
    <div class="lyric">
      <ul :style="ulstyle">
      <li v-for="(item,index) in lrcData " :key="index" :style="{color: lrcindex == index+1 ? 'skyblue' : 'black'}">{{ item.words }}</li>
    </ul>
    </div>
  </div>
</template>
 
<script>

import axios from '../hooks/request';
export default {
  data() {
    return {
      className: "text load",
      lrcTime: "",
      music:'',
      currenttime: "",
      LRC: ``,
      lrcData: "",
      dataWords: "",
      lrcindex:"",
      ulstyle:{
        transform:''
      }
    };
  },
  
  name: "HelloWorld",
  methods: {
    //歌词数据转化为数组
    formatLrc() {
      var strLrc = this.LRC.split("\n");
      let arr = [];
      for (var i = 0; i < strLrc.length; i++) {
        var str = strLrc[i];
        var parts = str.split("]");
        var timeStr = parts[0].substring(1);
        var obj = {
          time: this.formatTime(timeStr),
          words: parts[1],
        };
        arr.push(obj);
      }
      this.lrcData = arr;
    },
    //时间转换（秒）
    formatTime(time) {
      var parts = time.split(":"); //[03:00.000]==>[03,00.00]
      return +parts[0] * 60 + +parts[1]; //计算秒
    },
    audioTime(e) {
      var time = e.target.currentTime; //当前播放器时间
      for (var i = 0; i < this.lrcData.length; i++) {
        if (time < this.lrcData[i].time) {
          //循环歌词数组，当播放器当前时间第一次小于歌词时间时当前数组下标减一即为当前时间数组所对应歌词下标
          this.lrcTime = this.lrcData[i].time - this.lrcData[i - 1].time;
          this.dataWords = this.lrcData[i - 1].words;
          this.lrcindex=i;
          this.ulstyle.transform=`translateY(${165 - (30 * (i + 1))}px)`;
          return i - 1;
        }
      }
    },
  },
  watch: {
    dataWords() {
      this.className = "text";
      setTimeout(() => {
        this.className = "text load";
      }, 50);
    },
  },
  mounted() {
    axios.get("/music/getAll").then(res=>{
      this.LRC=res.data[0].lyrics
      this.formatLrc()
      this.music="http://localhost:8080/"+ res.data[0].fileUrl
    })
    
  },
};
</script> 
<style scoped>
*{
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
  background: #7e7e7e -webkit-linear-gradient(left, #76ca16, #0fa046) no-repeat 0 0;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-size: 0 100%;
}
.load {
  background-size: 100% 100%;
  animation: scan linear;
}
.lyric{
  overflow: hidden;
}
ul{
  list-style: none;
  height: 330px;
}
li{
  height: 30px;
}
</style>