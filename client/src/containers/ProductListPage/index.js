import React, { useEffect } from 'react';
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { getProductsBySlug } from "../../actions";

const ProductListPage = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        // console.log(match.params.slug);
        dispatch(getProductsBySlug(match.params.slug));
    }, [])


    return (
        <div>
            <Layout>

            </Layout>
        </div>
    )
}

export default ProductListPage;