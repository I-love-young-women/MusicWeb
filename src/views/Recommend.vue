<template>
  <div>
    <div class="demo-image">
      <div
        v-for="item in obj.list"
        :key="item.playlistId"
        class="block"
        style="cursor: pointer"
        @click="godetail(item.playlistId)"
      >
        <img :src="getCover(item)" style="width: 100%" />

        <el-dropdown @click.stop="">
          <el-button type="primary">
            {{ item.title }}<el-icon class="el-icon--right"
              ><arrow-down
            /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click='addMusicList(item)'>收藏歌单</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "../hooks/request";
import bus from "../Bus/EventBus.js";
import { ElMessage } from 'element-plus'

const obj = reactive({
  list: [],
});
onMounted(() => {
  getList();
});
function getList() {
  axios
    .get("playlists/getPList?id=" + sessionStorage.getItem("userId"))
    .then((res) => {
      obj.list = res.data.data;
    });
}
const router = useRouter();
function getCover(a) {
  if (a.coverImage) {
    return "http://localhost:8080/" + a.coverImage;
  }
  let cover1 = a.list[0]
    ? a.list[0].fileUrl.replace("music/", "img/").replace("mp3", "jpg")
    : "img/default.png";
  return "http://localhost:8080/" + cover1;
}

function godetail(id) {
  router.push({
    path: "/layout/detail",
    query: { id: id }, // 将参数以对象形式传递
  });
}

function addMusicList(item){
    item.userId=sessionStorage.getItem("userId");
    item.playlistId=null
    if(!item.playlistId){
        axios.post("/playlists/addList",item).then(res=>{
            ElMessage(res.data.msg)
            getList()
        })
    }
    
}
</script>
  
  <style lang="scss" scoped>
.demo-image .block {
  padding: 30px 20px;
  text-align: center;
  //   border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 12%;
  box-sizing: border-box;
  vertical-align: top;
  margin: 20px;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>