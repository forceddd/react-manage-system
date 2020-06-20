import React, { Component } from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Layout, Button, Modal, message } from 'antd'
import './index.css'
import storageUtil from '../../utils/storageUtil';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import menuList from '../../config/menu.config'
import { reqWeather } from '../../api';
//从react-redux引入connect 
import { connect } from 'react-redux'
//从reducer中引入map函数
import { mapState, mapDispatch } from '../../store/user.reducer';
const { Header } = Layout
const { confirm } = Modal

@connect(mapState, mapDispatch)
@withRouter
class MHeader extends Component {
    state = {
        currentTime: new Date().toLocaleString(),
        weather: {}
    }
    getTitle = (menus) => {
        let title = ''
        menus.forEach(menu => {
            if (menu.children && menu.children.length) {
                menu.children.forEach(i => {
                    if (i.path === this.props.location.pathname) title = i.title
                })
                /* title = this.getTitle(menu.children) */
            } else {
                if (menu.path === this.props.location.pathname) {
                    title = menu.title
                }
            }
        })
        return title
    }
    getWeather = async city => {
        try {
            const weather = await reqWeather(city);
            this.setState({
                weather,
            })
        } catch (error) {
            message.error('获取天气信息失败：' + error)
        }
    }
    logout = () => {
        confirm({
            title: '您确定要退出管理系统吗?',
            icon: <ExclamationCircleOutlined />,
            content: '退出后将立即跳转到登录页',
            okText: '是的',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                //移除本地信息
                storageUtil.user(null)
                /* //清空内存中的user信息
                this.props.user = null */
                //使用redux
                this.props.removeUser()
                //跳转到登录页
                this.props.history.push('/login')
            }
        });
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                currentTime: new Date().toLocaleString()
            })
        }, 1000);
        //发送jsonp 获取天气
        this.getWeather('温州');


    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        return (
            <div>
                <Header className="m-header" style={{ padding: 0, }}>

                    <aside className='header-left'>
                        {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.props.toggle,
                            color: '#666',
                            style: { fontSize: '18px' }
                        })}
                        <h2 className="header-title">{this.getTitle(menuList)}</h2>
                    </aside>
                    <aside className='header-user'>
                        <div className='currentTime'>{this.state.currentTime}</div>
                        <div className="weather">{this.state.weather.weather}&{this.state.weather.wind}</div>
                        <div className="userInfo">
                            欢迎{this.props.user.username}&ensp;&ensp;
                            <Button type='danger' size='small' onClick={this.logout}>退出</Button>
                        </div>

                    </aside>

                </Header>
            </div>
        );
    }
}

export default MHeader;