import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>

const asyncHandler = (requestHandler: AsyncRequestHandler): RequestHandler =>
{
    return (req, res, next) =>
    {
        Promise.resolve(requestHandler(req, res, next)).catch((err: any) =>
        {
            console.log(err)
            next(err)
        });
    };
};

export { asyncHandler };
