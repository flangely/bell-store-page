import request from '@/utils/request'

export function addOne(data){
    return request({
        url:'/cart/add',
        method:'post',
        data: data
    })
}

export function listAll(){
    return request({
        url:'/cart/list',
        method:'get'
    })
}

export function updateQuantity(params){
    return request({
        url:'/update/quantity',
        method:'put',
        params:params
    })
}

export function delCartItem(params){
    return request({
        url:'/delete',
        method:'post',
        params: params
    })
}

export function clear(){
    return request({
        url:'/clear',
        method:'post'
    })
}