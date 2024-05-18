import React, { useState } from "react";
import Header from "../Header/Header";
import AddAppointmentButton from "../AddAppointment/AddAppointmentButton";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";

const localizer = momentLocalizer(moment);

type event = {
    title: string;
    start: Date;
    end: Date;
    notes: string;
    appointmentId: string;
    associateUsername: string;
    clientPhoneNumber: string;
}

const InitalEvents: event[] = [
    {
        title: "John Doe",
        start: new Date(2024, 5, 0),
        end: new Date(2024, 5, 0),
        notes: "test",
        appointmentId: "-1",
        associateUsername: "user",
        clientPhoneNumber: "555-555-5555"
    }
]



const updateEvents = (range: Date[] | { start: Date; end: Date }) => {
    var dateRange: { startDateRange: Date; endDateRange: Date };

    if (Array.isArray(range)) {
        dateRange = {
            startDateRange: range[0],
            endDateRange: range[1]
        }
    } else {
        dateRange = {
            startDateRange: range.start,
            endDateRange: range.end
        }
    }
    console.log("date range obj: " + JSON.stringify(dateRange));
    fetch("http://127.0.0.1:3000/retrieveAppointments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dateRange),
        credentials: "include",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {

            }
        });
};

const ViewAppointments: React.FC = () => {
    const [events, setEvents] = useState<event[]>(InitalEvents);

    return (
        <>
            <Header />
            <AddAppointmentButton />
            <div style={{ height: '500px' }}>
                <Calendar
                    localizer={localizer}
                    events={InitalEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onRangeChange={(range: Date[] | { start: Date; end: Date }) => {
                        updateEvents(range);
                    }}
                />
            </div>
        </>
    );
};

export default ViewAppointments;