import searchRequest from '@/utils/searchRequest'

export function simpleSearch(keyword, pageNum, pageSize){
    return searchRequest({
        url:'/esProduct/search/simple?keyword=' + keyword + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        method:'get'
    })
}

export function detailSearch(params){
    return detailSearch({
        url:'/esProduct/search',
        method:'get',
        params:{keyword:params.keyword, brandId:params.brandId, productCategoryId:params.productCategoryId, pageNum:params.pageNum, pageSize:params.pageSize, sort:1}
    })
}

export function searchAllProduct(pageNum, pageSize){
    return searchRequest({
        url:'/esProduct/search/simple?pageNum=' + pageNum + '&pageSize=' + pageSize,
        method:'get'
    })
}