"use client"
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({ children }) {
  const { authorized, loaded } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !authorized) {
      router.replace("/auth");
    }
  }, [authorized, loaded]);

  if (!loaded) return <></>;

  return <>{children}</>
}