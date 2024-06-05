"use client";

import envConfig from "@/config/env/config";
import { useSessionContext } from "@/context/session-provider";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const Profile = () => {
  const { sessionToken } = useSessionContext();
  const [cookies] = useCookies(["sessionToken"]); // nếu cookies có thuộc tính HttpOnly thi` ko dùng được
  const [profile, setProfile] = useState<any>();
  useEffect(() => {
    (async function getProfile() {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              sessionToken ? sessionToken : cookies.sessionToken
            }`,
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        setProfile(data);
        return data;
      });
    })();
  }, []);
  return (
    <div>
      <h1 className="text-green-500">Call APi on Client</h1>
      {profile === undefined ? (
        <div className="text-red-500 text-[30px]">Imposibile call api</div>
      ) : (
        <>
          <h1>Profile</h1>
          <p>Email:{profile.payload.data.email}</p>
          <p>Name :{profile.payload.data.name}</p>{" "}
        </>
      )}
    </div>
  );
};

export default Profile;
