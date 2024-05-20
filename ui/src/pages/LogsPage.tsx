import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Event_logs, PageData } from "../assets/Data";
import logsService from "../services/logs.service";
import Event_logsTable from "../components/LogiTable";
import Pagination from "../components/Pagination";


const LogsPage = () => {
    const [searchParams] = useSearchParams();
    const [event_logs,setEvent_logs] = useState<Event_logs[]>([]);
    const [pageData,setPageData]=useState<PageData>({
        page:parseInt(searchParams.get("page") || "1"),
        pages:1
    });
    useEffect(()=>{
        logsService.get(pageData.page, 5).then((response)=>{
            if(response.status === 200){
                setEvent_logs(response.data.data);
                setPageData(response.data.meta);
            }
        });
    },[pageData.page]);
   
    return (
        <div>
            <h1>Logi</h1>
            <Event_logsTable event_logs={event_logs}/>
            <Pagination
                pageData={pageData}
                setPageData={setPageData}
                className="mt-3"
            />
        </div>
    );
};

export default LogsPage;