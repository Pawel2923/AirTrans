import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import announcementService from "../../services/announcement.service";
import { Announcements } from "../../assets/Data";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const emptyAnnouncement: Announcements = {
  id: 0,
  title: "",
  content: "",
  valid_until: "",
  create_time: "",
  Employee_id: 0,
  type: "information",
};

const EditOgloszeniaPage = () => {
  const { createConfirmModal, createToast } = useContext(ToastModalContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [announcement, setAnnouncement] =
    useState<Announcements>(emptyAnnouncement);

  useEffect(() => {
    if (id === undefined) return;

    const fetchAnnouncement = async () => {
      try {
        const response = await announcementService.getById(parseInt(id));
        if (response.status === 200) {
          const data = response.data.data;

          const formattedValidUntil = new Date(data.valid_until)
            .toISOString()
            .slice(0, 16);

          const formattedCreateTime = new Date(data.create_time)
            .toISOString()
            .slice(0, 16);

          setAnnouncement({
            ...data,
            valid_until: formattedValidUntil,
            create_time: formattedCreateTime,
            type: data.type || "information",
          });
        }
      } catch (error) {
        console.error("Error while fetching announcement:", error);
      }
    };
    fetchAnnouncement();
  }, [id]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConfirmModal({
      message: "Czy na pewno chcesz zaktualizować to ogłoszenie?",
      confirmBtnText: "Aktualizuj",
      confirmBtnClass: "btn-primary",
      onConfirm: async () => {
        try {
          const response = await announcementService.update(announcement);
          if (response.status === 200) {
            createToast({
              message: "Dane ogłoszenia zostały zaktualizowane",
              type: "primary",
              icon: faCircleCheck,
              timeout: 10000,
            });
            navigate("/zarzadzanie/ogloszenia");
          }
        } catch (error) {
          console.error("Error while updating announcement:", error);
          createToast({
            message:
              "Wystąpił błąd podczas aktualizacji ogłoszenia! Spróbuj ponownie.",
            type: "danger",
            timeout: 10000,
          });
        }
      },
    });
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAnnouncement((prevAnnouncement) => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  };
  const selectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAnnouncement((prevAnnouncement) => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  }



  return (
    <div>
      <h1>Edycja Ogłoszeń</h1>
      <form onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="number"
            name="id"
            className="form-control"
            value={announcement.id}
            onChange={inputChangeHandler}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Tytuł</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={announcement.title}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Treść</label>
          <textarea
            name="content"
            className="form-control"
            value={announcement.content}
            onChange={inputChangeHandler}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="valid_until">Ważne do</label>
          <input
            type="datetime-local"
            name="valid_until"
            className="form-control"
            value={announcement.valid_until}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Employee_id">ID Pracownika</label>
          <input
            type="number"
            name="Employee_id"
            className="form-control"
            value={announcement.Employee_id}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="create_time">Czas utworzenia</label>
          <input
            type="datetime-local"
            name="create_time"
            className="form-control"
            value={announcement.create_time}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Typ</label>
          <select
            name="type"
            className="form-control"
            value={announcement.type}
            onChange={selectChangeHandler}
          >
            <option value="important">Ważne</option>
            <option value="change">Zmiana</option>
            <option value="information">Informacja</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Zapisz
        </button>
      </form>
    </div>
  );
};

export default EditOgloszeniaPage;
