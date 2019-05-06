import React, { Component, Fragment } from 'react'
import './index.less'
import axios from '../../../lib/axios'
import { connect } from 'react-redux'
import { translateMarkdown, getCommentsCount } from '../../../lib'
import { generateColorMap } from '../../../redux/modules/common'
import Loading from '../../../components/Loading'
import Tags from './Tags'
import Comment from './Comment'
import { Drawer, Icon, Divider } from 'antd'

@connect(
  state => ({
    windowWidth: state.common.windowWidth,
    drawerVisible: state.common.drawerVisible
  }),
  { generateColorMap }
)
class Article extends Component {
  state = {
    title: '',
    content: '',
    tags: ['react', 'javascript'],
    categories: [],
    postTime: '2019-01-01',
    commentList: [],
    loading: true
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.fetchData(id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const id = nextProps.match.params.id
      this.fetchData(id)
    }
  }

  fetchData = id => {
    this.setState({ loading: true })
    axios
      .get(`/article/${id}`)
      .then(res => {
        const content = translateMarkdown(res.data.content)
        const { title, createdAt, tags, categories, comments } = res.data
        this.props.generateColorMap(comments)
        this.setState({
          tags,
          categories,
          content,
          title,
          postTime: createdAt.slice(0, 10),
          commentList: comments,
          loading: false
        })
      })
      .catch(err => {
        this.props.history.push('/404')
      })
  }

  setCommentList = commentList => this.setState({ commentList })

  render() {
    const { title, tags, categories, content, postTime, commentList, loading } = this.state
    const articleId = parseInt(this.props.match.params.id)
    return (
      <div className="content-inner-wrapper article">
        {loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div className="post-header">
              <h1 className="post-title">{title}</h1>
              <div className="others">
                <i className="iconfont icon-fabuzhiwei" />
                &nbsp; 发表于 &nbsp;
                <span>{postTime}</span>
                <Tags type="tags" list={tags} />
                <Tags type="categories" list={categories} />
                <Divider type="vertical" />
                <Icon type="message" style={{ marginRight: 7 }} />
                {getCommentsCount(commentList)}
              </div>
            </div>
            <div className="article-detail" dangerouslySetInnerHTML={{ __html: content }} />
            <Comment articleId={articleId} commentList={commentList} setCommentList={this.setCommentList} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default Article

