<template>
  <div class="login_back">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/MPC-login.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form
        :model="loginForm"
        ref="loginFormRef"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-s-custom"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-mima"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="form_button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { admin, token } from '../assets/config/adminLogin.js'
export default {
  data() {
    return {
      // 表单数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在4到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 实现表单重置
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        // 表单校验成功
        if (valid) {
          // 账号密码校验成功
          if (
            this.loginForm.username === admin.username &&
            this.loginForm.password === admin.password
          ) {
            this.$message.success('登录成功！')
            window.sessionStorage.setItem('token', token)
            this.$router.push('/home')
          } else {
            this.$message.error('登录失败！')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_back {
  background-color: #007acc;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgb(247, 247, 247);
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.form_button {
  display: flex;
  justify-content: flex-end;
}
</style>
