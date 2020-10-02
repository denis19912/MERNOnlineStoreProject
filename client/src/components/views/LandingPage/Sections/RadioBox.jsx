import React, { useState } from 'react'
import { Collapse, Radio, Radion } from 'antd';
const { Panel } = Collapse;
const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "$0 to $199",
        "array": [0, 199]
    },
    {
        "_id": 2,
        "name": "$200 to $249",
        "array": [200, 249]
    },
    {
        "_id": 3,
        "name": "$250 to $279",
        "array": [250, 279]
    },
    {
        "_id": 4,
        "name": "$280 to $299",
        "array": [280, 299]
    },
    {
        "_id": 5,
        "name": "More than $300",
        "array": [300, 150000000]
    }
]



function RadioBox(props) {
    const [Value, setValue] = useState(0);

    const renderRadioBox = () => (
        price.map((value) => (
            <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value);

        props.handleFilter(event.target.value);
    }

    return (
        <div>
            <Collapse defaultActiveKey={props.FilterOpen}>
                <Panel header="Price" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
