import request from '@/utils/request'

export function homeContent(){
    return request({
        url:'/home/content',
        method: 'get'
    })
}

export function homeRcommendProductList(){
    return request({
        url:'/home/recommendProductList',
        method:'get'
    })
}

export function homeProductCategory(id){
    return request({
        url:'/home/productCateList/' + id,
        method:'get'
    })
}