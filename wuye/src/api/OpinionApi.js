import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const opinionApi = {

  getThreadList(filter, page, data) {
    return http.post(baseUrl + 'thread/getThreadList/' + filter + '/' + page, data)
  },

  getThread(data) {
    return http.post(baseUrl + 'thread/getThreadByThreadId', data)
  },

  saveThread(data) {
    return http.post(baseUrl + 'thread/addThread', data)
  },

  delThread(data) {
    return http.post(baseUrl + 'thread/deleteThread', data)
  },

  delComment(data) {
    return http.post(baseUrl + 'thread/deleteComment', data)
  },

  addComment(data) {
    return http.post(baseUrl + 'thread/addComment', data)
  },

  upload(data){
    return http.post4File(baseUrl + 'thread/upload', data)
  }
}
export default opinionApi
