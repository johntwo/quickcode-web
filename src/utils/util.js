export function isEmpty(arg) {
  if (arg === undefined || arg === null || arg === '' || arg.length <= 0) {
    return true
  }
  return false
}
