import React from "react";

interface ButtonDeleteProps {
    onClick: () => void;
}

const ButtonAdd= ({ onClick }: ButtonDeleteProps) => {
    return (
        <button onClick={onClick}>
            DODAJ
        </button>
    );
};



export default ButtonAdd;