
import http from '@/util/http.js'
import config from '@/util/config.js'

// 获取列表

let baseUrl = config.baseUrl

const api = {

    getUserInfo(data) {
        return http.get(baseUrl + '/userInfo', data)//返回的时promies对象，所以直接return出去就好了
    },

    login(code, param) {
        return http.post(baseUrl + '/login/' + code, param)//返回的时promies对象，所以直接return出去就好了
    },
    getUrlJsSign(data) {
        return http.post(baseUrl + '/getUrlJsSign', data)
    }
}

export default api;