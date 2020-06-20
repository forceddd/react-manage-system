/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-18 13:40:33
 */
import storageUser from './storageUtil'
export default {
    //在内存中存储用户登录信息 为null或者是对象
    user: storageUser.user(),
    // product: null,//存储商品管理时要修改的商品信息
}