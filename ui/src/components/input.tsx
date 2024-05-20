import {
	useState,
	useEffect,
	useRef,
	useLayoutEffect,
} from "react";
import classes from "./input.module.css";

interface InputProps {
	type?: string;
	placeholder?: string;
	value: string | number;
	disabled?: boolean;
	required?: boolean;
	className?: string;
	style?: React.CSSProperties;
	id?: string;
	name?: string;
	min?: number;
	max?: number;
	minLength?: number;
	onInput?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
	onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
	validateInput?: (value: string | number) => boolean;
	setIsFormInvalid?: (isInvalid: boolean) => void;
}

const Input: React.FC<InputProps> = ({
	type,
	placeholder,
	value,
	disabled,
	required,
	className,
	style,
	id,
	name,
	min,
	max,
	minLength,
	onInput,
	onFocus,
	onBlur,
	onChange,
	validateInput,
	setIsFormInvalid,
}) => {
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
			setIsInvalid(!validateInput(value));
		}
		onBlur && onBlur(ev);
	};

	return (
		<input
			type={type ? type : "text"}
			ref={inputRef}
			id={id}
			name={name}
			min={min}
			max={max}
			placeholder={placeholder}
			value={value}
			disabled={disabled}
			required={required}
			className={`${classes.input} ${className ? className : ""}`}
			style={style ? style : {}}
			minLength={minLength ? minLength : undefined}
			onChange={changeHandler}
			onFocus={focusHandler}
			onBlur={blurHandler}
			onInput={onInput ? onInput : () => {}}
		/>
	);
};

export default Input;
