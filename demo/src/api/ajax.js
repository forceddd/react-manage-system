//封装自己的ajax请求函数
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'
axios.interceptors.request.use(config => {
    if (config.method.toLocaleLowerCase() === 'post' && typeof config.data === 'object') {
        //设置请求头 将传递的数据转成name=xxx&password=xxx 而不是以json格式传递
        //这些操作可以在请求拦截器中统一处理
        /* headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
            username,
            password
        }) */
        config.headers = { 'content-type': 'application/x-www-form-urlencoded' }
        config.data = qs.stringify(config.data)
    }
    return config
}, err => {
    return Promise.reject(err)
})

//添加响应拦截器 处理响应回来的数据 一般在ajax请求出现错误时 对错误进行处理
axios.interceptors.response.use(response => {
    return response.data
}, error => {
    //在此处统一对错误信息处理 就不用在每次发起ajax请求时                              分别写catch了
    message.error('请求失败了' + error.message)
    //将错误信息处于pending状态 不再往下放行
    return new Promise(() => { })
})


export default axios