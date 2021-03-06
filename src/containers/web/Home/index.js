import React, { Component, Fragment } from 'react'
import './index.less'
import { connect } from 'react-redux'
import { Icon, Divider, Empty } from 'antd'
import axios from '../../../lib/axios'
import { translateMarkdown, decodeQuery, getCommentsCount } from '../../../lib'
import Tags from '../Article/Tags'
import Loading from '../../../components/Loading'
import MyPagination from './MyPagination'

const NoDataDesc = ({ keyword }) => (
  <Fragment>
    抱歉~找不到标题中含有 <span className="keyword">{keyword}</span> 的文章鸭！
  </Fragment>
)

@connect(
  state => ({
    drawerVisible: state.common.drawerVisible,
    windowWidth: state.common.windowWidth
  })
)
class Home extends Component {
  state = { list: [], total: 0, loading: false, pageSize: 10 }

  componentDidMount() {
    const params = decodeQuery(this.props.location.search)
    this.fetchList(params)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      const params = decodeQuery(nextProps.location.search)
      this.fetchList(params)
    }
  }

  fetchList({ page, keyword }) {
    this.setState({ loading: true })
    axios
      .get('/article/getList', { params: { page, pageSize: 10, title: keyword } })
      .then(res => {
	      const list = res.rows
        // 处理 read more 的内容
        list.forEach(item => {
          let index = item.content.indexOf('<!--more-->')
          item.description = translateMarkdown(item.content.slice(0, index))
        })
        this.setState({ list, total: res.count, loading: false })
      })
      .catch(err => {
	      this.setState({ loading: false })
      })
  }

  // 跳转到文章详情
  jumpTo = id => {
    this.props.history.push(`/article/${id}`)
  }

  handlePageChange = page => {
    document.querySelector('.content-wrapper').scrollTop = 0
    let params = { ...decodeQuery(this.props.location.search), page }

    let url
    Object.entries(params).forEach(item => {
      url = !url ? `?${item[0]}=${item[1]}` : `${url}&${item[0]}=${item[1]}`
    })
    this.props.history.push(url)
  }

  render() {
    const { list, total, loading, pageSize } = this.state
    const { page, keyword } = decodeQuery(this.props.location.search)
    return (
      <div className="content-inner-wrapper home">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <ul className="ul-list">
              {list.map(item => (
                <li key={item.id} className="ul-list-item">
                  <Divider orientation="left">
                    <span className="title" onClick={() => this.jumpTo(item.id)}>
                      {item.title}
                    </span>
                    <span className="create-time">{item.createdAt.slice(0, 10)}</span>
                  </Divider>

		              <div
                    onClick={() => this.jumpTo(item.id)}
                    className="article-detail description"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  <div className="list-item-action">
                    <Icon type="message" style={{ marginRight: 7 }} />
                    {getCommentsCount(item.comments)}
                    <Tags type="tags" list={item.tags} />
                    <Tags type="categories" list={item.categories} />
                  </div>
                </li>
              ))}
            </ul>
            {list.length > 0 ? (
              <Fragment>
                {list.length < total && (
                  <MyPagination current={parseInt(page) || 1} onChange={this.handlePageChange} total={total} pageSize={pageSize} />
                )}
              </Fragment>
            ) : (
              <div className="no-data">
                <Empty description={<NoDataDesc keyword={keyword} />} />
              </div>
            )}
          </Fragment>
        )}
      </div>
    )
  }
}

export default Home

