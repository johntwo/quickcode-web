<template>
  <el-drawer
    title="详情"
    :visible.sync="visibleDialog"
    direction="rtl"
    custom-class="demo-drawer"
  >
    <el-form ref="form" :model="formData" disabled label-width="80px">
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
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import { getTree } from '@/api/auth'

export default {
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
    }
  }
}
</script>

<style scoped>

</style>
