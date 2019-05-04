import React, { Component } from 'react'
import { connect } from 'react-redux'
import { generateColorMap } from '../../../redux/modules/common'
import AuthorAvatar from '../../../components/AuthorAvatar'
import Comment from '../Comment'
import axios from '../../../lib/axios'
import { Divider, Rate, Icon } from 'antd'
import './index.less'

@connect(
  null,
  { generateColorMap }
)

class About extends Component {
  state = { commentList: [] }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = () => {
    axios.get('/comment/about').then(res => {
      console.log(res)
      this.props.generateColorMap(res.rows) // 生成头像的颜色匹配
      this.setState({ commentList: res.rows })
    })
  }

  setCommentList = commentList => this.setState({ commentList })

  render() {

    return (
      <div className="content-inner-wrapper about">
        <AuthorAvatar />
        <span className="desc">前端路漫漫其修远兮，吾将上下而求索</span>
        <Divider orientation="left">关于我</Divider>
        <ul className="about-list">
          <li>姓名：蔡晓铃</li>
          <li>学历：本科</li>
          <li>专业：软件工程</li>
          <li>
            联系方式：
            <Icon type="qq" /> 873798984
            <Divider type="vertical" />
            <i className="iconfont icon-email" />
            <a href="mailto:bbbellcai@163.com">bbbellcai@163.com</a>
          </li>
          <li>
            其他博客地址：
            <a target="_blank" rel="noreferrer noopener" href="https://segmentfault.com/blog/xiaoling">
              segmentfault
            </a>
            <Divider type="vertical" />
            <a target="_blank" rel="noreferrer noopener" href="https://github.com/bbbellC">
              github
            </a>
          </li>
          <li>
            技能点
            <ul>
              <li>
                HTML、CSS、Javascript：
                <Rate defaultValue={3} disabled />
              </li>
              <li>
                React技术栈：
                <Rate defaultValue={3} disabled />
              </li>
              <li>
                Node.js
                <Rate defaultValue={2.5} disabled />
              </li>
              <li>
                MySQL
                <Rate defaultValue={2} disabled />
              </li>
              <li>
                微信小程序
                <Rate defaultValue={3} disabled />
              </li>
            </ul>
          </li>

          <li>
            我这个人
            <ul>
              <li>喜欢书法、喜欢听歌、喜欢吃</li>
              <li>飞鸟与鱼的距离是天空与大海，而我与你之间的距离只一个email，欢迎交流~</li>
            </ul>
          </li>
        </ul>
        <Comment articleId={0} commentList={this.state.commentList} setCommentList={this.setCommentList} />
      </div>
    );
  }
}

export default About;

