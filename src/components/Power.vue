<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--权限列表区域 -->
      <el-table :data="powersList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="权限名称" prop="powerName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.powerLevel === 1"
              >一级</el-tag
            >
            <el-tag v-if="scope.row.powerLevel === 2" type="success"
              >二级</el-tag
            >
            <el-tag v-if="scope.row.powerLevel === 3" type="warning"
              >三级</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { powers, total } from '../assets/config/powers.js'
export default {
  data() {
    return {
      // 权限列表
      powersList: [],
      // 权限总数
      total: 0
    }
  },
  created() {
    window.sessionStorage.setItem('powers', JSON.stringify(powers))
    window.sessionStorage.setItem('powersTotal', total)
    this.getPowersList()
  },
  methods: {
    getPowersList() {
      const powersList = JSON.parse(window.sessionStorage.getItem('powers'))
      const total = Number(window.sessionStorage.getItem('powersTotal'))
      this.powersList = powersList
      this.total = total
    }
  }
}
</script>

<style lang="less" scoped></style>
