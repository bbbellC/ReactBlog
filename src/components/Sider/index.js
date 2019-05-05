import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTags } from '../../redux/modules/article'
import axios from '../../lib/axios'
import avatar from '../../assets/me.jpg'
import { Divider, Tag, Icon } from 'antd'
import './index.less'

@connect(
  state => ({
    tagList: state.article.tagList,
    colorList: state.common.colorList
  }),
  { getTags }
)

class Sider extends Component {
  state = { articleList: [] }

  // 获取最新6篇文章
  componentDidMount() {
    this.props.getTags()

    axios
      .get('/article/getList', { params: { page: 1, pageSize: 6 } })
      .then(res => {
        this.setState({ articleList: res.rows })
      })
      .catch(err => {
      })

  }

  render() {
    const { tagList, colorList } = this.props
    const { articleList } = this.state
    return (
      <div className="sider-wrapper">
        <img src={avatar} className="sider-avatar" alt="" />
        <h2 className="name">晓铃檬</h2>
        <div className="title">奋斗·前端小白白</div>
        <div className="link-list">
          <div className="link-item">
            <Icon type="github" />
            <a target="_blank" rel="noreferrer noopener" href="https://github.com/bbbellC">
              github
            </a>
          </div>
          <div className="link-item">
            <i className="iconfont icon-iconsf-copy" style={{ color: '#009A61' }} />
            <a target="_blank" rel="noreferrer noopener" href="https://segmentfault.com/blog/xiaoling">
              segmentfault
            </a>
          </div>
        </div>
        <Divider orientation="left">新鲜出炉·文章</Divider>
        <ul className="recent-list">
          {articleList.map(a => (
            <li key={a.id}>
              <Link to={`/article/${a.id}`}>{a.title}</Link>
            </li>
          ))}
        </ul>
        <Divider orientation="left">小柠檬味·标签</Divider>
        <div className="tags-content">
          {tagList.map((tag, i) => (
            <Tag key={i} color={colorList[i] ? colorList[i] : colorList[Math.floor(Math.random() * colorList.length)]}>
              <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
            </Tag>
          ))}
        </div>
      </div>
    );
  }
}

export default Sider;

/*
<ul className="link-list">
  <li>
    <Icon type="github" />
    <a target="_blank" rel="noreferrer noopener" href="https://github.com/gershonv">
      github
    </a>
  </li>
  <li>
    <i className="iconfont icon-juejin" />
    <a target="_blank" rel="noreferrer noopener" href="https://juejin.im/user/5acac6c4f265da2378408f92">
      juejin
    </a>
  </li>
</ul>
*/

