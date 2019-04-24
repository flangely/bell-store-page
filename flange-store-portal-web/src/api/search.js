import searchRequest from '@/utils/searchRequest'

export function simpleSearch(keyword, pageNum, pageSize){
    return searchRequest({
        url:'/esProduct/search/simple?keyword=' + keyword + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        method:'get'
    })
}

export function detailSearch(keyword, author, price, pageNum, pageSize){
    return detailSearch({
        url:'/esProduct/search',
        method:'get'
    })
}