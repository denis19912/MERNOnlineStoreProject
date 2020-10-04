import { Col, Row } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

import './DetailProductPage.css';
function DetailProductPage(props) {
    const [Product, setProduct] = useState([]);
    const productId = props.match.params.productId;
    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0]);
            })
    }, []);
    return (
        <div className="DetailProductPage__container">
            <div className="DetailProductPage__header">
                <h1>{Product.title}</h1>
            </div>
            <br />

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage