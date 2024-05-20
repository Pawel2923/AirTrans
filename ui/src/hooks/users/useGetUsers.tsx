import { useCallback, useState } from "react";
import { Filter, Sort, UserInfo } from "../../assets/Data";
import usersService from "../../services/users.service";
import useErrorHandler from "../useErrorHandler";

const useGetUsers = () => {
	const [usersData, setUsersData] = useState<UserInfo[]>();
	const { errorToast, errorAlert, handleError } = useErrorHandler();

	const getAllUsers = useCallback(
		(page: number = 1, limit?: number, filter?: Filter[], sort?: Sort) => {
			usersService
				.getAll(page, limit, filter, sort)
				.then((response) => {
					if (response.status === 200) {
						setUsersData(response.data.data);
					}
				})
				.catch((error) => {
					handleError(error);
				});
		},
		[handleError]
	);

	const getUserById = useCallback((uid: number) => new Promise((resolve) => {
		usersService
			.getById(uid)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data.data);
				}
			})
			.catch((error) => {
				handleError(error);
			});
	}), [handleError]);

	const getRoles = useCallback(() => new Promise((resolve) => {
		usersService
			.getRoles()
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data.data);
				}
			})
			.catch((error) => {
				handleError(error);
			});
	}), [handleError]);

	const updateUser = useCallback((uid: number, data: UserInfo) => new Promise((resolve) => {
		usersService
			.update(uid, data)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data.data);
				}
			})
			.catch((error) => {
				handleError(error);
			});
	}), [handleError]);

	const updateRole = useCallback((uid: number, role: string) => new Promise((resolve) => {
		usersService
			.updateRole(uid, role)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data.data);
				}
			})
			.catch((error) => {
				handleError(error);
			});
	}), [handleError]);

	const deleteUser = useCallback((uid: number) => new Promise((resolve) => {
		usersService
			.delete(uid)
			.then((response) => {
				if (response.status === 204) {
					resolve(response.data.data);
				}
			})
			.catch((error) => {
				handleError(error);
			});
	}), [handleError]);

	return {
		usersData,
		errorToast,
		errorAlert,
		getAllUsers,
		getUserById,
		getRoles,
		updateUser,
		updateRole,
		deleteUser,
	} as const;
};

export default useGetUsers;
