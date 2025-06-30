import {
  faArrowLeft,
  faPen,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import classes from "./UserProfile.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import useGetUsers from "../../hooks/users/useGetUsers";
import AuthContext from "../../store/auth-context";
import useUpdateUser from "../../hooks/users/useUpdateUser";
import { UserInfo } from "../../assets/Data";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import filesService from "../../services/files.service";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import ToastModalContext from "../../store/toast-modal-context";

const UserProfile = () => {
  const navigate = useNavigate();
  const { createToast, createConfirmModal } = useContext(ToastModalContext);
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    address: false,
    gender: false,
    birthDate: false,
  });
  const { usersData: userInfo, getUserByEmail } = useGetUsers();
  const { updateUser, updateImg } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  const { user } = useContext(AuthContext);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    birthDate: "",
  });
  const [isChangeImgModalVisible, setIsChangeImgModalVisible] =
    useState<boolean>(false);
  const [userImg, setUserImg] = useState<File>();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (user) {
      getUserByEmail(user.email);
    }
  }, [getUserByEmail, user]);

  useEffect(() => {
    if (userInfo) {
      setInputData({
        name: `${userInfo[0].first_name} ${userInfo[0].last_name}`,
        email: userInfo[0].email,
        phoneNumber: userInfo[0].phone_number ?? "",
        address: userInfo[0].address ?? "",
        gender: userInfo[0].gender ?? "M",
        birthDate:
          userInfo[0].birth_date?.slice(0, 10).replace("T", " ") ??
          "2024-01-01",
      });

      if (userInfo[0].img) {
        if (imgRef.current) {
          imgRef.current.src = filesService.getImgUrl(userInfo[0].img);
        }
      }
    }
  }, [userInfo]);

  const switchOnEditMode = (field: string) =>
    setEditMode((prevState) => ({
      ...prevState,
      [field]: true,
    }));

  const updateProfile = (userImg = "") => {
    if (!userInfo) return;

    const name = inputData.name.split(" ");
    const firstName = name[0];
    const lastName = name[1];

    if (!firstName || !lastName) return;
    if (inputData.gender !== "M" && inputData.gender !== "F") return;

    if (!inputData.birthDate) return;

    const data: UserInfo = {
      id: userInfo[0].id,
      first_name: firstName,
      last_name: lastName,
      email: inputData.email,
      phone_number: inputData.phoneNumber,
      address: inputData.address,
      gender: inputData.gender,
      birth_date: inputData.birthDate.slice(0, 19).replace("T", " "),
      img: userImg ? userImg : userInfo[0].img,
    };

    if (!userInfo[0].id) return;

    updateUser(userInfo[0].id, data).then((response) => {
      if (response) {
        getUserByEmail(inputData.email);
      }
    });
  };

  const switchOffEditMode = (field: string) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));

    updateProfile();
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputData((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputData((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));

  const phoneNumberChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputData((prevState) => ({
      ...prevState,
      phoneNumber: e.target.value,
    }));

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputData((prevState) => ({
      ...prevState,
      address: e.target.value,
    }));

  const genderChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputData = e.target.value;
    if (inputData !== "M" && inputData !== "F") return;

    setInputData((prevState) => ({
      ...prevState,
      gender: inputData,
    }));
  };

  const birthDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputData((prevState) => ({
      ...prevState,
      birthDate: e.target.value,
    }));

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setUserImg(file);
  };

  const changeImgConfirmHandler = () => {
    if (!userInfo) return;
    if (!userInfo[0].id) return;
    if (!(userImg instanceof File)) return;

    filesService
      .upload(userImg)
      .then((response) => {
        if (response.status === 200) {
          updateImg(userInfo[0].id as number, response.data.file.filename).then(
            () => {
              updateProfile(response.data.file.filename);
            }
          );
        }
      })
      .catch((error) => {
        console.error(error);
        createToast({
          message: "Nie udało się zmienić zdjęcia",
          type: "danger",
          icon: faXmarkCircle,
          timeout: 10000,
        });
      })
      .finally(() => {
        setIsChangeImgModalVisible(false);
        setUserImg(undefined);
      });
  };

  const changeImgCancelHandler = () => {
    setIsChangeImgModalVisible(false);
    setUserImg(undefined);
  };

  const changeImgHandler = () => setIsChangeImgModalVisible(true);

  const deleteBtnHandler = () => {
    createConfirmModal({
      title: "Usuń konto",
      message: "Czy na pewno chcesz usunąć konto?",
      confirmBtnText: "Usuń",
      confirmBtnClass: "btn-danger",
      onConfirm: () => deleteAccount(),
    });
  };

  const deleteAccount = () => {
    if (!userInfo) return;
    if (!userInfo[0].id) return;

    deleteUser(userInfo[0].id).then((response) => {
      if (response) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <Link to="-1" className="text-black text-decoration-none">
        <FontAwesomeIcon icon={faArrowLeft} /> Wróć
      </Link>
      <div className="container-flid manager-block mt-3 p-4">
        <div className="row">
          <div className={`col-lg-6 ${classes["user-info-container"]}`}>
            <h2>Twoje dane</h2>
            <div onClick={() => switchOnEditMode("name")}>
              {editMode.name ? (
                <>
                  <input
                    type="text"
                    value={inputData.name}
                    name="name"
                    className="form-control"
                    onChange={nameChangeHandler}
                    onBlur={() => switchOffEditMode("name")}
                  />
                </>
              ) : (
                userInfo && (
                  <>
                    Imię i nazwisko: {userInfo[0].first_name}{" "}
                    {userInfo[0].last_name}
                    <FontAwesomeIcon icon={faPen} />
                  </>
                )
              )}
            </div>
            <div onClick={() => switchOnEditMode("email")}>
              {editMode.email ? (
                <input
                  type="email"
                  value={inputData.email}
                  name="email"
                  className="form-control"
                  onChange={emailChangeHandler}
                  onBlur={() => switchOffEditMode("email")}
                />
              ) : (
                userInfo && (
                  <>
                    Email: {userInfo[0].email}
                    <FontAwesomeIcon icon={faPen} />
                  </>
                )
              )}
            </div>
            <div onClick={() => switchOnEditMode("phoneNumber")}>
              {editMode.phoneNumber ? (
                <input
                  type="tel"
                  value={inputData.phoneNumber}
                  name="phoneNumber"
                  className="form-control"
                  onChange={phoneNumberChangeHandler}
                  onBlur={() => switchOffEditMode("phoneNumber")}
                />
              ) : (
                userInfo && (
                  <>
                    Numer telefonu: {userInfo[0].phone_number}
                    <FontAwesomeIcon icon={faPen} />
                  </>
                )
              )}
            </div>
            <div onClick={() => switchOnEditMode("address")}>
              {editMode.address ? (
                <input
                  type="text"
                  value={inputData.address}
                  name="address"
                  className="form-control"
                  onChange={addressChangeHandler}
                  onBlur={() => switchOffEditMode("address")}
                />
              ) : (
                userInfo && (
                  <>
                    Adres: {userInfo[0].address}
                    <FontAwesomeIcon icon={faPen} />
                  </>
                )
              )}
            </div>
            <div onClick={() => switchOnEditMode("gender")}>
              {editMode.gender ? (
                <select
                  value={inputData.gender}
                  name="gender"
                  className="form-select"
                  onChange={genderChangeHandler}
                  onBlur={() => switchOffEditMode("gender")}
                >
                  <option value="M">Mężczyzna</option>
                  <option value="F">Kobieta</option>
                </select>
              ) : (
                userInfo && (
                  <>
                    Płeć: {userInfo[0].gender === "F" ? "Kobieta" : "Mężczyzna"}
                    <FontAwesomeIcon icon={faPen} />
                  </>
                )
              )}
            </div>
            <div onClick={() => switchOnEditMode("birthDate")}>
              {editMode.birthDate ? (
                <input
                  type="date"
                  value={inputData.birthDate}
                  name="birthDate"
                  className="form-control"
                  onChange={birthDateChangeHandler}
                  onBlur={() => switchOffEditMode("birthDate")}
                />
              ) : (
                userInfo && (
                  <>
                    Data urodzenia:{" "}
                    {userInfo[0].birth_date
                      ?.slice(0, 10)
                      .replace("T", " ")
                      .split("-")
                      .reverse()
                      .map((el, index, arr) =>
                        index !== arr.length - 1 ? el + "." : el
                      )}
                    <FontAwesomeIcon icon={faPen} />
                  </>
                )
              )}
            </div>
            {userInfo && (
              <p>
                Konto utworzono{" "}
                {userInfo[0].create_time
                  ?.slice(0, 10)
                  .replace("T", " ")
                  .split("-")
                  .reverse()
                  .map((el, index, arr) =>
                    index !== arr.length - 1 ? el + "." : el
                  )}
              </p>
            )}
          </div>
          <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
            <h5>Zdjęcie profilowe</h5>
            <div className={classes["user-img"]}>
              <img ref={imgRef} alt="Zdjęcie profilowe" />
            </div>
            <button className="btn btn-primary mt-3" onClick={changeImgHandler}>
              Zmień zdjęcie
            </button>
          </div>
        </div>
      </div>
      <Link to="/resetowanie" className="btn btn-alt mt-3 me-3">Zmień hasło</Link>
      <button className="btn btn-danger mt-3" onClick={deleteBtnHandler}>
        Usuń konto
      </button>
      {isChangeImgModalVisible && (
        <ConfirmModal
          title="Zmień zdjęcie"
          onClose={changeImgCancelHandler}
          onConfirm={changeImgConfirmHandler}
          confirmBtnText="Zmień"
          confirmBtnClass="btn-primary"
          children={
            <form>
              <label htmlFor="file">Wybierz zdjęcie z urządzenia</label>
              <div className="input-group">
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  accept="image/*"
                  aria-describedby="inputGroupFileAddon"
                  onChange={fileInputChangeHandler}
                />
              </div>
            </form>
          }
        />
      )}
    </>
  );
};

export default UserProfile;
