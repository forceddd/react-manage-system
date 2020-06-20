import { Form, Input, Button, message } from 'antd';
import React from 'react';
import { reqLogin } from '../../api'
import storageUtil from '../../utils/storageUtil';
import memoryUtil from '../../utils/memoryUtil';
import { connect } from 'react-redux';
import { mapState, mapDispatch } from '../../store/user.reducer';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 16,
    },
};

const LoginForm = (props) => {
    const onFinish = async values => {
        //用户名密码通过表单验证后 发起登录请求
        const { username, password } = values;
        const res = await reqLogin(username, password);

        if (res.status === 0) {
            /* 如果返回结果正确 将用户信息保存到本地 用于首页展示 */
            const user = res.data;
            storageUtil.user(user);
            /*  //将用户信息保存到内存中 优化性能 提高运行效率 redux react-redux 
            memoryUtil.user = user; */
            //使用redux
            props.setUser(user)

            message.success('登陆成功')
            props.history.push('/home')

        } else {
            //账号或密码错误
            message.error(res.msg)
        }

    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                username: 'admin',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="用户名"
                name="username"

                rules={[
                    {
                        required: true,
                        /*whitespace 用户名两边不能有空格 */
                        whitespace: true,
                        message: '用户名不能为空!',
                    },
                    {
                        min: 4,
                        message: '用户名过短'
                    },
                    {
                        max: 12,
                        message: '用户名过长'
                    },
                    {
                        pattern: /^[a-zA-z0-9_]+$/,
                        message: '用户名必须是数字、字母、下划线'
                    }
                ]}
            >
                <Input placeholder='请输入用户名' />
            </Form.Item>

            <Form.Item
                label="密码&ensp;&ensp;"
                name="password"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            // console.log(value);
                            value = value.trim();
                            if (value.length < 4 && value.length > 0) {
                                return Promise.reject('密码不能少于4位');
                            } else if (value.length > 18) {
                                return Promise.reject('密码不能大于18位');
                            } else if (!/^[a-zA-z0-9_].+$/.test(value)) {
                                return Promise.reject('密码必须由数字、字母、下划线或者小数点组成');
                            }
                            return Promise.resolve();
                        },

                    }),
                    {
                        required: true,
                        message: '用户名不能为空!',
                    }

                ]}
            >
                <Input.Password placeholder='请输入密码' />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{ width: '100px' }}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};
export default connect(mapState, mapDispatch)(LoginForm)