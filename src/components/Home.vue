<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header height="70px">
      <div>
        <img src="../assets/MPC-login.png" alt="" />
        <span>一起玩游戏</span>
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.childName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 中心主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menuList } from '../assets/config/homeMenu.js'
export default {
  data() {
    return {
      // 菜单栏数据
      MenuList: [],
      // 菜单栏图标
      iconObj: {
        0: 'iconfont icon-user-group',
        1: 'iconfont icon-quanxian',
        2: 'iconfont icon-xiazaimoban',
        3: 'iconfont icon--luyinguanli'
      },
      // 菜单栏折叠状态
      isCollapse: false,
      // 路由跳转时，菜单栏的激活状态
      activePath: ''
    }
  },
  created() {
    this.menuList = menuList
    this.activePath = window.sessionStorage.getItem('path')
  },
  methods: {
    // 登出
    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 菜单栏的展开与折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保持路由跳转时菜单选项的激活状态一致
    saveNavState(activePath) {
      window.sessionStorage.setItem('path', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  padding-left: 10px;
  > div {
    display: flex;
    align-items: center;
    span:nth-child(2) {
      margin-left: 15px;
      font-size: 30px;
      font-weight: 600;
    }
    span:nth-child(3) {
      margin-left: 5px;
      margin-top: 10px;
    }
  }
  img {
    width: 60px;
    height: 45px;
    border-radius: 50%;
    background-color: #fff;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 15px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>
