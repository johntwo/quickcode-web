import Tencent from '@/utils/oss/tencent'

class Oss {
  constructor(type) {
    this.type = type
    if (type === 'tencent') {
      this.driver = new Tencent()
    }
  }

  /**
   * @return OssInterface
   * 获取oss 的  驱动信息
   */
  getDriver() {
    return this.driver
  }

  /**
   * 上传文件
   */
  upload(file) {
    return this.getDriver().upload(file)
  }
}

export default Oss
