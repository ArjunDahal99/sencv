import { cookies } from 'next/headers';
import { getTemplateWithHeaders } from '@/actions/template/tempate-action';
import { CardContainers } from './components/card-container';
import { CvTemplateType } from '@/types/TemplateTypes';


const CreateTemplateMenu = async () =>
{
    const cookieStore = cookies()
    const token = cookieStore.get('accessToken')
    const data = await getTemplateWithHeaders(token?.value)
    console.log(data.userTemplate)
    return (
        <div className=' flex  flex-wrap justify-start gap-x-6  gap-y-6 items-start p-6 '>
            <CardContainers data={null} />
            {data.userTemplate.map((t: CvTemplateType) => (<CardContainers data={t} />))}
        </div>
    )
}

export default CreateTemplateMenu;
