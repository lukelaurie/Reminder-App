import React, { useState, useEffect } from "react";
import Header from "../Header/Header";

const Home: React.FC = () => {
    const [dayTime, setDaytime] = useState("Morning");
    const [userName, setUserName] = useState("name");
    const [companyName, setCompanyName] = useState("companyName");
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [nextAppointmentClient, setNextAppointmentClient] = useState(
        "nextAppointmentClient"
    );
    useEffect(() => {
        getUserData();
        getTimeOfDay();
    }, []);

    const getUserData = () => {
        // fetch the associate information
        fetch("http://127.0.0.1:3000/retrieveAssociate", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setUserName(data["name"]);
            setCompanyName(data["companyName"]);
        });
    };

    const getTimeOfDay = () => {
        // get the appointments from the start to the end of the day 
        let startDate: Date = new Date();
        const curHours = startDate.getHours();
        startDate.setHours(0, 0, 0);
        let endDate: Date = new Date();
        endDate.setHours(23, 59, 59, 999);
        var dateRange: { startDateRange: Date; endDateRange: Date } = {
            startDateRange: startDate,
            endDateRange: endDate
        };
        // determine what time of day to show the user
        // if (curHours < 12) {

        // }
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
            console.log(data);
            
        });
    }
    return (
        <>
            <Header />
            <h1>Welcome to {companyName}'s Appointment Manager</h1>
            <h1>
                Good {dayTime}, {userName}!
            </h1>
            <h2>You have {appointmentCount} appointments today.</h2>
            {appointmentCount > 0 && (
                <h2>Your next appointment is with {nextAppointmentClient}.</h2>
            )}
        </>
    );
};

export default Home;
