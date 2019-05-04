import React, { Component, Fragment } from 'react'
import {Input, Tooltip, Icon, Tag } from 'antd'


//@connect(state => state.article)
class Edit extends Component {
  state = {
    list: [], //新输入的标签/类别列表
    inputVisible: false,  //输入框可见
    inputValue: ''  //输入框值
  }

  //删除某个新增的项
  handleClose = removedItem => {
    const list = this.state.list.filter(t => t !== removedItem)
    this.setState({ list })
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    let { inputValue, list } = this.state
    const commonList = this.props.commonList

    if (inputValue && !list.includes(inputValue) && !commonList.includes(inputValue)) {
      list = [...list, inputValue]
    }
    this.setState({
      list,
      inputVisible: false,
      inputValue: ''
    })
  }

  //显示input框
  handleShow = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  //保存当前input框指向，以用于focus
  saveInputRef = input => (this.input = input)

  render() {
    //console.log(this.props);
    const { list, inputVisible, inputValue } = this.state
    return (
      <Fragment>
        {list.map((item, index) => {
          const isTooLong = item.length > 20
          const newItem = (
            <Tag key={item} closable afterClose={() => this.handleClose(item)} color="#ee8d66">
              {isTooLong ? `${item.slice(0, 20)}...` : item}
            </Tag>
          )
          return isTooLong ? (
            <Tooltip title={item} key={item}>
              {newItem}
            </Tooltip>
          ) : (
            newItem
          )
        })}

        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}

        {!inputVisible && (
          <Tag onClick={this.handleShow} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> 添加
          </Tag>
        )}
      </Fragment>
    )
  }
}

export default Edit

