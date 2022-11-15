/**
 * 验证用户名的 只放行这个数组规定的用户名
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor', 'jiangtian']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {number} num
 * @returns {Boolean}
 */
export function validateMobile(num) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(num)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validateEmail(str) {
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}
