import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import announcementService from "../../services/announcement.service";
import { Announcements } from "../../assets/Data";

const emptyAnnouncement: Announcements = {
    id: 0,
    title: "",
    content: "",
    valid_until: "",
    Employee_id: 0,
    
};

const EditOgloszeniaPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [announcement, setAnnouncement] = useState<Announcements>(emptyAnnouncement);

    useEffect(() => {
        if (id === undefined) return;

        const fetchAnnouncement = async () => {
            try {
                const response = await announcementService.getById(parseInt(id));
                if (response.status === 200) {
                    const data = response.data.data;

                    const formattedValidUntil = new Date(data.valid_until).toISOString().slice(0, 16);
                    
                    setAnnouncement({
                        ...data,
                        valid_until: formattedValidUntil,
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
        try {
            const response = await announcementService.update(announcement);
            if (response.status === 200) {
                alert("Edycja zakończona sukcesem!");
                navigate("/zarzadzanie/ogloszenia");
            }
        } catch (error) {
            console.error("Error while updating announcement:", error);
            alert("Wystąpił błąd podczas aktualizacji ogłoszenia. Spróbuj ponownie.");
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle null values appropriately for create_time
        const updatedValue = name === "create_time" && value === "" ? null : value;

        setAnnouncement(prevAnnouncement => ({
            ...prevAnnouncement,
            [name]: updatedValue,
        }));
    };

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
                    />
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
                <button type="submit" className="btn btn-primary">Zapisz</button>
            </form>
        </div>
    );
};

export default EditOgloszeniaPage;
