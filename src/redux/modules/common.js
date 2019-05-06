//redux-common
import { groupBy, random } from '../../lib'

const initialState = {
    colorList: ['orange', 'geekblue', 'magenta', 'purple', 'red', 'blue', 'volcano', 'gold', 'lime', 'green', 'cyan'], // 标签颜色
    loginModalVisible: false,
    registerModalVisible: false,
    windowWidth: 0,
    colorMap: {}
}

//action types
export const types = {
    AUTH_OPEN_AUTHMODAL: 'AUTH_OPEN_AUTHMODAL',
    AUTH_CLOSE_AUTHMODAL: 'AUTH_CLOSE_AUTHMODAL',
    COMMON_GET_WINDOW_WIDTH: 'COMMON_GET_WINDOW_WIDTH',
    COMMON_COLOR_MAP: 'COMMON_COLOR_MAP'
};

//action creators
/**
 * 打开对话框
 * @param {String} type login / register
 */
export const openAuthModal = type => {
  return { type: types.AUTH_OPEN_AUTHMODAL, payload: type }
}

export const closeAuthModal = type => {
  return { type: types.AUTH_CLOSE_AUTHMODAL, payload: type }
}

export const getWindowWidth = () => {
  const body = document.getElementsByTagName('body')[0]
  return { type: types.COMMON_GET_WINDOW_WIDTH, payload: body.clientWidth }
}

export const generateColorMap = commentList => ({
  type: types.COMMON_COLOR_MAP,
  payload: commentList // 生成头像的颜色匹配
})

// reducers
const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.AUTH_OPEN_AUTHMODAL:
          return { ...state, [`${payload}ModalVisible`]: true }

        case types.AUTH_CLOSE_AUTHMODAL:
          return { ...state, [`${payload}ModalVisible`]: false }

        case types.COMMON_GET_WINDOW_WIDTH:
          return { ...state, windowWidth: payload }

        case types.COMMON_COLOR_MAP:
          const list = groupBy(payload, item => item.userId)
          const colorList = state.colorList
          let colorMap = {}
          list.forEach(item => {
            colorMap[item[0].userId] = colorList[random(colorList)]
            item[0]['replies'].forEach(d => {
              if (!colorMap[d.userId]) colorMap[d.userId] = colorList[random(colorList)]
            })
          })
          return { ...state, colorMap }

        default:
          return state
    }
};

export default reducer;

