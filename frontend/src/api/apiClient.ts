import axios from "axios";

export const apiClient = (() =>
    axios.create({
        baseURL: import.meta.env.PROD ? '' : '//localhost:8080',
        headers: {
            'Content-Type': 'application/json'
        }
    }))();