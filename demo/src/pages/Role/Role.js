/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 09:56:20
 */
import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import { reqRoles, reqAddRole, reqAddAuth } from '../../api';
import AddRole from './AddRole';
import AddAuth from './AddAuth';
import memoryUtil from '../../utils/memoryUtil'

function Role(props) {
    const [roles, setRoles] = useState([])
    const [targetRole, setTargetRole] = useState({})
    const [menus, setMenus] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(0)//
    const [authModalVisible, setAuthModalVisible] = useState(false)//
    useEffect(() => {
        getRoles()
    }, [])
    const addRoleRef = useRef()
    const addAuthRef = useRef()
    const getRoles = async _ => {
        const res = await reqRoles()
        res.status === 0 ? setRoles(res.data) : message.error(res.msg)
    }
    const handleModalCancel = () => setAddModalVisible(0)
    const handleModalOk = () => {
        //进行表单验证
        addRoleRef.current.validateFields()
            .then(async role => {
                const res = await reqAddRole(role);
                if (res.data) {
                    message.success('添加角色成功')
                    // getRoles() 这种方式少发送一次请求
                    setRoles([res.data, ...roles])
                    setAddModalVisible(0)

                } else {
                    message.error(res.msg)
                }

            })
    }
    const handleAuthOk = async _ => {
        //_id menus auth_time auth_name 
        const res = await reqAddAuth({
            menus,
            auth_time: Date.now(),
            _id: targetRole._id,
            auth_name: memoryUtil.user.username
        })
        if (res.data) {
            message.success(`已为【${targetRole.name}】重新设置权限`)
            setAuthModalVisible(false)
            //重新加载角色列表
            getRoles()
        } else {
            message.error(res.msg)
        }

    }
    const setAuth = role => {
        setAuthModalVisible(true)
        setTargetRole(role)
    }
    const getMenus = menus => setMenus(menus)
    const title = (
        <Button type='primary' onClick={() => setAddModalVisible(1)}>添加角色</Button>
    )
    const columns = [
        { title: '角色名称', dataIndex: 'name', align: 'center' },
        {
            title: '创建时间', dataIndex: 'create_time',
            render: create_time => create_time ? new Date(create_time).toLocaleString() : null,
            align: 'center'
        },
        {
            title: '授权时间', dataIndex: 'auth_time',
            render: auth_time => auth_time ? new Date(auth_time).toLocaleString() : null,
            align: 'center'
        },
        { title: '授权人', dataIndex: 'auth_name', align: 'center' },

        {
            title: '操作',
            width: 100,
            render: role => (
                <div>
                    <Button type='primary' onClick={() => setAuth(role)}>设置权限</Button>
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
                dataSource={roles}
                pagination={{ defaultPageSize: 6, showQuickJumper: true }}

            >
            </Table>
            <Modal
                title={'添加角色'}
                visible={!!addModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText='确定'
                cancelText='取消'
            >
                <AddRole ref={addRoleRef}></AddRole>
            </Modal>
            <Modal
                title={<h3>正在为<span style={{ margin: '0 5px', fontWeight: 'bold' }}>{targetRole.name}</span>设置权限</h3>}
                visible={authModalVisible}
                onOk={handleAuthOk}
                onCancel={() => setAuthModalVisible(false)}
                okText='确定'
                cancelText='取消'
            >
                <AddAuth role={targetRole} ref={addAuthRef} getMenus={getMenus}></AddAuth>
            </Modal>
        </Card>
    );
}

export default Role;