
<template>
  <div class="left">
    <el-input
      v-model="obj.input"
      style="width: 60%; height: 40px;margin: 30px;"
      placeholder="Please input"
    >
    <template #prepend>
        <el-button :icon="Search" @click="search" />
      </template></el-input>

      <el-table :data="obj.musics">
      <el-table-column prop="id" label="编号" width="100">
        <template #default="{ $index }">
  <el-icon @click="play(obj.musics[$index])" style="font-size: 25px;" class="hover-icon">
    <component
      :is="
        obj.musics[$index].musicId === obj.playing
          ? 'VideoPause'
          : 'VideoPlay'
      "
    />
  </el-icon>
</template>
      </el-table-column>
      <el-table-column prop="title" label="歌曲" width="400"></el-table-column>
      <el-table-column prop="id" label="编号" width="130">
        <template #default="{ $index }">
          <el-button @click="add(obj.musics[$index])">+</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="artist" label="作者" width="180"></el-table-column>
      <el-table-column prop="album" label="专辑" width="200"></el-table-column>
    </el-table>

  </div>
</template>
  


    


<script setup>
import { reactive } from "vue";
import { Search } from '@element-plus/icons-vue'
import axios from "../hooks/request";
import bus from "../Bus/EventBus";


const obj=reactive({
    input:'',
    musics:[]
})
function search(){
    axios.get('/music/getMusic?name='+obj.input).then(res=>{
        console.log(res.data.data);
        obj.musics = res.data.data
    })
}

function play(i) {
  obj.playing = i.musicId;
//   console.log(i);
  bus.emit("changeMusic", i);
}



function add(i) {
  bus.emit("addMusic", i);
}

</script>

<style lang="scss" scoped>
.left{
    width: 70%;
}
</style>