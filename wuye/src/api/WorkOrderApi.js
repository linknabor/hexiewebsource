import Http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const workOrderApi = {

    getDefaultAddress() {
        return Http.get(baseUrl + '/workorder/address/default', null)
    },
    addWorkOrder(data) {
        return Http.post4File(baseUrl + '/workorder/save', data)
    },
    getOrderList() {
        return Http.get(baseUrl + '/workorder/orderList', null)
    },
    getOrderDetail(param) {
        return Http.get(baseUrl + '/workorder/orderDetail/' + param, null)
    }

}
export default workOrderApi