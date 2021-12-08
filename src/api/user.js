import request from '@/utils/request'

/**
 * 用户登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取当前登录用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function current(data) {
  return request({
    url: '/admin/user/current',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/user/logout',
    method: 'delete'
  })
}
