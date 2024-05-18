import React, { useState, useEffect } from "react";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';

interface Props {
    onSubmit: (startDate: Date, endDate: Date, notes: string, clientName: string, clientPhoneNumber: string) => void;
}

const AppointmentForm: React.FC<Props> = ({ onSubmit }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [notes, setNotes] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientPhoneNumber, setClientPhoneNumber] = useState("");

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
                <label htmlFor='startDate'>Start Date: </label>
                {/* <input type='text' id='startDate' placeholder='Enter Start Date' className='appointFormInput' required onChange={(event) => setStartDate(event.target.value)} /> */}
                <DateTimePicker onChange={setStartDate} value={startDate} disableClock={true} />
                <br></br>
                <label htmlFor='endDate'>End Date: </label>
                <DateTimePicker onChange={setEndDate} value={endDate} disableClock={true} />
                <br></br>
                
                <label htmlFor='notes'>Notes: </label>
                <input type='text' id='notes' placeholder='Enter Notes' className='appointFormInput' required onChange={(event) => setNotes(event.target.value)} />

                <label htmlFor='clientName'>Client Name: </label>
                <input type='text' id='clientName' placeholder='Enter Client Name' className='appointFormInput' required onChange={(event) => setClientName(event.target.value)} />

                <label htmlFor='clientPhoneNumber'>Client Phone Number: </label>
                <input type='text' id='clientPhoneNumber' placeholder='Enter Client Phone Number' className='appointFormInput' required onChange={(event) => setClientPhoneNumber(event.target.value)} />

                <input type="submit" onClick={sendSubmission} />
            </form>
        </>
    );
};

export default AppointmentForm;