import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse

function CheckBox(props) {
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];
        
        
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        // console.log("currIndex", currentIndex)
        // console.log("value", value)
        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 
    
    }
    // const renderCheckboxLists = () => genre.map((value,index) => (
    //     <React.Fragment key={index}>
    //         <Checkbox
    //             onChange
    //             type="checkbox"
    //             checked
    //         />
    //         <span>{value.name}</span>;
    //     </React.Fragment>
    // ))
    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            />
            <span>{value.name}</span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header= {props.name} key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
