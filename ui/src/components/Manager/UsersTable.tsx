import React from "react";
import { UserInfo } from "../../assets/Data";
import tableStyles from "../DeparturesTable.module.css";

interface UsersTableProps {
	data: UserInfo[];
	roleBtnClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
	data,
	roleBtnClickHandler,
}: UsersTableProps) => {
	return (
		<table className={tableStyles.table}>
			<thead>
				<tr>
					<th colSpan={14} className={tableStyles["table-caption"]}>
						lista użytkowników
					</th>
				</tr>
			</thead>
			<thead>
				<tr>
					<th scope="col">UID</th>
					<th scope="col">Email</th>
					<th scope="col">Imię</th>
					<th scope="col">Nazwisko</th>
					<th scope="col">Telefon</th>
					<th scope="col">Adres</th>
					<th scope="col">Płeć</th>
					<th scope="col">Data urodzenia</th>
					<th scope="col">Data utworzenia konta</th>
					<th scope="col">Zdjęcie</th>
					<th scope="col">Rola</th>
					<th scope="col"></th>
					<th scope="col"></th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				{data.map((user, index) => (
					<tr key={index}>
						<th scope="row">{user.uid}</th>
						<td>{user.email}</td>
						<td>{user.first_name || "Brak"}</td>
						<td>{user.last_name || "Brak"}</td>
						<td>{user.phone_number || "Brak"}</td>
						<td>{user.address || "Brak"}</td>
						<td>{user.gender || "Brak"}</td>
						<td>
							{(user.birth_date &&
								user.birth_date
									.replace("T", " ")
									.slice(0, 10)) ||
								"Brak"}
						</td>
						<td>
							{(user.create_time &&
								user.create_time
									.replace("T", " ")
									.slice(0, 19)) ||
								"Brak"}
						</td>
						<td>{user.user_img || "Brak"}</td>
						<td>{user.role || "client"}</td>
						<td>
							<button
								className="btn btn-primary"
								onClick={roleBtnClickHandler}
							>
								Zmień rolę
							</button>
						</td>
						<td>
							<button className="btn btn-primary">
								Resetuj hasło
							</button>
						</td>
						<td>
							<button className="btn btn-danger">Usuń</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UsersTable;
