
import { z } from "zod"

export const cvFormSchema = z.object({
    subject: z.string().min(1, { message: "Subject is Required" }),
    to: z.string().email(),
    body: z.string().min(1, { message: "Body is Required" }),
    file: z.string() || z.null
})