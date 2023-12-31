import axios from "axios";
import { LoginBody } from "../models/API";
import { LoginPath, LogoutPath } from "../constants/API";

export async function login(username: string): Promise<boolean> {
    const body: LoginBody = {
        username: username,
    };

    console.log("login: ", LoginPath);

    const response = await axios.post<any>(LoginPath, {...body}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.status == 200;
}

export async function logout(): Promise<boolean> {
    const response = await axios.get<any>(LogoutPath);

    return response.status == 200;
}