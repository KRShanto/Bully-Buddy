"use server";

import { db } from "../../../lib/db";
import bcrypt from "bcrypt";
import * as EmailValidator from "email-validator";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface Response {
  success?: boolean;
  error?: {
    field: string;
    message: string;
  };
}

export async function register({
  name,
  email,
  password,
}: RegisterData): Promise<Response> {
  // Check if any field is missing
  if (!name || !email || !password) {
    return {
      error: { message: "You need to fill all the fields", field: "all" },
    };
  }

  // check if the user already created
  const user = await db.user.findUnique({
    where: { email },
  });

  if (user) {
    return {
      // error: "User already exist!",
      error: { message: "User already exist!", field: "email" },
    };
  }

  // check if the email is valid
  if (!EmailValidator.validate(email)) {
    return {
      error: { message: "Invalid email address", field: "email" },
    };
  }

  // check if the password is long enough
  if (password.length < 6) {
    return {
      error: {
        message: "Password must be at least 6 characters long",
        field: "password",
      },
    };
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error found while creating new user");
    console.error("The error: ", error);

    return {
      // error: "A server side error occured",
      error: { message: "A server side error occured", field: "all" },
    };
  }
}
