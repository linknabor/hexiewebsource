import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const tipsApi = {

    getSwitchSectTips(param) {
        return http.get(baseUrl + 'tips/switchSect/' + param, null)
    }

}
export default tipsApi