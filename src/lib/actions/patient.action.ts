"use server";
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { z } from "zod";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
  redirectUrl?: string;
};

const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export async function createUser(prevState: any, formData: FormData) {
  const parsedUser = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsedUser.success) {
    const state: State = {
      status: "error",
      errors: parsedUser.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }
  try {
    const newUser = await users.create(
      ID.unique(),
      parsedUser.data.email,
      parsedUser.data.phone,
      undefined,
      parsedUser.data.name
    );

    const state: State = {
        status: "success",
        message: "User created successfully",
        redirectUrl: `/patients/${newUser.$id}/register`
    };

    return state
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [parsedUser.data.email]),
      ]);
      const state: State = {
        status: "error",
        message: `User already exists with email ${parsedUser.data.email}`,
      };

      return state;
    }
  }
}
