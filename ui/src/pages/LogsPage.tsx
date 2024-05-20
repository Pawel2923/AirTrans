import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Event_logs, PageData } from "../assets/Data";
import logsService from "../services/logs.service";
import Event_logsTable from "../components/LogiTable";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import "./PageLogs.module.css";

const LogsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); 
    const [event_logs, setEvent_logs] = useState<Event_logs[]>([]);
    const [pageData, setPageData] = useState<PageData>({
        page: parseInt(searchParams.get("page") || "1"),
        pages: 1
    });

    const handleBack = () => {
        navigate("/zarzadzanie/harmonogram"); 
    };
    useEffect(() => {
        logsService.get(pageData.page, 10).then((response) => {
            if (response.status === 200) {
                setEvent_logs(response.data.data);
                setPageData(response.data.meta);
            }
        });
    }, [pageData.page]);

    return (
        <div>
            <h1>Historia zdarzeń w bazie danych</h1>
            <button
            onClick={handleBack}
            className="btn btn-primary mt-3 mb-3"
            >Powrót do zarządzania</button>
            <div className="table-container">
                <Event_logsTable event_logs={event_logs} />
            </div>
            <Pagination
                pageData={pageData}
                setPageData={setPageData}
                className="mt-3 pagination"
            />
        </div>
    );
};

export default LogsPage;
