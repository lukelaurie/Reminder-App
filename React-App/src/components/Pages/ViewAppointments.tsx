import React, { useState } from "react";
import Header from "../Header/Header";
import ButtonNav from "../Date/ButtonNav";
import DayTable from "../Table/DayTable";
import WeekTable from "../Table/WeekTable";
import MonthTable from "../Table/MonthTable";

const ViewAppointments: React.FC = () => {
    const [curView, setCurView] = useState("Daily");

    const updateTable = (newView: string): void => {
        setCurView(newView);
    }

    return (
        <>
            <Header />
            <ButtonNav onDateChange={updateTable} />
            <div>
                {curView === "Daily" && <DayTable />}
                {curView === "Weekly" && <WeekTable />}
                {curView === "Monthly" && <MonthTable />}
            </div>
        </>
    );
};

export default ViewAppointments;