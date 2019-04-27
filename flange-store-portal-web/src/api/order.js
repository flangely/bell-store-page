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

export function listOrder(){
    return request({
        url:'/order/list',
        method:'get'
    })
}

export function cancelMyOder(id){
    return request({
        url:'/order/cancelMyOrder',
        method:'post',
        params:{id:id}
    })
}