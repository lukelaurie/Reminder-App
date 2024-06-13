import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../styles/addAppointmentStyles.css";
import { event } from "../../utils/Event";
//import { PhoneNumber } from "react-phone-number-input";

Modal.setAppElement("#root");

interface Props {
    isOpened: boolean;
    swapViewModal: (isModalOpened: boolean) => void;
    swapApptModal: (isModalOpened: boolean) => void;
    setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
    isUpdateMode: boolean;
    curEvent: event | null;
    adjustAppointment: (
        adjustType: string,
        appointData: string | undefined
    ) => void;
}

const ViewAppointment: React.FC<Props> = ({
    isOpened,
    swapViewModal,
    swapApptModal,
    setIsUpdateMode,
    isUpdateMode,
    curEvent,
    adjustAppointment,
}) => {
    const formatPhoneNumber = (phoneNumber: string | undefined): string => {
        if (!phoneNumber) return "";

        // Remove the country code and any non-numeric characters
        const cleaned = ("" + phoneNumber).replace(/\D/g, "").substring(1);

        // Format the number as (###) ###-####
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

        return ""; // invalid phoen numbe
    };

    const [curDate, useCurDate] = useState("");
    const [clientPhoneNumber, setClientPhoneNumber] = useState<
        string | undefined
    >("");
    useEffect(() => {
        setClientPhoneNumber(formatPhoneNumber(curEvent?.clientPhoneNumber));
        if (curEvent?.start === undefined || curEvent?.end === undefined) {
            useCurDate("undefined");
            return;
        }
        const startDate = curEvent?.start;
        const endDate = curEvent?.end;
        // check that that matching
        let formattedStartDate;
        let formattedEndDate;
        // get the correct formatiing based on the times
        if (
            startDate.getMonth() !== endDate.getMonth() ||
            startDate.getDate() !== endDate.getDate() ||
            startDate.getFullYear() !== endDate.getFullYear()
        ) {
            formattedStartDate = `${
                startDate.getMonth() + 1
            }/${startDate.getDate()}/${startDate.getFullYear()}
            at ${startDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;

            formattedEndDate = `${
                endDate.getMonth() + 1
            }/${endDate.getDate()}/${endDate.getFullYear()}
            at ${endDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        } else {
            formattedStartDate = `${
                startDate.getMonth() + 1
            }/${startDate.getDate()}/${startDate.getFullYear()}
            at ${startDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;

            formattedEndDate = `${endDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        }
        useCurDate(`${formattedStartDate} to ${formattedEndDate}`);
    }, [curEvent]);

    useEffect(() => {
        // swap the view to user being able to update an appointment
        if (isUpdateMode) {
            swapViewModal(true);
            swapApptModal(false);
        }
    }, [isUpdateMode]);

    const updateAppt = (): void => {
        // first set to false so that the useEffect is correctly executed
        setIsUpdateMode(false);
        setTimeout(() => setIsUpdateMode(true), 0);
    };

    const deleteAppt = (): void => {
        let deleteData = {
            appointmentId: curEvent?.appointmentId,
        };

        fetch(
            "http://localhost:3000/deleteAppointment",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deleteData),
                credentials: "include",
            }
        )
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                // checks if the data was valid
                if (data === "valid") {
                    // remove appointment from the calender ui
                    adjustAppointment("delete", curEvent?.appointmentId);
                    alert("Meeting has been deleted");
                } else {
                    alert("Error: Unable to delete the meeting");
                }
            });
    };

    return (
        <>
            <Modal
                isOpen={isOpened}
                onRequestClose={() => swapViewModal(true)}
                className="custom-modal"
                overlayClassName="custom-modal-overlay"
            >
                <button
                    className="exit-button"
                    onClick={() => swapViewModal(true)}
                >
                    x
                </button>
                {/* Information about the appointment */}
                <h1 className="modal-title">Client Name: {curEvent?.title}</h1>
                <h1 className="modal-title">
                    Client Phone: {clientPhoneNumber}
                </h1>
                <h2 className="modal-second">Date: {curDate}</h2>
                <h2 className="modal-second">Notes: {curEvent?.notes}</h2>
                <button className="change-button" onClick={updateAppt}>
                    Update Appointment
                </button>
                <br></br>
                <button
                    className="change-button delete-button"
                    onClick={deleteAppt}
                >
                    Delete Appointment
                </button>
            </Modal>
        </>
    );
};

export default ViewAppointment;
