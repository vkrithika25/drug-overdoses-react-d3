import React, { useState } from "react"
import "../App.css"

const orange = '#ff7a00';
const pink = '#d60063';
const grey = '#e1e1e1';

export default function Filter(props) {
    console.log(props.selectedColors)

    const [syringeColor, setSyringeColor] = useState(orange)
    const [facilityColor, setFacilityColor] = useState(pink)

    function handleOrangeCircleClick() {
        props.filterClickHandler('SYRINGE')
        if (syringeColor === orange) {
            setSyringeColor(grey)
            if (facilityColor === grey) {
                setFacilityColor(pink);
            }
        } else {
            setSyringeColor(orange)
        }
    }

    function handlePinkCircleClick() {
        props.filterClickHandler('FACILITY')
        if (facilityColor === pink) {
            setFacilityColor(grey)
            if (syringeColor === grey) {
                setSyringeColor(orange);
            }
        } else {
            setFacilityColor(pink)
        }    
    }

    return (
        <div className="Filter">
            <h1>Filter</h1>
            <div className="options">
                <span className="dot" style={{ backgroundColor: syringeColor }} onClick={handleOrangeCircleClick}>
                    <h4>{props.selectedColors.includes('SYRINGE') ? "ON" : "OFF"}</h4>
                </span>
                <p className="legend-description">drug abuse facilities accepting Medicaid per 1000 people</p>
                <span className="dot" style={{ backgroundColor: facilityColor }} onClick={handlePinkCircleClick}>
                    <h4>{props.selectedColors.includes('FACILITY') ? "ON" : "OFF"}</h4>
                </span>
                <p className="legend-description">syringe exchange facilities per 1000 people</p>
            </div>
        </div>
    )
}