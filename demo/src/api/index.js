/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 09:03:33
 */
//包含了应用中所有请求接口的函数：接口请求函数
import ajax from './ajax'
import jsonp from 'jsonp'
const base = ""
export const reqLogin = (username, password) => {
    return ajax({
        method: 'post',
        url: base + '/login',
        data: {
            //默认使用json格式请求体携带数据
            username,
            password
        },
        //设置请求头 将传递的数据转成name=xxx&password=xxx 而不是以json格式传递
        //这些操作可以在请求拦截器中统一处理
        /* headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
            username,
            password
        }) */
    })
}
//发送jsonp请求 得到天气信息
export const reqWeather = (city) => {
    return new Promise((reslove, reject) => {
        //jsonp(url,传递的数据,回调函数) 回调函数是错误优先机制
        jsonp(`https://api.asilu.com/weather/?city=${city}`, {}, (error, data) => {
            const { weather, wind } = data.weather[0]
            error ? reject(error) : reslove({ weather, wind });
        })
    })
}
//获取分类列表
export const reqCategorys = () => {
    return ajax('/manage/category/list')
}
//修改分类
export const reqUpdateCategory = ({ categoryId, categoryName }) => {
    return ajax({
        url: '/manage/category/update',
        data: {
            categoryId,
            categoryName
        },
        method: 'post'
    })
}
//添加分类
export const reqAddCategory = categoryName => {
    return ajax({
        method: 'post',
        url: '/manage/category/add',
        data: {

            categoryName
        },

    })
}
//获取商品列表
export const reqProducts = (pageNum, pageSize) => {
    return ajax({
        url: '/manage/product/list',
        params: { pageNum, pageSize }
    });
}
//商品搜索
export const reqSearchProducts = ({ pageSize, pageNum, searchType, searchValue }) => {
    console.log();

    return ajax.get('/manage/product/search', {
        params: {
            pageSize,
            pageNum,
            //searchType是动态的值
            [searchType]: searchValue
        }
    })
}
//根据商品id获取商品信息
export const reqProduct = productId => {
    return ajax({
        url: '/manage/product/info',
        params: { productId }
    })
}
//根据分类Id获取商品分类
export const reqCategory = categoryId => {
    return ajax({
        url: '/manage/category/info',
        params: { categoryId }
    })
}
//添加/修改商品
export const reqAddUpdateProduct = product => {
    //三元运算符优先级没有+高 要加上括号
    return ajax.post('/manage/product/' + (product._id ? 'update' : 'add'), product)
}

//获取用户列表
export const reqUsers = () => ajax('/manage/user/list')

//添加或者更新用户信息
export const reqAddUpdateUser = user => ajax.post('/manage/user/' + (user._id ? 'update' : 'add'), user)
//删除用户
export const reqRemoveUser = userId => ajax.post('/manage/user/delete', { userId })
//获取角色列表
export const reqRoles = _ => ajax('/manage/role/list')
//添加角色
export const reqAddRole = ({ roleName }) => ajax.post('/manage/role/add', { roleName })
//修改角色权限
export const reqAddAuth = ({ _id, menus, auth_time, auth_name }) => ajax.post('/manage/role/update', { _id, menus, auth_time, auth_name })