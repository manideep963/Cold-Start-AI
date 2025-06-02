// app/page.tsx or wherever this file is located
"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GeneratorPage from "./generator/page";

const Page = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // redirect to login if not signed in
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null; // avoid flashing GeneratorPage
  }

  return (
    <div>
      <GeneratorPage />
    </div>
  );
};

export default Page;
