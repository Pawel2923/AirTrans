import React from "react";

interface ButtonEditProps {
    onClick: () => void;
}

const ButtonEdit = ({ onClick }: ButtonEditProps) => {
    return (
        <button onClick={onClick}>
            Edytuj
        </button>
    );
};

export default ButtonEdit;