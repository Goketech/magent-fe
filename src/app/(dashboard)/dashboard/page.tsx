"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TwitterProfile {
  profile_image_url: string;
  name: string;
  username: string;
}

const page = () => {
  const [profile, setProfile] = useState<TwitterProfile | null>(null);
  async function fetchTwitterProfile(): Promise<TwitterProfile | null> {
    try {
      const accessToken = localStorage.getItem("twitter_access_token");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const response = await fetch("/api/auth/twitter/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching Twitter profile:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await fetchTwitterProfile();
      setProfile(profile);
      console.log(profile);
    };

    fetchProfile();
  }, []);

  const handleTwitterLogin = async () => {
    try {
      const response = await fetch("/api/auth/twitter/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to authenticate with Twitter");
      }

      const data = await response.json();
      localStorage.setItem("twitter_oauth_state", data.state);
      localStorage.setItem("twitter_code_verifier", data.codeVerifier);
      window.location.href = data.url;
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleDisconnectTwitter = async () => {
    try {
      // const accessToken = localStorage.getItem("twitter_access_token");

      // if (!accessToken) {
      //   throw new Error("No access token found");
      // }

      // const response = await fetch("/api/auth/twitter/logout", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to disconnect Twitter");
      // }

      localStorage.removeItem("twitter_access_token");
      setProfile(null);
    } catch (error) {
      console.error("Error disconnecting Twitter:", error);
    }
  }

  return (
    <div className="ml-[201px] flex mt-[86px] justify-center">
      <div>
        <h2 className="text-[24px] font-medium leading[29px]">
          Generate content
        </h2>
        <div className="mt-[36px] bg-[#F6F6F6] rounded-[4px] px-[20px] py-[12px] w-[438px] flex justify-between items-center">
          {!profile ? (
            <>
              <p>Connect your X account</p>
              <Button onClick={handleTwitterLogin} variant="light">
                Connect
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-[12px]">
                <Image
                  src={profile.profile_image_url}
                  alt="Profile image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-[16px] text-[#212221] font-medium leading-[24px]">{profile.name}</p>
                  <p className="text-[#6A6B6A] text-[14px] leading-[21px]">@{profile.username}</p>
                </div>
              </div>
              <Button onClick={handleTwitterLogin} variant="danger">
                Disconnect
              </Button>
            </>
          )}
        </div>
        <div>
          <div>
            <label
              htmlFor="title"
              className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
            >
              Content title
            </label>
            <Input
              className="h-[45px]"
              name="title"
              type="text"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label
              htmlFor="topic"
              className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
            >
              Content topic
            </label>
            <Select name="topic">
              <SelectTrigger className="w-full h-[45px]">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Market research">
                    Market research
                  </SelectItem>
                  <SelectItem value="Consumer psychology">
                    Consumer psychology
                  </SelectItem>
                  <SelectItem value="Digital marketing">
                    Digital marketing
                  </SelectItem>
                  <SelectItem value="Brand strategy">Brand strategy</SelectItem>
                  <SelectItem value="Data analytics">Data analytics</SelectItem>
                  <SelectItem value="Growth hacking">Growth hacking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between">
            <div>
              <label
                htmlFor="min-frequency"
                className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
              >
                Minimum post frequency
              </label>
              <Select name="min-frequency">
                <SelectTrigger className="w-[209px] h-[45px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0-10">0 - 10 hours</SelectItem>
                    <SelectItem value="10 - 20">10 - 10 hours</SelectItem>
                    <SelectItem value="20 - 30">20 - 30 hours</SelectItem>
                    <SelectItem value="30 - 40">30 - 40 hours</SelectItem>
                    <SelectItem value="40 - 50">40 - 50 hours</SelectItem>
                    <SelectItem value="50 - 60">50 - 60 hours</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="max-frequency"
                className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
              >
                Maximum post frequency
              </label>
              <Select name="max-frequency">
                <SelectTrigger className="w-[209px] h-[45px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0-10">0 - 10 hours</SelectItem>
                    <SelectItem value="10 - 20">10 - 10 hours</SelectItem>
                    <SelectItem value="20 - 30">20 - 30 hours</SelectItem>
                    <SelectItem value="30 - 40">30 - 40 hours</SelectItem>
                    <SelectItem value="40 - 50">40 - 50 hours</SelectItem>
                    <SelectItem value="50 - 60">50 - 60 hours</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label
              htmlFor="style"
              className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
            >
              Post style
            </label>
            <Select name="topic">
              <SelectTrigger className="w-full h-[45px]">
                <SelectValue placeholder="Select post style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Market research">
                    Market research
                  </SelectItem>
                  <SelectItem value="Consumer psychology">
                    Consumer psychology
                  </SelectItem>
                  <SelectItem value="Digital marketing">
                    Digital marketing
                  </SelectItem>
                  <SelectItem value="Brand strategy">Brand strategy</SelectItem>
                  <SelectItem value="Data analytics">Data analytics</SelectItem>
                  <SelectItem value="Growth hacking">Growth hacking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button className="w-full mt-[32px]" variant="main" disabled={true}>
              Generate content
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
