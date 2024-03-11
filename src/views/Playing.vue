<template>
  <div class="left">
    <el-table :data="obj.pageInfo.list">
      <el-table-column prop="id" label="编号" width="100">
        <template #default="{ $index }">
  <el-icon @click="play(obj.pageInfo.list[$index])" style="font-size: 25px;" class="hover-icon">
    <component
      :is="
        obj.pageInfo.list[$index].musicId === obj.playing
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
          <el-button @click="add(obj.pageInfo.list[$index])">+</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="artist" label="作者" width="180"></el-table-column>
      <el-table-column prop="album" label="专辑" width="200"></el-table-column>
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
import bus from "../Bus/EventBus.js";

const obj = reactive({
  musics: "",
  musicUrl: "",
  pageInfo: {},
  playing: "",
});

const getPage = (page) => {
  axios.get("/music/getAll/" + page + "/8").then((res) => {
    obj.pageInfo = res.data.data;
    console.log(obj.pageInfo);
  });
};

onMounted(() => {
  getPage(1);
});

function handlePageChange(page) {
  getPage(page);
}

function play(i) {
  obj.playing = i.musicId;
  bus.emit("changeMusic", i);
}

function getImageSrc(item) {
  return `img/${item.musicId === obj.playing ? "暂停" : "播放"}.png`;
}

function add(i) {
  bus.emit("addMusic", i);
}
</script>

<style lang="scss">
li {
  display: flex;
}
.left {
  height: 60vh;
  width: 70vw;
  position: relative;
}
.nav_down {
  position: absolute;
  top: 68vh;
}

.el-form-item {
  margin: 0 5px !important;
}

.el-table,
.el-table__expanded-cell {
  padding: 20px !important;
  background-color: transparent !important;
}

.el-table th {
  background-color: transparent !important;
  border-bottom: 1px solid #5078fc !important;
  text: rgb(201, 204, 207);
}

.el-table tr {
  background-color: transparent !important;
}

.el-pagination * {
  background-color: transparent !important;
  color: rgba(254, 254, 254, 1) !important;
}

.el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent !important;
  color: rgba(255, 255, 255, 0.7) !important;
  border: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.el-table th > .cell {
  color: rgba(254, 254, 254, 1) !important;
  font-weight: 700 !important;
}

.el-button {
  background-color: transparent !important;
}

.el-table::before {
  left: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 0px !important;
}

.el-form-item__label {
  color: white !important;
}

.hover-icon {
  // display: none;
  transition: color 0.3s; /* 添加过渡效果，使颜色变化更加平滑 */
}

// .hover-icon:hover {
//   color: white; /* 鼠标悬停时改变图标的颜色为白色 */
// }
// .el-table-column:hover .hover-icon{
//   display: inline-block !important;
// }
</style>
