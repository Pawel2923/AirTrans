import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Announcements, PageData } from '../../assets/Data';
import announcementService from '../../services/announcement.service';
import styles from '../../components/tableCars.module.css';
import AnnouncementTable from '../../components/tableOgloszenia';
import Pagination from '../../components/Pagination';

const OgloszeniaPage = () => {
    const [pagedata, setPageData] = useState<PageData>({
        page: 1,
        pages: 1,
    });
    const [announcements, setAnnouncements] = useState<Announcements[]>([]);
    const [newAnnouncementData, setNewAnnouncementData] = useState<Announcements>({
        id: 0,
        title: "",
        content: "",
        valid_until: "",
        Employee_id: 0,
    });

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewAnnouncementData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitNewAnnouncement = async () => {
        try {
            const validUntil = new Date(newAnnouncementData.valid_until);
            const formattedDate = validUntil.toISOString().slice(0, 19).replace('T', ' ');

            const response = await announcementService.create({
                ...newAnnouncementData,
                valid_until: formattedDate,
            });

            setAnnouncements(prevAnnouncements => [...prevAnnouncements, response.data]);
            setNewAnnouncementData({
                id: 0,
                title: "",
                content: "",
                valid_until: "",
                Employee_id:0,
            });

            alert("Dodano nowe ogłoszenie");
            fetchAnnouncements();
        } catch (error) {
            console.error("Error while creating announcement:", error);
            alert("Wystąpił błąd podczas dodawania ogłoszenia. Spróbuj ponownie.");
        }
    };

    const deleteAnnouncement = async (id: number) => {
        try {
            await announcementService.delete(id);
            setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement.id !== id));
            alert("Usunięto ogłoszenie");
        } catch (error) {
            console.error("Error while deleting announcement:", error);
            alert("Wystąpił błąd podczas usuwania ogłoszenia. Spróbuj ponownie.");
        }
    };

    const editAnnouncement = (announcement: Announcements) => {
        navigate(`edit-ogloszenia/${announcement.id}`);
    };

    const fetchAnnouncements = async () => {
        try {
            const response = await announcementService.get(pagedata.page);
            setAnnouncements(response.data.data);
            setPageData(response.data.meta);
        } catch (error) {
            console.error("Error while fetching announcements:", error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [pagedata.page]);

    return (
        <div className="container">
            <h1 className="text-center">Ogłoszenia</h1>
            <div className={styles.tableContainer}>
                <h2>Lista ogłoszeń</h2>
                <AnnouncementTable
                    announcements={announcements}
                    onEdit={editAnnouncement}
                    onDelete={deleteAnnouncement}
                />
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
                            <h4>Dodaj nowe ogłoszenie</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="title">Tytuł</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control"
                                    value={newAnnouncementData.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Treść</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    className="form-control"
                                    value={newAnnouncementData.content}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="valid_until">Ważne do</label>
                                <input
                                    type="datetime-local"
                                    name="valid_until"
                                    id="valid_until"
                                    className="form-control"
                                    value={newAnnouncementData.valid_until}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Employee_id">Autor</label>
                                <input
                                    type="number"
                                    name="Employee_id"
                                    id="Employee_id"
                                    className="form-control"
                                    value={newAnnouncementData.Employee_id}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={submitNewAnnouncement}
                            >
                                Dodaj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OgloszeniaPage;
