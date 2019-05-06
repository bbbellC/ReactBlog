import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getWindowWidth } from '../../../redux/modules/common'
import { Pagination } from 'antd'

@connect(
  state => ({
    windowWidth: state.common.windowWidth
  }),
  { getWindowWidth }
)

class MyPagination extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    pageSize: PropTypes.number
  }

  static defaultProps = {
    pageSize: 10
  }

  componentDidMount() {
    this.props.getWindowWidth()
  }


  render() {
    const { total, current, onChange, pageSize } = this.props
    console.log(this.props.windowWidth);
    return (
      <div className="pagination">
        <Pagination current={current} onChange={onChange} total={total}  pageSize={pageSize} simple={this.props.windowWidth < 736}/>
      </div>
    )
  }
}

export default MyPagination

