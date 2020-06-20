/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-18 13:39:19
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-18 18:38:43
 */
import React from 'react';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        //已经上传的图片数组 
        fileList: [

        ],
    };
    //解决初始化渲染时，imgs为undefined 第二次更新时才有值的问题
    componentWillReceiveProps(nextProps) {
        //在此生命周期之中 可以在render之前 获取到新的props 从而设置state 渲染页面
        if (nextProps.imgs && nextProps.imgs.length) {
            const fileList = nextProps.imgs.map((name, i) => ({
                uid: -i,
                name,
                url: 'http://localhost:5000/upload/' + name,
                status: 'done'
            }))
            this.setState({ fileList })
        }
    }
    handleCancel = () => this.setState({ previewVisible: false });
    //在父组件中获取子组件 然后再调用此方法即可获取到图片名
    getImgs = () => this.state.fileList.map(img => img.name)
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    //上传图片时，触发的事件回调
    handleChange = ({ file, fileList }) => {
        //设置file中的name和url
        if (file.status === 'done') {
            //将file设置为fileList中的元素 以后可以从fileList中的name和url
            file = fileList[fileList.length - 1]
            const { name, url } = file.response.data
            file.name = name
            file.url = url
        }
        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/manage/img/upload"

                    name='image'//上传到后台的参数名
                    listType="picture-card"//上传列表的内建样式
                    fileList={fileList}//已经上传的图片列表
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall;