import moment from "moment"

export default function(value,pattent) {
    return moment(value).format(pattent)
}