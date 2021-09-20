import axios from 'axios'

export const status = 'build'

export function request (config) {
  let instance
  instance = axios.create({
    baseURL: '/api',
    timeout: 5000
  })
  return instance(config)
}
