import Cookies from 'js-cookie'

const TokenKey = 'loginTokenPortal'
const Keyword = 'keyword'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getKeyword(){
  return Cookies.get(Keyword)
}

export function setKeyword(keyword){
  return Cookies.set(Keyword, keyword)
}

export function removeKeyword(keyword){
  return Cookies.remove(Keyword)
}