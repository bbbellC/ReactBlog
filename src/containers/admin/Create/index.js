import React, { Component } from 'react'
import { connect } from 'react-redux'

//import SimpleMDE from 'simplemde'
//import 'simplemde/dist/simplemde.min.css'
//import './index.less'
//import { translateMarkdown } from '@/lib/index'
//import axios from '@/lib/axios'

import { Button, Input, Modal, BackTop } from 'antd'
//import SelectCate from './components/Cate'

@connect(state => state.article)
class Create extends Component {
  state = {
    value: '',
    title: '',
    tagList: [],
    categoryList: [],
    isEdit: false // 组件状态 更新或创建
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { title, value, categoryList, tagList, isEdit } = this.state
    return (
      <div className="edit">
        <div className="blog-formItem">
          <span className="label">标题：</span>
          <Input
            placeholder="请输入文章标题"
            className="title-input"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>

      </div>
    )
  }
}

export default Create

