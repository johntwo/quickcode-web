<template>
  <el-drawer
    title="详情"
    :visible.sync="visibleDialog"
    direction="rtl"
    custom-class="demo-drawer"
  >
    <el-form ref="form" :model="formData" disabled label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="formData.phone" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="formData.sex" label="1">男</el-radio>
        <el-radio v-model="formData.sex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="角色" prop="rules">
        <el-select v-model="formData.rules" multiple placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import { getOption } from '@/api/role'

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
      roleOptions: [],
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
  created() {
    this.getRoleOption()
  },
  methods: {
    /**
     * 获取角色列表选项
     */
    getRoleOption() {
      getOption().then(res => {
        this.roleOptions = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
