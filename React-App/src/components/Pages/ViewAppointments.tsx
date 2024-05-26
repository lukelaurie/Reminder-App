import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import AppointmentFilloutModal from "../AddAppointment/AppointmentFilloutModal";
import ViewAppointment from "../AddAppointment/ViewAppointment";

import { event } from "../../utils/Event";

import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";

const localizer = momentLocalizer(moment);

const InitalEvents: event[] = []



const updateEvents = (range: Date[] | { start: Date; end: Date }, setEvents: (events: event[]) => void) => {
    var dateRange: { startDateRange: Date; endDateRange: Date };

    if (Array.isArray(range)) {
        console.log("here " + range);
        let start: Date = range[0];
        let end: Date = range[range.length - 1];
        if (start === end) {
            // it is a single day view so set to the end of the day 
            end = new Date(start);
            end.setHours(23, 59, 59, 999);
        }
        dateRange = {            
            startDateRange: start,
            endDateRange: end
        }
    } else {
        console.log("other " + range);
        
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
            let eventsInThisRange: event[] = [];
            for (let i = 0; i < data.length; i++) {
                let newEvent: event = {
                    title: data[i]["clientName"],
                    start: new Date(data[i]["startDate"] * 1000),
                    end: new Date(data[i]["endDate"] * 1000),
                    notes: data[i]["notes"],
                    appointmentId: data[i]["appointmentId"],
                    associateUsername: data[i]["associateUsername"],
                    clientPhoneNumber: data[i]["clientPhoneNumber"]
                }
                eventsInThisRange.push(newEvent);
            }
            console.log(eventsInThisRange);
            setEvents(eventsInThisRange);
        });
};

const ViewAppointments: React.FC = () => {
    const [events, setEvents] = useState<event[]>(InitalEvents);
    const [isApptOpened, setIsApptOpened] = useState(false)
    const [isViewApptOpened, setIsViewApptOpened] = useState(false)
    const [curClickedDate, setCurClickedDate] = useState<Date | null>(null);
    const [curClickedEvent, setCurClickedEvent] = useState<event | null>(null);

    useEffect(() => {
        // FInd the initial start and end range
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const range = { start: monthStart, end: monthEnd }; 
        updateEvents(range, setEvents);
    }, [isApptOpened, isViewApptOpened])

    const swapApptModal = (isModalOpened: boolean) => {
        setIsApptOpened(!isModalOpened)
    }

    const swapViewApptApptModal = (isModalOpened: boolean) => {
        console.log(isViewApptOpened);
        
        setIsViewApptOpened(!isModalOpened)
    }

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        // open the appointment creation on the time slot
        setCurClickedDate(slotInfo.start) 
        setIsApptOpened(true);   
    }

    const handleEventClick = (event: event) => {
        setCurClickedEvent(event);
        setIsViewApptOpened(true);
    }

    return (
        <>
            <Header />
            <button onClick={() => swapApptModal(isApptOpened)}>Add New Appointment</button>
            <div style={{ height: '500px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onRangeChange={(range: Date[] | { start: Date; end: Date }) => {
                        updateEvents(range, setEvents);
                    }}
                    onSelectSlot={handleSelectSlot}
                    onDoubleClickEvent={handleEventClick}
                    selectable
                />
            </div>
            <AppointmentFilloutModal isOpened={isApptOpened} swapModal={swapApptModal} startingDate={curClickedDate} />
            <ViewAppointment isOpened={isViewApptOpened} swapModal={swapViewApptApptModal} curEvent={curClickedEvent} />
        </>
    );
};

export default ViewAppointments;