<template>
    <div class="left">
    <el-table :data="obj.list">
      <el-table-column prop="musicId" label="编号" width="100">
        <template #default="{ $index }">
  <el-icon @click="play(obj.list[$index])" style="font-size: 25px;" class="hover-icon">
    <component
      :is="
        obj.list[$index].musicId === obj.playing
          ? 'VideoPause'
          : 'VideoPlay'
      "
    />
  </el-icon>
</template>
      </el-table-column>
      <el-table-column prop="title" label="歌曲" width="400"></el-table-column>
    
      <el-table-column prop="artist" label="作者" width="180"></el-table-column>
      <el-table-column prop="album" label="专辑" width="200"></el-table-column>
      <el-table-column prop="id" label="操作" width="130">
        <template #default="{ $index }">
          <el-dropdown size="small" split-button type="primary">...<template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="rmList(obj.list[$index].musicId)">移出我的歌单</el-dropdown-item>
        <el-dropdown-item >下载</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
 
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "../hooks/request";
import bus from "../Bus/EventBus.js";

const route=useRoute();

const obj=reactive({
    list:[],
    playing:1,
    playlist:{}
})

function play(i) {
  obj.playing = i.musicId;
  bus.emit("changeMusic", i);
}
onMounted(()=>{
    let pId =route.query.id
    if(pId){
        getList(pId)
    }
    
})

function getList(id){
    axios.
        get("/playlists/getOne?id=" + id)
    .then((res) => {
        obj.playlist=res.data.data
      obj.list = res.data.data.list;
      bus.emit("changeList", obj.list);
      obj.playing=obj.list[0].musicId
    });
}

function rmList(id){
    axios.delete("/user-playlist/dMusic/"+obj.playlist.playlistId+"/"+id).then(res=>{
        alert(res.data.msg)
        getList(obj.playlist.playlistId)
    })
}
</script>

<style lang="scss" scoped>

</style>