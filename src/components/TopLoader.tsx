"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({ showSpinner: false, speed: 500, trickleSpeed: 200 });

export default function TopLoader() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set the mounted state to true after the component mounts
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !router) return;

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Bind route change events
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      // Cleanup events
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [isMounted, router]);

  return null; // No UI rendering
}
