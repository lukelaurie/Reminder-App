import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import AppointmentFilloutModal from "../AddAppointment/AppointmentFilloutModal";
import ViewAppointment from "../AddAppointment/ViewAppointment";
import { event } from "../../utils/Event";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/appointmentStyles.css";

const localizer = momentLocalizer(moment);

// manages all events on the calender
const InitalEvents: event[] = [];

// manage the already seen dates so don't have to constantly make requests to backend
const rangesVisited: Set<string> = new Set<string>();
const idSeen: Set<string> = new Set<string>();

const ViewAppointments: React.FC = () => {
    const [events, setEvents] = useState<event[]>(InitalEvents);
    const [isApptOpened, setIsApptOpened] = useState(false);
    const [isViewApptOpened, setIsViewApptOpened] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [curClickedEvent, setCurClickedEvent] = useState<event | null>(null);
    const [curClickedMonth, setCurClickedMonth] = useState<number>(() => {
        const today = new Date();
        return today.getMonth();
    });

    useEffect(() => {
        modifyEvents(false);
    }, []);

    const removeApptFromEvent = (
        appointmentId: string | undefined,
        events: event[],
        setEvents: (events: event[]) => void
    ) => {
        for (const event of events) {
            // remove the event with the matching id
            if (event.appointmentId === appointmentId) {
                const newEvents = events.filter((val) => val !== event);
                setEvents(newEvents);
                idSeen.delete(appointmentId);
                return;
            }
        }
    };

    const getDateRange = (range: Date[] | { start: Date; end: Date }): { startDateRange: Date; endDateRange: Date } => {
        var dateRange: { startDateRange: Date; endDateRange: Date };

        // Determine which formate the date was passed in
        if (Array.isArray(range)) {
            let start: Date = range[0];
            let end: Date = range[range.length - 1];
            if (start === end) {
                // it is a single day view so set to the end of the day
                end = new Date(start);
                end.setHours(23, 59, 59, 999);
            }
            dateRange = {
                startDateRange: start,
                endDateRange: end,
            };
        } else {
            dateRange = {
                startDateRange: range.start,
                endDateRange: range.end,
            };
        }

        return dateRange;
    };

    const updateEvents = (range: Date[] | { start: Date; end: Date }, events: event[], setEvents: (events: event[]) => void, requestRequired: boolean, setCurClickedMonth: (month: number) => void): void => {
        var dateRange = getDateRange(range);

        // checks if a month swap was clicked
        if (!requestRequired) {
            const tempDate = new Date(dateRange["startDateRange"]);
            tempDate.setDate(tempDate.getDate() + 10);
            setCurClickedMonth(tempDate.getMonth());
        }

        // check if the events already exist
        let dateRangeStr: string =
            dateRange.startDateRange.toDateString() +
            dateRange.endDateRange.toDateString();
        if (!requestRequired && rangesVisited.has(dateRangeStr)) {
            return;
        }

        rangesVisited.add(dateRangeStr);
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
                let eventsInThisRange = [...events]; // make copt of current events
                for (let i = 0; i < data.length; i++) {
                    // check if the event needs to be added
                    if (idSeen.has(data[i]["appointmentId"])) {
                        eventsInThisRange = eventsInThisRange.filter(
                            (event) =>
                                event.appointmentId !== data[i]["appointmentId"]
                        );
                        idSeen.delete(data[i]["appointmentId"]);
                    }
                    idSeen.add(data[i]["appointmentId"]);

                    let newEvent: event = {
                        title: data[i]["clientName"],
                        start: new Date(data[i]["startDate"] * 1000),
                        end: new Date(data[i]["endDate"] * 1000),
                        notes: data[i]["notes"],
                        appointmentId: data[i]["appointmentId"],
                        associateUsername: data[i]["associateUsername"],
                        clientPhoneNumber: data[i]["clientPhoneNumber"],
                    };
                    eventsInThisRange.push(newEvent);
                }
                setEvents(eventsInThisRange);
            });
    };

    const modifyEvents = (requestRequired: boolean) => {
        // FInd the initial start and end range
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), curClickedMonth, 1);
        // modify days to account for prior Sunday
        monthStart.setDate(monthStart.getDate() - monthStart.getDay());
        const monthEnd = new Date(today.getFullYear(), curClickedMonth + 1, 0);
        // modify days to account for future Saturday
        monthEnd.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()));
        const range = { start: monthStart, end: monthEnd };
        updateEvents(
            range,
            events,
            setEvents,
            requestRequired,
            setCurClickedMonth
        );
    };

    const adjustAppointment = (adjustType: string, appointId: string | undefined) => {
        // determine how to handle the specific month types
        switch (adjustType) {
            case "delete":
                removeApptFromEvent(appointId, events, setEvents);
                break;
            case "update":
                modifyEvents(true);
                break;
            case "create":
                modifyEvents(true);
        }
    };

    // we remeber the current event so that we can diplay its informaiton for any event type
    const swapApptModal = (isModalOpened: boolean) => {
        // set to no active event
        if (!isUpdateMode) setCurClickedEvent(null);
        setIsApptOpened(!isModalOpened);
    };

    const swapViewApptApptModal = (isModalOpened: boolean) => {
        setIsViewApptOpened(!isModalOpened);
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        // open the appointment creation on the time slot
        let newEvent: event = {
            title: "",
            start: slotInfo.start,
            end: slotInfo.end,
            notes: "",
            appointmentId: "",
            associateUsername: "",
            clientPhoneNumber: "",
        };
        setCurClickedEvent(newEvent);
        setIsUpdateMode(false);
        setIsApptOpened(true);
    };

    const handleEventClick = (event: event) => {
        setCurClickedEvent(event);
        setIsViewApptOpened(true);
    };

    return (
        <div className="main-container">
            <Header />
            <button
                className="new-appt-button"
                onClick={() => {
                    setIsUpdateMode(false);
                    swapApptModal(isApptOpened);
                }}>
                Add New Appointment
            </button>
            {/* THe calender itself */}
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onRangeChange={(
                        range: Date[] | { start: Date; end: Date }
                    ) => {
                        updateEvents(range, events, setEvents, false, setCurClickedMonth);
                    }}
                    onSelectSlot={handleSelectSlot}
                    onDoubleClickEvent={handleEventClick}
                    selectable
                />
            </div>
            {/* The modals for appointment fillout and information */}
            <AppointmentFilloutModal
                isOpened={isApptOpened}
                swapModal={swapApptModal}
                curEvent={curClickedEvent}
                isUpdateMode={isUpdateMode}
                adjustAppointment={adjustAppointment}
            />
            <ViewAppointment
                isOpened={isViewApptOpened}
                swapViewModal={swapViewApptApptModal}
                swapApptModal={swapApptModal}
                setIsUpdateMode={setIsUpdateMode}
                isUpdateMode={isUpdateMode}
                curEvent={curClickedEvent}
                adjustAppointment={adjustAppointment}
            />
        </div>
    );
};

export default ViewAppointments;
