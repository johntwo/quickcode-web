<template>
  <UploadImage v-model="files" :limit="10" />
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImage from '@/components/UploadImage'

export default {
  name: 'Dashboard',
  components: { UploadImage },
  data() {
    return {
      files: undefined
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
