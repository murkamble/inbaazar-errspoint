import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer
})

export default rootReducer;