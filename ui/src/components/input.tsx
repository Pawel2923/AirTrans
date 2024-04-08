
import React, { useState, useEffect, useRef, forwardRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import classes from "./input.module.css";

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    id?: string;
    minLength?: number;
    onInput?: (ev: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    validateInput?: (value: string) => boolean;
    setIsFormInvalid?:(value: boolean) => void;
}

const Input = forwardRef((
    {
        type = "text",
        placeholder,
        value,
        disabled,
        required,
        className,
        id,
        minLength,
        onInput,
        onFocus,
        onBlur,
        onChange,
        validateInput,
        setIsFormInvalid,
    }: InputProps, 
) => {
    const [isInvalid, setIsInvalid] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null); 

    useLayoutEffect(() => {
        if (!isInvalid) {
            inputRef.current?.classList.remove(classes.invalid); 
            return;
        }

        inputRef.current?.classList.add(classes.invalid); 
    }, [isInvalid]);

    useEffect(() => {
        if (isInvalid) {
            inputRef.current?.setCustomValidity("Poprawnie wypełnij to pole"); 
            return;
        }
        inputRef.current?.setCustomValidity(""); 
        if (setIsFormInvalid) {
            setIsFormInvalid(false);
        }
    }, [isInvalid, setIsFormInvalid]);

    const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setIsInvalid(false);
        onChange && onChange(ev);
    };

    const focusHandler = (ev: React.FocusEvent<HTMLInputElement>) => {
        onFocus && onFocus(ev);
    };

    const blurHandler = (ev: React.FocusEvent<HTMLInputElement>) => {
        if (validateInput) {
            setIsInvalid(!validateInput(value ?? ""));
        }
        onBlur && onBlur(ev);
    };

    return (
        <input
            type={type}
            ref={inputRef}
            id={id}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            required={required}
            className={`${classes.input} ${className || ""}`}
            minLength={minLength}
            onChange={changeHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
            onInput={onInput || (() => {})}
        />
    );
});

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    minLength: PropTypes.number,
    onInput: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    validateInput: PropTypes.func,
    setIsFormInvalid: PropTypes.func,
};

export default Input;