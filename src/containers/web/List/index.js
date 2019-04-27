import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from '../../../lib/axios'
import { Timeline, Pagination, Spin } from 'antd'
import './index.less'

class List extends Component {
  state = {
    list: [],
    type: 'category',
    total: 0,
    loading: false
  }

  // 请求数据
  componentDidMount() {
    const params = this.decodeQuery(this.props)
    console.log(params)
    this.setState({ type: params.type }, this.fetchList({ page: 1, ...params }))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      const params = this.decodeQuery(nextProps)
      this.fetchList({ page: 1, ...params })
    }
  }

  // 解析type是tag还是category，并返回参数name
  decodeQuery = props => {
    const type = props.location.pathname.includes('categories') ? 'categories' : 'tags'
    const name = props.match.params.name
    return { type, name }
  }

  // 获取该type（tag或者category）的文章
  fetchList = ({ page = 1, name, type}) => {
    this.setState({ loading: true })
    axios
      .get(`/${type}/getArticles`, { params: { page, pageSize: 15, name } })
      .then(res => {
        console.log(res)
        //
        this.setState({ list: res.rows, total: res.count, loading: false })
      })
      .catch(e => {
	console.log(e)	
	this.setState({ loading: false }) 
      })
  }

  render() {
console.log("in List.js ..")
    const { list, type, total, loading } = this.state
    const { name } = this.props.match.params
    console.log("list=")
    console.log(list)

    return (
      <div className="content-inner-wrapper list-page">
        <Spin tip="马不停蹄加载中..." spinning={loading}>
          <div className="timeline">
            <Timeline>
              <Timeline.Item>
                <h1 className="list-title">
                  {name}
                  <small className="type-name"> {type === 'categories' ? '类别' : '标签'}</small>
                </h1>
                <br />
              </Timeline.Item>
              {list.map(item => (
                <Timeline.Item key={item.id}>
                  <span style={{ fontSize: '13px', marginRight: '16px' }}>{item.createdAt.slice(5, 10)}</span>
                  <Link to={`/article/${item.id}`}>{item.title}</Link>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </Spin>
      </div>
    );
  }
}

export default List

