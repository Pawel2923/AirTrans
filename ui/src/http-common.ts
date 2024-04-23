import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:6868/",
    headers: {
        "Content-type": "application/json"
    }
});