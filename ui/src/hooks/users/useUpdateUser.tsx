import { useCallback } from "react";
import { UserInfo } from "../../assets/Data";
import usersService from "../../services/users.service";
import useErrorHandler from "../useErrorHandler";

const useUpdateUser = () => {
	const { errorToast, errorAlert, handleError } = useErrorHandler();

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

	return {
		updateUser,
        updateRole,
		errorToast,
		errorAlert,
	} as const;
};

export default useUpdateUser;
