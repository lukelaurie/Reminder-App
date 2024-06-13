import React, { useState, useEffect } from "react";
import "../../styles/loginRegister.css";

interface PhoneNumberInputProps {
    value: string | undefined;
    onChange: (value: string | undefined) => void;
    phoneType: string
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({value, onChange, phoneType}) => {
    const [className, setClassName] = useState("account-form-input")

    useEffect(() => {
        if (phoneType === "form") setClassName("main-form-input");
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Filter out non-numeric characters from the input value
        const formattedValue = inputValue.replace(/\D/g, "");
        // Format the input value as (###) ###-####
        let formattedPhoneNumber = formattedValue;
        if (formattedValue.length > 3) {
            formattedPhoneNumber = `(${formattedValue.substring(0, 3)}) `;
            if (formattedValue.length > 6) {
                formattedPhoneNumber += `${formattedValue.substring(3, 6)}-`;
                formattedPhoneNumber += formattedValue.substring(6, 10);
            } else {
                formattedPhoneNumber += formattedValue.substring(3, 6);
            }
        }
        onChange(formattedPhoneNumber);
    };

    return (
        <input
            type="tel"
            maxLength={14}
            placeholder="(123) 456-7890"
            value={value}
            onChange={handleChange}
            className={className}
        />
    );
};

export default PhoneNumberInput;
