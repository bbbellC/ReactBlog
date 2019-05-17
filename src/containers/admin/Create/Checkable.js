import React, { Component } from 'react'
import SelfCheckable from './SelfCheckable'
import './index.less'
import { Tag } from 'antd'
const CheckableTag = Tag.CheckableTag

class Checkable extends Component {
  state = {
    commonList: [],
    selectList: []
  }

  shouldComponentUpdate(newProps, newState) {
    if (newProps.list.length > 0) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(newProps) {
    const { isEdit, list } = newProps
    if (list.length > 0) {
      if (!isEdit) {  //获取常用的分类、标签列表
        const commonList = list.sort((a, b) => b.count - a.count).map(l => l.name).slice(0, 10)
        let selectList = commonList[0] ? [commonList[0]] : []
        this.setState({
          commonList: commonList, //常用标签/类别的列表
          selectList: selectList //默认选中第一项
        })
      }
    }
  }

  //处理点击CheckableTag事件
  handleSelect = (value, checked) => {
    const { selectList } = this.state
    const nextSelectList = checked ? [...selectList, value] : selectList.filter(t => t !== value)
    this.setState({ selectList: nextSelectList })
  }

  getChecked = () => {
    const { selectList } = this.state
    const selfList = this.selfCateCheck.state.list
    return [...selectList, ...selfList]
  }

  render() {
    const { commonList, selectList } = this.state
    const { type } = this.props

    return (
      <div className="blog-formItem">
        <span className="label">{type === 'category' ? '分类' : '标签'}: </span>
        {commonList.map((item, i) => (
            <CheckableTag
              key={item}
              checked={selectList.includes(item)}
              onChange={checked => this.handleSelect(item, checked)}>
              {item}
            </CheckableTag>
          ))
        }
        <SelfCheckable commonList={this.props.list} ref={(c) => {this.selfCateCheck = c}} />
      </div>
    )
  }
}

export default Checkable

