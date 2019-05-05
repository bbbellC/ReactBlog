import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, register } from '../../redux/modules/user'
import { closeAuthModal } from '../../redux/modules/common'
import { Modal, Input, Icon, Button, Form } from 'antd'

const FormItem = Form.Item

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
      if (errors) return
      const { type } = this.state
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
        title={type == 'login' ? '登录' : '注册'}
        width={320}
        footer={null}
        onCancel={this.handleClose}
        visible={loginModalVisible || registerModalVisible}>
        <Form onSubmit={this.handleSubmit} layout="horizontal">
          {/*<FormBuilder meta={formMeta} form={this.props.form} />*/}
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入您的账号!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" block htmlType="submit">
              {type == 'login' ? '登录' : '注册'}
            </Button>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AuthModel)
