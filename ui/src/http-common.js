import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});