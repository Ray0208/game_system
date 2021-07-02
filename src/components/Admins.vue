<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
            @clear="getAdminsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getAdminsList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button
            v-if="role === '超级管理员'"
            type="primary"
            @click="showAddForm"
            >添加管理员</el-button
          >
          <el-button v-else type="primary" @click="showAddForm" disabled
            >添加管理员</el-button
          >
        </el-col>
      </el-row>

      <!-- 管理员列表区域 -->
      <el-table :data="adminsList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="登录名" prop="name"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="状态" prop="state">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="adminStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column v-if="role === '超级管理员'" label="操作">
          <template>
            <!-- 编辑 -->
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-tooltip>
            <!-- 权限分配 -->
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="权限">
          <template>
            <el-button type="primary" size="mini" plain>一级</el-button>
            <el-button type="success" size="mini" plain>二级</el-button>
          </template>
        </el-table-column>
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

    <!-- 添加管理员对话框 -->
    <el-dialog
      title="添加管理员"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="70px"
      >
        <el-form-item label="登录名" prop="adminName">
          <el-input v-model="addForm.adminName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { admins, total } from '../assets/config/admins.js'
export default {
  data() {
    // 验证密码的规则
    var checkPassword = (rule, value, cb) => {
      // 验证密码的正则表达式
      const regPassword = /^([A-Za-z0-9-_]{6,15})/
      if (regPassword.test(value)) {
        // 合法的密码
        return cb()
      }

      cb(new Error('密码只能包含数字、字母、下划线和横杆'))
    }

    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }
    return {
      // 登入的管理员身份
      role: '',
      // 管理员列表
      adminsList: [],
      // 获取管理员列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页码值
        pagenum: 1,
        // 当前每页显示的数据
        pagesize: 2
      },
      // 管理员总数
      total: 0,
      // 控制添加管理员对话框的显示和隐藏
      addDialogVisible: false,
      // 添加管理员的表单数据
      addForm: {
        adminName: '',
        password: '',
        email: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        adminName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          {
            min: 4,
            max: 10,
            message: '登录名长在4~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.role = window.sessionStorage.getItem('role')
    window.sessionStorage.setItem('admins', JSON.stringify(admins))
    window.sessionStorage.setItem('adminTotal', total)
    this.getAdminsList()
  },
  methods: {
    // 获取管理员列表
    getAdminsList() {
      const adminsList = JSON.parse(window.sessionStorage.getItem('admins'))
      const total = Number(window.sessionStorage.getItem('adminTotal'))
      if (!this.queryInfo.query) {
        // 根据页码和页大小获取当前可视列表数据
        this.adminsList = []
        const indexBegin =
          (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
        const indexFinal = this.queryInfo.pagenum * this.queryInfo.pagesize
        for (let i = 0; i < total; i++) {
          if (i >= indexBegin && i < indexFinal) {
            this.adminsList.push(adminsList[i])
          } else {
            continue
          }
        }
        this.total = total
      } else {
        // 搜索管理员
        const resultList = []
        for (let i = 0; i < total; i++) {
          if (adminsList[i].name === this.queryInfo.query) {
            resultList.push(adminsList[i])
          }
        }
        this.adminsList = []
        const indexBegin =
          (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
        const indexFinal = this.queryInfo.pagenum * this.queryInfo.pagesize
        for (let i = 0; i < resultList.length; i++) {
          if (i >= indexBegin && i < indexFinal) {
            this.adminsList.push(resultList[i])
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
      this.getAdminsList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getAdminsList()
    },
    // 管理员状态改变
    adminStateChanged(adminInfo) {
      console.log(adminInfo)
    },
    // 打开添加管理员对话框
    showAddForm() {
      this.addDialogVisible = true
    },
    // 关闭对话框重置表单
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加管理员
    addAdmin() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        // 发起添加管理员的请求
        const newAdmin = {
          ID: admins.length + 1 + '',
          name: this.addForm.adminName,
          password: this.addForm.password,
          email: this.addForm.email,
          role: '普通管理员',
          state: true
        }
        const adminsList = JSON.parse(window.sessionStorage.getItem('admins'))
        var total = Number(window.sessionStorage.getItem('adminTotal'))
        this.total = total + 1
        adminsList.push(newAdmin)
        window.sessionStorage.setItem('admins', JSON.stringify(adminsList))
        window.sessionStorage.setItem('adminTotal', this.total)
        this.getAdminsList()
        this.addDialogVisible = !this.addDialogVisible
      })
    }
  }
}
</script>

<style lang="less" scoped>
// .el-table{
//   /deep/ .cell{
//     font-size:12px
//   }
// }
</style>
