import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse



const renderCheckboxLists = () => genre.map((value,index) => (
    <React.Fragment key={index}>
        <Checkbox
            onChange
            type="checkbox"
            checked
        />
        <span>{value.name}</span>;
    </React.Fragment>
))

function CheckBox() {

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Genre" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
