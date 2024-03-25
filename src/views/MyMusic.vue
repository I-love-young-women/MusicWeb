<template>
  <div>
    <div class="demo-image" >
      <div v-for="item in obj.list"
      :key="item.playlistId" class="block" style="cursor: pointer;" @click="godetail(item.playlistId)">
        <img :src="getCover(item)" style="width: 100%" />
        <el-dropdown @click.stop="">
          <el-button type="primary">
            {{ item.title }}<el-icon class="el-icon--right"
              ><arrow-down
            /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click='delList(item.playlistId)'>删除歌单</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="block" style="cursor: pointer;" >
        <img src="/img/添加.png" style="width: 100%" @click="dialog = true"/>
      </div>
    </div>
    
    <el-drawer
    ref="drawerRef"
    v-model="dialog"
    title="新建一个歌单"
    direction="ltr"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form :model="form" label-position="left" label-width="auto" >
        <el-input  placeholder="歌单名" v-model="form.title" autocomplete="off" />
      </el-form>
      <el-form-item  prop="delivery" style="color: black;">
        公开
        <el-switch v-model="form.public" />
      </el-form-item>
       <div class="demo-drawer__footer">
        <el-button @click="dialog=false">取消</el-button>
        <el-button class="create" type="primary"  @click="addList()">创建</el-button>
      </div>
    </div>
  </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, reactive,ref } from "vue";
import { useRouter } from "vue-router";
import axios from "../hooks/request";
import { ElMessage } from 'element-plus'
const dialog = ref(false)
const obj = reactive({
  list: [],
});

const form =reactive({
  playlistId:'',
  title:'',
  isPublic:0,
  userId:sessionStorage.getItem('userId')
})
onMounted(() => {
  getList();
});
function getList() {
  axios
    .get("/playlists/getList?id=" + sessionStorage.getItem("userId"))
    .then((res) => {
      obj.list = res.data.data;
    });
}
const router = useRouter();
function getCover(a) {
    if(a.coverImage){
        return "http://localhost:8080/"+a.coverImage
    }
    let cover1 = a.list[0]
    ? a.list[0].fileUrl.replace("music/", "img/").replace("mp3", "jpg")
    : "img/default.png";
  return "http://localhost:8080/" + cover1;
}

function godetail(id) {
    router.push({
        path: '/layout/detail',
        query: { id: id }, // 将参数以对象形式传递
    });
}

function addList(){
  axios.post("/playlists/addList",form).then(res=>{
    alert(res.data.msg)
    form.title=null;
    form.isPublic=false;
    form.userId=sessionStorage.getItem('userId')
  })

}

function delList(id){
  axios.delete("/playlists/delete/"+id).then(res=>{
    ElMessage(res.data.msg);
    getList();
  })

}
</script>

<style lang="scss" scoped>

.demo-image{
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
  width: 75%;
}
.demo-image .block {

  padding: 30px 20px;
  text-align: center;

  display: inline-block;
  width:180px;
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
.demo-drawer__footer{
  margin: 20px 0;
}
.el-form{
  color: black !important;
  margin: 20px 0;
}
.create{
  color: gray !important;
}
.el-form-item{
  margin:  20px 0;
}

.el-switch .el-switch__label {
  color: black !important;
}
</style>