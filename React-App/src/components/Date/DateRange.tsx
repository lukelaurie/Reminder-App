import React, { useState } from "react"; 
import "../../styles/dateStyles.css";

const DateRange: React.FC = () => {
    const moveDate = (dateDirection: string): void => {
        console.log("TODO");
        
    }
    return (
        <span className="dateRange">
            <button onClick={() => moveDate("left")}>left arrow</button>
            <h1>Jan 10 - 16, 2024</h1>
            <button onClick={() => moveDate("left")}>right arrow</button>
        </span>
    );
};

export default DateRange;