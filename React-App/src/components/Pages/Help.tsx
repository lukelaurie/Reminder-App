import React from "react"; // we need this to make JSX compile
import Header from "../Header/Header";

const Help: React.FC = () => {
    return (
        <>
            <Header />
            <h1>Help</h1>

            <section>
                <h2>Appointments Page</h2>
                <p>
                    On the appointments page, you can manage your appointments. The functionalities include:
                </p>
                <ul>
                    <li>Clicking a button to fill out a form and add a new appointment.</li>
                    <li>Clicking a slot on the calendar to automatically add the start time for a new appointment.</li>
                    <li>Swapping between Month, Week and day view on the calender.</li>
                    <li>Viewing a list of all your appointments on the calendar.</li>
                    <li>Clicking on an appointment to see more information about it.</li>
                    <li>Deleting or updating an appointment if desired.</li>
                </ul>
            </section>

            <section>
                <h2>SMS Notifications</h2>
                <p>
                    Our appointment manager also includes SMS notifications:
                </p>
                <ul>
                    <li>When an appointment is scheduled, an SMS text message will be sent to the user notifying them of the appointment.</li>
                    <li>Reminder SMS messages will be sent out 3 days and 1 day before the appointment.</li>
                </ul>
            </section>
        </>
    );
};

export default Help;