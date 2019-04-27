
import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AuthorAvatar from '../../../components/AuthorAvatar'
import axios from '../../../lib/axios'
import { random, groupBy, translateMarkdown } from '../../../lib'
import { Comment, Avatar, Button, Tooltip, Input, Icon, Popconfirm, message } from 'antd'
import moment from 'moment'

const { TextArea } = Input

@connect(state => ({
  username: state.user.username,
  userId: state.user.userId,
  auth: state.user.auth,
  colorMap: state.common.colorMap
}))
class CommentList extends Component {
  static propTypes = {
    commentList: PropTypes.array,
    articleId: PropTypes.number,
    setCommentList: PropTypes.func
  }

  state = {
    commentList: [],
    colorMap: {},
    commentId: 0,
    levelOneId: 0, // 一级激活 id 用于判断评论框的显示
    levelTwoId: 0, // 二级激活 id
    value: ''
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleKeyUp = e => {
    if (e.ctrlKey && e.keyCode === 13) {
      this.onSubmit()
    }
  }

  // 提交回复reply
  onSubmit = () => {
    const content = this.state.value.trim()
    if (!this.props.username) return message.warn('您未登陆，请登录后再试。')
    const { articleId } = this.props
    axios
      .post('/reply', {
        content,
        articleId,
        commentId: this.state.commentId
      })
      .then(res => {
console.log("in list-onSubmit-axios.post-reply...")
        console.log(res)
        this.props.setCommentList(res.rows)
        this.setState({ commentId: 0, levelOneId: 0, levelTwoId: 0, value: '' })
      })
  }

  // 删除评论或回复
  delComment = (item, commentId) => {
    console.log(item)
console.log(commentId)
    if (item.replies) {
      axios.delete('/comment/del', { params: { commentId: item.id } }).then(res => {
        if (res.code !== 200) return message.error(res.message)
        const list = this.props.commentList.filter(d => d.id !== item.id)
        console.log(list)
        this.props.setCommentList(list)
        message.success(res.message)
      })
    } else {
      axios.delete('/reply/del', { params: { replyId: item.id } }).then(res => {
        if (res.code !== 200) return message.error(res.message)
        const list = [...this.props.commentList]
        list.forEach(d => {
          if (d.id === commentId) d.replies = d.replies.filter(v => v.id !== item.id)
        })
        console.log(list)
        this.props.setCommentList(list)
        message.success(res.message)
      })
    }
  }

  // 判断回复框的状态：回复评论、回复评论中的回复，以
  openReply = (level, id, commentId) => {
    if (level === 1) {
      this.setState({ commentId: id, levelTwoId: 0, levelOneId: id })
    } else {
      this.setState({ levelOneId: 0, levelTwoId: id, commentId })
    }
  }

  // 生成用户头像
  renderAvatar = item => {
    const { userId, colorMap } = this.props
    if (item.userId === 1) return <AuthorAvatar /> // userId = 1 博主~~~
    /*if (item.userId === userId) {
      return <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    } else {*/
      return (
        <Avatar
          className="user-avatar"
          size="default"
          style={{ backgroundColor: colorMap[item.userId] || '#ccc' }}>
          {item.user && item.user.username}
        </Avatar>
      )
    //}
  }

  render() {
console.log(this.props)
    const { commentList, auth } = this.props
    const { levelOneId, value, levelTwoId } = this.state

    return (
      <div className="">
        {commentList.map(comment => (
          /* 评论列表的每一项 */
          <Comment
            key={comment.id}
            actions={[
              <span onClick={() => this.openReply(1, comment.id)}>Reply to</span>,
              <React.Fragment>
                {auth === 1 && (
                  <Popconfirm
                    title={'是否删除该评论？'}
                    cancelText="取消"
                    okText="确认"
                    onConfirm={() => this.delComment(comment, comment.id)}>
                    <Icon type="delete" className="icon-delete" />
                  </Popconfirm>
                )}
              </React.Fragment>
            ]}
            avatar={this.renderAvatar(comment)}
            author={<span>{comment.user && comment.user.username}</span>}
            content={
              <div
                className="article-detail"
                dangerouslySetInnerHTML={{ __html: translateMarkdown(comment.content) }}
              />
            }
            datetime={
              <Tooltip title={comment.createdAt}>
                <span>{moment(comment.createdAt).fromNow()}</span>
              </Tooltip>
            }
          >
            {/* 点击回复评论按钮后出现的回复框 */}
            {levelOneId === comment.id && (
              <div className="reply-form">
                <TextArea
                  placeholder={`回复${comment.user.username}...`}
                  value={value}
                  onChange={this.handleChange}
                  onKeyUp={this.handleKeyUp}
                />
                <div className="reply-form-controls">
                  <span className="tip">Ctrl or ⌘ + Enter</span>
                  <Button
                    htmlType="submit"
                    type="primary"
                    disabled={!value.trim()}
                    onClick={this.onSubmit}>
                    回复
                  </Button>
                </div>
              </div>
            )}
            {/* 每条评论的回复列表 嵌套Comment以实现 */}
            {comment.replies.map(reply => (
              <Comment
                key={reply.id}
                actions={[
                  <span onClick={() => this.openReply(2, reply.id, comment.id)}>Reply to</span>,
                  <React.Fragment>
                    {auth === 1 && (
                      <Popconfirm
                        title={'是否删除该评论？'}
                        cancelText="取消"
                        okText="确认"
                        onConfirm={() => this.delComment(reply, comment.id)}>
                        <Icon type="delete" className="icon-delete" />
                      </Popconfirm>
                    )}
                  </React.Fragment>
                ]}
                avatar={this.renderAvatar(reply)}
                author={<span>{reply.user && reply.user.username}</span>}
                content={<p>{reply.content}</p>}
                datetime={
                  <Tooltip title={reply.createdAt}>
                    <span>{moment(reply.createdAt).fromNow()}</span>
                  </Tooltip>
                }
              >
                {/* 点击回复回复按钮后出现的回复框 */}
                {levelTwoId === reply.id && (
                  <div className="reply-form">
                    <TextArea
                      placeholder={`回复${reply.user.username}...`}
                      value={value}
                      onChange={this.handleChange}
                      onKeyUp={this.handleKeyUp}
                    />
                    <div className="reply-form-controls">
                      <span className="tip">Ctrl or ⌘ + Enter</span>
                      <Button
                        htmlType="submit"
                        type="primary"
                        disabled={!value.trim()}
                        onClick={this.onSubmit}>
                        回复
                      </Button>
                    </div>
                  </div>
                )}
              </Comment>
            ))}
          </Comment>
        ))}
      </div>
    )
  }
}

export default CommentList

