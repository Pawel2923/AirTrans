import { useCallback, useState } from "react";
import { Filter, Sort, UserInfo } from "../../assets/Data";
import usersService from "../../services/users.service";
import useErrorHandler from "../useErrorHandler";

const useGetUsers = () => {
  const [usersData, setUsersData] = useState<UserInfo[]>();
  const { handleError } = useErrorHandler();

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
          handleError({ error });
        });
    },
    [handleError]
  );

  const getUserById = useCallback(
    (id: number) => {
      usersService
        .getById(id)
        .then((response) => {
          if (response.status === 200) {
            setUsersData(response.data.data);
          }
        })
        .catch((error) => {
          handleError({ error });
        });
    },
    [handleError]
  );

  const getUserByEmail = useCallback(
    (email: string) => {
      usersService
        .getByEmail(email)
        .then((response) => {
          if (response.status === 200) {
            setUsersData(response.data.data);
          }
        })
        .catch((error) => {
          handleError({ error });
        });
    },
    [handleError]
  );

  const getRoles = useCallback(
    () =>
      new Promise((resolve) => {
        usersService
          .getRoles()
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data.data);
            }
          })
          .catch((error) => {
            handleError({ error });
          });
      }),
    [handleError]
  );

  return {
    usersData,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getRoles,
  } as const;
};

export default useGetUsers;
