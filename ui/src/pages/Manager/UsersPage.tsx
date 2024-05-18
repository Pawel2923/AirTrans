import { useEffect, useState } from "react";
import UsersTable from "../../components/Manager/UsersTable";
import useGetUsers from "../../hooks/users/useGetUsers";
import { PageData, UserInfo } from "../../assets/Data";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import ConfirmModal from "../../components/Modals/ConfirmModal";

const defaultUserInfo: UserInfo[] = [
	{
		uid: 0,
		email: "",
		first_name: "",
		last_name: "",
		phone_number: "",
		address: "",
	},
];

const RoleSelect = () => {
	const roles = ["admin", "client"];

	return (
		<select defaultValue={""}>
			<option value="" hidden>Wybierz rolę</option>
			{roles.map((role, index) => (
				<option key={index} value={role}>{role}</option>
			))}
		</select>
	);
};

const UsersPage = () => {
	const [searchParams] = useSearchParams();
	const [pageData, setPageData] = useState<PageData>({
		page: parseInt(searchParams.get("page") || "1"),
		pages: 1,
	});
	const { usersData, errorAlert, errorToast, getAllUsers } = useGetUsers();
	const [confirm, setConfirm] = useState<boolean>(false);

	useEffect(() => {
		getAllUsers(pageData.page);
	}, [getAllUsers, pageData.page]);

	const confirmModalHandler = () => {};

	return (
		<>
			<div style={{ overflowX: "auto" }}>
				<UsersTable
					data={usersData || defaultUserInfo}
					roleBtnClickHandler={() => setConfirm(true)}
				/>
			</div>
			<Pagination
				pageData={pageData}
				setPageData={setPageData}
				className="mt-3"
			/>
			{errorAlert}
			{errorToast}
			{confirm && (
				<ConfirmModal
					onClose={() => setConfirm(false)}
					onConfirm={confirmModalHandler}
					title="Wybierz rolę użytkownika"
					children={<RoleSelect />}
                    confirmBtnText="Zmień"
				/>
			)}
		</>
	);
};

export default UsersPage;
