import React, { Component } from 'react'
import './index.less'

import { Layout, Row, Col, Button } from 'antd'
import HeaderLeft from './HeaderLeft'
import Search from './Search'
import Nav from './Nav'
import UserInfo from './UserInfo'

const Header = Layout.Header

const navList = [
    {
        icon: 'home',
        title: '首页',
        link: '/'
    },
    {
        icon: 'edit',
        title: '归档',
        link: '/archives'
    },
    {
        icon: 'folder',
        title: '分类',
        link: '/categories'
    },
    {
        icon: 'user',
        title: '关于',
        link: '/about'
    }
]

const BlogHeader = () => {
    const responsiveLeft = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 }
    const responsiveRight = { xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 }
    return (
        <Header className="header-contaienr">
            <Row>
                <Col {...responsiveLeft}>
                    <HeaderLeft navList={navList} />
                </Col>
                <Col {...responsiveRight}>
                    <Search />
		    <UserInfo />
                    <Nav navList={navList} />
                </Col>
            </Row>
        </Header>
    )
}

export default BlogHeader


/*

@connect(
  state => ({
    auth: state.user.auth
  })
)

class BlogHeader extends React.Component
{
  render() {
    if (this.props.auth === 1) {
      navList.push({
          icon: 'home',
          title: '后台',
          link: '/admin'
      })
    }
    const responsiveLeft = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 }
    const responsiveRight = { xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 }
    return (
        <Header className="header-contaienr">
            <Row>
                <Col {...responsiveLeft}>
                    <HeaderLeft navList={navList} />
                </Col>
                <Col {...responsiveRight}>
                    <Search />
		    <UserInfo />
                    <Nav navList={navList} />
                </Col>
            </Row>
        </Header>
    )
  }
}
*/

