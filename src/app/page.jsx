'use client'
import React, { useEffect } from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";

export default function Home() {
  const router = useRouter();

  const { authorized, loaded } = useSession();
  
  useEffect(() => {
    if (loaded) {
      router.replace(authorized ? "/user/dashboard" : "/auth");
    }
  }, [authorized, loaded])

  return (
    <>
    </>
  );
}
