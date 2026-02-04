import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Gates, PageData } from "../../assets/Data";
import gatesService from "../../services/gates.service";
import TabelkaGates from "../../components/TabelkaGates";
import Pagination from "../../components/Pagination";
import styles from "../../components/tableCars.module.css";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const GatesPage = () => {
  const [pagedata, setPageData] = useState<PageData>({
    page: 1,
    pages: 1,
  });
  const [gates, setGates] = useState<Gates[]>([]);
  const [newGatesData, setNewGatesData] = useState<Gates>({
    id: 0,
    name: "",
    status: undefined,
  });
  const navigate = useNavigate();
  const { createAlertModal, createConfirmModal, createToast } =
    useContext(ToastModalContext);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewGatesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const createSelectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewGatesData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submitNewGates = async () => {
    gatesService.create(newGatesData).then((response) => {
      if (response.status === 201) {
        createToast({
          message: "Dodano nową bramkę",
          type: "primary",
          icon: faCircleCheck,
          timeout: 10000,
        });
        setNewGatesData({
          id: 0,
          name: "",
          status: undefined,
        });
        fetchGates();
      }
    });
  };
  const deleteGates = async (id: number) => {
    createConfirmModal({
      message: "Czy na pewno chcesz usunąć tę bramkę?",
      onConfirm: async () => {
        try {
          await gatesService.delete(id);
          setGates((prevGates) => prevGates.filter((gate) => gate.id !== id));
          createToast({
            message: "Usunięto bramkę",
            type: "primary",
            icon: faCircleCheck,
            timeout: 10000,
          });
        } catch (error) {
          console.error("Error while deleting gates:", error);
          createToast({
            message: "Wystąpił błąd podczas usuwania bramki. Spróbuj ponownie.",
            type: "danger",
            icon: faCircleCheck,
            timeout: 10000,
          });
        }
      },
    });
  };
  const editGates = async (gates: Gates) => {
    navigate(`edit-bramka/${gates.id}`);
  };
  const fetchGates = async () => {
    try {
      const response = await gatesService.get(pagedata.page, 4);
      setGates(response.data.data);
      setPageData(response.data.meta);
    } catch (error) {
      console.error("Error while fetching gates:", error);
      createAlertModal({
        message: "Wystąpił błąd podczas pobierania bramek. Spróbuj ponownie.",
      });
    }
  };
  useEffect(() => {
    fetchGates();
  }, [pagedata.page]);

  return (
    <div className="container">
      <div className={styles.tableContainer}>
        <h2>Lista bramek</h2>
        <TabelkaGates gates={gates} onEdit={editGates} onDelete={deleteGates} />
        <Pagination
          className="mt-3"
          pageData={pagedata}
          setPageData={setPageData}
        />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Dodaj nową bramkę</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="name">Nazwa</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newGatesData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={newGatesData.status}
                  onChange={createSelectChangeHandler}
                >
                  <option value="">Wybierz status</option>
                  <option value="CLOSED">Zamknięta</option>
                  <option value="BUSY">Zajęta</option>
                  <option value="ON STAND">Wstrzymana</option>
                  <option value="READY">Gotowa</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={submitNewGates}>
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatesPage;
