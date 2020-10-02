import React, { useEffect, useState } from 'react';
import { Card, Col, Icon, Row } from 'antd';
import Axios from 'axios';

import './LandingPage.css';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import FileUpload from '../../utils/FileUpload';


function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(6);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({ continets: [], price: [] });
    const [FilterOpen, setFilterOpen] = useState(['0']);


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
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts([...response.data.products])
                    }
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
            loadMore: true,
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

    const showFilterResults = (filters) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        };

        getProducts(variables);
        setSkip(0);
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };

        newFilters[category] = filters;

        if (category === "price") {

        }

        showFilterResults(newFilters);
        setFilters(newFilters)
    }


    return (
        <div className="landingPage__container">
            <div className="landingPage__title">
                <h2>Let's Travel Anywhere <Icon type="rocket" /> </h2>
            </div>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox
                        handleFilters={filters => handleFilters(filters, "continents")}
                        FilterOpen={FilterOpen}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        handleFilters={filters => handleFilters(filters, "price")}
                        FilterOpen={FilterOpen}
                    />
                </Col>
            </Row>

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
