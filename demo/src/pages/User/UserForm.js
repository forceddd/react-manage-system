/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-19 14:07:02
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-19 19:46:33
 */
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
    Form,
    Input,
    Select,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
const UserForm = (props, ref) => {
    const [roles, setRoles] = useState([])
    const [form] = Form.useForm();
    useEffect(() => {
        setRoles(props.roles)
        form.setFieldsValue({
            username: props.user.username,
            phone: props.user.phone,
            email: props.user.email,
            role_id: props.user.role_id,
        })

    }, [props.user, props.roles, form])
    useImperativeHandle(ref, () => ({
        ...form
    }))
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return (
        <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            initialValues={{
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                    { validator: (_, value) => (!value) || value.trim() ? Promise.resolve() : Promise.reject('请输入用户名') }

                ]}
            >
                <Input placeholder='请输入用户名' />
            </Form.Item>
            {props.user._id ? null : <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder='请输入密码' />
            </Form.Item>}
            {props.user._id ? null : <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请确认密码',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('两次密码不一致');
                        },
                    }),
                ]}
            >
                <Input.Password placeholder='确认密码' />
            </Form.Item>}
            <Form.Item
                name="phone"
                label="联系方式"
                rules={[{ required: true, message: '请输入手机号' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='email'
                label='邮箱'
                rules={[
                    { type: 'email', message: '请输入正确的邮箱地址' },
                ]}
            >
                <Input placeholder='请输入邮箱地址'></Input>
            </Form.Item>
            <Form.Item
                name='role_id'
                label='用户类型'
                rules={[
                    { required: true, message: '请选择用户类型' },
                ]}
            >
                <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder='请选择一个用户类型'
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {roles.length && roles.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)}
                </Select>
            </Form.Item>
        </Form>
    );
};
export default forwardRef(UserForm)