import request from "@/utils/request"

export function getUserInfo(){
    return request({
        url:'/sso/info',
        method:'get'
    })
}

export function changePwd(oldVal, newVal){
    return request({
        url:'/sso/updatePassword',
        method:'put',
        params:{oldPwd:oldVal, newPwd:newVal}
    })
}

export function changeUserInfo(data){
    return request({
        url:'/sso/updateInfo',
        method:'put',
        data:data
    })
}

export function register(params){
    return request({
        url:'/sso/register',
        method:'post',
        params:params
    })
}