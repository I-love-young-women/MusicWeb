<template>
<div class="layout">
  <div class="left" :style="{width:isCollapse?'80px':'200px'}">
    <h2><img src="../assets/qingya_logo.png" alt="" /><span v-show="!isCollapse"></span></h2>
    <div class="user">
      <div class="img">
        <img src="https://img0.baidu.com/it/u=494257227,1085354721&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt=""/>
      </div>
      <div class="username" v-show="!isCollapse">Welcome，<br/>admin</div>
    </div>
    <el-menu
      router
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      background-color="#2b4054"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/mlayout/userlist">用户列表</el-menu-item>
        <el-menu-item index="/mlayout/adduser">添加管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>歌曲管理</span>
        </template>
        <el-menu-item index="/mlayout/musiclist">歌曲列表</el-menu-item>
        <el-menu-item index="/mlayout/addmusic">添加歌曲</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
  <div class="right">
    <div class="header">
      <div class="expand">
        <i class="el-icon-s-unfold" v-if="isCollapse" @click="isCollapse=false"></i>
        <i class="el-icon-s-fold" v-else @click="isCollapse=true"></i>
      </div>
      <div class="admin">
        <el-menu
          router
          mode="horizontal"
          class="el-menu-vertical-demo"
          background-color="#eeeeed"
          text-color="#333"
          active-text-color="#2b4054">
          <el-menu-item index="/layout"><i class="el-icon-s-home"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <img src="https://img0.baidu.com/it/u=494257227,1085354721&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="">
              <span>&nbsp;admin</span>
            </template>
            <el-menu-item @click="exit">退出系统</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      // 菜单是否折叠
      isCollapse: false
    }
  },
  methods:{
    exit(){
      if(confirm('确定退出吗？')){
        this.$router.push('/')
      }
    }  
  }
}
</script>
<style scoped lang='scss'>
.layout{
  width: 100vw;
  height: 100vh;
  display: flex;
  .left{
    flex-shrink: 0;
    background-color: #2b4054;
    color: white;
    h2{
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      font-weight: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    .user{
      display: flex;
      padding: 10px 0;
      .img{
        padding-left: 10px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-bottom: 5px;
        }
      }
      .username{
        margin-left: 10px;
        padding-top: 5px;
      }
    }
    .el-menu{
      border-right: none;
    }
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction: column;
    .header{
      height: 60px;
      background-color: #eeeeed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .expand{
        color: #2b4054;
        padding-left: 10px;
        i{
          font-size: 24px;
        }
      }
      .admin{
        img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        padding-right: 20px;
      }
    }
    .content{
      flex: 1;
      overflow: auto;
      padding: 10px;
      background-color: #f7f7f7;
    }
  }
}
</style>