import Http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const invoiceApi = {

    getInvoice(page) {
        return Http.get(baseUrl + '/inovice/'+page, null)
    },


}
export default invoiceApi