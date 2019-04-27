// redux/modules/index.js
import { combineReducers } from "redux";
import article from "./article";
import common from "./common";
import demo from "./demo";
import user from "./user";
//import users, { getUserById } from "./users";

// 合并所有模块的reducer成一个根reducer
const rootReducer = combineReducers({
    article,
    common,
    demo,
    user
});

export default rootReducer;
/*
export const getPostListWithAuthors = state => {
    //通过posts模块的getPostIds获取所有帖子的id
    const postIds = getPostIds(state);
    return postIds.map((id) => {
        //通过posts模块的getPostById获取每个帖子的详情
        const post = getPostById(state, id);
        //users模块的getUserById获取作者信息，并将作者信息合并到post对象中
        return { ...post, author: getUserById(state, id) };
    });
};

export const getPostDetail = (state, id) => {
    const post = getPostById(state, id);
    return post ? { ...post, author: getUserById(state, post.author) } : null;
};

export const getCommentsWithAuthors = (state, postId) => {
    const commentIds = getCommentIdsByPost(state, postId);
    if (commentIds) {
        return commentIds.map(id => {
            const comment = getCommentById(state, id);
            return { ...comment, author: getUserById(state, comment.author) };
        });
    } else {
        return [];
    }
};
*/
