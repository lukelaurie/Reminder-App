import React, { useState } from "react"; 
import DateDropdown from "./DateDropDown";
import DateRange from "./DateRange";

import "../../styles/dateStyles.css";

interface Props {
    onDateChange: (newView: string) => void;
}
const ButtonNav: React.FC<Props> = ({ onDateChange }) => {

    const resetDay = () => {
        console.log("TODO");  
    }

    const addAppointment = () => {
        console.log("TODO"); 
    }

    return (
        <div className="dateChange">
            <span className="dateChoice">
                <button onClick={resetDay} className="buttonDate">Day</button>
                <DateDropdown onDateChange={onDateChange} />
            </span>
            <DateRange />
            <button onClick={addAppointment} className="buttonDate">Add Appointment</button>
        </div>
    );
};

export default ButtonNav;