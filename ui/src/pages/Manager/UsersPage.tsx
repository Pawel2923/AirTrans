import { useEffect, useState } from "react";
import useGetUsers from "../../hooks/users/useGetUsers";
import { PageData } from "../../assets/Data";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import useUpdateUser from "../../hooks/users/useUpdateUser";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import DataTable from "../../components/Manager/DataTable";

const tableColumnNames = [
  "ID",
  "Email",
  "Imię",
  "Nazwisko",
  "Telefon",
  "Adres",
  "Płeć",
  "Data urodzenia",
  "Data utworzenia konta",
  "Zdjęcie",
  "Rola",
  "",
  "",
  "",
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
  const { usersData, getAllUsers } = useGetUsers();
  const [roleConfirm, setRoleConfirm] = useState<boolean>();
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>();
  const [role, setRole] = useState<string>("");
  const { updateRole } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    getAllUsers(pageData.page);
  }, [getAllUsers, pageData.page]);

  const roleBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setId(parseInt(e.currentTarget.value));
    setRoleConfirm(true);
  };

  const deleteBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setId(parseInt(e.currentTarget.value));
    setDeleteConfirm(true);
  };

  const updateModalHandler = () => {
    updateRole(id, role).then(() => {
      getAllUsers(pageData.page);
      setRoleConfirm(false);
    });
  };

  const deleteModalHandler = () => {
    deleteUser(id).then(() => {
      getAllUsers(pageData.page);
      setDeleteConfirm(false);
    });
  };

  return (
    <>
      {usersData && (
        <DataTable
          colCount={14}
          tableTitle="Lista użytkowników"
          tableHeaders={tableColumnNames.map((name, index) => (
            <th key={index}>{name}</th>
          ))}
          tableBody={usersData.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>{user.email}</td>
              <td>{user.first_name || "Brak"}</td>
              <td>{user.last_name || "Brak"}</td>
              <td>{user.phone_number || "Brak"}</td>
              <td>{user.address || "Brak"}</td>
              <td>{user.gender || "Brak"}</td>
              <td>
                {(user.birth_date &&
                  user.birth_date.replace("T", " ").slice(0, 10)) ||
                  "Brak"}
              </td>
              <td>
                {(user.create_time &&
                  user.create_time.replace("T", " ").slice(0, 19)) ||
                  "Brak"}
              </td>
              <td
                style={{
                  maxWidth: "100px",
                  overflow: "auto",
                  overflowWrap: "break-word",
                }}
              >
                {user.img || "Brak"}
              </td>
              <td>{user.role || "client"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  value={user.id?.toString() || ""}
                  onClick={roleBtnClickHandler}
                >
                  Zmień rolę
                </button>
              </td>
              <td>
                <button className="btn btn-primary">Resetuj hasło</button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  value={user.id?.toString()}
                  onClick={deleteBtnClickHandler}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        />
      )}
      <Pagination
        pageData={pageData}
        setPageData={setPageData}
        className="mt-3"
      />
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
