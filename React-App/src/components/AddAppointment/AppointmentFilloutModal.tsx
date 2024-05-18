import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AppointmentForm from "./AppointmentForm";
import "../../styles/addAppointmentStyles.css";

Modal.setAppElement("#root");

interface Props {
    isOpened: boolean;
    swapModal: (isModalOpened: boolean) => void;
}

const AppointmentFilloutModal: React.FC<Props> = ({ isOpened, swapModal }) => {
    const createAppointment = (
        startDate: Date,
        endDate: Date,
        notes: string,
        clientName: string,
        clientPhoneNumber: string
    ): void => {
        // validate the input
        if (
            !startDate ||
            !endDate ||
            !notes ||
            !clientName ||
            !clientPhoneNumber
        ) {
            alert("Please fill out all fields.");
            return;
        }
        let pattern = new RegExp("\\+[0-9]{11}");
        if (!pattern.test(clientPhoneNumber)) {
            alert("Phone number is invalid.");
            return;
        }
        let appointData = {
            startDate: startDate,
            endDate: endDate,
            notes: notes,
            clientName: clientName,
            clientPhoneNumber: clientPhoneNumber,
        };
        // make a request to the backend with the given login information
        fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointData),
            credentials: "include",
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                // checks if the data was valid
                if (data !== "valid") {
                    alert(data);
                } else {
                    alert("Appointment Created!");
                }
            });
    };

    return (
        <>
            <Modal
                isOpen={isOpened}
                onRequestClose={() => swapModal(true)}
                contentLabel="WHat is this"
                className="customModal"
                overlayClassName="customModalOverlay"
            >
                <h2>Add New Associate</h2>
                <button onClick={() => swapModal(true)}>x</button>
                <AppointmentForm onSubmit={createAppointment} />
            </Modal>
        </>
    );
};

export default AppointmentFilloutModal;
