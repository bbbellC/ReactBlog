import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from '../../../lib/axios'
import { getCommentsCount } from '../../../lib'
import { openAuthModal } from '../../../redux/modules/common'
import { logout } from '../../../redux/modules/user'
import AuthorAvatar from '../../../components/AuthorAvatar'
import CommentList from './list'
import { Comment, Avatar, Form, Button, Divider, Input, Icon, Menu, Dropdown, message } from 'antd'
import './index.less'

const { TextArea } = Input
const Editor = ({ onChange, onSubmit, submitting, value, articleId }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} placeholder="天青色等烟雨，而我在等你..." onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <div className="controls">
        <i className="iconfont icon-tip-" />
        <span className="support-tip">支持 Markdown 语法</span>
        <Button className="" htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          {articleId !== 0 ? '添加评论' : '留言'}
        </Button>
      </div>
    </Form.Item>
  </div>
)

@connect(
  state => ({
    username: state.user.username,
    userId: state.user.userId,
    //auth: state.user.auth,
    colorMap: state.common.colorMap
  }),
  { openAuthModal, logout }
)


class ArticleComment extends Component {
  static propTypes = {
    articleId: PropTypes.number, // 文章 id，如果为 0 则是留言区！
    commentList: PropTypes.array, // 评论列表
    setCommentList: PropTypes.func
  }

  static defaultProps = {
    commentList: []
  }

  state = {
    submitting: false,
    value: ''
  }

  /**
   * 提交评论
   */
  handleSubmit = () => {
    if (!this.state.value) return
    if (!this.props.username) return message.warn('您未登陆，请登录后再试。')

    this.setState({ submitting: true })
    axios
      .post('/comment', { articleId: this.props.articleId, content: this.state.value })
      .then(res => {
        this.setState({ submitting: false, value: '' }, () => this.props.setCommentList(res.rows))
      })
      .catch(err => this.setState({ submitting: false }))
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleMenuClick = e => {
    switch (e.key) {
      case 'login':
        this.props.openAuthModal('login')
        break
      case 'register':
        this.props.openAuthModal('register')
        break
      case 'logout':
        this.props.logout()
        break
      default:
        break
    }
  }

  renderDropdownMenu = () => {
    const { username } = this.props
    return username ? (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">注销</Menu.Item>
      </Menu>
    ) : (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="login">登录</Menu.Item>
        <Menu.Item key="register">注册</Menu.Item>
      </Menu>
    )
  }

  render() {
    const { submitting, value } = this.state
    const { username, articleId, userId, commentList, colorMap } = this.props

    return (
      <div className="comment-wrapper">
        <div className="comment-header">
          <span className="count">{getCommentsCount(commentList)}</span>{' '}
          {articleId !== 0 ? '条评论' : '条留言'}
          <span className="menu-wrap">
            <Dropdown overlay={this.renderDropdownMenu()} trigger={['click', 'hover']}>
              <span>
                {username ? username : '未登录用户'} <Icon type="down" />
              </span>
            </Dropdown>
          </span>
          <Divider className="hr" />
        </div>

        <Comment
          avatar={
            username ? (
              <Fragment>
                {userId !== 1 ? (
                  <Avatar
                    className="user-avatar"
                    size="default"
                    style={{ backgroundColor: colorMap[userId] || '#d19a66' }}>
                    {username}
                  </Avatar>
                ) : (
                  <AuthorAvatar />
                )}
              </Fragment>
            ) : (
              <Icon type="github" theme="filled" style={{ fontSize: 40, margin: '5px 5px 0 0' }} />
            )
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              articleId={articleId}
            />
          }
        />

	      <CommentList
          commentList={commentList}
          articleId={articleId}
          setCommentList={this.props.setCommentList}
        />

      </div>
    )
  }
}

export default ArticleComment


/*
{userId !== 1 ? (
  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
) : (
  <AuthorAvatar />
)}
*/

