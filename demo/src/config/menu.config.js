import React from 'react'
import {
  HomeOutlined,
  AppstoreAddOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  PropertySafetyOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  LineChartOutlined
} from '@ant-design/icons'

const menuList = [
  {
    title: '首页', // 菜单标题名称
    path: '/home', // 对应的path
    // key: '/home', // 对应的path
    icon: <HomeOutlined />, // 图标名称
    public: true, // 公开的
  },
  {
    title: '商品',
    path: '/products',
    icon: <AppstoreAddOutlined />,
    children: [ // 子菜单列表
      {
        title: '品类管理',
        path: '/products/category',
        icon: <BarsOutlined />
      },
      {
        title: '商品管理',
        path: '/products/product',
        icon: <ToolOutlined />
      },
    ]
  },

  {
    title: '用户管理',
    path: '/user',
    icon: <UserOutlined />
  },
  {
    title: '角色管理',
    path: '/role',
    icon: <PropertySafetyOutlined />,
  },

  {
    title: '图形图表',
    path: '/charts',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱形图',
        path: '/charts/bar',
        icon: <BarChartOutlined />
      },
      {
        title: '折线图',
        path: '/charts/line',
        icon: <LineChartOutlined />
      },
      {
        title: '饼图',
        path: '/charts/pie',
        icon: <PieChartOutlined />
      },
    ]
  },
]

export default menuList