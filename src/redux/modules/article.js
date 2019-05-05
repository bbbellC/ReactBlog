//redux-article
import axios from '../../lib/axios'

const initialState = {
    categoryList: [],
    tagList: [],
    recentList: []
}

//action types
export const types = {
    TAG_GETLIST: 'TAGS_GETLIST',
    CATEGORY_GETLIST: 'CATEGORY_GETLIST'
};


//action creators
export const getTags = () => {
  return dispatch =>
    axios.get('/tags/getList').then(res => {
      dispatch({ type: types.TAG_GETLIST, payload: res.data })
    })
}
export const getCategories = () => {
  return dispatch =>
    axios.get('/categories/getList').then(res => {
      dispatch({ type: types.CATEGORY_GETLIST, payload: res.data })
    })
}

// reducers
const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.TAG_GETLIST:
            return { ...state, tagList: payload }
        case types.CATEGORY_GETLIST:
            return { ...state, categoryList: payload }
        default:
            return state;
    }
};
export default reducer;





