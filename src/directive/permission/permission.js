import store from '@/store'

/**
 * 按钮权限指令使用方法
 * <pre>
 * import permission from '@/directive/permission' // 导入权限指令
 *
 * export default {
 *   directives: {permission}
 * }
 *
 * 组件上添加 v-permission="['ROLE_ADMIN', '']"
 * </pre>
 */
export default {
  inserted(el, binding) {
    const { value } = binding
    const authorityList = store.getters && store.getters.authorities
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = authorityList.some(role => {
        return permissionRoles.includes(role) || role === 'admin'
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['ROLE_ADMIN', 'editor']"`)
    }
  }
}
