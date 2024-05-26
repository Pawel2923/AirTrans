import React from "react";
import { Announcements } from "../assets/Data"; 
import styles from "./tabelkaogloszeniaK.module.css"

type OgloszeniaTableProps = {
    ogloszenia: Announcements[];
};

const TabelaOgloszeniaK: React.FC<OgloszeniaTableProps> = ({ ogloszenia }) => {
    return (
        <div className={styles.container}>
            {ogloszenia.map((ogloszenie) => (
                <div key={ogloszenie.id} className={styles.gateCard}>
                    <div className={styles.title}>{ogloszenie.title}</div>
                    <div className={styles.content}>{ogloszenie.content}</div>
                    <div className={styles.meta}>
                        <span className={styles.valid_until}>Valid Until: {ogloszenie.valid_until}</span>
                        <span className={styles.create_time}>Created At: {ogloszenie.create_time}</span>
                        <span className={styles.Employee_id}>Employee ID: {ogloszenie.Employee_id}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TabelaOgloszeniaK;
