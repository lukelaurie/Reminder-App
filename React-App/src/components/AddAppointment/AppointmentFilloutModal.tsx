import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AppointmentForm from "./AppointmentForm";
import "../../styles/addAppointmentStyles.css";
import { event } from "../../utils/Event";

Modal.setAppElement("#root");

interface Props {
    isOpened: boolean;
    swapModal: (isModalOpened: boolean, shouldKeepEvent: boolean) => void;
    isUpdateMode: boolean
    curEvent: event | null;
    adjustAppointment: (adjustType: string, appointData: string | undefined) => void;
}

const AppointmentFilloutModal: React.FC<Props> = ({ isOpened, swapModal, isUpdateMode, curEvent, adjustAppointment }) => {
    const [formType, setFormType] = useState("Add New Appointment");

    useEffect(() => {
        if (isUpdateMode) {
            setFormType("Update Appointment");
        } else {
            setFormType("Add New Appointment");
        }
    }, [isUpdateMode]);
    
    const createAppointment = (
        startDate: Date,
        endDate: Date,
        notes: string,
        clientName: string,
        clientPhoneNumber: string, 

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
        const appointData: {
            startDate: Date;
            endDate: Date;
            notes: string;
            clientName: string;
            clientPhoneNumber: string;
            appointmentId?: string // optional param
        } = {startDate, endDate, notes, clientName, clientPhoneNumber}
        // check if modifying an existing appointment rather than a new one
        if (isUpdateMode && curEvent?.appointmentId) {
            appointData.appointmentId = curEvent.appointmentId;
        }
        // make a request to the backend with the given login information
        fetch("http://127.0.0.1:3000/createNewAppointment", {
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
                    if (isUpdateMode) {
                        adjustAppointment("update", curEvent?.appointmentId);
                        alert("Appointment Updated!");
                    } else {
                        adjustAppointment("create", "null");
                        alert("Appointment Created!");
                    }
                }
            });
    };

    return (
        <>
            <Modal
                isOpen={isOpened}
                onRequestClose={() => swapModal(true, false)}
                contentLabel="WHat is this"
                className="customModal"
                overlayClassName="customModalOverlay"
            >
                <h2>{formType}</h2>
                <button onClick={() => swapModal(true, false)}>x</button>
                <AppointmentForm onSubmit={createAppointment} curEvent={curEvent} />
            </Modal>
        </>
    );
};

export default AppointmentFilloutModal;
