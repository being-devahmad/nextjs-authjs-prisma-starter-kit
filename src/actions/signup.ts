import db from "@/lib/db"
import { executeAction } from "@/lib/executeAction"
import { formSchema } from "@/lib/validation"
import bcrypt from "bcryptjs"

// signup
const signup = async (formData: FormData) => {
    return executeAction({
        actionFn: async () => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const validatedData = formSchema.parse({ email, password })

            // Hash the password with bcryptjs
            const hashedPassword = bcrypt.hashSync(validatedData.password, 10);

            const newUser = await db.user.create({
                data: {
                    email: validatedData.email.toLowerCase(),
                    password:hashedPassword
                }
            })

            console.log("newUser--->", newUser)
        }
    })
}


export { signup }