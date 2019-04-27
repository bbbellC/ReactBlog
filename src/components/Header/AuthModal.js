import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Input, Icon, message, Button, Form } from 'antd'
import { login, register } from '../../redux/modules/user'
import { closeAuthModal } from '../../redux/modules/common'
//import FormBuilder from '@/components/helper/FormBuilder'
const FormItem = Form.Item
/*const formMeta = {
  elements: [
    {
      key: 'username',
      widget: (
        <Input placeholder="Username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
      ),
      rules: [{ required: true, message: 'Username is required' }]
    },
    {
      key: 'password',
      widget: (
        <Input placeholder="Password" type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
      ),
      rules: [{ required: true, message: 'Password is required' }]
    }
  ]
}*/
@connect(
  state => ({
    loginModalVisible: state.common.loginModalVisible,
    registerModalVisible: state.common.registerModalVisible
  }),
  { login, register, closeAuthModal }
)
class AuthModel extends Component {
  state = { type: 'login' } // 模态框类型

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loginModalVisible) return { type: 'login' }
    if (nextProps.registerModalVisible) return { type: 'register' }
    return null
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, values) => {
      console.log("in handleSubmit ...")
      if (errors) return
      const { type } = this.state
console.log(type)
      this.props[type](values).then(res => {
        if (res.code === 200) this.props.closeAuthModal(type)
      })
    })
  }

  handleClose = () => this.props.closeAuthModal(this.state.type)

  render() {
    const { type } = this.state
    const { loginModalVisible, registerModalVisible } = this.props
const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={type}
        width={320}
        footer={null}
        onCancel={this.handleClose}
        visible={loginModalVisible || registerModalVisible}>
        <Form onSubmit={this.handleSubmit} layout="horizontal">
          {/*<FormBuilder meta={formMeta} form={this.props.form} />*/}
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" block htmlType="submit">
              {type}
            </Button>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AuthModel)
