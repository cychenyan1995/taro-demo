import request from '../../utils/request'

export const homepage = data => {
    request({
        url: '/homepage-v3',
        method: 'GET',
        data
    })
}