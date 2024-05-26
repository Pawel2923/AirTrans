import { useCallback } from "react";
import usersService from "../../services/users.service";
import useErrorHandler from "../useErrorHandler";

const useDeleteUser = () => {
	const { errorToast, errorAlert, handleError } = useErrorHandler();

	const deleteUser = useCallback((id: number) => new Promise((resolve) => {
        usersService
            .delete(id)
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
        deleteUser,
		errorToast,
		errorAlert,
	} as const;
};

export default useDeleteUser;
