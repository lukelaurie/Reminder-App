import React from "react"; // we need this to make JSX compile
import Header from "../Header/Header";
import "../../styles/helpStyles.css";

const Help: React.FC = () => {
    return (
        <>
    <Header />
    <div className="help-container">
        <h1 className="help-title">Help</h1>

        <section className="help-section">
            <h2 className="help-section-title">Appointments Page</h2>
            <p className="help-text">
                On the appointments page, you can manage your appointments. The functionalities include:
            </p>
            <ul className="help-list">
                <li>Clicking a button to fill out a form and add a new appointment.</li>
                <li>Clicking a slot on the calendar to automatically add the start time for a new appointment.</li>
                <li>Swapping between Month, Week and Day view on the calendar.</li>
                <li>Viewing a list of all your appointments on the calendar.</li>
                <li>Clicking on an appointment to see more information about it.</li>
                <li>Deleting or updating an appointment if desired.</li>
            </ul>
        </section>

        <section className="help-section">
            <h2 className="help-section-title">SMS Notifications</h2>
            <p className="help-text">
                Our appointment manager also includes SMS notifications:
            </p>
            <ul className="help-list">
                <li>When an appointment is scheduled, an SMS text message will be sent to the user notifying them of the appointment.</li>
                <li>Reminder SMS messages will be sent out 3 days and 1 day before the appointment.</li>
            </ul>
        </section>

        <section className="help-section">
            <h2 className="help-section-title">Navigation</h2>
            <p className="help-text">
                Learn how to navigate through the application:
            </p>
            <ul className="help-list">
                <li>Use the top menu to access different pages such as Home, Appointments, and Settings.</li>
                <li>Click on the logo at the top-left corner to return to the Home page.</li>
                <li>Use the side navigation bar to quickly access your appointments and notifications.</li>
            </ul>
        </section>

        <section className="help-section">
            <h2 className="help-section-title">Troubleshooting</h2>
            <p className="help-text">
                Common issues and how to solve them:
            </p>
            <ul className="help-list">
                <li>If you cannot see your appointments, try refreshing the page.</li>
                <li>Ensure that you have a stable internet connection.</li>
                <li>If SMS notifications are not being received, check if your inputted phone number is correct.</li>
                <li>For any technical issues, contact support at lukelaurie13@gmail.com.</li>
            </ul>
        </section>

    </div>
</>
    );
};

export default Help;
