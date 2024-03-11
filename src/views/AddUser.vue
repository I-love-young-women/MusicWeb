<template>
<div class="add">
  <div class="title">添加用户</div>
  <div class="content">
    <el-form size="mini"
        :model="user"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
      <el-form-item label="账号" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="user.password2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="type">
        <el-select v-model="user.type" placeholder="请选择用户类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="就诊科室" prop="type">
        <el-select v-model="user.type" placeholder="请选择就诊科室">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户头像" prop="img">
        <el-input type="password" v-model="user.img" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="$router.push('/layout/userlist')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
export default {
  data() {
    // 验证账号
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      }else{
        callback();
      }
    }
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    }
    return {
      // 登录账户
      user: {
        // 账号
        username:"",
        name:"",
        // 密码
        password: "",
        password2:"",
        type:"",
        img:""
      },
      // 验证
      rules: {
        username: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
      // 类型
      options: [
        {
          value: "1",
          label: "管理员",
        },
        {
          value: "2",
          label: "医生",
        },
        {
          value: "3",
          label: "挂号员",
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 执行添加操作
        } else {
          return false;
        }
      });
    },
  },
}
</script>
<style scoped lang='scss'>
.add{
  .title {
    font-size: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .content{
    width: 50%;
  }
}
</style>