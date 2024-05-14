import { useEffect, useState } from "react";
import UsersTable from "../../components/Manager/UsersTable";
import useGetUsers from "../../hooks/users/useGetUsers";
import { PageData, UserInfo } from "../../assets/Data";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";

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
    const [searchParams] = useSearchParams();
    const [pageData, setPageData] = useState<PageData>({
		page: parseInt(searchParams.get("page") || "1"),
		pages: 1,
	});
    const { usersData, errorAlert, errorToast, getAllUsers } = useGetUsers();

    useEffect(() => {
        getAllUsers(pageData.page);
    }, [getAllUsers, pageData.page]);

    return (
        <>
            <UsersTable data={usersData || defaultUserInfo} />
            <Pagination pageData={pageData} setPageData={setPageData} className="mt-3" />
            {errorAlert}
            {errorToast}
        </>
    )
};

export default UsersPage;