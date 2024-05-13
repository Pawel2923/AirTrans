import { useCallback, useState } from "react";
import { Filter, Sort, UserInfo } from "../../assets/Data";
import usersService from "../../services/users.service";
import useErrorHandler from "../useErrorHandler";

const useGetUsers = () => {
	const [usersData, setUsersData] = useState<UserInfo[]>();
	const { errorToast, errorAlert, handleError } = useErrorHandler();

	const getAllUsers = useCallback((
		page: number = 1,
		limit?: number,
		filter?: Filter[],
		sort?: Sort
	) => {
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
	}, [handleError]);

	return { usersData, errorToast, errorAlert, getAllUsers } as const;
};

export default useGetUsers;
