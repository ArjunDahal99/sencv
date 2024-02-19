import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CVTemplateState
{
    subject: string;
    body: string;
    fileName: string;
    filePath: string;
    email: string[];
    setField: (field: Partial<CVTemplateState>) => void;
    addEmail: (newEmail: string) => void; // Function to add an email
    deleteEmail: (newEmail: string) => void; // Function to add an email
}

export const useCVTemplateStore = create<CVTemplateState>(
    //@ts-ignore
    devtools(
        persist(
            (set) => ({
                subject: '',
                body: '',
                email: [],
                fileName: '',
                filePath: '',
                setField: (field) => set(field),
                addEmail: (newEmail) => set((state) => ({ email: [...state.email, newEmail] })),
                deleteEmail: (email) => set((state) => ({ email: state.email.filter((e) => e != email) }))
            }),
            { name: 'cv-template' },
        ),
    ),
);
