import Cookies from 'js-cookie'

const TokenKey = 'loginTokenPortal'
const username = 'loginName'
const memberId = 'loginId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername(){
  return Cookies.get(username)
}

export function setUsername(name){
  return Cookies.set(username, name)
}

export function removeUsername(){
  return Cookies.remove(username)
}

export function getMemberId(){
  return Cookies.get(memberId)
}

export function setMemberId(id){
  return Cookies.set(memberId, id)
}

export function removeMemberId(){
  return Cookies.remove(memberId)
}