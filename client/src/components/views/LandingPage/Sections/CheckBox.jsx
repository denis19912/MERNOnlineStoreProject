import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
    const [Checked, setChecked] = useState([]);
    const continents = props.list;

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
    }
    const renderCheckBoxList = () =>
        continents && continents.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox
                    onChange={() => handleToggle(value._id)}
                    type="checkbox"
                    checked={Checked.indexOf(value._id) === -1 ? false : true} />
                <span>{value.name}</span>
            </React.Fragment>

        ))


    return (
        <div>
            <Collapse defaultActiveKey={props.FilterOpen}>
                <Panel header="Continents" key="1">
                    {renderCheckBoxList()}
                </Panel>
            </Collapse>

        </div>
    )
}

export default CheckBox
