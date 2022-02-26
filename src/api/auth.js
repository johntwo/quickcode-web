import request from '@/utils/request'

/**
 * 获取权限树
 * @param data
 * @returns {AxiosPromise}
 */
export function getTree() {
  return request({
    url: '/admin/auth/getTree',
    method: 'get'
  })
}
