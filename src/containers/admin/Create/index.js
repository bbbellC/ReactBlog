import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTags, getCategories } from '../../../redux/modules/article'
import Checkable from './Checkable'
import axios from '../../../lib/axios'
import { translateMarkdown } from '../../../lib/index'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './index.less'
import { Button, Input, Modal } from 'antd'
//import { Button, Input, Modal, BackTop } from 'antd'
@connect(
  state => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList
  }),
  { getTags, getCategories }
)

class Create extends Component {
  state = {
    mdeValue: '',
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

  handleSubmit = () => {
    const categories = this.cateCheck.getChecked()
    const tags = this.tagCheck.getChecked()
    let data = {
      title: this.state.title,
      content: this.state.mdeValue,
      categories,
      tags
    }
    if (this.state.isEdit) {

    } else {
      axios.post('/article/create', data).then(res => {
        Modal.confirm({
          title: '成功创建文章！去看看吧！',
          onOk: () => this.props.history.push(`/article/${res.data.id}`),
	  okText: "好的",
          cancelText: "不啦"
        })
      })
    }
  }

  render() {
    const { title, value, isEdit } = this.state
    const { categoryList, tagList } = this.props

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
          ref={(c) => {this.cateCheck = c}}
        />
        <Checkable
          type="tag"
          list={tagList}
          isEdit={isEdit}
          ref={(c) => {this.tagCheck = c}}
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
        <Button onClick={this.handleSubmit} type="primary">
          {isEdit ? '更新' : '创建'}
        </Button>
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

