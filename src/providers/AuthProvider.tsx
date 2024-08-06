"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { serialize, parse } from "cookie";
import toast from "react-hot-toast";

interface IUser {
  name: string;
  email: string;
  mobileNo: string;
  gender: string;
  permissions: string[];
  roles: string[];
}

type Value = {
  login: (user: IUser, token: string, route: string) => void;
  logout: (route: string, message: string) => void;
  token: string | null;
  user: IUser | null;
};

const AuthContext = createContext<Value | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const client = useQueryClient();

  const getInitialAuthState = () => {
    if (typeof window !== "undefined") {
      const cookies = parse(document.cookie);
      const initialUser = cookies.user ? JSON.parse(cookies.user) : null;
      const initialToken = cookies.accessToken || null;
      return { user: initialUser, token: initialToken };
    }
    return { user: null, token: null };
  };

  const [authState, setAuthState] = useState(getInitialAuthState);

  const login = (user: IUser, token: string, route: string) => {
    document.cookie = serialize("user", JSON.stringify(user), {
      path: "/",
      sameSite: "strict",
    });
    document.cookie = serialize("accessToken", token, {
      path: "/",
      sameSite: "strict",
    });
    setAuthState({ user, token });
    router.push(route || "/");
  };

  const logout = (route: string, message: string) => {
    document.cookie = serialize("user", "", {
      path: "/",
      maxAge: -1,
      sameSite: "strict",
    });
    document.cookie = serialize("accessToken", "", {
      path: "/",
      maxAge: -1,
      sameSite: "strict",
    });
    setAuthState({ user: null, token: null });
    router.push(route || "/auth/sign-in");
    client.clear();
    setTimeout(() => {
      toast.success(message || "Logged out Successfully", {
        id: "logout-toast",
      });
    }, 100);
  };

  const value = {
    login,
    logout,
    token: authState.token,
    user: authState.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth };
export default AuthProvider;
