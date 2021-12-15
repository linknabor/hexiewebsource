import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const receiptApi = {

    getReceipt(param) {
        return http.get(baseUrl + 'recept/detail', param, null)
    }

}
export default receiptApi