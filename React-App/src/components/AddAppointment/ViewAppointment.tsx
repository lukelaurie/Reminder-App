import Modal from "react-modal";
import "../../styles/addAppointmentStyles.css";
import { event } from "../../utils/Event";

Modal.setAppElement("#root");

interface Props {
    isOpened: boolean;
    swapModal: (isModalOpened: boolean) => void;
    curEvent: event | null
}

const ViewAppointment: React.FC<Props> = ({ isOpened, swapModal, curEvent }) => {
    const updateAppt = (): void => {
        console.log("todo");
    }

    const deleteAppt = (): void => {
        console.log("todo");
    }

    return (
        <>
            <Modal
                isOpen={isOpened}
                onRequestClose={() => swapModal(true)}
                contentLabel="WHat is this"
                className="customModal"
                overlayClassName="customModalOverlay"
            >
                <button onClick={() => swapModal(true)}>x</button>
                <h1>Client Name: {curEvent?.title}</h1>
                {/* <h2>{curEvent?.start}</h2> */}
                <h2>notes: {curEvent?.notes}</h2>
                <button onClick={updateAppt}>Update Appointment</button>
                <br></br>
                <button onClick={deleteAppt}>Delete Appointment</button>
            </Modal>
        </>
    );
};

export default ViewAppointment;
