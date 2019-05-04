import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
//import PropTypes from 'prop-types'
import { Layout } from 'antd'
import AdminSider from '../Sider'
import Create from '../Create'
//import AdminHeader from '@/components/admin/header'

const { Sider, Header, Content, Footer } = Layout

class AdminHome extends Component {
  // static propTypes = {
  //   children: PropTypes.node
  // }

  state = { collapsed: false }

  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  render() {
    return (
      <div className="admin-container">
        <Layout>
          <Sider theme="light" collapsible trigger={null} collapsed={this.state.collapsed}>
            <AdminSider />
          </Sider>
          <Layout>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}>
              <Route path={`${this.props.match.path}/article/create`} component={Create} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>React-Admin ©2019 Created by bbbellCAI@163.com </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default AdminHome

/*
<Layout>
  <Header style={{ background: '#fff', padding: '0 16px' }}>
    <AdminHeader collapsed={this.state.collapsed} onToggle={this.toggle} />
  </Header>
  <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      background: '#fff',
      minHeight: 280
    }}>
    {this.props.children}
  </Content>
  <Footer style={{ textAlign: 'center' }}>React-Admin ©2019 Created by gershonv@163.com </Footer>
</Layout>
*/

