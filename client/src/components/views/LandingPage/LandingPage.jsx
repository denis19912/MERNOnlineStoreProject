import React, { useEffect, useState } from 'react';
import { Card, Col, Icon, Row } from 'antd';
import Axios from 'axios';

import './LandingPage.css';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';
import FileUpload from '../../utils/FileUpload';
import SearchFeature from './Sections/SearchFeature';


function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(6);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({ continents: [], price: [] });
    const [FilterOpen, setFilterOpen] = useState(['0']);
    const [SearchTerms, setSearchTerms] = useState("");

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
                cover={
                    <a href={`/product/${product._id}`}><ImageSlider images={product.images}
                    /></a>
                }
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

    /**
     * Converts number key to array which has prices in 
     * for easier filtering.
     */
    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    /**
     * Handles continents and price filters.
     */
    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };

        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }

        console.log(newFilters);
        showFilterResults(newFilters);
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        };

        setSearchTerms(newSearchTerm);
        setSkip(0);
        getProducts(variables);
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
                        list={continents}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        handleFilters={filters => handleFilters(filters, "price")}
                        FilterOpen={FilterOpen}
                        list={price}
                    />
                </Col>
            </Row>
            <div className="landingPage__searchFilter">
                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />
            </div>

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
