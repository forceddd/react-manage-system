/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 10:41:50
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react'
import { Card, Button } from 'antd'
function Bar(props) {
    const getOption = _ => {
        return {
            title: {
                text: '销量库存表',
                link: 'https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts',
                textStyle: { color: '#c23531' }
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            },
            {
                name: '库存',
                type: 'bar',
                data: [20, 30, 40, 20, 40, 36]
            }]
        }
    }
    return (
        <Card
            title={<Button type='primary'>更新图表</Button>}
        >
            <ReactEcharts style={{ height: '450px' }} option={getOption()} />
        </Card>
    );
}

export default Bar;