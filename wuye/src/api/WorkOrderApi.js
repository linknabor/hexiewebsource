import Http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const workOrderApi = {

    getDefaultAddress() {
        return Http.get(baseUrl + '/hexiehouses', null)
    },
    addWorkOrder(data) {
        return Http.post4File(baseUrl + '/workorder/save', data)
    },
    getOrderList() {
        return Http.get(baseUrl + '/workorder/orderList', null)
    },
    getOrderDetail(param) {
        return Http.get(baseUrl + '/workorder/orderDetail/' + param, null)
    },
    reverseOrder(param, data) {
        return Http.get(baseUrl + '/workorder/reverse/' + param, data)
    }

}
export default workOrderApi