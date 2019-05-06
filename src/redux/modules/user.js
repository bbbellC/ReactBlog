//redux-user
import jwtDecode from 'jwt-decode'
import axios from '../../lib/axios'
import { message } from 'antd'

// state
let initialState = {
  userId: 0,
  username: '',
  auth: 0,
  avatarColor: '#d19a66' // 用户头像颜色
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
  return dispatch =>
    axios.post('/login', { username, password }).then(res => {
      if (res.code === 200) {
        localStorage.setItem('token', res.token)
        dispatch({ type: types.USER_LOGIN, payload: { token: res.token } })
      } else {
        message.error(res.message)       
      }
      return res
    })
}
export const register = ({ username, password }) => {
  return dispatch =>
    axios.post('/register', { username, password }).then(res => {
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
  switch (type) {
    case types.USER_LOGIN:
      const { userId, username, auth } = jwtDecode(payload.token)
      return { ...state, userId, username, auth }

    case types.USER_LOGINOUT:
      return { id: 0, username: '', auth: 0, avatarColor: '#d19a66' }

    default:
      return state
  }
}

export default reducer

