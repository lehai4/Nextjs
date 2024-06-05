import envConfig from "@/config/env/config";
import { cookies } from "next/headers";

const MeProfile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken?.value}`,
    },
  }).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    if (!res.ok) {
      return;
    }
    return data;
  });

  if (!res) {
    return <div className="text-red-500 text-[30px]">Imposibile call api</div>;
  }
  return (
    <div>
      <h1 className="text-green-500">Call APi on Server</h1>

      <h1>Profile</h1>
      <p>Email: {res.payload.data.email}</p>
      <p>Name: {res.payload.data.name}</p>
    </div>
  );
};

export default MeProfile;
