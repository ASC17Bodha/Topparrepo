import axios from "axios";
import { IWorkshop } from "../models/IWorkshop";

const getWorkshops = async (page: number = 1, category: string = '') => {
    const params: {
        _page: number;
        category?: string
    } = {
        _page: page,
    };

    if (category !== '') {
        params.category = category;
    }

    const response = await axios.get<IWorkshop[]>(
        `http://localhost:8001/workshops`,
        {
            // params: params,
            params,
        }
    );

    return response.data;
}
const getWorkshopById = async (id: number) => {
    const response = await axios.get<IWorkshop>(
        `https://workshops-server.onrender.com/workshops/${id}`
    );

    return response.data;
};

export { getWorkshops, getWorkshopById };