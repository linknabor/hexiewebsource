import Http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const invoiceApi = {

    getLocation(param) {
        return Http.get(baseUrl + '/location?appid=' + param.appid + '&coordinate=' + param.coordinate)
    }
}
export default invoiceApi