import request from '@/utils/request'

export function getProductById(productId){
    return request({
        url:'/product/' + productId,
        method:'get'
    })
}