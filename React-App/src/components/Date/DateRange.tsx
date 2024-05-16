import React, { useEffect, useState } from "react";
import "../../styles/dateStyles.css";

interface Props {
    curView: string;
}

// Array of abbreviated month names
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DateRange: React.FC<Props> = ({ curView }) => {
    const [dateView, setDateView] = useState("Jan 10 - 16, 2024");
    const [moveAmount, setMoveAmount] = useState(0);

    useEffect(() => {
        moveDate("none", curView);
    }, [curView])

    const moveDate = (dateDirection: string, curView: string): void => {
        let newMoveAmount = moveAmount;
        if (dateDirection === "left") {
            newMoveAmount = moveAmount - 1;
        } else if (dateDirection === "right") {
            newMoveAmount = moveAmount + 1;
        }        
        setMoveAmount(newMoveAmount);
        switch (curView) {
            case "Daily":
                setDailyInfo(newMoveAmount);
                break;
            case "Weekly":
                setWeeklyInfo(newMoveAmount);
                break;
            default: 
                setMonthlyInfo(newMoveAmount);
                break;
        }
    };

    const setDailyInfo = (moveAmount: number): void => {
        // get the info to display from the interval        
        let intervalInfo = getDateInfoAtTimeStamp(findTimeStamp(true, moveAmount, 0));
        //setDateView(`${leftIntervalInfo[1]} ${leftIntervalInfo[0]} - ${rightIntervalInfo[0]}, ${leftIntervalInfo[2]}`);
    }

    const setWeeklyInfo = (moveAmount: number): void => {
        // find how many days to look left and right in the interval
        let displayInterval = getWeeklyInterval(findTimeStamp(true, 7 * moveAmount, 0));
        // get the info to display from the intervals        
        let leftIntervalInfo = getDateInfoAtTimeStamp(findTimeStamp(false, 7 * moveAmount, displayInterval[0]));
        let rightIntervalInfo = getDateInfoAtTimeStamp(findTimeStamp(true, 7 * moveAmount, displayInterval[1]));
        // determine the format to display the date in
        if (leftIntervalInfo[1] === rightIntervalInfo[1]) { // are monthes equal
            setDateView(`${leftIntervalInfo[1]} ${leftIntervalInfo[0]} - ${rightIntervalInfo[0]}, ${leftIntervalInfo[2]}`);
        } else if  (leftIntervalInfo[2] === rightIntervalInfo[2]) { // are years equal
            setDateView(`${leftIntervalInfo[1]} ${leftIntervalInfo[0]} - ${rightIntervalInfo[1]} ${rightIntervalInfo[0]}, ${leftIntervalInfo[2]}`);
        } else {
            setDateView(`${leftIntervalInfo[1]} ${leftIntervalInfo[0]} ${leftIntervalInfo[2]} - ${rightIntervalInfo[1]} ${rightIntervalInfo[0]}, ${rightIntervalInfo[2]}`);
        }
    }

    const setMonthlyInfo = (moveAmount: number): void => {
        // find how many days to look left and right in the interval
        let displayInterval = getWeeklyInterval(findTimeStamp(true, 7 * moveAmount, 0));
        // get the info to display from the intervals        
        let leftIntervalInfo = getDateInfoAtTimeStamp(findTimeStamp(false, 7 * moveAmount, displayInterval[0]));
        let rightIntervalInfo = getDateInfoAtTimeStamp(findTimeStamp(true, 7 * moveAmount, displayInterval[1]));
        // determine the format to display the date in
        if (leftIntervalInfo[1] === rightIntervalInfo[1]) { // are monthes equal
            setDateView(`${leftIntervalInfo[1]} ${leftIntervalInfo[0]} - ${rightIntervalInfo[0]}, ${leftIntervalInfo[2]}`);
        } else if  (leftIntervalInfo[2] === rightIntervalInfo[2]) { // are years equal
            setDateView(`${leftIntervalInfo[1]} ${leftIntervalInfo[0]} - ${rightIntervalInfo[1]} ${rightIntervalInfo[0]}, ${leftIntervalInfo[2]}`);
        } else {
            setDateView(`${leftIntervalInfo[1]} ${leftIntervalInfo[0]} ${leftIntervalInfo[2]} - ${rightIntervalInfo[1]} ${rightIntervalInfo[0]}, ${rightIntervalInfo[2]}`);
        }
    }

    return (
        <span className="dateRange">
            <button onClick={() => moveDate("left", curView)}>left arrow</button>
            <h1>{dateView}</h1>
            <button onClick={() => moveDate("right", curView)}>right arrow</button>
        </span>
    );
};

function getWeeklyInterval(timeStamp: number): number[] {
    let curDay = new Date(timeStamp);
    let day = curDay.getDay();
    // determine the interval to move forward and back from the cur day
    let backAmount = day;
    let forwardAmount = 6 - day;
    return [backAmount, forwardAmount];
}

function findTimeStamp(shouldLookForward: boolean, forwardAmount: number, dayMovement: number): number {
    // let moveAmount;
    // switch (forwardAmount) {
    //     case "Daily":
    //         moveAmount = 1;
    //         break;
    //     case "Weekly":
    //         moveAmount = 7
    // checks how many days to look forward and back
    if (shouldLookForward) {
        forwardAmount = forwardAmount += dayMovement;
    } else {
        forwardAmount = forwardAmount -= dayMovement;
    }
    let todayDate = new Date();
    // amount of time for one day in the future
    let dayAmount = 24 * 60 * 60 * 1000;
    let futureDate = new Date(todayDate.getTime() + forwardAmount * dayAmount);
    return futureDate.getTime();
}
function getDateInfoAtTimeStamp(timeStamp: number): string[] {
    let curDay = new Date(timeStamp);
    let day = curDay.getDate().toString(); // gets the day of the month
    let month = monthNames[curDay.getMonth()]; // finds the month at the correct index
    let year = curDay.getFullYear().toString();
    return [day, month, year];
}

export default DateRange;
