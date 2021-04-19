import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
        const res = await axios.get('/category/getcategories');
        console.log(res);
        if(res.status === 201){
            const { categoryList } = res.data;
            dispatch({ type: categoryConstants.GET_ALL_CATEGORY_SUCCESS, payload: { categories: res.data.categoriesList } });
        }else{
            dispatch({ type: categoryConstants.GET_ALL_CATEGORY_FAILURE, payload: { error: res.data.error } });
        }

    }
}
