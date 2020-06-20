/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-19 21:47:18
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 09:25:06
 */
import React from 'react';

import { TreeSelect, Form, Input } from 'antd';
import menuList from '../../config/menu.config';

const { SHOW_PARENT } = TreeSelect;
const treeData = menuList.map(menu => menu.children
    ? { children: menu.children.map(m => ({ title: m.title, key: m.path, value: m.path })), title: menu.title, key: menu.path, value: menu.path }
    : ({ title: menu.title, key: menu.path, value: menu.path })
)

class AddAuth extends React.Component {
    state = {
        //默认权限是首页
        value: ["/home"],
    };
    onChange = value => this.setState({ value }, _ => this.props.getMenus(this.state.value));
    componentDidMount() {
        const value = this.props.role.menus ? [...this.state.value, ...this.props.role.menus] : this.state.value
        //挂载后要初始化获取一次menus
        this.setState({ value }, _ => this.props.getMenus(this.state.value))
    }
    render() {
        const tProps = {
            treeData,
            filterTreeNode: (value, node) => node.title.toLowerCase().includes(value.toLowerCase()),
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            // showCheckedStrategy: SHOW_PARENT,
            placeholder: '点击选择权限(可搜索)',
            style: {
                width: '100%',
            },
            treeDefaultExpandAll: true,
            allowClear: true,
            listHeight: 400,
        };
        return (

            <TreeSelect {...tProps} />

        );
    }
}

export default AddAuth;