import categoryReducer from "./category.reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    category: categoryReducer,
})

export default rootReducer;