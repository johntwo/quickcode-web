import COS from 'cos-js-sdk-v5'
import fileMd5 from '@/utils/libs/fileMd5'
import { getOssToken } from '@/api/oss'
class Tencent {
  /**
   * 获取sts token
   */
  getStsToken() {
    const that = this
    return new Promise((resolve, reject) => {
      getOssToken().then(res => {
        try {
          that.stsToken = res.data
          resolve(res.data)
        } catch (e) {
          reject()
        }
      })
    })
  }

  /**
   * 获取cos客户端
   */
  getCos() {
    const that = this
    return new Promise((resolve, reject) => {
      that.getStsToken().then(res => {
        that.cos = new COS({
          getAuthorization(options, callback) {
            const credentials = res.credentials
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              SecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000000
              ScopeLimit: true // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
            })
          }
        })
        resolve()
      })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * 上传文件
   * @param file
   */
  upload(file) {
    const that = this
    const fileInfo = {
      name: '',
      originName: '',
      bucket: '',
      url: '',
      region: ''
    }
    return new Promise((resolve, reject) => {
      fileMd5(file.file).then(md5res => {
        fileInfo.originName = file.file.name
        fileInfo.name = md5res
        that.getCos().then(res => {
          fileInfo.bucket = that.stsToken.bucket
          fileInfo.region = that.stsToken.region
          that.cos.putObject({
            Bucket: that.stsToken.bucket, /* 填入您自己的存储桶，必须字段 */
            Region: that.stsToken.region, /* 存储桶所在地域，例如ap-beijing，必须字段 */
            Key: fileInfo.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
            StorageClass: 'STANDARD',
            Body: file.file, // 上传文件对象
            onProgress: function(progressData) {
              file.onProgress({ percent: progressData.percent * 100 })
            }
            // eslint-disable-next-line handle-callback-err
          }, function(err, data) {
            try {
              if (Number(data.statusCode) === 200) {
                fileInfo.url = 'https://' + data.Location
                file.onSuccess(fileInfo)
                resolve(data)
              } else {
                file.onError()
                reject(err)
              }
            } catch (e) {
              file.onError()
              reject(err)
            }
          })
        }).catch(err => {
          file.onError(err)
        })
      })
    })
  }
}

export default Tencent
