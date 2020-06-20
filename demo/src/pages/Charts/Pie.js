/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-15 17:03:44
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-20 11:17:06
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react'
import { Card, Button } from 'antd'
function Pie(props) {
    const getOption = _ => {
        return {
            title: [
                {
                    text: '销量库存表',
                    link: 'https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts',
                    textStyle: { color: '#c23531' }
                },
                {
                    subtext: '销量表',
                    left: '16.67%',
                    top: '85%',
                    textAlign: 'center'
                }, {
                    subtext: '库存表',
                    right: '19.67%',
                    top: '85%',
                    textAlign: 'center'
                }],
            tooltip: {},

            series: [{
                name: '销量',
                type: 'pie',
                data: [
                    { name: "衬衫", value: 5 }, { name: "羊毛衫", value: 20 }, { name: "雪纺衫", value: 36 },
                    { name: "裤子", value: 10 }, { name: "高跟鞋", value: 20 }, { name: "袜子", value: 30 }],
                label: {
                    position: 'outer',
                    alignTo: 'none',
                    bleedMargin: 5
                },
                right: '66.6667%',
                top: 0,
                bottom: 0,
            },
            {
                name: '库存',
                type: 'pie',
                data: [
                    { name: "衬衫", value: 20 }, { name: "羊毛衫", value: 30 }, { name: "雪纺衫", value: 46 },
                    { name: "裤子", value: 20 }, { name: "高跟鞋", value: 40 }, { name: "袜子", value: 36 }],
                label: {
                    position: 'outer',
                    alignTo: 'none',
                    bleedMargin: 5
                },
                left: '50.6667%',
                top: 0,
                bottom: 0
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

export default Pie;