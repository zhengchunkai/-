<template>
  <div class="menu2-container">
    <div class="menu2-left">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        active-text-color="#F00"
        default-active="110"
        :unique-opened="uniqueOpened"
        :router = "enableRouter"
      >
        <router-link to="/welcome">首页</router-link>
        <!-- 一个完整的一级菜单及子菜单 -->
        <el-submenu :index="menu.id + ''" v-for="menu in menuList" :key="menu.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ menu.authName }}{{ menu.id }}</span>
          </template>
          <!-- 子菜单列表 -->
          <el-menu-item-group>
            <el-menu-item
              :index="submenu.path + ''"
              v-for="submenu in menu.children"
              :key="submenu.id"
              >{{ submenu.authName }}{{ submenu.id }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
     </div>
     <!-- 右侧内容区域 -->
     <div class="menu2-right">
       <!-- 顶部功能区 -->
       <div class="right-box-top">
         <div class="title-left" @click="menuOpenOrClose">
           <i class="el-icon-s-fold"></i>
         </div>
         <div class="title-text">我是标题</div>
         <div class="title-operation" @click="exit">退出</div>
       </div>
       <!-- 嵌套路由显示区域 -->
       <div class="right-box-content">
         <router-view></router-view>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 存储一级菜单和二级菜单的数据的
      menuList: [],
      // 菜单可以变窄，true就是只显示图片，文字折叠
      isCollapse: false,
      // 让每个菜单都互斥，你打开，我就关闭
      uniqueOpened: true,
      enableRouter: true
    }
  },
  created () {
    // 创建main2页面，立即获取左侧菜单数据
    this.loadMenus()
  },
  methods: {
    // 退出登录
    exit () {
      localStorage.removeItem('userInfo')
      this.$router.push('/')
    },
    // 点击顶部菜单控制图标
    menuOpenOrClose () {
      this.isCollapse = !this.isCollapse
    },
    async loadMenus () {
      var { data } = await this.$http.get('menus')
      console.log('菜单列表：', data)

      this.menuList = data.data
    }
  }
}
</script>

<style lang="less">
.menu2-container {
   display: flex;
  .menu2-left {
    border-right: 5px solid #ccc;
    height: 100vh;
  }
  .menu2-right {
    display: flex;
    flex-direction: column;
    width: 100%;
    .right-box-top {
      background-color: rgb(185, 175, 175);
      height: 80px;
      text-align: center;
      line-height: 80px;
      width: 100%;
      display: flex;

      // 顶部标题样式
      .title-left {
        width: 100px;
        font-size: 30px;
      }
      .title-text {
        flex-grow: 1;
      }
      .title-operation {
        width: 100px;
      }
    }
    .right-box-content {
      flex-grow: 1;
    }
  }
}
</style>
