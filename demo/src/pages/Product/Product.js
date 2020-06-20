/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-16 15:02:35
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-18 15:36:27
 */
import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Select, Input, message } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { reqProducts, reqSearchProducts } from '../../api'
const { Option } = Select
const PAGE_SIZE = 4
let Product = props => {
    let [searchType, setSearchType] = useState('productName')
    let [searchValue, setSearchValue] = useState('')//搜索关键字
    let [products, setProducts] = useState([])
    let [total, setTotal] = useState(0)
    useEffect(() => {
        initProducts(1)
    }, [])
    const columns = [
        { title: '商品名称', dataIndex: 'name', key: 'name', align: 'center' },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc',
            align: 'center'
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: price => '￥' + price,
            align: 'center'
        },
        {
            title: '状态',
            width: 100,
            align: 'center',
            render: () => (
                <div >
                    <p>已下架</p>
                    <Button>
                        上架
                        </Button>
                </div>
            )
        },
        {
            title: '操作',
            width: 100,
            align: 'center',
            render: (product) => (
                <div>
                    <Button type='link'
                        onClick={() => {
                            //跳转到详情页
                            props.history.push('/products/detail/' + product._id)

                        }}
                    >详情</Button>
                    <Button type='link'
                        onClick={() => {
                            //跳转到修改页面
                            props.history.push({
                                pathname: '/products/addProduct',
                                search: '?productId=' + product._id,
                                state: { action: 'update' }
                            })
                        }}
                    >修改</Button>
                </div>
            )
        },
    ]
    //获取商品的函数
    /**
     * @name: 
     * @test: test font
     * @msg: 
     * @param {type} 
     * @return: 
     */
    const initProducts = async (pageNum, pageSize = PAGE_SIZE) => {
        const res = await reqProducts(pageNum, pageSize)
        if (res.status) {
            message.error(res.msg)
        } else {
            setTotal(res.data.total);
            setProducts(res.data.list)

        }
    }
    /**
     * @description: 搜索商品的函数
     * @param { searchType, searchValue }
     * @return: undefined
     */
    const search = async ({ searchType, searchValue }) => {
        const res = await reqSearchProducts({ pageNum: 1, pageSize: PAGE_SIZE, searchType, searchValue });
        if (res.status) {
            message.error(res.msg)
        } else {
            setProducts(res.data.list)
            setTotal(res.data.total)
        }
    }
    const extra = (
        <Button type='primary' icon={<PlusOutlined />}
            onClick={() => {
                //跳转到添加商品路由界面
                props.history.push('/products/addProduct')
            }}
        >
            添加
        </Button>
    )
    const title = (
        <div>
            <Select value={searchType} style={{ width: '150px' }}
                //option变化时 将对应的value值赋值给searchType
                onChange={value => setSearchType(value)}
            >
                <Option value='productName'>按名称检索</Option>
                <Option value='productDescription'>按描述检索</Option>
            </Select>
            <Input
                placeholder='关键字'
                style={{ width: '150px', margin: '0 20px' }}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <Button
                type='primary'
                icon={<SearchOutlined />}
                onClick={() => {
                    //发送搜索请求
                    search({ searchValue, searchType })
                }}
            >搜索</Button>
        </div>
    )
    return (
        <Card
            title={title}
            extra={extra}
        >

            <Table
                bordered
                columns={columns}
                dataSource={products}
                rowKey='_id'
                pagination={{
                    defaultPageSize: PAGE_SIZE, showQuickJumper: true, total,
                    onChange: initProducts
                }}
            >

            </Table>
        </Card>
    )
}
export default (Product)