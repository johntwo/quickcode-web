<!--author  zhangkai  2019-11-07   图片上传-->
<template>
  <div>
    <el-upload
      :action="''"
      :on-success="handleUploadSuccess"
      list-type="picture-card"
      :limit="limit"
      :multiple="true"
      :on-exceed="handleUploadExceed"
      :http-request="handleUploadRequest"
      :file-list="uploadFiles"
      :on-error="handleError"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Oss from '@/utils/oss'
function noop() {}
export default {
  name: 'UploadImage',
  components: {},
  directives: { },
  props: {
    value: {
      type: [Object, Array],
      default() {
        return null
      }
    },
    headers: {
      type: Object,
      default() {
        return {}
      }
    },
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: {
      type: Function,
      default: noop
    },
    beforeRemove: {
      type: Function,
      default: noop
    },
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function,
      default: noop
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text' // text,picture,picture-card
    },
    disabled: Boolean,
    limit: {
      type: Number,
      default: 1
    },
    onExceed: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      uploadFiles: [],
      oss: new Oss('tencent')
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(value) {
        if (!value) {
          this.uploadFiles = []
        } else {
          this.uploadFiles = value
        }
      }
    }
  },
  created() {
  },
  methods: {
    isEmpty(arg) {
      if (arg === null || arg === undefined || arg === '') {
        return true
      }
      return false
    },
    /**
     * 上传成功
     */
    handleUploadSuccess(res, file, fileList) {
      if (file.status !== 'success') {
        // 适配  谢长春-springboot-框架    上传失败
        this.handleSuccessToError(res, file, fileList)
        return
      }

      file = Object.assign(file, res)
      this.updateInput(fileList)
    },
    /**
     * 处理 200 请求，返回的 code 非 A00000 的请求
     */
    handleSuccessToError(res, file, fileList) {
      this.$message({
        title: '警告',
        message: res.message || '上传失败',
        type: 'error'
      })
      fileList.splice(fileList.indexOf(file), 1)
      this.updateInput(fileList)
    },
    /**
     * 上传超过限制
     */
    handleUploadExceed(res) {
      this.$message({
        title: '警告',
        message: '上传数量超过限制，最多 ' + this.limit + '  张',
        type: 'warning'
      })
    },
    /**
     * 处理上传错误
     */
    handleError(res, file, fileList) {
      this.$message({
        title: '错误',
        message: '文件上传失败，请重试',
        type: 'error'
      })
      this.updateInput(fileList)
    },
    /**
     * 删除图片
     */
    handleRemove(file, fileList) {
      this.updateInput(fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * 更新 v-model 信息
     */
    updateInput(fileList) {
      console.log(JSON.stringify(fileList))
      this.$emit('input', Object.assign([], fileList))
    },
    /**
     * 上传文件
     */
    handleUploadRequest(file) {
      this.oss.upload(file)
    }
  }
}
</script>
