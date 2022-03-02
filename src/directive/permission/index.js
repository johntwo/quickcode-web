import permission from './permission'

/**
 * 按钮权限指令使用方法
 * <pre>
 * import permission from '@/directive/permission' // 导入权限指令
 *
 * export default {
 *   directives: {permission}
 * }
 *
 * 组件上添加 v-permission="['ROLE_ADMIN']"
 * </pre>
 */
const install = function(Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install) // eslint-disable-line
}

permission.install = install
export default permission
