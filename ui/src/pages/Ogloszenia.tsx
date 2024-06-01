import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import TabelaOgloszeniaK from "../components/tabelaOgloszeniaK";
import { Announcements,PageData } from "../assets/Data";
import announcementService from "../services/announcement.service";
import styles from "./Ogloszenia.module.css";
import Pagination from "../components/Pagination";


const Ogloszenia = () => {
  const [ogloszenia, setOgloszenia] = useState<Announcements[]>([]);
  const [pagedata, setPageData] = useState<PageData>({
    page: 1,
    pages: 1,
  });

  const fetchOgloszenia = async () => {
    const response = await announcementService.get(pagedata.page ,4);
    setPageData(response.data.meta);
    setOgloszenia(response.data.data);
  };
  useEffect(() => {
    fetchOgloszenia();
  }, [pagedata.page]);

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.content}>
        <TabelaOgloszeniaK ogloszenia={ogloszenia} />
        <div >
        <Pagination 
          className="mt-3"
          pageData={pagedata}
          setPageData={setPageData}
         />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Ogloszenia;
