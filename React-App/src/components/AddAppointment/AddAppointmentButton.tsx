import React, { useState } from "react";
import AppointmentFilloutModal from "./AppointmentFilloutModal";

const AddAppointmentButton: React.FC = () => {
    const [isOpened, setIsOpened] = useState(false)

    const swapModal = (isModalOpened: boolean) => {
        setIsOpened(!isModalOpened)
    }

    return (
        <>
            <button onClick={() => swapModal(isOpened)}>Add New Appointment</button>
            <AppointmentFilloutModal isOpened={isOpened} swapModal={swapModal} />
        </>
    );
};

export default AddAppointmentButton;