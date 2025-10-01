import moment from 'moment'

export function formatDate(date, format = 'YYYY-MM-DD') {
    if (!date) return ''
    return moment(date).format(format)
}

export function timeAgo(date) {
    if (!date) return ''
    return moment(date).fromNow()
}
