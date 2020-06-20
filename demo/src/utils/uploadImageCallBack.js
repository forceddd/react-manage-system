/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-19 09:16:16
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-19 09:48:46
 */
export default (file) => {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('POST', '/manage/img/upload');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData(); // eslint-disable-line no-undef
            data.append('image', file);//拼接参数
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                //如果后端返回的是{status:0,data:{name:..,link:..}} 如果属性名是link则不需修改 如果是url则要修改
                let formData = {
                    data: {
                        link: response.data.url
                    }
                }
                resolve(formData);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
}