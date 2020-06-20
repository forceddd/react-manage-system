/*
 * @Descripttion:
 * @version:
 * @Author: forceddd
 * @Date: 2020-06-16 15:14:43
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-19 19:45:10
 */
import React, { useEffect, useState } from 'react';
import { reqProduct, reqCategory } from '../../api';
import { message, Card, Button, List } from 'antd';

function Detail(props) {
    const [product, setProduct] = useState({})
    let [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        const productId = props.match.params.id
        getProductInfo(productId)
    }, [props.match.params.id])
    const getProductInfo = async id => {
        const res = await reqProduct(id);
        if (res.status) {
            message.error(res.msg)
        } else {
            setProduct(res.data)

            const categoryId = res.data.categoryId;
            //根据分类id获取商品分类
            const cres = await reqCategory(categoryId)
            if (cres.status === 0) {
                setCategoryName(cres.data.name)

            }

        }
        /* 
         测试数据
        setProduct({
             name: 'react',
             desc: 'reactdesc',
             price: 18
         })
         setCategoryName('cres.data.name') */
    }
    const title = (
        <span>
            <Button type='link' style={{ fontSize: '24px', fontWeight: 200 }}
                onClick={() => {
                    //返回上一页
                    props.history.go(-1)
                }}
            >←</Button>
            <span style={{ fontSize: '24px' }}>{product.name}</span>
        </span>
    )
    return (
        <Card
            title={title}
        >
            <List>
                <List.Item
                    title={product.name}
                    itemLayout='vertical'
                >
                    <p >
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>商品名称：</span>
                        <span>{product.name}</span>
                    </p>
                </List.Item>
                <List.Item>
                    <p >
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>商品描述：</span>
                        <span>{product.desc}</span>
                    </p>
                </List.Item>
                <List.Item>
                    <p >
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>商品价格：</span>
                        <span>{product.price}</span>
                    </p>
                </List.Item>
                <List.Item>
                    <p >
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>所属分类：</span>
                        <span>{categoryName}</span>
                    </p>
                </List.Item>
                <List.Item style={{ display: product.imgs && product.imgs.length ? 'block' : 'none' }}>
                    <p >
                        {product.imgs && product.imgs.length ? product.imgs.map(
                            img => <img src={'http://localhost:5000/upload/' + img} alt='商品图片' key={img} style={{ width: '100px', margin: '0 10px' }}></img>
                        ) : null}
                    </p>
                </List.Item>
                <List.Item>
                    <List.Item.Meta
                        title={<div style={{ fontSize: '24px', fontWeight: 'bold' }}>商品详情：</div>}

                    /* product.detail是一个标签 需要使用dangerouslySetInnerHTML 防止xss攻击*/

                    >

                    </List.Item.Meta>
                    <div dangerouslySetInnerHTML={{ __html: product.detail }} ></div>


                </List.Item>
            </List>
        </Card>
    );
}

export default Detail;