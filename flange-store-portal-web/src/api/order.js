import request from '@/utils/request'

export function generateConfirmOrder(ids){
    return request({
        url:'/order/generateConfirmOrder',
        method:'post',
        data:ids
    })
}