/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-19 20:55:01
 */
import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import { reqUsers, reqAddUpdateUser, reqRemoveUser } from '../../api';
import UserForm from './UserForm';
function User(props) {
    const [users, setUsers] = useState([])
    const [targetUser, setTargetUser] = useState(null)
    const [roles, setRoles] = useState([])
    const [modalVisible, setModalVisible] = useState(0)//1添加 2修改 0隐藏
    useEffect(() => {
        getUsers()
    }, [])

    const userFormRef = useRef()
    const getUsers = async () => {
        const res = await reqUsers();
        if (res.data) {
            setUsers(res.data.users)
            setRoles(res.data.roles)

            // getUsers()
        } else {
            message.error(res.msg)
        }
    }
    const addUser = () => {
        //清空targetUser
        setTargetUser({})
        setModalVisible(1)
    }
    const updateUser = targetUser => {
        setTargetUser(targetUser);
        setModalVisible(2)
    }
    const removeUser = user => {
        Modal.confirm(
            {
                title: `确定要删除${user.username}吗？`,
                content: '删除后将不可恢复',
                onOk: async () => {
                    const res = await reqRemoveUser(user._id)
                    res.status === 0 ? message.success('该用户已删除') : message.error('删除失败,请重试')
                },
                okText: '删除',
                cancelText: '取消',
                okType: 'danger'
            }
        )
    }


    const handleModalCancel = () => setModalVisible(0)
    const handleModalOk = () => {
        userFormRef.current.validateFields()
            .then(async values => {
                //如果是更新 要传入当前user的id
                const res = await reqAddUpdateUser({ ...values, _id: targetUser._id })
                res.status === 0 ? message.success(targetUser._id ? '修改成功' : '添加成功') : message.error(res.msg)
            })
        setModalVisible(0)
    }
    const title = (
        <Button type='primary' onClick={addUser}>添加用户</Button>
    )
    const columns = [
        { title: '用户名', dataIndex: 'username', align: 'center' },
        { title: '邮箱', dataIndex: 'email', align: 'center' },
        {
            title: '注册时间', dataIndex: 'create_time',
            render: create_time => create_time ? new Date(create_time).toLocaleString() : null,
            align: 'center'
        },
        { title: '联系方式', dataIndex: 'phone', align: 'center' },
        {
            title: '用户类型', dataIndex: 'role_id',
            render: role_id => roles.length && roles.find(role => role._id === role_id).name,
            align: 'center'
        },
        {
            title: '操作',
            width: 180,
            render: user => (
                <div>
                    <Button type='primary' onClick={() => updateUser(user)}>修改</Button>
                    &ensp;
                    <Button type='danger' onClick={() => removeUser(user)}>删除</Button>
                </div>
            ),
            align: 'center'
        },
    ]

    return (
        <Card
            title={title}
        >
            <Table
                bordered
                rowKey='_id'
                columns={columns}
                dataSource={users}
                pagination={{ defaultPageSize: 6, showQuickJumper: true }}

            >
            </Table>
            <Modal
                title={!targetUser ? '添加用户' : '修改用户'}
                visible={!!modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText='确定'
                cancelText='取消'
            >
                <UserForm roles={roles} user={targetUser} ref={userFormRef}></UserForm>
            </Modal>
        </Card>
    );
}

export default User;