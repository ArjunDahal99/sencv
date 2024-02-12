import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CVTemplateState
{
    subject: string;
    body: string;
    fileName: string;
    filePath: string;
    email: string;
    setField: (field: Partial<CVTemplateState>) => void;
}

export const useCVTemplateStore = create<CVTemplateState>(
    //@ts-ignore
    devtools(
        persist(
            (set) => ({
                subject: '',
                body: '',
                email: '',
                fileName: '',
                filePath: '',
                setField: (field) => set(field),
            }),
            { name: 'cv-template' },
        ),
    ),
);
