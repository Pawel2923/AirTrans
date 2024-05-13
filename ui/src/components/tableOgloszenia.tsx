import React from 'react';
import { Announcements } from '../assets/Data';
import styles from './tableCars.module.css';


type AnnouncementTableProps = {
    announcements: Announcements[];
    onEdit: (announcement: Announcements) => void;
    
};
const AnnouncementTable: React.FC<AnnouncementTableProps> = ({ announcements, onEdit }) => {

    const handleEditClick = (announcement: Announcements) => {
        onEdit(announcement);
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tytuł</th>
                    <th>Treść</th>
                    <th>Ważne do</th>
                    <th>Czas tworzenia</th>
                    <th>Autor</th>
                </tr>
            </thead>
            <tbody>
                {announcements.map((announcement) => (
                    <tr key={announcement.id}>
                        <td>{announcement.id}</td>
                        <td>{announcement.title}</td>
                        <td>{announcement.content}</td>
                        <td>{announcement.valid_until}</td>
                        <td>{announcement.create_time}</td>
                        <td>{announcement.Employee_id}</td>
                        <td>
                            <button
                                className="btn btn-primary me-3"
                                onClick={() => handleEditClick(announcement)}>EDYTUJ</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AnnouncementTable;