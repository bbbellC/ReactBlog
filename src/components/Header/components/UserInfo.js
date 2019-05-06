import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { register, logout } from '../../../redux/modules/user'
import { openAuthModal } from '../../../redux/modules/common'
import { Button, Dropdown, Avatar, Menu } from 'antd'
import AuthModal from './AuthModal'

@connect(
  state => ({
    username: state.user.username,
    avatarColor: state.user.avatarColor
  }),
  { register, logout, openAuthModal }
)
class UserInfo extends Component {
  renderAvatarDropdownMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span className="user-logout" onClick={this.props.logout}>
            注销
          </span>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    const { username, avatarColor } = this.props
    return (
      <div id="header-userInfo">
        {username ? (
          <Dropdown
            placement="bottomCenter"
            overlay={this.renderAvatarDropdownMenu()}
            trigger={['click', 'hover']}>
            <Avatar className="user-avatar" size="large" style={{ backgroundColor: avatarColor }}>
              {username}
            </Avatar>
          </Dropdown>
        ) : (
          <Fragment>
            <Button
              ghost
              type="primary"
              size="small"
              style={{ marginRight: 20 }}
              onClick={() => this.props.openAuthModal('login')}>
              登录
            </Button>
            <Button ghost type="primary" size="small" onClick={() => this.props.openAuthModal('register')}>
              注册
            </Button>
          </Fragment>
        )}

        <AuthModal />
      </div>
    )
  }
}

export default UserInfo
