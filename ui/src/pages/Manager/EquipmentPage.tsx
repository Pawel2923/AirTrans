import React, { useState, useEffect, useContext } from "react";
import equipmentService from "../../services/equipment.service";
import EquipmentTable from "../../components/equipmentTable";
import { PageData, Equipment } from "../../assets/Data";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const EquipmentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const {createAlertModal,createConfirmModal,createToast} = useContext(ToastModalContext);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Equipment>({
    serial_no: "",
    type: "",
    name: "",
    location: "",
    Employee_id: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEquipment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitNewEquipment = async () => {
    equipmentService.createEquipment(newEquipment).then((response) => {
      if (response.status === 201) {
        createToast({
          message: "Dodano nowe urządzenie",
          type: "primary",
          icon: faCircleCheck,
          timeout: 10000,
        });
        setNewEquipment({
          serial_no: "",
          type: "",
          name: "",
          location: "",
          Employee_id: 0,
        });
        fetchEquipment();
      }
    });
  }
  const deleteEquipment = async (serial_no: string) => {
    createConfirmModal({
      message: "Czy na pewno chcesz usunąć to urządzenie?",
      onConfirm: async () => {
        try {
          await equipmentService.deleteEquipment(serial_no);
          setEquipment((prevEquipment) =>prevEquipment.filter((equipment) => equipment.serial_no !== serial_no));
          createToast({
            message: "Usunięto urządzenie",
            type: "primary",
            icon: faCircleCheck,
            timeout: 10000,
          });

        }catch (error) {
          console.error("Error while deleting equipment:", error);
          createToast({
            message: "Wystąpił błąd podczas usuwania urządzenia. Spróbuj ponownie.",
            type: "danger",
            icon: faCircleCheck,
            timeout: 10000,
          });

        }
      },
    });
  }
  const editEquipment = async (equipment: Equipment) => {
    navigate(`edit-sprzet/${equipment.serial_no}`);
  };
  const fetchEquipment = async () => {
    try {
      const response = await equipmentService.getaAll(pageData.page, 4);
      setEquipment(response.data.data);
      setPageData(response.data.meta);
    } catch (error) {
      console.error("Error while fetching equipment:", error)
      createAlertModal({
        message: "Wystąpił błąd podczas pobierania sprzętu. Spróbuj ponownie.",
      });
    }
  }
  useEffect(() => {
    fetchEquipment();
  }, [pageData.page]);

  return (
    <div className="container">
      <h1 className="text-center">Equipment</h1>
      <div className="tableContainer">
        <h2>Lista urządzeń</h2>
        <EquipmentTable
          equipment={equipment}
          onEdit={editEquipment}
          onDelete={deleteEquipment}
        />
        <Pagination
          className="mt-3"
          pageData={pageData}
          setPageData={setPageData}
        />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Dodaj nowe urządzenie</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="serial_no">Numer seryjny</label>
                <input
                  type="text"
                  name="serial_no"
                  id="serial_no"
                  className="form-control"
                  value={newEquipment.serial_no}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Typ</label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  className="form-control"
                  value={newEquipment.type}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nazwa</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={newEquipment.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Lokalizacja</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="form-control"
                  value={newEquipment.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Employee_id">ID pracownika</label>
                <input
                  type="number"
                  name="Employee_id"
                  id="Employee_id"
                  className="form-control"
                  value={newEquipment.Employee_id}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary" onClick={submitNewEquipment}>
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentPage;
