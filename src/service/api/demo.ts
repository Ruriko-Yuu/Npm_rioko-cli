import request from '../index'

export function postDemo(data: unknown) {
  return request({
    url: '/url',
    method: 'post',
    data
  })
}