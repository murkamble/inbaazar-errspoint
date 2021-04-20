import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions";
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

const ProductListPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5K: 'Under 5000',
        under10K: 'Under 10000',
        under20K: 'Under 20000',
        under30K: 'Under 30000',
        under40K: 'Under 40000',
        above40K: 'Above 40000',
    });

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, [])


    return (
        <Layout>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.match.params.slug} Mobile {priceRange[key]}</div>
                                <button>View All</button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <div className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                <span>4465</span>
                                                </div>
                                                <div className="productPrice">{product.price}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    );
                })
            }
        </Layout>
    )
}

export default ProductListPage;