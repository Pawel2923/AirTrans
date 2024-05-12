import { useState } from "react";
import {
    faCircleCheck,
    faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Flights } from "../assets/Data";
import Toast from "../components/Toast";
import flightService from "../services/flight.service";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/Modals/AlertModal";

// Custom hook for creating a flight
export const useCreateFlight = (
    setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const navigate = useNavigate();
    const [toast, setToast] = useState<typeof Toast | null>(null);

    const createFlight = (data: Flights) => {
        flightService
            .create(data)
            .then((response) => {
                if (response.status === 201) {
                    const { id } = response.data.data;

                    // Show success toast with an action to navigate to the created flight
                    setToast(() => (
                        <Toast
                            icon={faCircleCheck}
                            message="Lot został dodany"
                            onClose={() => setToast(null)}
                            action={{
                                label: "Zobacz",
                                onClick: () => {
                                    setToast(null);
                                    navigate(id);
                                },
                            }}
                            type="primary"
                        />
                    ));
                    setRefreshData && setRefreshData((prev) => !prev);
                }
            })
            .catch(({ response: errorResponse }) => {
                if (errorResponse.status === 400) {
                    // Show error toast for invalid flight data
                    setToast(() => (
                        <Toast
                            icon={faCircleExclamation}
                            message="Niepoprawne dane lotu"
                            onClose={() => setToast(null)}
                            type="danger"
                        />
                    ));
                } else if (errorResponse.status === 409) {
                    // Show error toast for duplicate flight number
                    setToast(() => (
                        <Toast
                            icon={faCircleExclamation}
                            message="Lot o podanym numerze już istnieje"
                            onClose={() => setToast(null)}
                            type="danger"
                        />
                    ));
                } else {
                    // Show generic error toast for other errors
                    setToast(() => (
                        <Toast
                            icon={faCircleExclamation}
                            message="Wystąpił błąd podczas dodawania lotu"
                            onClose={() => setToast(null)}
                            type="danger"
                        />
                    ));
                }
            });
    };

    return {
        toast,
        createFlight,
    };
};

// Custom hook for updating a flight
export const useUpdateFlight = (
    setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const navigate = useNavigate();
    const [toast, setToast] = useState<typeof Toast | null>(null);

    const updateFlight = (id: string, data: Flights) => {
        flightService
            .update(id, data)
            .then((response) => {
                if (response.status === 200) {
                    // Show success toast with an action to navigate to the updated flight
                    setToast(() => (
                        <Toast
                            icon={faCircleCheck}
                            message="Lot został zaktualizowany"
                            onClose={() => setToast(null)}
                            action={{
                                label: "Zobacz",
                                onClick: () => {
                                    setToast(null);
                                    navigate(`/zarzadzanie/harmonogram/${id}`);
                                },
                            }}
                            type="primary"
                        />
                    ));
                    setRefreshData && setRefreshData((prev) => !prev);
                }
            })
            .catch(({ response: errorResponse }) => {
                if (errorResponse.status === 400) {
                    // Show error toast for invalid flight data
                    setToast(() => (
                        <Toast
                            icon={faCircleExclamation}
                            message="Niepoprawne dane lotu"
                            onClose={() => setToast(null)}
                            type="danger"
                        />
                    ));
                } else if (errorResponse.status === 404) {
                    // Show error toast if flight does not exist
                    setToast(() => (
                        <Toast
                            icon={faCircleExclamation}
                            message="Lot nie istnieje"
                            onClose={() => setToast(null)}
                            type="danger"
                        />
                    ));
                } else {
                    // Show generic error toast for other errors
                    setToast(() => (
                        <Toast
                            icon={faCircleExclamation}
                            message="Wystąpił błąd podczas aktualizacji lotu"
                            onClose={() => setToast(null)}
                            type="danger"
                        />
                    ));
                }
            });
    };

    return {
        toast,
        updateFlight,
    };
};

// Custom hook for deleting a flight
export const useDeleteFlight = (
    setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>,
    useAlert?: boolean,
) => {
    const navigate = useNavigate();
    const [toast, setToast] = useState<typeof Toast | null>(null);
    const [alert, setAlert] = useState<typeof AlertModal | null>(null);

    const deleteFlight = (deleteId: string) => {
        flightService
            .delete(deleteId)
            .then((response) => {
                if (response.status === 204) {
                    if (useAlert) {
                        // Show alert modal if useAlert is true
                        setAlert(() => (
                            <AlertModal
                                open={true}
                                title="Usunięto lot"
                                message="Lot został usunięty"
                                onClose={() => {
                                    setAlert(null);
                                    navigate("/zarzadzanie/harmonogram");
                                }}
                            />
                        ));
                    } else {
                        // Show success toast if useAlert is false
                        setToast(() => (
                            <Toast
                                icon={faCircleCheck}
                                message="Lot został usunięty"
                                onClose={() => setToast(null)}
                                type="primary"
                            />
                        ));
                    }
                    setRefreshData && setRefreshData((prev) => !prev);
                }
            })
            .catch(({ response: errorResponse }) => {
                if (errorResponse.status === 404) {
                    // Show error toast if flight does not exist
                    setToast(() => (
                        <Toast
                            icon={faCircleExclamation}
                            message="Lot nie istnieje"
                            onClose={() => setToast(null)}
                            type="danger"
                        />
                    ));
                } else {
                    // Show generic error toast for other errors
                    setToast(() => (
                        <Toast
                            icon={faCircleExclamation}
                            message="Wystąpił błąd podczas usuwania lotu"
                            onClose={() => setToast(null)}
                            type="danger"
                        />
                    ));
                }
            });
    };

    return {
        alert,
        toast,
        deleteFlight,
    };
};
