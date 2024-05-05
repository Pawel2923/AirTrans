import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import flightService from "../../services/flight.service";
import { Flight } from "../../assets/Data";

const ScheduleDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [flightData, setFlightData] = useState<Flight[]>([]);

    useEffect(() => {
        if (id === undefined) return;

        flightService.getById(id).then((response) => {
            if (response.status === 200) {
                setFlightData(response.data.data);
            }
        });
    }, [id]);

	return (
		<>
			<h2>Szczegóły lotu</h2>
            <ul>
                {flightData.map((flight: Flight) => (
                    Object.entries(flight).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))
                ))}
            </ul>
		</>
	);
};

export default ScheduleDetails;
