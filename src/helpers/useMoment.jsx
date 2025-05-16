import moment from "moment"

export const getCurrentTimestamp = (timeFormat) => {
    return moment().format(timeFormat)
}