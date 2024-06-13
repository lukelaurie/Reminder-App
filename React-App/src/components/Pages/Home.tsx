import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "../../styles/homesStyles.css";

const Home: React.FC = () => {
    const [dayTime, setDaytime] = useState("");
    const [userName, setUserName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [nextAppointmentClient, setNextAppointmentClient] = useState("");

    // get the information about the user when the page is opened
    useEffect(() => {
        getUserData();
        getTimeOfDay();
    }, []);

    const getUserData = () => {
        // fetch the associate information
        fetch(
            "http://localhost:3000/retrieveAssociate",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUserName(data["name"]);
                setCompanyName(data["companyName"]);
            });
    };

    const getTimeOfDay = () => {
        // get the appointments from the start to the end of the day
        let startDate: Date = new Date();
        startDate.setHours(0, 0, 0);
        let endDate: Date = new Date();
        endDate.setHours(23, 59, 59, 999);
        var dateRange: { startDateRange: Date; endDateRange: Date } = {
            startDateRange: startDate,
            endDateRange: endDate,
        };
        const curDate: Date = new Date();
        const curHours: number = curDate.getHours();
        // determine what time of day to show the user
        if (curHours < 12) {
            setDaytime("Morning");
        } else if (curHours < 18) {
            setDaytime("Afternoon");
        } else {
            setDaytime("Evening");
        }
        fetch(
            "http://localhost:3000/retrieveAppointments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dateRange),
                credentials: "include",
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let appointmentTotal: number = 0;
                let prevSeen: Date | null = null;
                let clientName: string = "";
                // find the number of remaining appointments for the day
                for (let i = 0; i < data.length; i++) {
                    const eventDate = new Date(data[i]["startDate"] * 1000);
                    if (curDate < eventDate) {
                        appointmentTotal++;
                        // Checks for exisitng appointment and if new appointmetn is before existing
                        if (!prevSeen || prevSeen > eventDate) {
                            prevSeen = eventDate;
                            clientName = data[i]["clientName"];
                        }
                    }
                }
                setAppointmentCount(appointmentTotal);
                setNextAppointmentClient(clientName);
            });
    };
    return (
        <>
            <Header />
            {/* left panel */}
            <div className="home-container">
                <div className="home-information">
                    <h1 className="good-text">
                        Good {dayTime}, {userName}!
                    </h1>
                    <h2 className="appoints-text">
                        You have {appointmentCount} remaining appointments
                        today.
                    </h2>
                    {appointmentCount > 0 && (
                        <h2 className="appoints-text">
                            Your next appointment is with{" "}
                            {nextAppointmentClient}.
                        </h2>
                    )}
                </div>
                {/* right panel */}
                <div className="home-image">
                    <img src="sky.jpg" alt="sky-image" className="sky-image" />
                    <div className="home-overlay-text">
                        <h1 className="home-large-image-text">
                            Welcome to {companyName}'s Appointment Manager
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
