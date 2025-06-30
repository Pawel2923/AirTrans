import { useContext, useState } from "react";
import luggageService from "../../services/luggage.service";
import { Luggage as LuggageType, UserInfo } from "../../assets/Data";
import useErrorHandler from "../../hooks/useErrorHandler";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck, faWarning } from "@fortawesome/free-solid-svg-icons";

interface LuggageProps {
  data: LuggageType;
  usersData?: UserInfo[];
  flightIds: string[];
  getLuggage: () => void;
}

const Luggage = ({ data, usersData, flightIds, getLuggage }: LuggageProps) => {
  const { createConfirmModal, createToast } = useContext(ToastModalContext);
  const { handleError } = useErrorHandler();
  const [isEdit, setIsEdit] = useState(false);
  const [type, setType] = useState(data.type);
  const [size, setSize] = useState(data.size);
  const [weight, setWeight] = useState(data.weight);
  const [flightId, setFlightId] = useState(data.Flights_id);

  const handleDelete = (id: number) => {
    createConfirmModal({
      message: "Czy na pewno chcesz usunąć ten bagaż?",
      title: "Potwierdzenie usunięcia",
      onConfirm: () => {
        luggageService
          .delete(id)
          .then((response) => {
            if (response.status === 200) {
              getLuggage();
            }
          })
          .catch((error) => {
            handleError({ error });
          });
      },
    });
  };

  const handleUpdate = () => {
    if (!type || !size || !weight || !flightId) {
      handleError({
        error: {
          message: "",
          name: "",
          response: {
            data: {
              message: "Wszystkie pola są wymagane",
            },
            status: 400,
          },
        },
      });
      return;
    }

    if (!usersData) {
      handleError({
        error: {
          message: "",
          name: "",
          response: {
            data: {
              message: "Nie znaleziono użytkownika",
            },
            status: 404,
          },
        },
      });
      return;
    }

    if (
      type === data.type &&
      size === data.size &&
      weight === data.weight &&
      flightId === data.Flights_id
    ) {
      createToast({
        type: "warning",
        message: "Nie dokonano zmian",
        icon: faWarning,
      });
      return;
    }

    const User_id = usersData[0].id as number;

    luggageService
      .update(data.id as number, {
        type,
        size,
        weight,
        Users_id: User_id,
        Flights_id: flightId,
      })
      .then((response) => {
        if (response.status === 200) {
          getLuggage();
          setIsEdit(false);
          createToast({
            type: "primary",
            message: "Zaktualizowano bagaż",
            icon: faCircleCheck,
          });
        }
      })
      .catch((error) => {
        handleError({ error });
      });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createConfirmModal({
      message: "Czy na pewno chcesz zaktualizować ten bagaż?",
      title: "Potwierdzenie aktualizacji",
      onConfirm: handleUpdate,
      confirmBtnText: "Tak, zaktualizuj",
      confirmBtnClass: "btn-primary"
    });
  };

  return (
    <div key={data.id} className="card mb-3">
      <div className="card-body">
        {isEdit ? (
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={size}
                onChange={(event) => setSize(event.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group" style={{ position: "relative" }}>
              <input
                type="number"
                value={weight}
                step={0.25}
                onChange={(event) => setWeight(Number(event.target.value))}
                className="form-control"
              />
              <span
                style={{
                  position: "absolute",
                  right: "2.5rem",
                  top: "0.25rem",
                }}
              >
                kg
              </span>
            </div>
            <div className="form-group">
              <input
                list="flightIds"
                className="form-control"
                id="Flights_id"
                value={flightId}
                onChange={(event) => setFlightId(event.target.value)}
              />
              <datalist id="flightIds">
                {flightIds.map((id) => (
                  <option key={id} value={id} />
                ))}
              </datalist>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary me-2">
                Zapisz
              </button>
              <button className="btn btn-alt" onClick={() => setIsEdit(false)}>
                Anuluj
              </button>
            </div>
          </form>
        ) : (
          <>
            <p>{data.type}</p>
            <p>{data.size}</p>
            <p>{data.weight.toString().replace(".", ",")}kg</p>
            <p>{data.Flights_id}</p>
          </>
        )}
        {!isEdit && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-alt me-2"
              onClick={() => setIsEdit(true)}
            >
              Edytuj
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(data.id as number)}
            >
              Usuń
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Luggage;
