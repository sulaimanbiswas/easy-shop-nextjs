import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const auth = useContext(AuthContext);
  const isClient = typeof window !== "undefined";

  if (!isClient && !auth) return {};

  if (!auth) {
    throw new Error(
      "useAuth must be used within a AuthProvider. Wrap a parent component in <AuthProvider /> to fix this error."
    );
  }

  return auth;
};

export default useAuth;
