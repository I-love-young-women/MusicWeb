<template>
    <div class="login-container">
      <div class="from">
        <h2>管理登录</h2>
        <input type="text" v-model="id" placeholder="id" required>
        <input type="password" v-model="pwd" placeholder="密码" required>
        <button @click="login">登录</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        id: "",
        pwd: ""
      };
    },
    methods: {
      login() {
        // 在这里可以添加登录逻辑，例如发送登录请求到后端验证
        // 登录成功后可以跳转到其他页面
        axios.get("http://localhost:8080/admins/login/?id="+this.id+"&pwd="+this.pwd).then(res=>{
            if(res.data.code===200){
                console.log(res.data);
                this.$router.push("m")
            }else{
                alert(res.data.msg);
            }
            
            // this.$router.push("home")
        })
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .form {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  input {
    width: 95%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  </style>
  