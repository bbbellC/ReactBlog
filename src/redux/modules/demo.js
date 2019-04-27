//redux-demo
import axios from '../../lib/axios'

// state
const initialtState = {
  count: 11,
  isLogin: false
}

//action types
export const types = {
  DEMO_ADD_COUNT: 'DEMO_ADD_COUNT',
  DEMO_LOGIN: 'DEMO_LOGIN',
  DEMO_LOGINOUT: 'DEMO_LOGINOUT',
  DEMO_REGISTER: 'DEMO_REGISTER'
};

// actions creators
export const addCount = () => {
  return { type: types.DEMO_ADD_COUNT }
}
export const login = ({ username, password }) => {
  return {
    type: types.DEMO_LOGIN
  }
}
export const register = ({ username, password }) => {
  return dispatch =>
    axios.post('/examples/register', { username, password }).then(res => {
      dispatch({
        type: types.DEMO_REGISTER
      })
    })
}
export const logout = () => ({
  type: types.DEMO_LOGINOUT
})

// reducer
export const demoReducer = (state = initialtState, action) => {
  switch (action.type) {
    case types.DEMO_ADD_COUNT:
      return { ...state, count: ++state.count }

    case types.DEMO_LOGIN:
      return { ...state, isLogin: true }

    case types.DEMO_LOGINOUT:
      return { ...state, isLogin: false }

    default:
      return state
  }
}

export default demoReducer

