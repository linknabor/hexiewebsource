import Http from '@/util/http.js'
import Config from '@/util/config.js'

let baseUrl = Config.baseUrl
const baseInfoApi = {

    querySectList(param) {
        return Http.get(baseUrl + '/getVagueSectByName', param)
    },
    queryCellList(param) {
        return Http.get(baseUrl + '/getLikeCellAddr', param)
    },
    bindHouseByArea(param){
        let uri = '/addhexiehouse2?houseId='+param.houseId+'&area='+param.area
        return Http.post(baseUrl + uri, null)
    },
    queryHouseByVersno(param){
        return Http.get(baseUrl + '/hexiehouse/' + param, null)
    }

}
export default baseInfoApi