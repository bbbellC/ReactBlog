//redux-user
import jwtDecode from 'jwt-decode'
import axios from '../../lib/axios'
import { message } from 'antd'

// state
let initialState = {
  userId: 0,
  username: '',
  auth: 0,
  avatarColor: '#52c41a' // 用户头像颜色
}

if (!!localStorage.getItem('token') && localStorage.getItem('token') !== "undefined") {
  const { userId, username, auth } = jwtDecode(localStorage.token)
  initialState = Object.assign(initialState, { userId, username, auth })
}

// action types
export const types = {
  USER_LOGIN: 'USER_LOGIN',
  USER_REGISTER: 'USER_REGISTER',
  USER_LOGINOUT: 'USER_LOGINOUT'
}

// action creators
export const login = ({ username, password }) => {
console.log("in login ..")
  return dispatch =>
    axios.post('/login', { username, password }).then(res => {
      //console.log(res.data)
      if (res.code === 200) {
        localStorage.setItem('token', res.token)
        dispatch({ type: types.USER_LOGIN, payload: { token: res.token } })
console.log("login success")
      } else {
console.log("login error..")
        message.error(res.message)       
      }
      return res
    })
}
export const register = ({ username, password }) => {
console.log("in register ..")
  return dispatch =>
    axios.post('/register', { username, password }).then(res => {
console.log(res)
      if (res.code === 200) message.success(res.message)
      else message.error(res.message)
      return res
    })
}
export const logout = () => {
  localStorage.removeItem('token')
  return { type: types.USER_LOGINOUT }
}

// reducer
export const reducer = (state = initialState, action) => {
  const { type, payload } = action
//console.log(type)
//console.log(payload)
  switch (type) {
    case types.USER_LOGIN:
      const { userId, username, auth } = jwtDecode(payload.token)
//console.log(userId)
//console.log(username)
//console.log(state)
      return { ...state, userId, username, auth }

    case types.USER_LOGINOUT:
      return { id: 0, username: '', auth: 0, avatarColor: '#52c41a' }

    default:
      return state
  }
}

export default reducer

