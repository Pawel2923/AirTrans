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
        setNewAnnouncementData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    const submitNewAnnouncement = async () => {
        try {
            const response = await announcementService.create(newAnnouncementData);
            setAnnouncements([...announcements, response.data]);
            setNewAnnouncementData({
                id: 0,
                title: "",
                content: "",
                valid_until: "",
                Employee_id: 0,
            });
            alert("Dodano nowe ogłoszenie");
            navigate(0);
            
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAnnouncements = async () => {
        announcementService
        .get(pagedata.page, )
        .then((response) => {
            setAnnouncements(response.data.data);
            setPageData(response.data.meta);
            
        })
        .catch((error) => {
            console.error("Error while fetching announcements", error);
        });
    };

    useEffect(() => {
        fetchAnnouncements();
    },[pagedata.page] 
    
    );

    return (
        <div className="container">
            <h1 className="text-center">Ogłoszenia</h1>
            <div className={styles.tableContainer}>
                <h2>Lista ogłoszeń</h2>
                <AnnouncementTable
                    announcements={announcements}
                    onEdit={(announcement) => {
                        navigate(`/manager/ogloszenia/${announcement.id}`);
                    }}

                    
                
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
                                    type="date"
                                    name="valid_until"
                                    id="valid_until"
                                    className="form-control"
                                    value={newAnnouncementData.valid_until}
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
}

export default OgloszeniaPage;
