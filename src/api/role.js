import request from '@/utils/request'

/**
 * 获取角色列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getList(params) {
  return request({
    url: '/admin/role/getList',
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
    url: '/admin/role/add',
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
    url: '/admin/role/update',
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
    url: '/admin/role/del',
    method: 'delete',
    data
  })
}
