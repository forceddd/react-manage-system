/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-19 19:56:25
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 09:19:43
 */
import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Input } from 'antd';

function AddRole(props, ref) {
    const [form] = Form.useForm()
    useImperativeHandle(ref, () => ({
        ...form
    }))
    return (
        <Form
            form={form}
        >
            <Form.Item
                name='roleName'
                label='角色类型'
                required
                rules={[
                    { validator: (_, value) => value && value.trim() ? Promise.resolve() : Promise.reject('角色类型不能为空') }
                ]}
            >
                <Input placeholder='请输入角色类型'></Input>
            </Form.Item>
        </Form>
    );
}

export default forwardRef(AddRole);