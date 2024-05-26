import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EventLogs,PageData } from "../assets/Data";
import { Logowanie_log } from "../assets/Data";
import login_logService from "../services/login_log.service";
import logsService from "../services/logs.service";
import LogiTable from "../components/Login_LogTable";
import Event_logsTable from "../components/LogiTable";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";


const LogsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); 
    const [event_logs, setEvent_logs] = useState<EventLogs[]>([]);
   const [logi, setLogi] = useState<Logowanie_log[]>([]);
    const [pageData, setPageData] = useState<PageData>({
        page: parseInt(searchParams.get("page") || "1"),
        pages: 1
    });
    const [pageData2, setPageData2] = useState<PageData>({
        page: parseInt(searchParams.get("page") || "1"),
        pages: 1
    });

    const handleBack = () => {
        navigate("/zarzadzanie/harmonogram"); 
    };
    useEffect(() => {
         login_logService.get(pageData2.page, 10).then((response) => {
            if (response.status === 200) {
                setLogi(response.data.data);
                 setPageData2(response.data.meta);
            }
        });
    }, [pageData2.page]

);
    useEffect(() => {
        logsService.get(pageData.page, 10).then((response) => {
            if (response.status === 200) {
                setEvent_logs(response.data.data);
                setPageData(response.data.meta);
            }
        });
    }, [pageData.page]
    
);

    return (
        <div style={{padding: "2rem"}}>
            <h1>Historia zdarzeń w bazie danych</h1>
            <button
            onClick={handleBack}
            className="btn btn-primary mt-3 mb-3"
            >Powrót do zarządzania</button>
            <Event_logsTable event_logs={event_logs} />
            <Pagination
                pageData={pageData}
                setPageData={setPageData}
                className="mt-3"
            />
            <h1>Historia logowań i rejestracji</h1>
            <LogiTable logi={logi} />
            <Pagination
                pageData={pageData2}
                setPageData={setPageData2}
                className="mt-3"
            />
        </div>
    );
};

export default LogsPage;
