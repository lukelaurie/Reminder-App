import React, { useState } from "react"; 

interface Props {
    onDateChange: (newView: string) => void;
}

const DateDropdown: React.FC<Props> = ({ onDateChange }) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [curView, setCurView] = useState("Daily"); 

    // toggle the dropdown between open andclosed 
    const toggleDropdown = () => {setIsOpen(!isOpen)}

    const adjustView = (newView: string): void => {
        setIsOpen(false);
        // checks if the table needs to be updated 
        if (curView !== newView) {
            setCurView(newView);
            onDateChange(newView);
        }
    }
    return (
        <div className="dateDropDown">
            <button onClick={toggleDropdown}>{curView}</button>
            {isOpen && (
                <div>
                    <button onClick={() => {adjustView("Daily")}}>Daily</button>
                    <button onClick={() => {adjustView("Weekly")}}>Weekly</button>
                    <button onClick={() => {adjustView("Monthly")}}>Monthly</button>
                </div>
            )}
        </div>
    );
};

export default DateDropdown;