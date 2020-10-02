import React, { useEffect, useState } from 'react';
import { Card, Col, Icon, Row } from 'antd';
import Axios from 'axios';

import './LandingPage.css';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider/ImageSlider';


function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(6);
    const [PostSize, setPostSize] = useState(0);


    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }
        getProducts(variables);
    }, [])

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    setProducts([...Products, ...response.data.products])
                    setPostSize(response.data.postSize);
                } else {
                    alert("Failed to fetch product data");
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
        }
        getProducts(variables);
        setSkip(skip);
    }

    const renderCards = Products.map((product, index) => {
        return (<Col lg={6} md={8} xs={24} key={index}>
            <Card
                hoverable={true}
                cover={<ImageSlider images={product.images} />}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>)
    });


    return (
        <div className="landingPage__container">
            <div className="landingPage__title">
                <h2>Let's Travel Anywhere <Icon type="rocket" /> </h2>
            </div>

            {/* {Filter} */}
            {/* {Search} */}

            {Products.length === 0 ?
                <div className="landingPage__noProducts">
                    <h2>No posts yet...</h2>
                </div>
                :
                <div className="landingPage__showProducts">

                    <Row gutter={[16, 16]}>

                        {renderCards}
                    </Row>
                </div>

            }
            {PostSize >= Limit &&
                <div className="landingPage__loadMore">
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }

        </div>
    )
}

export default LandingPage
