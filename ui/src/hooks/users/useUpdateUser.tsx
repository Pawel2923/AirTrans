import { useCallback } from "react";
import { UserInfo } from "../../assets/Data";
import usersService from "../../services/users.service";
import useErrorHandler from "../useErrorHandler";

const useUpdateUser = () => {
	const { handleError } = useErrorHandler();

	const updateUser = useCallback((id: number, data: UserInfo) => new Promise((resolve) => {
        usersService
            .update(id, data)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.data);
                }
            })
            .catch((error) => {
                handleError({ error });
            });
    }), [handleError]);
    
    const updateRole = useCallback((id: number, role: string) => new Promise((resolve) => {
        usersService
            .updateRole(id, role)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.data);
                }
            })
            .catch((error) => {
                handleError({ error });
            });
    }), [handleError]);

    const updateImg = useCallback((id: number, path: string) => new Promise((resolve) => {
        usersService
            .updateImg(id, path)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                handleError({ error });
            });
    }), [handleError]);

	return {
		updateUser,
        updateRole,
        updateImg,
	} as const;
};

export default useUpdateUser;
