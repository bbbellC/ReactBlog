import React, { Component } from 'react'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class AdminSider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2'];

  state = {
    openKeys: ['sub1'],
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
          <SubMenu key="sub1" title={<span><Icon type="edit" /><span>文章管理</span></span>}>
            <Menu.Item key="1">新增文章</Menu.Item>
            <Menu.Item key="2">管理文章</Menu.Item>
          </SubMenu>
          <Menu.Item key="sub2"><span><Icon type="user" /><span>用户管理</span></span></Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default AdminSider

