import { Button, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react'
import './ProductInfo.css';
function ProductInfo(props) {
    const [Product, setProduct] = useState([]);
    console.log(props.detail);
    useEffect(() => {
        if (props.detail) {
            setProduct(props.detail);
        }
    }, [props.detail])

    const addToCartHandler = () => {
        props.addToCart(props.detail._id);
    }
    return (
        <div>
            <Descriptions title="Product info" >
                <Descriptions.Item label="Price" >{Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold" >{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View" >{Product.views}</Descriptions.Item>
                <Descriptions.Item label="Description" >{Product.description}</Descriptions.Item>
                <div className="ProductInfo__spacer"></div>
            </Descriptions>
            <div className="ProductInfo__addToCart">
                <Button size="large" shape="round" type="danger" onClick={addToCartHandler}>Add to Cart</Button>
            </div>
        </div>
    )
}

export default ProductInfo