import { backendUrl } from "./config";
import axios from 'axios';



export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    try {
        const response = await axios.post(`${backendUrl}${route}`, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error; 
    }
};
