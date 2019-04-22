import request from '@/utils/request'

export function homeContent(){
    return request({
        url:'/home/content',
        method: 'get'
    })
}