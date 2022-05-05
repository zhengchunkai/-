<template>
  <div class="login-container">
    <!-- 居中的登录表单 -->
     <div class="login-form-box">
       <el-form ref="loginForm" :rules="loginRules" :model="loginUser">
        <!-- 登录表单的标题 -->
        <div class="login-box-title">
          电商后台管理
        </div>

        <!-- 账号，密码输入框 -->
        <div class="login-box-input">
          <!-- ref是vue给我们提供的一种快速获取dom对象的方式 -->
          <el-form-item prop="username">
            <el-input placeholder="请输入账号" :clearable="clearable" v-model="loginUser.username">
              <i slot="prefix" class="iconfont icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="loginUser.password" type="password" :show-password="showPassword">
              <i slot="prefix"  class="iconfont icon-3702mima"></i>
            </el-input>
          </el-form-item>
        </div>
        <!-- 登录按钮区域 -->
        <div class="login-box-opera">
          <el-form-item>
              <el-button type="primary" style="width:100%" @click="login('loginForm')">立即创建</el-button>
            </el-form-item>
            </div>
       </el-form>
     </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      // 允许账号信息快速清空
      clearable: true,
      // 密码框可以明文和密文切换
      showPassword: true,
      loginUser: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginAjax()
        }
      })
    },
    async loginAjax () {
      // 发送ajax调用登录接口
      // axios#post(url[, data[, config]])
      var { data } = await this.$http.post('login', this.loginUser)
      console.log('登录结果：', data)

      if (data.meta.status === 200) {
        this.$msg({
          message: '登录成功!',
          type: 'success'
        })

        // 登录成功，服务器还返回了我们的个人信息以及token信息
        // 个人信息是需要展示到登录成功的首页的
        // token是登录成功后请求其他接口需要使用的
        // 把服务器返回的数据持久化到浏览器中
        localStorage.setItem('userInfo', JSON.stringify(data.data))

        // 跳转到首页  /main
        this.$router.push('/main2')
      } else {
        this.$msg.error('账号或密码错误')
      }
    }
  }
}
</script>

<style lang="less">
.login-container {
  height: 100%;
  position: relative;
  background: url(../../assets/bg.jpg);
  background-size: 100% 100%;

  // 登录表单的样式
  .login-form-box {
    width: 400px;
    height: 362px;
    box-shadow: 0px 5px 10px rgb(0,0,0,.3);
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    // 表单的标题
    .login-box-title {
      text-align: center;
      line-height: 100px;
    }

    // 账号和密码输入框盒子
    .login-box-input {
      padding: 0 20px;
    }

    // 控制登录按钮的左右间距
    .login-box-opera {
      padding: 20px 20px;
    }
  }
}
</style>
