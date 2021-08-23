import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const bannerApi = {

    getBanner() {
        return http.get(baseUrl + '/banner/3', null)
    }

}
export default bannerApi