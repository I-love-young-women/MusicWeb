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

    
      <el-table-column prop="artist" label="作者" width="180"></el-table-column>
      <el-table-column prop="album" label="专辑" width="200"></el-table-column>
      <el-table-column prop="id" label="操作" width="130">
        <template #default="{ $index }">
          <el-dropdown size="small" split-button type="primary">...<template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="add(obj.pageInfo.list[$index])">添加到播放列表</el-dropdown-item>
        <el-dropdown-item @click="addList(obj.pageInfo.list[$index].musicId)">添加到我的歌单</el-dropdown-item>
        <el-dropdown-item @click="down(obj.pageInfo.list[$index].fileUrl)">下载</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
        </template>
      </el-table-column>
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

    <div>
      <el-drawer v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">我的歌单!</h4>
      <el-button  @click="close">
        <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        Close
      </el-button>
    </template>
    <div class="demo-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="item.title" name="1" v-for="item,index in obj.list" :key="item.playlistId">
        <ul  class="infinite-list" style="overflow: auto">
           <li v-for="i in item.list" :key="i" class="infinite-list-item">{{ i.title }}</li>
        </ul>
        <el-button @click="addMusic(index)">添加到这</el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
  </el-drawer>
    </div>
 
  </div>
</template>

<script setup>
import { onMounted, reactive,ref } from "vue";
import axios from "../hooks/request";
import bus from "../Bus/EventBus.js";
import { ElButton, ElDrawer } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'

const visible = ref(false)

const obj = reactive({
  musics: "",
  musicUrl: "",
  pageInfo: {},
  playing: "",
  user:{},
  list:[],
  what:-1
});

function down(i){
  console.log(i);
    // 发送get请求
    axios
    .get('/music/downloadFile', {
        params: {
            // 向后端传入下载路径
            file: i,
        }
    })
    .then(res => {
        // alert("请求成功");
        console.log(res.data); // 获取服务端提供的数据
        let blob = new Blob([res.data])
        let contentDisposition = res.headers['Content-Type: text/plain; charset=UTF-8']
        let pattern = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
        let result = pattern.exec(contentDisposition)
        // 使用decodeURI对名字进行解码
        let fileName = decodeURI(result[1])
        let downloadElement = document.createElement('a')
        // 创建下载的链接
        let href = window.URL.createObjectURL(blob)
        downloadElement.style.display = 'none'
        downloadElement.href = href
        // 下载后文件名
        downloadElement.download = fileName
        document.body.appendChild(downloadElement)
        // 点击下载
        downloadElement.click()
        // 下载完成移除元素
        document.body.removeChild(downloadElement)
        // 释放掉blob对象
        window.URL.revokeObjectURL(href)
    })
    .catch(() => {
        alert("请求出错");
    })
    // alert(url);
}
function addList(a){
  obj.what=a
  visible.value = true
  getList()
}


const getPage = (page) => {
  axios.get("/music/getAll/" + page + "/8").then((res) => {
    obj.pageInfo = res.data.data;
  });
};
function getOne(){
  let user = JSON.parse(sessionStorage.getItem("user"))
  obj.user=user
  console.log(obj.user+"11");
}
// function addList(index){
//   console.log(index);
// }
onMounted(() => {
  getPage(1);
  getOne();
});

function getList(){
  axios.get("/playlists/getList?id="+sessionStorage.getItem("userId")).then(res=>{
    obj.list=res.data.data
  })
}

function addMusic(a){
  const arr=obj.list[a];
  if (arr.list.findIndex(a => a.musicId === obj.what)>-1) {
    alert("已收藏");
}else{
axios.post("/user-playlist/addList",{playlistId:arr.playlistId,musicId:obj.what}).then(res=>{
    alert(res.data.msg)
    getList()
  })
}
    

  
}
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
