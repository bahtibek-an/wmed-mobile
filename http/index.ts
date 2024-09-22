import axios from "axios";

export const BASE_URL = "https://med-production.up.railway.app/api/v1";

export const $host = axios.create({
    baseURL: BASE_URL,
});
