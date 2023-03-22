import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapater implements HttpClient {
    
    async get(url: string): Promise<any> {
        const response = await axios.get(url);
        return response.data;
    }

    async post(url: string, body: any): Promise<any> {
        const response = await axios.get(url, body);
        return response.data;
    }
}
