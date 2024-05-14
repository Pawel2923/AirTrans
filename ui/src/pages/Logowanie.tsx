
import React, { useContext, useState } from "react"; // Zmiana importu na pełną ścieżkę do pliku "react"
import loginService from "../services/login.service";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import AuthContext from "../store/auth-context";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const isEmpty = (value: string) =>
	value.trim() !== "" && value.trim().length >= 3;
const isEmail = (value: string) =>

	emailRegex.test(value.toLowerCase()) &&
	value.toLowerCase().trim().length >= 3;

const Login = () => {
	const navigate = useNavigate();
	const { setAuth, setUser } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isFormInvalid, setIsFormInvalid] = useState(true);

	const emailInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(ev.target.value);
	};

	const passwordInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(ev.target.value);
	};

	const resetForm = () => {
		setEmail("");
		setPassword("");
		setIsFormInvalid(false);
	};

	const submitHandler = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		try {
			if (isFormInvalid) {
				alert("Formularz jest niepoprawny");
				return;
			}

			const response = await loginService.create({ email, password });
			if (response.status === 200) {
				const { auth, user } = response.data;

				setAuth(auth);
				setUser({ ...user, exp: Date.now() + 86400, iat: Date.now() });

				if (auth) {
					resetForm();
					alert("Zalogowano");
					if (user.role === "client") {
						navigate("/");
					} else {
						navigate("/zarzadzanie");
					}
				} else {
					alert("Błędne dane logowania");
				}
			} else {
				alert("Błąd logowania");
			}
		} catch (error) {
			alert("Błąd logowania - sprawdź konsolę");
		}
	};
	const loginForm = (
		<form onSubmit={submitHandler}>
			<label>
				<p>E-mail*</p>
				<Input
					type="email"
					id="email"
					value={email}
					minLength={3}
					onInput={emailInputHandler}
					validateInput={isEmail}
					setIsFormInvalid={setIsFormInvalid}
					required
				/>
			</label>
			<label>
				<p>Hasło*</p>
				<Input
					type="password"
					id="password"
					value={password}
					minLength={3}
					onInput={passwordInputHandler}
					validateInput={isEmpty}
					setIsFormInvalid={setIsFormInvalid}
					required
				/>
			</label>
			<button type="submit">Zaloguj się</button>
			<p>
				Nie masz jeszcze konta?{" "}
				<Link to="/rejestracja">Zapisz się</Link>
			</p>
		</form>
	);

	return (
		<>
			<main>
				<section className="section">
					<h1>Zaloguj się</h1>
					<h2>Wypełnij formularz logowania</h2>
					{loginForm}
				</section>
			</main>
		</>
	);
};

export default Login;
