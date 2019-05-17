import React, { Component } from 'react'
import { Route } from "react-router-dom";
import { Layout } from 'antd'
import AdminSider from '../Sider'
import Create from '../Create'

const { Sider, Content, Footer } = Layout

class AdminHome extends Component {
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


