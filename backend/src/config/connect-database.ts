
import mongoose from 'mongoose'
import env from '../utils/validate-ENV'
import retry from 'retry'
import { logger } from '../utils/logger';

// Database connection retry config
const operation = retry.operation({
    retries: 10, // Number of retries
    factor: 1.5, // Exponential backoff factor
    minTimeout: 500, // Minimum time between retries (in milliseconds)
    maxTimeout: 5000, // Maximum time between retries (in milliseconds)
    randomize: true, // Randomize the timeouts
});

export const conntectToDatabase = () =>
{

    operation.attempt(async () =>
    {
        try
        {
            await mongoose.connect(`${env.MONGO_URL}`, { dbName: "SimoTap" });
            logger.info("DataBase Connected!");
        } catch (error: any)
        {
            logger.error("Could not connect to db!!", error);
            if (operation.retry(error))
            {
                return;
            }
        }
    });
}
