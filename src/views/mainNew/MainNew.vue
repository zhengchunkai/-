<template>
  <div class="main-container">
    <el-container>
      <!-- 左侧树形菜单 -->
      <el-aside width="200px">
        <el-tree :data="menuList" :props="renameProps"> </el-tree>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 标题 -->
          <div class="header-title">XX电商后台管理系统</div>
          <!-- 操作区域，可以显示头像，可以退出 -->
          <div class="header-operate">
            <el-button type="primary" size="mini" round @click="exit"
              >退出</el-button
            >
          </div>
        </el-header>
        <el-main>
          <!-- main左侧的菜单点击，只有这个区域发生变化，这就是嵌套路由 -->
          <router-view />
        </el-main>
        <el-footer>底部说明</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    return {
      menuList: [],
      renameProps: {
        label: 'authName'
      }
    }
  },
  // 页面在初始化的时候，此时我们准备好数据，一会儿可以在mounted中直接渲染
  created () {
    this.loadMenus()
  },
  methods: {
    // 页面加载读取所有的菜单数据
    async loadMenus () {
      var { data } = await this.$http.get('menus')
      console.log('菜单列表：', data)

      this.menuList = data.data
    },
    exit () {
      localStorage.removeItem('userInfo')
      this.$msg({
        message: '退出登录成功!',
        type: 'success'
      })

      // 跳转到登录界面
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  .header-title {
    flex-grow: 1;
  }
  .header-operate {
  }
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
// 左侧菜单的样式
.el-aside {
  color: #333;
  text-align: center;
  height: 100vh;
  padding: 50px 20px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-tree-node__content {
  height: 60px;
}
</style>
