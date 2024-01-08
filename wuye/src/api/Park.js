import http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const ParkApi = {

  getIndexCar(param) {
    return http.get(baseUrl + '/park/getIndexCar', param)
  },

  getParkList(param) {
    return http.get(baseUrl + '/park/getParkList', param)
  },

  saveCar(param) {
    return http.post(baseUrl + '/park/addUserCar', param)
  },

  getCarList(param) {
    return http.get(baseUrl + '/park/getVagueCar', param)
  },

  delCar(param) {
    return http.post(baseUrl + '/park/delCar/' + param, null)
  },

  getPayingDetail(param) {
    return http.get(baseUrl + '/park/getPayingDetail', param)
  },

  getPrePaying(param) {
    return http.post(baseUrl + '/park/getPrePaying', param)
  },

  getPayDetailById(param) {
    return http.get(baseUrl + '/park/getPayDetailById', param)
  },

  getParkPayList(param) {
    return http.get(baseUrl + '/park/getParkPayList', param)
  }

}
export default ParkApi
