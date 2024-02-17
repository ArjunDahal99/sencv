import axios from "axios";

//const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTemplateWithHeaders = async (token: string | any) =>
{
    try
    {
        console.log(API_URL)
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
        console.log(error)
        return (error)
    }
};


export const getOneTemplateWithHeaders = async (templateId: string | any) =>
{
    try
    {
        const response = await axios.post(`${API_URL}/template/get-one-template`, { templateId }, { withCredentials: true });
        return response.data;
    } catch (error)
    {
        console.log(error);
        return error;
    }
};
export const createTemplate = async (data: string | any) =>
{
    try
    {
        const response = await axios.post(`${API_URL}/template/create-template`, data, { withCredentials: true });
        return response.data;
    } catch (error)
    {
        console.log(error);
        return error;
    }
};



export const deleteCvTemplate = async (data: string | any) =>
{
    try
    {
        console.log(`${API_URL}/template/delete-template/${data}`);
        const response = await axios.delete(
            `${API_URL}/template/delete-template/${data}`,
            {
                withCredentials: true // Correct placement of withCredentials
            }
        );
        return response.data;
    } catch (error)
    {
        console.log(error);
        return error;
    }
};
