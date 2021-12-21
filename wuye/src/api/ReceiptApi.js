import Http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const receiptApi = {

    getReceipt(param) {
        return Http.get(baseUrl + 'receipt/detail', param)
    },
    getReceiptByUser(page) {
        return Http.get(baseUrl + 'receipt/list/'+page, null)
    }

}
export default receiptApi