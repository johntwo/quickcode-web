<template>
  <el-dialog
    :title="formData.id ? '编辑' :'新增'"
    :visible.sync="visibleDialog"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" />
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
      <el-form-item label="角色" prop="roles">
        <el-select v-model="formData.roles" multiple placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleDialog=false">取消</el-button>
      <el-button type="primary" :loading="confirmLoading" @click="submit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as mainService from '@/api/user'
import { Message } from 'element-ui'
import { getOption } from '@/api/role'

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
      roleOptions: [],
      confirmLoading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'change' }
        ],
        password: [
          { type: 'string', required: true, message: '请填写密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'change' }
        ],
        phone: [
          { type: 'mobile', required: true, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请填入邮箱', trigger: 'blur' },
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
      }
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

  },
  created() {
    this.getRoleOption()
  },
  methods: {
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
    },
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
