import React from 'react';
import { Equipment } from '../assets/Data';
import styles from './tableCars.module.css';

type EquipmentTableProps = {
    equipment: Equipment[];
    onEdit: (equipment: Equipment) => void;
    onDelete: (id: number) => void;
};
const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipment, onEdit }) => {

    const handleEditClick = (equipment: Equipment) => {
        onEdit(equipment);
    };
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>type</th>
                    <th>Nazwa</th>
                    <th>Lokalizacja</th>
                    <th>Pracownik</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {equipment.map((equipment) => (
                    <tr key={equipment.serial_no}>
                        <td>{equipment.serial_no}</td>
                        <td>{equipment.type}</td>
                        <td>{equipment.name}</td>
                        <td>{equipment.location}</td>
                        <td>{equipment.Employee_id}</td>
                        <td>
                            <button
                                className="btn btn-primary me-3"
                                onClick={() => handleEditClick(equipment)}>EDYTUJ</button>
                    
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

   
};

export default EquipmentTable;


