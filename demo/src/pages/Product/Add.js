/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-16 15:14:11
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-19 15:26:44
 */
import React, { useState, useEffect, useRef } from 'react';
import {
    Form,
    Input,
    Select,
    Card,
    Button,
    message,
} from 'antd';
import { reqCategorys, reqProduct, reqAddUpdateProduct } from '../../api'
import qs from 'qs'
import PicturesWall from './PicturesWall';
import RichTextEditor from './RichTextEditor';
const { Option } = Select;
function Add(props) {
    //判断当前是否是提交页面
    const isAdd = !(props.location.state && props.location.state.action)
    const [categorys, setCategorys] = useState([])
    const [product, setProduct] = useState({})
    useEffect(() => {
        getCategorys()
        if (!isAdd) {
            //解析查询字符串
            const query = qs.parse(props.location.search, { ignoreQueryPrefix: true })
            // console.log(query.productId);//此处获取到了id
            getProduct(query.productId)
        }
    }, [isAdd])
    useEffect(() => {
        form.setFieldsValue({
            name: product.name,
            desc: product.desc,
            price: product.price,
            // categoryName: categorys.find(category => category._id === product.categoryId) && categorys.find(category => category._id === product.categoryId).name,
            categoryId: product.categoryId
        })
    }, [product])
    //用于获取图片墙对象 进而获取图片名
    const picturesWall = useRef()
    const productDetail = useRef()
    const getCategorys = async () => {
        const res = await reqCategorys();
        !res.status ? setCategorys(res.data) : message.error(res.msg)

    }
    /**
     * @desc: 根据商品id 获取当前要展示的商品
     * @param {type} 
     * @return: 
     */
    const getProduct = async id => {
        const res = await reqProduct(id);
        !res.status ? setProduct(res.data) : message.error(res.msg)

    }
    const title = (
        <span>
            <Button type='link' style={{ fontSize: '24px', fontWeight: 200 }}
                onClick={() => {
                    //返回上一页
                    props.history.go(-1)
                }}
            >←</Button>
            <span style={{ fontSize: '24px' }}>{isAdd ? '添加商品' : '修改商品'}</span>
        </span>
    )
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 3,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const [form] = Form.useForm();
    const onFinish = async values => {
        const imgs = picturesWall.current.getImgs();
        const detail = productDetail.current.getDetail()
        const targetProduct = { detail, imgs, ...values }
        if (!isAdd) {
            targetProduct._id = product._id
        }
        console.log(targetProduct);

        //提交数据到服务器
        const res = await reqAddUpdateProduct(targetProduct)
        if (res.status === 0) {
            message.success(isAdd ? '添加商品成功' : '修改商品成功')
            props.history.push('/products/product')
        } else {
            message.error('res.msg')
        }
    };
    return (
        <Card
            title={title}
        >
            <Form
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                /* initialValues={{
                    productName: product.name
                }} */
                scrollToFirstError
            >

                <Form.Item
                    name="name"
                    label='商品名称'
                    rules={[
                        {
                            required: true,
                            message: '商品名不能为空',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value) return value.trim() ? Promise.resolve() : Promise.reject('请输入商品名')
                            }
                        })
                    ]}
                >
                    <Input placeholder='商品名称' />
                </Form.Item>
                <Form.Item
                    name="desc"
                    label='商品描述'
                    rules={[
                        {
                            required: true,
                            message: '商品描述不能为空',
                        },
                    ]}
                >
                    <Input placeholder='商品描述' />
                </Form.Item>
                <Form.Item
                    name="price"
                    label='商品价格'
                    rules={[
                        {
                            required: true,
                            message: '请输入商品价格',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, price) {
                                if (price * 1 < 0) {
                                    return Promise.reject('商品价格不能为负数')
                                } else {
                                    return Promise.resolve()
                                }
                            }
                        }),
                    ]}
                >
                    <Input placeholder='商品价格（仅能输入数值）' type='number' addonAfter='元' />
                </Form.Item>
                <Form.Item
                    //?categoryId
                    name="categoryId"
                    label='商品分类'
                    rules={[
                        {
                            required: true,
                            message: '请选择商品分类',
                        }
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder='请选择一个商品分类'
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {categorys.length ? categorys.map(category => <Option value={category._id} key={category._id}>{category.name}</Option>) : null}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='商品展示'
                >
                    <PicturesWall ref={picturesWall} imgs={product.imgs}></PicturesWall>
                </Form.Item>
                <Form.Item
                    label='商品详情'
                >
                    <RichTextEditor ref={productDetail} detail={product.detail}></RichTextEditor>
                </Form.Item>
                <Form.Item {...tailFormItemLayout} >
                    <Button type='primary' htmlType='submit' style={{ width: '100px' }}>确认</Button>
                </Form.Item>

            </Form>
        </Card>
    );
}

export default Add;