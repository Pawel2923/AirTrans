import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import TabelaOgloszeniaK from "../components/tabelaOgloszeniaK"
import { Announcements } from "../assets/Data";
import announcementService from "../services/announcement.service";
import styles from "./Ogloszenia.module.css";

const Ogloszenia = () => {
    const [ogloszenia, setOgloszenia] = useState<Announcements[]>([]);

    const fetchOgloszenia = async () => {
       
            const response = await announcementService.get();
            setOgloszenia(response.data.data);
    }
    useEffect(() => {
        fetchOgloszenia();
    }, []);

    return (
        <div className={styles.container}>
            <Nav />
            <div className={styles.content}>
                <TabelaOgloszeniaK ogloszenia={ogloszenia} />
            </div>
            <Footer />
        </div>
    );
};

export default Ogloszenia;
