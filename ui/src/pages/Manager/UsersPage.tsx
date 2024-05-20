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

interface RoleSelectProps {
	setRole: React.Dispatch<React.SetStateAction<string>>;
}

const RoleSelect: React.FC<RoleSelectProps> = ({ setRole }) => {
	const { getRoles } = useGetUsers();
	const [roles, setRoles] = useState<string[]>([]);

	useEffect(() => {
		getRoles().then((roles) => {
			setRoles(roles as string[]);
		});
	}, [getRoles]);

	const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setRole(e.target.value);
	};

	return (
		<select defaultValue={""} onChange={selectChangeHandler}>
			<option value="" hidden>
				Wybierz rolę
			</option>
			{roles.map((role, index) => (
				<option key={index} value={role}>
					{role}
				</option>
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
	const [roleConfirm, setRoleConfirm] = useState<boolean>();
	const [deleteConfirm, setDeleteConfirm] = useState<boolean>();
	const [role, setRole] = useState<string>("");
	const { updateRole, deleteUser } = useGetUsers();
	const [uid, setUid] = useState<number>(0);

	useEffect(() => {
		getAllUsers(pageData.page);
	}, [getAllUsers, pageData.page]);

	const roleBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		setUid(parseInt(e.currentTarget.value));
		setRoleConfirm(true);
	};

	const deleteBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		setUid(parseInt(e.currentTarget.value));
		setDeleteConfirm(true);
	};

	const updateModalHandler = () => {
		updateRole(uid, role).then(() => {
			getAllUsers(pageData.page);
			setRoleConfirm(false);
		});
	};

	const deleteModalHandler = () => {
		deleteUser(uid).then(() => {
			getAllUsers(pageData.page);
			setDeleteConfirm(false);
		});
	};

	return (
		<>
			<div style={{ overflowX: "auto" }}>
				<UsersTable
					data={usersData || defaultUserInfo}
					roleBtnClickHandler={roleBtnClickHandler}
					deleteBtnClickHandler={deleteBtnClickHandler}
				/>
			</div>
			<Pagination
				pageData={pageData}
				setPageData={setPageData}
				className="mt-3"
			/>
			{errorAlert}
			{errorToast}
			{roleConfirm && (
				<ConfirmModal
					onClose={() => setRoleConfirm(false)}
					onConfirm={updateModalHandler}
					title="Wybierz rolę użytkownika"
					children={<RoleSelect setRole={setRole} />}
					confirmBtnText="Zapisz"
				/>
			)}
			{deleteConfirm && (
				<ConfirmModal
					onClose={() => setDeleteConfirm(false)}
					onConfirm={deleteModalHandler}
					title="Czy na pewno chcesz usunąć użytkownika?"
					message="Tej operacji nie można cofnąć"
				/>
			)}
		</>
	);
};

export default UsersPage;
