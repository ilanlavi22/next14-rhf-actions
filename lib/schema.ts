import { z } from "zod";

const notEmpty = z.string().trim().min(1, { message: "Required" });

export const FormDataSchema = z.object({
  name: notEmpty.min(5, { message: "Name must be at least 5 characters long" }),

  message: z
    .string({ required_error: "Message is required" })
    .min(1, { message: "Please enter a message" })
    .min(10, { message: "Message must be at least 10 characters long" }),
});
