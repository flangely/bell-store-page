import request from '@/utils/request'

export function addAddress(data){
    return request({
        url:'/member/address/add',
        method:'post',
        data:data
    })
}

export function updateAddress(id, data){
    return request({
        url:'/member/address/update/' + id,
        method:'post',
        data:data
    })
}

export function deleteAddress(id){
    return request({
        url:'/member/address/delete/' + id,
        method:'post'
    })
}

export function listAddress(){
    return request({
        url:'/member/address/list',
        method:'get'
    })
}