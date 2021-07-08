<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>模板管理</el-breadcrumb-item>
      <el-breadcrumb-item>模板分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加分类按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addModule">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <tree-table
        :data="modulesList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.module_deleted === false"
            style="color:#409eff"
          ></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.module_level === 0" size="mini">一级</el-tag>
          <el-tag type="success" v-if="scope.row.module_level === 1" size="mini"
            >二级</el-tag
          >
          <el-tag type="warning" v-if="scope.row.module_level === 2" size="mini"
            >三级</el-tag
          >
        </template>
        <!-- 操作 -->
        <template slot="opt">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="isDelete"
            >删除</el-button
          >
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="resetFrom"
    >
      <el-form
        :model="addModuleForm"
        :rules="addModuleFormRules"
        ref="addModuleForm"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="module_name">
          <el-input v-model="addModuleForm.module_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- option用来指定数据源 -->
          <!-- props用来指定配置对象 -->
          <el-cascader
            :key="isResouceShow"
            v-model="selectedKeys"
            :options="parentModuleList"
            :props="cascaderProps"
            @change="parentModuleChanged"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addModuleContent">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="editForm">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-switch
            v-model="editForm.value"
            active-color="#409eff"
            inactive-color="#dcdfe6"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { modules, total } from '../assets/config/modules.js'
export default {
  data() {
    return {
      // 查询条件
      queryInfo: {
        pagenum: 1,
        pagesize: 5
      },
      // 模板分类的数据列表
      modulesList: [],
      // 分类总数
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'module_name'
        },
        {
          label: '是否有效',
          // 表示当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'isok'
        },
        {
          label: '排序',
          // 表示当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'order'
        },
        {
          label: '操作',
          // 表示当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'opt'
        }
      ],
      // 添加分类对话框控制变量
      addDialogVisible: false,
      // 添加分类的表单数据对象
      addModuleForm: {
        // 将要添加的分类的名称
        module_name: '',
        // 父级分类的ID
        module_pid: 0,
        // 分类的等级，默认要添加的是一级分类
        module_level: 0
      },
      // 添加分类表单的验证规则对象
      addModuleFormRules: {
        module_name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }
        ]
      },
      // 父级分类列表
      parentModuleList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        checkStrictly: 'true',
        value: 'module_id',
        label: 'module_name',
        children: 'children'
      },
      // 选中父级分类的ID数组
      selectedKeys: [],
      isResouceShow: 0,
      // 编辑分类对话框控制变量
      editDialogVisible: false,
      // 编辑分类表单对象
      editForm: {
        name: '',
        state: ''
      }
    }
  },
  created() {
    window.sessionStorage.setItem('modules', JSON.stringify(modules))
    window.sessionStorage.setItem('modulesTotal', total)
    this.getModulesList()
    this.getPidData()
  },
  methods: {
    // 获取模板列表数据
    getModulesList() {
      const modulesList = JSON.parse(window.sessionStorage.getItem('modules'))
      const total = Number(window.sessionStorage.getItem('modulesTotal'))
      this.total = total
      // 根据页码和页大小获取当前可视列表数据
      this.modulesList = []
      const indexBegin = (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
      const indexFinal = this.queryInfo.pagenum * this.queryInfo.pagesize
      for (let i = 0; i < total; i++) {
        if (i >= indexBegin && i < indexFinal) {
          this.modulesList.push(modulesList[i])
        } else {
          continue
        }
      }
      this.total = total
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getModulesList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getModulesList()
    },
    // 添加分类
    addModule() {
      this.addDialogVisible = true
    },
    // 获取父级分类的数据
    getPidData() {
      const modulesList = JSON.parse(window.sessionStorage.getItem('modules'))
      for (let i = 0; i < modulesList.length; i++) {
        if (modulesList[i].children) {
          for (let j = 0; j < modulesList[i].children.length; j++) {
            if (modulesList[i].children[j].children) {
              delete modulesList[i].children[j].children
            }
          }
        }
      }
      this.parentModuleList = modulesList
    },
    // 选择项发生变化出发这个函数
    parentModuleChanged() {
      console.log(this.selectedKeys)
    },
    // 关闭对话框，重置表单
    resetFrom() {
      this.$refs.addModuleForm.resetFields()
      this.selectedKeys = ''
    },
    // 添加模板
    addModuleContent() {
      const modulesList = JSON.parse(window.sessionStorage.getItem('modules'))
      var total = Number(window.sessionStorage.getItem('modulesTotal'))
      // 添加一级分类
      if (this.addModuleForm.module_name && this.selectedKeys.length === 0) {
        this.isResouceShow++
        const newModule = {
          module_id: Math.ceil(Math.random() * 1000) + 60,
          module_name: this.addModuleForm.module_name,
          module_level: 0,
          module_pid: -1,
          module_deleted: false,
          children: []
        }
        modulesList.push(newModule)
        total++
      } else if (
        this.addModuleForm.module_name &&
        this.selectedKeys.length === 1
      ) {
        // 添加二级分类
        // 根据父级id查找插入位置
        this.isResouceShow++
        for (let i = 0; i < modulesList.length; i++) {
          if (modulesList[i].module_id === this.selectedKeys[0]) {
            const newModule = {
              module_id: Math.ceil(Math.random() * 1000) + 60,
              module_name: this.addModuleForm.module_name,
              module_level: 1,
              module_pid: this.selectedKeys[0],
              module_deleted: false,
              children: []
            }
            modulesList[i].children.push(newModule)
          }
        }
      } else if (
        this.addModuleForm.module_name &&
        this.selectedKeys.length === 2
      ) {
        // 添加三级分类
        // 根据父级id查找插入位置
        this.isResouceShow++
        for (let i = 0; i < modulesList.length; i++) {
          if (modulesList[i].module_id === this.selectedKeys[0]) {
            for (let j = 0; j < modulesList[i].children.length; j++) {
              if (
                modulesList[i].children[j].module_id === this.selectedKeys[1]
              ) {
                const newModule = {
                  module_id: Math.ceil(Math.random() * 1000) + 60,
                  module_name: this.addModuleForm.module_name,
                  module_level: 2,
                  module_pid: this.selectedKeys[1],
                  module_deleted: false
                }
                modulesList[i].children[j].children.push(newModule)
              }
            }
          }
        }
      }
      window.sessionStorage.setItem('modules', JSON.stringify(modulesList))
      window.sessionStorage.setItem('modulesTotal', total)
      this.getModulesList()
      this.getPidData()
      this.addDialogVisible = false
      console.log(modulesList)
    },
    // 弹出编辑框
    showEditDialog() {
      this.editDialogVisible = true
    },
    // 是否删除分类
    isDelete() {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.zk-table {
  margin-top: 15px;
}

.el-cascader {
  width: 100%;
}
</style>
