import { redirect } from "next/navigation";

export default async function AuthRegisterRedirect({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  redirect(`/register${queryString ? `?${queryString}` : ""}`);
}