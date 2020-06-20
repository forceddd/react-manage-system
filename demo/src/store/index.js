/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-20 13:44:37
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 14:12:28
 */
import { createStore } from 'redux'
import userReducer from './user.reducer'
//使用 reducer创建store实例
const store = createStore(userReducer)
//使用时需要在index.js中引入
export default store