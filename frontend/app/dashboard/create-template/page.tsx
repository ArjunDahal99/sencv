import { cookies } from 'next/headers';
import Client from './client';


const CreateTemplateMenu = async () =>
{
    const cookieStore = cookies()
    const token = cookieStore.get('accessToken')
    return (
        <Client token={token} />
    )
}

export default CreateTemplateMenu;
