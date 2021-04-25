import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const noticeApi = {

    getNotice(param) {
        return http.get(baseUrl + '/notice/get/' + param, null)
    }

}
export default noticeApi