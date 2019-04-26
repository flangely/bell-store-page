import request from '@/utils/request'

export function collectProduct(data){
    return request({
        url:'/member/collection/addProduct',
        method:'post',
        data:data
    })
}

export function cancelCollect(id){
    return request({
        url:'/member/collection/deleteProduct',
        method:'post',
        params:{productId:id}
    })
}

export function multiCancelCollect(ids){
    return request({
        url:'/member/collection/multiDeleteProduct',
        method:'post',
        data:ids
    })
}

export function listCollectProduct(){
    return request({
        url:'/member/collection/listProduct',
        method:'get'
    })
}