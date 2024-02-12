import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerAccount = async (data: any) =>
{
    try
    {
        const response = await axios.post(`${API_URL}/auth/registerAccount`, data);
        return response.data;
    } catch (error: any)
    {
        return error?.response?.data;
    }
};

export const loginToAccount = async (data: any) =>
{
    try
    {
        const response = await axios.post(`${API_URL}/auth/loginToAccount`, data, { withCredentials: true });
        return response.data;
    } catch (error: any)
    {
        return error?.response?.data;
    }
};

export const activateAccount = async (data: any) =>
{
    try
    {
        const response = await axios.post(`${API_URL}/auth/activateAccount`, data);
        return response.data;
    } catch (error: any)
    {
        return error.response?.data;
    }
};


export const forgotPassword = async (data: any) =>
{
    try
    {
        const response = await axios.post(`${API_URL}/auth/forgotPassword`, data);
        return response.data;
    } catch (error: any)
    {
        return error.response?.data;
    }
};

export const resetPassword = async (data: any) =>
{
    try
    {
        const response = await axios.post(`${API_URL}/auth/resetPassword`, data);
        return response.data;
    } catch (error: any)
    {
        return error.response?.data;
    }
};
export const logoutFromAccount = async () =>
{
    try
    {
        const response = await axios.post(`${API_URL}/auth/logoutAccount`, {}, { withCredentials: true });
        return response.data;
    } catch (error: any)
    {
        return error.response?.data;
    }
};


