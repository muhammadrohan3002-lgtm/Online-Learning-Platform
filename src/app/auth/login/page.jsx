import { redirect } from "next/navigation";

export default async function AuthLoginRedirect({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  redirect(`/login${queryString ? `?${queryString}` : ""}`);
}