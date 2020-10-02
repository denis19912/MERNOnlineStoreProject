import React from 'react'
import { Carousel } from 'antd';
import './ImageSlider.css';

function ImageSlider(props) {
    const host = "http://localhost:5000/";
    return (
        <div className="imageSlider__container">
            <Carousel autoplay>
                {
                    props.images.map((image, index) => (
                        <div key={index}>
                            <img src={`${host}${image}`} alt="Product image" />
                        </div>
                    ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
