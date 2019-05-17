import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { groupBy } from '../../../lib'
import axios from '../../../lib/axios'
import { Timeline, Icon, Spin } from 'antd'
import './index.less'

class Archives extends Component {
  state = {
    list: [],
    total: 0,
    current: 1,
    loading: false
  }

  componentDidMount() {
    this.fetchList(1)
  }

  fetchList({ page = 1 }) {
    this.setState({ loading: true })

    axios
      .get('/article/getList', { params: { page, pageSize: 15 } })
      .then(res => {
        const list = groupBy(res.rows, item => item.createdAt.slice(0, 4))
        this.setState({ list, total: res.count, loading: false })
      })
      .catch(e => this.setState({ loading: false }))
  }

  render() {
    const { list, total, loading } = this.state
    return (
      <div className="archives content-inner-wrapper">
        <Spin tip="马不停蹄加载中..." spinning={loading}>
          <Timeline>
            {list.map((l, i) => (
              <Fragment key={i}>
                {i === 0 && (
                  <Timeline.Item>
                    <span className="desc">{`目前你已经写了 ${total} 篇文章。持之以恒，玉汝于成！`}</span>
                    <br />
                    <br />
                  </Timeline.Item>
                )}
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} >
                  <div className="year">
                    {l[0]['createdAt'].slice(0, 4)}
                  </div>
                  <br />
                </Timeline.Item>
                {l.map(item => (
                  <Timeline.Item key={item.id}>
                    <span style={{ fontSize: '13px', marginRight: '16px' }}>{item.createdAt.slice(5, 10)}</span>
                    <Link to={`/article/${item.id}`}>{item.title}</Link>
                  </Timeline.Item>
                ))}
              </Fragment>
            ))}
          </Timeline>

        </Spin>
      </div>
    );
  }
}

export default Archives;

