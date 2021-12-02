import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const tipsApi = {

    getBindHouseTips() {
        return http.get(baseUrl + 'tips/bindHouse', null)
    }

}
export default tipsApi