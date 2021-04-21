import axios from '../helpers/axios';
import { productsConstants } from './constants';

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/product/${slug}`);
        // console.log(res);
        if (res.status === 200) {
            dispatch({
                type: productsConstants.GET_ALL_PRODUCT_SLUG,
                payload: res.data
            })
        }else{
            // dispatch({
            //     type: productsConstants.GET_ALL_PRODUCT_SLUG,
            // })
        }
    } 
}