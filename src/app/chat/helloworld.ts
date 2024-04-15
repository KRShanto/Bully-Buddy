"use server";

export async function helloworld(formData: FormData) {
  console.log(formData.get("input"));

  return "Hello, World!";
}
