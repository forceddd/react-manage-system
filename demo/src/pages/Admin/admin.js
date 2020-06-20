/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 16:18:11
 */
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import memoryUtil from '../../utils/memoryUtil';
import { Layout } from 'antd';

import LeftNav from '../../components/LeftNav';
import Home from '../Home/Home';
import Category from '../Category/Category';
import Product from '../Product/Product';
import Role from '../Role/Role';
import User from '../User/User';
import Bar from '../Charts/Bar';
import Pie from '../Charts/Pie';
import Line from '../Charts/Line';
import NoMatch from '../404/NoMatch';
import MHeader from '../../components/MHeader'
import Add from '../Product/Add';
import Detail from '../Product/Detail';
import { connect } from 'react-redux';
import { mapState, mapDispatch } from '../../store/user.reducer';

const { Content, Footer } = Layout;
@connect(mapState, mapDispatch)
class Admin extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        //从内存中读取user 判断是否登陆
        return this.props.user._id ?
            (
                <Layout style={{ minHeight: '100vh' }}>
                    {/* 侧边栏 */}
                    <LeftNav collapsed={this.state.collapsed} ></LeftNav>
                    {/* 右边主体 */}
                    <Layout className="site-layout">
                        <MHeader collapsed={this.state.collapsed} toggle={this.toggle}></MHeader>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '5px',
                                minHeight: 280,
                            }}
                        >
                            {/* 配置路由 */}
                            <Switch>
                                {/* app中已经配置过 */}
                                {/* <Redirect exact from='/' to='/home'></Redirect> */}
                                <Route path='/home' component={Home}></Route>
                                <Route path='/products/category' component={Category}></Route>
                                <Route path='/products/product' component={Product} /* {...this.props} */></Route>
                                <Route path='/products/addProduct' component={Add}></Route>
                                <Route path='/products/detail/:id' component={Detail}></Route>
                                <Route path='/role' component={Role}></Route>
                                <Route path='/user' component={User}></Route>
                                <Route path='/charts/bar' component={Bar}></Route>
                                <Route path='/charts/pie' component={Pie}></Route>
                                <Route path='/charts/line' component={Line}></Route>
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
                    </Layout>
                </Layout>
            )
            : (<Redirect to='/'></Redirect>);
    }
}

export default Admin;