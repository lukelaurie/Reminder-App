import React, { useState } from "react";
import PhoneNumberInput from "../CreateAccount/PhoneNumberInput";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "../../styles/addAppointmentStyles.css";

import { event } from "../../utils/Event";

interface Props {
    onSubmit: (
        startDate: Date,
        endDate: Date,
        notes: string,
        clientName: string,
        clientPhoneNumber: string | undefined
    ) => void;
    curEvent: event | null;
}

const AppointmentForm: React.FC<Props> = ({ onSubmit, curEvent }) => {
    const [startDate, setStartDate] = useState<Date | undefined | null>(
        curEvent?.start
    );
    const [endDate, setEndDate] = useState<Date | undefined | null>(
        curEvent?.start
    );
    const [notes, setNotes] = useState(curEvent?.notes || "");
    const [clientName, setClientName] = useState(curEvent?.title || "");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");

    const handlePhoneNumberChange = (value: string | undefined) => {
        setPhoneNumber(value);
    };

    const sendSubmission = (event: React.FormEvent): void => {
        event.preventDefault();
        // verify they are not null before sending the request
        if (startDate && endDate) {
            onSubmit(startDate, endDate, notes, clientName, phoneNumber);
        } else {
            alert("Please include the start and end date");
        }
    };

    return (
        <>
            <form className="appointmentForm">
                <label className="modal-label" htmlFor="startDate">
                    Start Date:{" "}
                </label>
                {/* star and end date */}
                <DateTimePicker
                    className="date-picker"
                    onChange={setStartDate}
                    value={startDate}
                    disableClock={true}
                />
                <br></br>
                <label className="modal-label" htmlFor="endDate">
                    End Date:{" "}
                </label>
                <DateTimePicker
                    className="date-picker"
                    onChange={setEndDate}
                    value={endDate}
                    disableClock={true}
                />
                <br></br>

                {/* remaining text fillouts for user */}
                <label className="modal-label" htmlFor="clientName">
                    Client Name:{" "}
                </label>
                <input
                    type="text"
                    id="clientName"
                    placeholder="Enter Client Name"
                    value={clientName}
                    className="appoint-form-input"
                    required
                    onChange={(event) => setClientName(event.target.value)}
                />

                <label className="modal-label" htmlFor="clientPhoneNumber">
                    Client Phone Number:{" "}
                </label>
                <PhoneNumberInput
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    phoneType="form"
                />

                <label className="modal-label" htmlFor="notes">
                    Notes:{" "}
                </label>
                <textarea
                    id="notes"
                    placeholder="Enter Notes"
                    value={notes}
                    className="appoint-form-input"
                    required
                    onChange={(event) => setNotes(event.target.value)}
                />

                <input
                    className="modal-sumbmit"
                    type="submit"
                    onClick={sendSubmission}
                />
            </form>
        </>
    );
};

export default AppointmentForm;
