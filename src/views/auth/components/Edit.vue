<template>
  <el-dialog
    :title="formData.id ? '编辑' :'新增'"
    :visible.sync="visibleDialog"
    :close-on-click-modal="false"
    @open="getTree"
  >
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-tree
          ref="authTree"
          :data="authTree"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          node-key="code"
          :default-checked-keys="formData.rules"
          @check-change="handleTreeChange"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleDialog=false">取消</el-button>
      <el-button type="primary" :loading="confirmLoading" @click="submit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTree } from '@/api/auth'
import * as mainService from '@/api/role'
import { Message } from 'element-ui'

export default {
  name: 'Edit',
  props: {
    row: {
      type: Object,
      default() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {},
      authTree: [],
      defaultProps: {
        children: 'children',
        label: 'comment'
      },
      confirmLoading: false
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    row(val) {
      this.formData = Object.assign({}, val)
    }

  },
  mounted() {
    this.getTree()
  },
  methods: {
    /**
     * 获取权限树
     */
    getTree() {
      getTree().then(res => {
        this.authTree = res.data
      })
    },
    /**
     * 树的选择项修改
     */
    handleTreeChange() {
      this.formData.rules = this.$refs['authTree'].getCheckedKeys()
    },
    /**
     * 提交修改
     */
    submit() {
      this.confirmLoading = true
      const api = this.formData.id ? mainService.update(this.formData) : mainService.add(this.formData)
      api.then(res => {
        this.confirmLoading = false
        this.visibleDialog = false
        this.$emit('confirm')
        Message({
          message: res.message,
          type: 'success'
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
