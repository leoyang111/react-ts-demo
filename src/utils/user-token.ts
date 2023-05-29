/**
 * @description 存储/获取token
 */

const KEY='USER_TOKE'
export function setToken(token:string){
    localStorage.setItem(KEY,token)
}
export function getToken(){
    return localStorage.getItem(KEY)||''
}
export function removeToke(){
    localStorage.removeItem(KEY)
}