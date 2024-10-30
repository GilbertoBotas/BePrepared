import { postData } from "./api";

export interface AdminProps {

}

export interface LoginResponseProps {
    token: string,
    admin: {
        id: string;
        name: string;
        email: string;
    }
}

export async function loginService(email: string, password: string): Promise<LoginResponseProps> {
    const response = await postData<LoginResponseProps>('/auth/admin', {
        email,
        password
    });

    return response;
}