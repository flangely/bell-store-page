import request from '@/utils/request'

export function generateConfirmOrder(ids){
    return request({
        url:'/order/generateConfirmOrder',
        method:'post',
        data:ids
    })
}

export function generateOrder(data){
    return request({
        url:'/order/generateOrder',
        method:'post',
        data:data
    })
}