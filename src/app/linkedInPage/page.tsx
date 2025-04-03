"use client"

import React, { useState, useEffect } from "react";

interface LinkedInProfile {
   name: string;
   picture: string;
   email: string;
}

function Page() {
  const [profile, setProfile] = useState<{ name?: string; picture?: string } | null>(null);

  // useEffect(() => {
  //   const fetchLinkedInProfile = async () => {
  //  const data =  await fetchLinkedInProfile();
  //  setProfile({
  //   name: data.localizedFirstName + " " + data.localizedLastName,
  //   picture: data.profilePicture?.["displayImage~"]?.elements[0]?.identifiers[0]?.identifier,
  // });
  //   }

  //   fetchLinkedInProfile(); 
  // }, []); // Runs once when component mounts

  async function fetchLinkedInProfile(): Promise<LinkedInProfile | null> {
    try {
      const accessToken = localStorage.getItem("linkedin_access_token");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const res = await fetch("/api/auth/linkedIn/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      console.log("LinkedIn Profile Data:", data);
     return data; 
      //  setProfile({
      //   name: data.localizedFirstName + " " + data.localizedLastName,
      //   picture: data.profilePicture?.["displayImage~"]?.elements[0]?.identifiers[0]?.identifier,
      // });
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }

  const handleLinkedInLogin = async () => {
    try {
      const response = await fetch("/api/auth/linkedIn/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to authenticate with linkedIn");
      }

      const data = await response.json();
      localStorage.setItem("linkedin_oauth_state", data.state);
      localStorage.setItem("linkedin_code_verifier", data.codeVerifier);
      window.location.href = data.url;
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  function disconnectProfile() {
    localStorage.removeItem("linkedin_access_token"); // Remove token
    setProfile(null);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="text-center mb-4">Login with LinkedIn to get your profile</h1>

      {!profile ? (
        <button
          className="p-4 bg-blue-500 text-white rounded flex justify-center items-center border-none "
          onClick={handleLinkedInLogin}
        >
          Login with LinkedIn
        </button>
      ) : (
        <div className="mt-6 p-4 border rounded shadow-md text-center">
          <img src={profile.picture} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
          <h2 className="text-xl font-bold mt-2">{profile.name}</h2>

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={disconnectProfile}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default Page;
