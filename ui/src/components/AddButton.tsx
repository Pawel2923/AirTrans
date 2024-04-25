import React from "react";

interface ButtonAddProps {
    onClick: () => void;
}

const ButtonAdd = ({ onClick }: ButtonAddProps) => {
    return (
        <button onClick={onClick}>
            Dodaj
        </button>
    );
};

export default ButtonAdd;