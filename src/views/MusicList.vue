<template>
  <div class="list">
    <div class="search">
      <div class="title">Music信息管理</div>
      <!-- <div class="types">
        <span>就诊科室：</span>
        <el-select class="txt" size="mini" placeholder="请选择就诊科室">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>诊室名称：</span>
        <el-input class="txt" size="mini" placeholder="请输入诊室名称"></el-input>
        <span>门诊医师：</span>
        <el-input class="txt" size="mini" placeholder="请输入门诊医师"></el-input>
        <el-button class="btn" size="mini">搜索</el-button>
      </div> -->
    </div>
    <div class="content">
      <el-button size="mini" @click="$router.push('/mlayout/addmusic')">添加</el-button>
      <el-table size="mini" :data="obj.musics" style="width: 98%">
        <el-table-column prop="musicId" label="编号" width="100"> </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="artist" label="作者" width="120"></el-table-column>
        <el-table-column prop="album" label="专辑" width="120"></el-table-column>
        <el-table-column prop="fileUrl" label="路径" width="180"></el-table-column>
        <!-- <el-table-column prop="lyrics" label="歌词" width="100"></el-table-column> -->
        <el-table-column prop="createdAt" label="创建时间" width="120"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="change(scope)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import axios from "../hooks/request";
const obj = reactive({
  musics:""
})
function change(i){
console.log(i.row);
}
onMounted(()=>{
  axios.get("/music/getAll/1/100").then((res) => {
    obj.musics = res.data.data.list;
  });
})
</script>
<style scoped lang="scss">
.list {
  .search {
    background-color: white;
    padding: 10px;
    border: 1px solid #ddd;
    .title {
      font-size: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    .types {
      display: flex;
      align-items: center;
      .txt {
        width: 200px;
      }
      span {
        margin-left: 10px;
      }
      .btn {
        margin-left: 10px;
        background-color: #3979b8;
        color: white;
      }
    }
  }
  .content{
    background-color: white;
    padding: 10px;
    border: 1px solid #ddd;
    margin-top: 10px;
  }
}
</style>
