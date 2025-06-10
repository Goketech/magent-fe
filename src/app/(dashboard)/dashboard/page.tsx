"use client";
import { useEffect, useState } from "react";
import DashboardContent from "@/components/layouts/DashboardContent";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
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

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  }

  setLoading(false);
}, [toast]);


  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-[#F2F2F2] md:bg-white">
      {isAuthenticated && <DashboardContent />}
    </div>
  );
};

export default Page;
