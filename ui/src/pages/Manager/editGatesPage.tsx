import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gatesService from "../../services/gates.service";
import { Gates } from "../../assets/Data";

const emptyGates: Gates = {
  id: 0,
  name: "",
  status: undefined,
};
const EditGatesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [gates, setGates] = useState<Gates>(emptyGates);

  useEffect(() => {
    if (id === undefined) return;

    const fetchGates = async () => {
      try {
        const response = await gatesService.getById(parseInt(id));
        if (response.status === 200) {
          const data = response.data.data;
          setGates(data);
        }
      } catch (error) {
        console.error("Error while fetching gates:", error);
      }
    };
    fetchGates();
  }, [id]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await gatesService.updateG(gates);
      if (response.status === 200) {
        alert("Edycja zakończona sukcesem!");
        navigate("/zarzadzanie/bramki");
      }
    } catch (error) {
      console.error("Error while updating gates:", error);
      alert("Wystąpił błąd podczas aktualizacji bramki. Spróbuj ponownie.");
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGates({
      ...gates,
      [e.target.name]: e.target.value,
    });
  };
  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGates({
      ...gates,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Edytuj bramkę</h1>
      <form onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="name">Nazwa</label>
          <input
            type="text"
            id="name"
            name="name"
            value={gates.name}
            onChange={inputChangeHandler}
          />
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={gates.status}
            onChange={selectChangeHandler}
          >
            <option value="CLOSED">Zamknięta</option>
            <option value="BUSY">Zajęta</option>
            <option value="ON STAND">Wstrzymana</option>
            <option value="READY">Gotowa</option>
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-primary me-3">
            Zapisz
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGatesPage;
