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
        return Http.post(baseUrl + '/addhexiehouse2', param)
    },
    queryHouseByVersno(param){
        return Http.get(baseUrl + '/hexiehouse/' + param, null)
    }

}
export default baseInfoApi