import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class AdminSider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['article', 'user'];

  state = {
    openKeys: ['article'],
    selectedKeys: []
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    return (
      <div className="sibar-container" style={{ height: '100vh' }}>
        <Menu
          theme="light"
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={this.state.selectedKeys}
          onOpenChange={this.onOpenChange}
          onClick={({ key }) => this.setState({ selectedKeys: [key] })}
        >
          <SubMenu key="article" title={<span><Icon type="edit" /><span>文章管理</span></span>}>
            <Menu.Item key="article/create">
              <NavLink to="admin/article/create">
                <Icon type="edit" />
                <span>新增文章</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="article/manage">
              <NavLink to="admin/article/manage">
                <Icon type="folder" />
                <span>管理文章</span>
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="user">
            <NavLink to="admin/user">
              <Icon type="user" />
              <span>用户管理</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default AdminSider

