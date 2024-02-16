import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTemplateWithHeaders = async (token: string | any) =>
{
    try
    {
        const requestOptions = {
            headers: {
                'Authorization': `Bearer${token}`
            }
        };

        const response = await fetch(`${API_URL}/template/get-template`, requestOptions);
        const data = await response.json();
        return data

    } catch (error)
    {
        console.log("error")
    }
};