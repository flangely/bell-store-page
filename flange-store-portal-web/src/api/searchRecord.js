import request from "@/utils/request"


export function findMemberRecord(memberId){
    return request({
        url:'/search/record/findByMemberId',
        method:'get',
        params:{memberId:memberId}
    })
}

export function deleteMemberRecord(memberId){
    return request({
        url:'/search/record/deleteByMemberId',
        method:'delete',
        params:{memberId:memberId}
    })
}

export function deleteRecord(id){
    return request({
        url:'/search/record/deleteById',
        method:'delete',
        params:{id:id}
    })
}

export function addRecord(data){
    return request({
        url:'/search/record/add',
        method:'post',
        data:data
    })
}