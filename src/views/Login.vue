<template>
  <div class="login-container">
    <div class="background-animation"></div>
    <div class="from">
      <h2>欢迎登录</h2>
      <input type="text" v-model="phoneNumber" placeholder="手机号" required />
      <input type="password" v-model="password" placeholder="密码" required />
      <button @click="login">登录</button>
      <router-link to="/sys">管理</router-link>
      <router-link to="/reg">注册</router-link>

    </div>
  </div>
</template>
  
  <script>
import axios from "../hooks/request";
export default {
  data() {
    return {
      phoneNumber: "",
      password: "",
    };
  },
  methods: {
    login() {
      // 在这里可以添加登录逻辑，例如发送登录请求到后端验证
      // 登录成功后可以跳转到其他页面
      axios
        .get("users/login/" + this.phoneNumber + "/" + this.password)
        .then((res) => {
          if (res.data.code === 200) {
            localStorage.setItem("token", res.data.data);
            this.$router.push("layout");
          }else{
            alert(res.data.msg)
          }
        });
    },
  },
};
</script>
  
<style scoped>
.login-container {
  background-color: rgba(65, 158, 240, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; /* 隐藏超出部分的内容 */
}

.background-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg') center/cover no-repeat;
  animation: backgroundSlide 1s linear forwards;
  transition: transform 2s ease; /* 添加过渡效果 */
}

@keyframes backgroundSlide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.from {
  margin-left: 50%; /* 或者其他你想要的距离值 */
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
