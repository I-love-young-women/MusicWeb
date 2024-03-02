<template>
  <div class="left">
    <el-table  :data="obj.pageInfo.list" >
      <el-table-column prop="id" label="编号" width="100"> 
        <template #default="{ $index }">
          <el-button @click="play(obj.pageInfo.list[$index])">播放</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="歌曲" width="700"> 
      </el-table-column>
      <el-table-column
        prop="artist"
        label="作者"
        width="180"
      ></el-table-column>
      <el-table-column prop="album" label="专辑" width="150"></el-table-column>
    </el-table>
    <div class="nav_down">
      <el-pagination
  @current-change="handlePageChange"
  :current-page="obj.pageInfo.pageNum"
  :page-size="obj.pageInfo.pageSize"
  :total="obj.pageInfo.total"
  layout="prev, pager, next"
></el-pagination>

    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "../hooks/request";
import bus from '../Bus/EventBus.js';

const obj = reactive({
  musics: "",
  musicUrl: "",
  pageInfo:{}
});



const getPage = (page) => {
  axios.get("/music/getAll/" + page + "/7").then((res) => {
    obj.pageInfo = res.data.data;
  });
};

onMounted(() => {
  getPage(1)
});


function handlePageChange(page) {
  getPage(page);
}

function play(i) {
  bus.emit("play", (i));
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
}
.left{
  height: 60vh;
  position: relative;
}
.nav_down{
  position: absolute;
  top: 60vh;
}
</style>
