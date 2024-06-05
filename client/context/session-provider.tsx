"use client";
import { createContext, useContext, useState } from "react";

const SessionContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

export const useSessionContext = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSessionContext must be used within an AppProvider");
  }
  return context;
};

export default function SessionContextProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  const [sessionToken, setSessionToken] = useState<string>(initialSessionToken);

  return (
    <SessionContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </SessionContext.Provider>
  );
}
