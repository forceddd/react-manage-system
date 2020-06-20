/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 16:18:59
 */
//操作local数据的函数模块
const USER_KEY = 'user_key'

export default {
    user(user) {
        if (user instanceof Object) {
            localStorage.setItem(USER_KEY, JSON.stringify(user))
        } else {
            //如果User_key不存在 localStorage.getItem(USER_KEY)返回的是null
            return user === undefined ? JSON.parse(localStorage.getItem(USER_KEY)) || {} : localStorage.removeItem(USER_KEY)
        }
    }
}