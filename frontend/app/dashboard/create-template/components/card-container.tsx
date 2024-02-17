import { deleteCvTemplate } from "@/actions/template/tempate-action";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/dateFormatter";
import { CvTemplateType } from "@/types/TemplateTypes";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function CardContainers({ data }: { data: CvTemplateType | null })
{

    if (data === null)
    {
        return (
            <Link href={'create-template/new'}>
                <CardContainer className=" w-[500px] cursor-pointer  ">
                    <CardBody className="bg-gray-50 flex justify-center relative group/card hover:shadow-lg  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 border  ">
                        <CardItem
                            translateZ="50"
                            className="text-xl  flex justify-center items-center
                        flex-col py-[3.1rem] font-bold text-neutral-600 dark:text-white">
                            <PlusIcon size={50} />
                            <h1>Add Template</h1>
                        </CardItem>
                    </CardBody>
                </CardContainer>
            </Link>
        )
    }


    const deleteTemplate = async (data: string) =>
    {
        console.log(data)
        const response = await deleteCvTemplate(data)
        console.log(response)

    }
    return (

        <>

            {/* <Link href={`create-template/${data._id}`}> */}
            <CardContainer className=" w-[500px] ">
                <CardBody className="bg-gray-50 relative group/card hover:shadow-2xl shadow-sm  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 border  ">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        {data?.subject}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="30"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        {data?.body}
                    </CardItem>

                    <div className="flex justify-between items-center mt-20">
                        <CardItem
                            translateZ={20}
                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                            {data?.createdAt && formatDate(data.createdAt)}
                        </CardItem>
                        <CardItem
                            translateZ={20}
                        >
                            <Button onClick={() => deleteTemplate(data?._id)} variant={"outline"} className=" text-red-500">Delete</Button>
                        </CardItem>
                    </div>
                </CardBody>
            </CardContainer>

            {/* </Link> */}

        </>
    );
}
