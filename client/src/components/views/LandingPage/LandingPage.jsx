import React, { useEffect, useState } from 'react';
import { Card, Col, Icon, Row } from 'antd';
import Axios from 'axios';

import './LandingPage.css';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider/ImageSlider';
function LandingPage() {
    const [Products, setProducts] = useState([]);
    useEffect(() => {
        Axios.post('/api/product/getProducts')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products);

                    console.log(response.data.products)
                } else {
                    alert("Failed to fetch product data");
                }
            })
    }, [])

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
            <div className="landingPage__loadMore">
                <button>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
