import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import logo from '../../assets/images/logo192.png'
import './index.css'
import menuList from '../../config/menu.config'
const { SubMenu } = Menu;
const { Sider } = Layout;
@withRouter //使一个普通的组件具有路由的属性 location等
class LeftNav extends Component {

    //根据menuList 产生menu的jsx
    getMenu = menuList => {
        //保存默认显示的defaultSelectedKeys
        this.defaultSelectedKeys = this.props.location.pathname;
        return menuList.map((menu, i) => {

            if (menu.children) {
                //保存defaultOpenKeys 当前subMenu中有子项的path是当前跳转的路由path，则需要默认展开这一个subMenu
                if (menu.children.some(item => item.path === this.defaultSelectedKeys)) (this.defaultOpenKeys = menu.path);
                return (<SubMenu key={menu.path} icon={menu.icon} title={menu.title}>
                    {/* 递归 */}
                    {this.getMenu(menu.children)}
                </SubMenu>)
            } else {
                return (<Menu.Item key={menu.path} icon={menu.icon}>
                    <Link to={menu.path}><span>{menu.title}</span></Link>
                </Menu.Item>)
            }
        })
    }
    UNSAFE_componentWillMount() {
        //在render之前 会被加载一次
        this.menu = this.getMenu(menuList)
    }
    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <h2 style={{ display: this.props.collapsed ? 'none' : 'block' }}>后台管理</h2>

                </div>
                <Menu
                    defaultSelectedKeys={[this.defaultSelectedKeys]}
                    defaultOpenKeys={[this.defaultOpenKeys]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menu}
                </Menu>
            </Sider>
        );
    }
}

export default LeftNav;