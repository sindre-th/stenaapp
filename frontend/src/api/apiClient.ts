import axios from "axios";

export const apiClient = (() =>
    axios.create({
        baseURL: `${import.meta.env.PROD ? '' : '//localhost:8080'}${import.meta.env.BASE_URL}api`,
        headers: {
            "Content-Type": "application/json"
        }
    }))();