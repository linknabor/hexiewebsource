
import http from '@/util/http.js'
import Common from '@/util/common.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const api = {
    getUserInfo(data) {
        let oriApp = Common.getUrlParam('oriApp')
        if(!oriApp){
            oriApp = Config.appId
        }
        return http.get(baseUrl + '/userInfo' + '?oriApp='+oriApp, data)//返回的时promies对象，所以直接return出去就好了
    },

    login(param, data) {
        return http.post(baseUrl + '/login/' + param, data)//返回的时promies对象，所以直接return出去就好了
    },
    getUrlJsSign(data) {
        return http.post(baseUrl + '/getUrlJsSign', data)
    },
    operAuthorize(data) {
        return http.post(baseUrl + '/oper/authorize', data)
    },
    getSectList(param) {
        return http.get(baseUrl + '/getVagueSectByName', param)
    },
    getCellAddrList(param) {
        return http.get(baseUrl + '/getLikeCellAddr', param)
    },
    h5Authorize(param) {
        return http.post(baseUrl + '/h5/authorize', param)
    }
}

export default api;