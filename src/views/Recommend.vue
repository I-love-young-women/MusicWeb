<template>
    <div class="left"    >
      <el-scrollbar >
        <el-table :data="obj.list"   > 
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
            <el-dropdown-item @click="rmList(obj.list[$index].musicId)">移出</el-dropdown-item>
            <el-dropdown-item @click="down(obj.list[$index].fileUrl)">下载</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="nav_down">
        
        </div>
      </el-scrollbar>
        </div>
    </template>
    
    <script setup>
    import { onMounted, reactive,ref } from "vue";
    import { useRoute } from "vue-router";
    import axios from "../hooks/request";
    import bus from "../Bus/EventBus.js";
    
    
    const count = ref()
    const load = () => {
      count.value += 2
    }
    const obj=reactive({
        list:[],
        playing:1,
        playlist:{}
    })
    function down(i) {
    console.log(i);

    // 发送get请求
    axios
    .get('/music/downloadFile', {
        params: {
            // 向后端传入下载路径
            file: i,
        },
        responseType: 'blob'
    })
    .then(response => {
        let blob = new Blob([response.data], { type: 'audio/mpeg' });

        // 创建下载链接并下载文件
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob);

        downloadElement.style.display = 'none';
        downloadElement.href = href;
        downloadElement.download = i; // 设置下载后的文件名

        document.body.appendChild(downloadElement);
        downloadElement.click();

        // 下载完成后清理操作
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
    })
    .catch(error => {
        console.error('下载出错：', error);
        alert("请求出错");
    });
}
    function play(i) {
      obj.playing = i.musicId;
      bus.emit("changeMusic", i);
    }
    onMounted(()=>{
        getList()
    })
    
    function getList(){
        axios.get("/history/getHis?id="+sessionStorage.getItem("userId")).then(res=>{
            obj.list=res.data
        })
    }
    function rmList(id){
        axios.delete("/history/delete/"+sessionStorage.getItem("userId")+"/"+id).then(res=>{
            alert(res.data.msg);
            getList()
        })
    }
    </script>
    
    <style lang="scss" scoped>
    // .infinite-list {
    //   height: 300px;
    //   padding: 0;
    //   margin: 0;
    //   list-style: none;
    // }
    // .infinite-list .infinite-list-item {
    //   // display: flex;
    //   // align-items: center;
    //   // justify-content: center;
    //   // height: 50px;
    //   // background: var(--el-color-primary-light-9);
    //   // margin: 10px;
    //   // color: var(--el-color-primary);
    // }
    // .infinite-list .infinite-list-item + .list-item {
    //   margin-top: 10px;
    // }
    </style>