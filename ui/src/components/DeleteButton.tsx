import React from "react";

interface ButtonDeleteProps {
    onClick: () => void;
}

const ButtonDelete = ({ onClick }: ButtonDeleteProps) => {
    return (
        <button onClick={onClick}>
            Usuń
        </button>
    );
};

export default ButtonDelete;