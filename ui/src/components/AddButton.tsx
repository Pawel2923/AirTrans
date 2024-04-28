import React from "react";

interface ButtonAddProps {
    onCreateCar: () => void; // Zmieniono nazwę propa na onCreateCar
}

const ButtonAdd = ({ onCreateCar }: ButtonAddProps) => {
    const handleClick = () => {
        console.log("Dodaj car  ")
        onCreateCar();
    };

    return (
        <button onClick={handleClick}>
            Dodaj
        </button>
    );
};

export default ButtonAdd;