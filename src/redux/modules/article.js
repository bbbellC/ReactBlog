//redux-article
import axios from '../../lib/axios'

const initialState = {
    categoryList: [],
    tagList: [],
    recentList: []
}

//action types
export const types = {
    /*CREATE_POST: "POSTS/CREATE_POST", //新建帖子
    UPDATE_POST: "POSTS/UPDATE_POST", //修改帖子
    FETCH_ALL_POSTS: "POSTS/FETCH_ALL_POSTS", //获取帖子列表
    FETCH_POST: "POSTS/FETCH_POST",  //获取帖子详情*/
    TAG_GETLIST: 'TAGS_GETLIST',
    CATEGORY_GETLIST: 'CATEGORY_GETLIST'
};


//action creators
export const getTags = () => {
  return dispatch =>
    axios.get('/tags/getList').then(res => {
console.log("in axios.get('/tags/getList')..");
console.log(res.data);
      dispatch({ type: types.TAG_GETLIST, payload: res.data })
    })
}

export const getCategories = () => {
  return dispatch =>
    axios.get('/categories/getList').then(res => {
console.log("in axios.get('/categories//getList')..");
console.log(res.data);
      dispatch({ type: types.CATEGORY_GETLIST, payload: res.data })
    })
}
/*export const actions = {
    getTags: () => {
        return (dispatch) => {
            axios.get('/tags/getList').then(res => {
console.log("in axios.get('/tags/getList')..");
console.log(res.data);
                dispatch({ type: types.TAG_GETLIST, payload: res.data })
            })
        };
    },
    getCategories: () => {
        return (dispatch) => {
            axios.get('/categories/getList').then(res => {
console.log("in axios.get('/categories//getList')..");
console.log(res.data);
      		dispatch({ type: types.CATEGORY_GETLIST, payload: res.data })
    	    })
	};
    }
}*/


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

// selectors
/*
export const getPostIds = state => state.posts.allIds;

export const getPostList = state => state.posts.byId;

export const getPostById = (state, id) => state.posts.byId[id];
*/





