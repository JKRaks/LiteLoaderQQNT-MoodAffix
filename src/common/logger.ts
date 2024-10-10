// logger.js
import axios from 'axios';

export function log(message: any) {
    try {
        //postData('', message)
        console.log(message);
    } catch (e) { console.error(e); }
}

async function postData(url: string, data: object): Promise<any> {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}