
import http from '@/util/http.js'
import config from '@/util/config.js'
import common from '@/util/common.js'

let baseUrl = config.baseUrl
const userApi = {
    getUserInfo(data) {
        let oriApp = common.getUrlParam('oriApp')
        if(!oriApp){
            oriApp = config.appId
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
    }
}

export default userApi;