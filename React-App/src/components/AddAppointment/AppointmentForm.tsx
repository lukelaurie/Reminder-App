import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import "../../styles/addAppointmentStyles.css";

import { event } from "../../utils/Event";

interface Props {
    onSubmit: (startDate: Date, endDate: Date, notes: string, clientName: string, clientPhoneNumber: string) => void;
    curEvent: event | null;
}

const AppointmentForm: React.FC<Props> = ({ onSubmit, curEvent }) => {
    const [startDate, setStartDate] = useState<Date | undefined | null>(curEvent?.start);
    const [endDate, setEndDate] = useState<Date | undefined | null>(curEvent?.start);
    const [notes, setNotes] = useState(curEvent?.notes || "");
    const [clientName, setClientName] = useState(curEvent?.title || "");
    const [clientPhoneNumber, setClientPhoneNumber] = useState(curEvent?.clientPhoneNumber || "");

    const sendSubmission = (event: React.FormEvent): void => {
        event.preventDefault();
        // verify they are not null before sending the request
        if (startDate && endDate) {
            onSubmit(startDate, endDate, notes, clientName, clientPhoneNumber);
        } else {
            alert("Please include the start and end date")
        }
    }

    return (
        <>
            <form className='appointmentForm'>
                <label className="modal-label" htmlFor='startDate'>Start Date: </label>
                <DateTimePicker className="date-picker" onChange={setStartDate} value={startDate} disableClock={true} />
                <br></br>
                <label className="modal-label" htmlFor='endDate'>End Date: </label>
                <DateTimePicker className="date-picker" onChange={setEndDate} value={endDate} disableClock={true} />
                <br></br>
                
                <label className="modal-label" htmlFor='notes'>Notes: </label>
                <input type='text' id='notes' placeholder='Enter Notes' value={notes} className='appoint-form-input' required onChange={(event) => setNotes(event.target.value)} />

                <label className="modal-label" htmlFor='clientName'>Client Name: </label>
                <input type='text' id='clientName' placeholder='Enter Client Name' value={clientName} className='appoint-form-input' required onChange={(event) => setClientName(event.target.value)} />

                <label className="modal-label" htmlFor='clientPhoneNumber'>Client Phone Number: </label>
                <input type='text' id='clientPhoneNumber' placeholder='Enter Client Phone Number' value={clientPhoneNumber} className='appoint-form-input' required onChange={(event) => setClientPhoneNumber(event.target.value)} />

                <input className="modal-sumbmit" type="submit" onClick={sendSubmission} />
            </form>
        </>
    );
};

export default AppointmentForm;