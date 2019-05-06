// redux/modules/index.js
import { combineReducers } from "redux";
import article from "./article";
import common from "./common";
import user from "./user";

// 合并所有模块的reducer成一个根reducer
const rootReducer = combineReducers({
    article,
    common,
    user
});

export default rootReducer;
