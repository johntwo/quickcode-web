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


/**
 * 获取角色列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getList(params) {
  return request({
    url: '/admin/user/getList',
    method: 'get',
    params
  })
}

/**
 * 新增
 * @param data
 * @returns {AxiosPromise}
 */
export function add(data) {
  return request({
    url: '/admin/user/add',
    method: 'post',
    data
  })
}

/**
 * 更新
 * @param data
 * @returns {AxiosPromise}
 */
export function update(data) {
  return request({
    url: '/admin/user/update',
    method: 'patch',
    data
  })
}

/**
 * 删除
 * @param data
 * @returns {AxiosPromise}
 */
export function del(data) {
  return request({
    url: '/admin/user/del',
    method: 'delete',
    data
  })
}
