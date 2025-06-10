import { z } from "zod";

const loginValidationSchema = z.object({
    boody : z.object({
        id : z.string({required_error : "ID is required"}),
        password : z.string({required_error : "Password is required"})
    })
})


export const authValidation = {
    loginValidationSchema
}