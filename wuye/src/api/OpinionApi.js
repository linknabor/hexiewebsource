import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const opinionApi = {

  getInteractList(data) {
    return http.post(baseUrl + 'interact/getInteractList', data)
  },

  getInteract(data) {
    return http.post(baseUrl + 'interact/getInteractInfo', data)
  },

  saveInteract(data) {
    return http.post(baseUrl + 'interact/addInteract', data)
  },

  delInteract(data) {
    return http.post(baseUrl + 'interact/deleteInteract', data)
  },

  getCommentList(data) {
    return http.post(baseUrl + 'interact/getCommentByInteractId', data)
  },

  delComment(data) {
    return http.post(baseUrl + 'interact/deleteComment', data)
  },

  addComment(data) {
    return http.post(baseUrl + 'interact/addComment', data)
  },

  upload(data){
    return http.post4File(baseUrl + 'interact/upload', data)
  },

  getAddr(param){
    return http.get(baseUrl + '/hexiehouses?sectId=' + param, null)
  },
  getInteractType(){
    return http.get(baseUrl + '/interact/getInteractType', null)
  },

  saveInteractGrade(data) {
    return http.post(baseUrl + 'interact/grade', data)
  }


}
export default opinionApi
