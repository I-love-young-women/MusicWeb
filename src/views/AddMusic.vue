<template>
  <div class="add">
    <div class="title">添加音乐</div>
    <div class="content">
      <el-form size="mini"
          :model="obj.music"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
        <el-form-item label="专辑" prop="album">
          <el-input v-model="obj.music.album"></el-input>
        </el-form-item>
        <el-form-item label="歌曲名称" prop="title">
          <el-input v-model="obj.music.title"></el-input>
        </el-form-item>
        <el-form-item label="歌手" prop="artist">
          <el-input v-model="obj.music.artist"></el-input>
        </el-form-item>
        <!-- <el-form-item label="出诊时间" prop="visitDate">
          <el-input v-model="visit.visitDate"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="出诊时间段" prop="visitSlot">
          <el-radio v-model="visit.visitSlot" label="1">上午</el-radio>
          <el-radio v-model="visit.visitSlot" label="2">下午</el-radio>
        </el-form-item> -->
        <el-form-item label="歌词" prop="lyrics">
          <el-input v-model="obj.music.lyrics"></el-input>
        </el-form-item>
        <el-form-item label="文件路径" prop="fileUrl" @change="onFileChange">
          <el-input v-model="obj.music.fileUrl" type="file"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="uploadFile()">保存</el-button>
          <el-button @click="$router.push('/mlayout/musiclist')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </template>
  <script setup>
import { reactive } from "vue";
import axios from "axios";

const obj = reactive({
  music: {
    album: "",
    artist: "",
    title: "",
    fileUrl: null, // 修改为 null
    lyrics: ""
  }
});

const onFileChange = (event) => {
  obj.music.fileUrl = event.target.files[0];
};

function uploadFile() {
  const formData = new FormData();
  formData.append("file", obj.music.fileUrl); // 将文件添加到 FormData 中
  formData.append("album",obj.music.album)
  formData.append("artist",obj.music.artist)
  formData.append("title",obj.music.title)
  formData.append("lyrics",obj.music.lyrics)

  axios.post('http://localhost:8080/music/addMusic', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      console.log(2587785);
      this.$router.push("mlayout/musiclist")
    })
    .catch(error => {
      // 处理请求失败的逻辑
    });
}

  </script>
  <style scoped>

  .title {
      font-size: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    .content{
      width: 50%;
    }
  </style>