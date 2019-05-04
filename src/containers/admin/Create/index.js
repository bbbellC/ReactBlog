import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTags, getCategories } from '../../../redux/modules/article'
import Checkable from './Checkable'
import { translateMarkdown } from '../../../lib/index'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './index.less'
//import SimpleMDE from 'simplemde'
//import 'simplemde/dist/simplemde.min.css'
//import './index.less'
//import { translateMarkdown } from '@/lib/index'
//import axios from '@/lib/axios'

import { Button, Input, Modal, BackTop } from 'antd'

@connect(
  state => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList
  }),
  { getTags, getCategories }
)

//@connect(state => state.article)
class Create extends Component {
  state = {
    mdeValue: '',
    value: '',
    title: '',
    tagList: [],
    categoryList: [],
    isEdit: false // 组件状态 更新或创建
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getTags()
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChange = value => {
    this.setState({ mdeValue: value });
  }

  render() {
    console.log(this.props);
    /*this.setState({
      tagList: this.props.tagList,
      categoryList: this.props.categoryList
    })
console.log(this.state)*/
    // const { title, value, isEdit, categoryList, tagList } = this.state
    const { title, value, isEdit } = this.state
    const { categoryList, tagList } = this.props
//console.log(categoryList)
//console.log(tagList)

    return (
      <div className="edit">
        <div className="blog-formItem">
          <span className="label">标题：</span>
          <Input
            placeholder="请输入文章标题"
            className="title-input"
            name="title"
            value={title}
            onChange={this.handleInputChange}
          />
        </div>
        <Checkable
          type="category"
          list={categoryList}
          isEdit={isEdit}
        />
        <Checkable
          type="tag"
          list={tagList}
          isEdit={isEdit}
        />
        <br />
        <SimpleMDE
          id="editor"
          value={this.state.mdeValue}
          onChange={this.handleChange}
          options={{
            autofocus: true,
            spellChecker: false,
            previewRender: translateMarkdown
          }}
        />
      </div>
    )
  }
}

export default Create

/*
,
previewRender(text) {
  return ReactDOMServer.renderToString(
    <ReactMarkdown
      source={text}
      renderers={{
        CodeBlock: CodeRenderer,
        Code: CodeRenderer
      }}
    />
  );
}
*/

