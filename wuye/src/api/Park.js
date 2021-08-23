import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const ParkApi = {

  getIndexCar() {
    return http.get(baseUrl + '/park/getIndexCar', null)
  },

  getParkList(param) {
    return http.get(baseUrl + '/park/getParkList', param)
  },

  getParkPayList(param) {
    return http.get(baseUrl + '/park/getParkPayList', param)
  },

  saveCar(param) {
    return http.post(baseUrl + '/park/saveCar', param)
  },

  getCarList() {
    return http.get(baseUrl + '/park/getCarList', null)
  },

  getPayDetail(param) {
    return http.get(baseUrl + '/park/getPayDetail', param)
  },

  carPay(param) {
    return http.post(baseUrl + '/park/carPay', param)
  },

  getPayList(param) {
    return http.get(baseUrl + '/park/getPayList', param)
  }

}
export default ParkApi
