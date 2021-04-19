import axios from '../helpers/axios';

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/product/${slug}`);
        console.log(res);
    } 
}