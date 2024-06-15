import React, { useEffect } from "react";
import "../../styles/alert.css";

interface props {
    message: string
    onClose: () => void;
}

const CustomAlert: React.FC<props> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); 
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <div className="custom-alert">
            <span className="custom-alert-message">{message}</span>
            <button className="custom-alert-close" onClick={onClose}>
                &times;
            </button>
        </div>
    )
}

export default CustomAlert;