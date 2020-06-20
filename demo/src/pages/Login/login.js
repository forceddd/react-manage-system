import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg'
import './login.css'
import NormalLoginForm from './LoginForm';
class Login extends Component {
    render() {
        return (
            <div className='login'>
                <header className="login-header">
                    <img src={logo} alt="后台管理图标" />
                    <h1>React后台管理系统</h1>
                </header>
                <main className='login-content'>
                    <h2>用户登录</h2>
                    <NormalLoginForm {...this.props}></NormalLoginForm>
                </main>


            </div>
        );
    }
}

export default Login;