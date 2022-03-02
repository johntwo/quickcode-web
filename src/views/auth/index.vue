<template>
  <div class="app-container">
    <el-card>
      <div class="filter-container">
        <div class="filter-item">
          <el-input v-model="query.searchContent" placeholder="请输入搜索关键字" style="width: 200px;" @keyup.enter.native="getList" />
        </div>
        <div class="filter-item">
          <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
        </div>
      </div>
      <div class="table-content">
        <div class="table-operation-container">
          <div class="filter-item">
            <el-button v-permission="['role-add']" type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          </div>
        </div>
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          :header-row-class-name="'table-header'"
        >
          <el-table-column label="序号" prop="id" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.$index+1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="{row}">
              <span>{{ row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template slot-scope="{row}">
              <span>{{ row.update_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button v-permission="['role-details']" type="info" size="mini" @click="handleDetail(row)">详情</el-button>
              <el-button v-permission="['role-update']" type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
              <el-popconfirm
                v-permission="['role-delete']"
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="el-icon-info"
                title="是否确认删除该条记录？"
                style="margin-left: 10px;"
                @confirm="handleDelete(row)"
              >
                <el-button slot="reference" type="danger" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <pagination v-show="query.total>0" :total="query.total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />
    </el-card>
    <Edit
      :visible.sync="visibleSaveDialog"
      :row="rows"
      @confirm="getList"
    />
    <Detail
      :visible.sync="visibleDetilDialog"
      :row="rows"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Edit from '@/views/auth/components/Edit'
import * as mainService from '@/api/role'
import Detail from '@/views/auth/components/Detail'
import permission from '@/directive/permission'
export default {
  name: 'Index',
  components: { Detail, Edit, Pagination },
  directives: { permission },
  data() {
    return {
      list: [],
      listLoading: false,
      visibleSaveDialog: false,
      visibleDetilDialog: false,
      authTree: {},
      query: {
        total: 1,
        limit: 10,
        page: 1
      },
      defaultProps: {
        children: 'children',
        label: 'comment'
      },
      rows: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 新增
     */
    handleAdd() {
      this.rows = {}
      this.visibleSaveDialog = true
    },
    /**
     * 编辑
     */
    handleUpdate(row) {
      this.rows = Object.assign({}, row)
      this.visibleSaveDialog = true
    },
    /**
     * 详情
     */
    handleDetail(row) {
      this.rows = Object.assign({}, row)
      this.visibleDetilDialog = true
    },
    /**
     * 删除文件
     */
    handleDelete(row) {
      this.listLoading = true
      mainService.del({ id: row.id, uuid: row.uuid })
        .then(res => {
          this.$message.success('删除成功')
          this.listLoading = false
          this.getList()
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    /**
     * 列表
     */
    getList() {
      this.listLoading = true
      mainService.getList(this.query).then(res => {
        this.list = res.data.data
        this.query.total = res.data.total
        this.query.limit = res.data.per_page
        this.query.page = res.data.current_page
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
