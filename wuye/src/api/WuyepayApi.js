import Http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const wuyepayApi = {

    getBill(param) {
        return Http.get(baseUrl + '/billList', param, 1)
    },


}
export default wuyepayApi