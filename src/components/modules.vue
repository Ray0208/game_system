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
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="房间类型" name="first">
            <!-- 按钮区域 -->
            <el-row :gutter="20">
              <el-col :span="4">
                <el-input
                  placeholder="请输入内容"
                  v-model="addRoomStyle"
                  clearable
                >
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="addStyle">添加</el-button>
              </el-col>
            </el-row>
            <!-- 表格区域 -->
            <el-table :data="roomStyle" border style="width: 600px;">
              <el-table-column label="#" type="index"></el-table-column>
              <el-table-column label="房间类型">
                <template slot-scope="scope">
                  <div v-if="editFlag !== scope.row.id">
                    {{ scope.row.content }}
                  </div>
                  <div v-if="editFlag === scope.row.id">
                    <el-input
                      v-model="scope.row.content"
                      size="mini"
                      style="width: 220px;"
                    >
                      <template slot="append">
                        <el-button type="info" @click="confirmChangeStyle"
                          >确认</el-button
                        >
                      </template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
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
                      @click="editRoomStyle(scope.row.id)"
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
                      @click="deleteStyle(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="模板分类" name="second">
            <!-- 按钮区域 -->
            <el-row :gutter="20">
              <el-col :span="4">
                <el-input
                  placeholder="请输入内容"
                  v-model="addModuleStyle"
                  clearable
                >
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="addModule">添加</el-button>
              </el-col>
            </el-row>
            <!-- 表格区域 -->
            <el-table :data="moduleStyle" border style="width: 600px;">
              <el-table-column label="#" type="index"></el-table-column>
              <el-table-column label="模板类型">
                <template slot-scope="scope">
                  <div v-if="editFlag1 !== scope.row.id">
                    {{ scope.row.content }}
                  </div>
                  <div v-if="editFlag1 === scope.row.id">
                    <el-input
                      v-model="scope.row.content"
                      size="mini"
                      style="width: 220px;"
                    >
                      <template slot="append">
                        <el-button type="info" @click="confirmChangeModule"
                          >确认</el-button
                        >
                      </template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
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
                      @click="editModuleStyle(scope.row.id)"
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
                      @click="deleteModule(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="关键词" name="third">
            <!-- 选择框和添加按钮区域 -->
            <el-row :gutter="20">
              <el-col :span="2">
                <el-select
                  v-model="moduleValue"
                  filterable
                  placeholder="请选择"
                  @change="showKeyWordList()"
                >
                  <el-option
                    v-for="(item, i) in moduleStyle"
                    :key="i"
                    :value="item.content"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-input
                  placeholder="请输入内容"
                  v-model="queryInfo.query"
                  clearable
                  @clear="showKeyWordList"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="showKeyWordList"
                  ></el-button> </el-input
              ></el-col>
              <el-col :span="3">
                <el-button type="primary" @click="showAddDialog"
                  >添加关键词</el-button
                >
              </el-col>
            </el-row>
            <!-- 表格区域 -->
            <el-table :data="keyWordList" border style="width: 600px;">
              <el-table-column label="#" type="index"></el-table-column>
              <el-table-column label="关键词">
                <template slot-scope="scope">
                  <div v-if="editFlag2 !== scope.row.id">
                    {{ scope.row.content }}
                  </div>
                  <div v-if="editFlag2 === scope.row.id">
                    <el-input
                      v-model="scope.row.content"
                      size="mini"
                      style="width: 220px;"
                    >
                      <template slot="append">
                        <el-button type="info" @click="confirmChangeKeyWord"
                          >确认</el-button
                        >
                      </template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
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
                      @click="editKeyWord(scope.row.id)"
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
                      @click="deleteKeyWord(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
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
              :total="keyWordTotal"
            >
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-card>

    <!-- 添加关键词对话框 -->
    <el-dialog
      title="添加关键词"
      @close="addDialogClosed"
      :visible.sync="addDialogVisible"
      width="30%"
    >
      <el-form
        ref="addKeyWordRef"
        :rules="addKeyWordRules"
        :model="addKeyWordForm"
        label-width="80px"
      >
        <el-form-item label="模板类型" prop="moduleStyle">
          <template>
            <el-select
              v-model="addKeyWordForm.moduleStyle"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, i) in moduleStyle"
                :key="i"
                :value="item.content"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="关键词" prop="keyWord">
          <el-input v-model="addKeyWordForm.keyWord"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addKeyWord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roomStyle } from '../assets/config/roomStyle.js'
import { moduleStyle, keyWordTotal } from '../assets/config/moduleStyle.js'
export default {
  data() {
    return {
      // 标签页激活标志
      activeName: 'first',
      // 房间类型列表
      roomStyle: [],
      // 添加房间类型输入框绑定变量
      addRoomStyle: '',
      // 点击编辑的房间类型ID
      editFlag: '',
      // 模板类型列表
      moduleStyle: [],
      // 添加房间类型输入框绑定变量
      addModuleStyle: '',
      // 点击编辑的模板分类ID
      editFlag1: '',
      // 显示选择框的内容
      moduleValue: '',
      // 关键词列表
      keyWordList: [],
      // 点击编辑的关键词ID
      editFlag2: '',
      // 控制显示对话框变量
      addDialogVisible: false,
      // 添加关键词表单对象
      addKeyWordForm: {
        moduleStyle: '',
        keyWord: ''
      },
      // 添加关键词规则
      addKeyWordRules: {
        mopduleStyle: [
          { required: true, trigger: 'blur', message: '请选择模板类型' }
        ],
        keyWord: [
          { required: true, trigger: 'blur', message: '请输入关键词内容' }
        ]
      },
      // 获取关键词列表参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 关键词总数
      keyWordTotal: 0
    }
  },
  created() {
    this.roomStyle = roomStyle
    this.moduleStyle = moduleStyle
    this.keyWordTotal = keyWordTotal
    this.moduleValue = moduleStyle[0].content
  },
  methods: {
    // 控制标签页的切换
    handleClick(tab, event) {
      if (this.activeName === 'first') {
        this.roomStyle = roomStyle
      } else if (this.activeName === 'second') {
        this.moduleStyle = moduleStyle
      } else if (this.activeName === 'third') {
        this.moduleStyle = moduleStyle
        this.showKeyWordList()
      }
    },
    // 编辑房间类型
    editRoomStyle(id) {
      this.editFlag = id
    },
    // 确认修改房间类型
    confirmChangeStyle() {
      this.editFlag = ''
    },
    // 添加房间类型
    addStyle() {
      if (this.addRoomStyle) {
        const newStyle = {
          id: 5,
          content: this.addRoomStyle
        }
        this.roomStyle.push(newStyle)
      }
    },
    // 删除房间类型
    deleteStyle(id) {
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          for (let i = 0; i < this.roomStyle.length; i++) {
            if (this.roomStyle[i].id === id) {
              this.roomStyle.splice(i, 1)
            }
          }
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
    },
    // 添加模板类型
    addModule() {
      if (this.addModuleStyle) {
        const newStyle = {
          id: 5,
          content: this.addModuleStyle
        }
        this.moduleStyle.push(newStyle)
      }
    },
    // 确认修改模板类型
    confirmChangeModule() {
      this.editFlag1 = ''
    },
    // 编辑模板类型
    editModuleStyle(id) {
      this.editFlag1 = id
    },
    // 删除房间类型
    deleteModule(id) {
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          for (let i = 0; i < this.moduleStyle.length; i++) {
            if (this.moduleStyle[i].id === id) {
              this.moduleStyle.splice(i, 1)
            }
          }
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
    },
    // 显示关键词列表
    showKeyWordList() {
      for (let i = 0; i < this.moduleStyle.length; i++) {
        if (this.moduleStyle[i].content === this.moduleValue) {
          const keyWordList = this.moduleStyle[i].children
          if (!this.queryInfo.query) {
            this.keyWordList = []
            const indexBegin =
              (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
            const indexFinal = this.queryInfo.pagenum * this.queryInfo.pagesize
            for (let i = 0; i < keyWordTotal; i++) {
              if (i >= indexBegin && i < indexFinal) {
                this.keyWordList.push(keyWordList[i])
              } else {
                continue
              }
            }
          } else {
            // 搜索管理员
            const resultList = []
            for (let i = 0; i < keyWordTotal; i++) {
              if (keyWordList[i].content === this.queryInfo.query) {
                resultList.push(keyWordList[i])
              }
            }
            this.keyWordList = []
            const indexBegin =
              (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
            const indexFinal = this.queryInfo.pagenum * this.queryInfo.pagesize
            for (let i = 0; i < resultList.length; i++) {
              if (i >= indexBegin && i < indexFinal) {
                this.keyWordList.push(resultList[i])
              } else {
                continue
              }
            }
            this.keyWordTotal = resultList.length
          }
        }
      }
    },
    // 点击编辑关键词按钮
    editKeyWord(id) {
      this.editFlag2 = id
    },
    // 确认修改关键词
    confirmChangeKeyWord() {
      this.editFlag2 = ''
    },
    // 删除当前关键词
    deleteKeyWord(id) {
      this.$confirm('此操作将永久删除该关键词, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          for (let i = 0; i < this.keyWordList.length; i++) {
            if (this.keyWordList[i].id === id) {
              this.keyWordList.splice(i, 1)
            }
          }
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
    },
    // 显示添加关键词对话框
    showAddDialog() {
      this.addDialogVisible = true
    },
    // 关闭对话框重置表单
    addDialogClosed() {
      this.addKeyWordForm.moduleStyle = ''
      this.$refs.addKeyWordRef.resetFields()
    },
    // 添加关键词
    addKeyWord() {
      this.$refs.addKeyWordRef.validate(valid => {
        if (!valid) return
        // 发起添加关键词请求
        for (let i = 0; i < this.moduleStyle.length; i++) {
          if (this.moduleStyle[i].content === this.addKeyWordForm.moduleStyle) {
            const newKeyWord = {
              id: 100,
              parent_id: this.moduleStyle[i].id,
              content: this.addKeyWordForm.keyWord
            }
            this.moduleStyle[i].children.push(newKeyWord)
          }
        }
        this.addDialogVisible = false
        this.$message.success('添加关键词成功！')
        console.log(this.moduleStyle)
      })
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.showKeyWordList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.showKeyWordList()
    }
  }
}
</script>

<style lang="less" scoped></style>
