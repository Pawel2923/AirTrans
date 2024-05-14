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
                    setAnnouncement(response.data.data[0]);
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
        setAnnouncement(prevAnnouncement => ({
            ...prevAnnouncement,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <h1>Edit Announcement</h1>
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
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={announcement.title}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        name="content"
                        className="form-control"
                        value={announcement.content}
                        onChange={inputChangeHandler}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="valid_until">Valid Until</label>
                    <input
                        type="datetime-local"
                        name="valid_until"
                        className="form-control"
                        value={announcement.valid_until}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Employee_id">Employee ID</label>
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
