import { useEffect } from "react";
import UsersTable from "../../components/Manager/UsersTable";
import useGetUsers from "../../hooks/users/useGetUsers";
import { UserInfo } from "../../assets/Data";

const defaultUserInfo: UserInfo[] = [
    {
        uid: 0,
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
    }
];

const UsersPage = () => {
    const { usersData, errorAlert, errorToast, getAllUsers } = useGetUsers();

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    return (
        <>
            <UsersTable data={usersData || defaultUserInfo} />
            {errorAlert}
            {errorToast}
        </>
    )
};

export default UsersPage;