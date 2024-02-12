interface APIMessageType
{
    message: string;
    success: boolean;
}

export interface UserType
{
    createdAt: string | null;
    email: string | null;
    emailActivated: string | null;
    password: string | null;
    refreshToken: string | null;
    role: string | null;
    username: string | null;
    __v: number | null;
    _id: string | null;
}

interface UseAPIMessageType extends APIMessageType
{
    user: UserType;
}
