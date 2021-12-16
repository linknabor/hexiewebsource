import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const receiptApi = {

    getReceipt(param) {
        return http.get(baseUrl + 'receipt/detail', param)
    }

}
export default receiptApi