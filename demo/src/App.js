/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 16:50:58
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './pages/Login/login';
import Admin from './pages/Admin/admin';
import memoryUtil from './utils/memoryUtil';
import { connect } from 'react-redux';
import { mapState, mapDispatch } from './store/user.reducer';
import storageUtil from './utils/storageUtil';
@connect(mapState, mapDispatch)
class App extends Component {
  UNSAFE_componentWillMount() {
    //刷新网页时，原来的redux会销毁，所以在此处要再次添加user  访问路由时，是从外向内访问的 所以要先在最外层的App中设置state--user，
    //否则在访问其他子路由时，获取不到user 会返回登录页面 
    this.props.setUser(storageUtil.user())
  }
  render() {
    return (

      <BrowserRouter>
        <Switch>
          {/* 如果已经登录 直接重定向到home组件 */}
          {/* 此处使用redux处理 
            
          */}
          <Redirect exact from='/' to={this.props.user._id ? '/home' : '/login'}></Redirect>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
          {/* {<Route component={NoMatch}></Route>} */}
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
