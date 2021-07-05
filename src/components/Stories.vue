<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>故事管理</el-breadcrumb-item>
      <el-breadcrumb-item>故事列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getStoriesList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getStoriesList"
            ></el-button> </el-input
        ></el-col>
      </el-row>

      <!-- 玩家列表区域 -->
      <el-table :data="storiesList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="故事名" prop="storyName"></el-table-column>
        <el-table-column label="mp3地址" prop="src"></el-table-column>
        <el-table-column label="合成时间" prop="createdTime"></el-table-column>
        <el-table-column label="玩家数" prop="usersNum"></el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { stories, total } from '../assets/config/stories.js'
export default {
  data() {
    return {
      // 故事列表
      storiesList: [],
      // 故事总数
      total: 0,
      // 获取故事列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页码值
        pagenum: 1,
        // 当前每页显示的数据
        pagesize: 2
      }
    }
  },
  created() {
    window.sessionStorage.setItem('stories', JSON.stringify(stories))
    window.sessionStorage.setItem('storyTotal', total)
    this.getStoriesList()
  },
  methods: {
    // 获取故事列表
    getStoriesList() {
      const storiesList = JSON.parse(window.sessionStorage.getItem('stories'))
      const total = Number(window.sessionStorage.getItem('storyTotal'))
      if (!this.queryInfo.query) {
        // 根据页码和页大小获取当前可视列表数据
        this.storiesList = []
        const indexBegin =
          (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
        const indexFinal = this.queryInfo.pagenum * this.queryInfo.pagesize
        for (let i = 0; i < total; i++) {
          if (i >= indexBegin && i < indexFinal) {
            this.storiesList.push(storiesList[i])
          } else {
            continue
          }
        }
        this.total = total
      } else {
        // 搜索用户
        const resultList = []
        for (let i = 0; i < total; i++) {
          if (storiesList[i].storyName === this.queryInfo.query) {
            resultList.push(storiesList[i])
          }
        }
        this.storiesList = []
        const indexBegin =
          (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
        const indexFinal = this.queryInfo.pagenum * this.queryInfo.pagesize
        for (let i = 0; i < resultList.length; i++) {
          if (i >= indexBegin && i < indexFinal) {
            this.storiesList.push(resultList[i])
          } else {
            continue
          }
        }
        this.total = resultList.length
      }
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getStoriesList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getStoriesList()
    }
  }
}
</script>

<style lang="less" scoped></style>
