"use client";
import { useEffect, useState } from "react";
import DashboardContent from "@/components/layouts/DashboardContent";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "@/components/ui/loading";
import Image from "next/image";
import { motion } from "framer-motion";


function LoadingState() {
  return (
    <div className="flex w-full h-screen justify-center items-center m-auto bg-[#330065]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 50 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image src="/logo.jpg" alt="logo" width={100} height={100} />
      </motion.div>
    </div>
  );
}
const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const { toast } = useToast();

useEffect(() => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    setIsAuthenticated(true);
  } else {
    toast({
      variant: "destructive",
      description: "You need to log in to access this page.",
    });
     setRedirecting(true);

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  }

  setLoading(false);
}, [toast]);

  if (loading || redirecting) return <LoadingState />;

  return (
    <div className="bg-[#F2F2F2] md:bg-white">
      {isAuthenticated && <DashboardContent />}
    </div>
  );
};

export default Page;
