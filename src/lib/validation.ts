import { z } from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

export { formSchema }