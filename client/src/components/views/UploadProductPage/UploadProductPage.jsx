import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import './UploadProductPage.css';

const { Title } = Typography;
const { TextArea } = Input;


const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
]

const UploadProductPage = () => {

    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [priceValue, setPriceValue] = useState(0);
    const [continentValue, setConteinentValue] = useState(1);

    const onTitleChange = (e) => {
        setTitleValue(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescriptionValue(e.currentTarget.value)
    }

    const onPriceChange = (e) => {
        setPriceValue(e.currentTarget.value)
    }

    const onContinentChange = (e) => {
        setConteinentValue(e.currentTarget.value)
    }

    return (
        <div className="uploadProductPage__container">
            <div className="uploadProductPage__holder">
                <Title level={2}>Upload Travel Product</Title>
            </div>

            <Form onSubmit>
                {/** Dropzone */}

                <br />
                <br />
                <label htmlFor="title">Title</label>
                <Input
                    onChange={onTitleChange}
                    value={titleValue}
                    id="title"
                />

                <br />
                <br />
                <label htmlFor="description">Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={descriptionValue}
                    id="description"
                />

                <br />
                <br />
                <label htmlFor="price">Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={priceValue}
                    id="description"
                    tpye="price"
                />

                <br />
                <br />

                <select
                    onChange={onContinentChange}

                >
                    {Continents.map(item => (
                        <option
                            key={item.key}
                            value={item.key}
                        >
                            {item.value}
                        </option>
                    ))}
                </select>

                <br />
                <br />
                <Button

                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default UploadProductPage;
