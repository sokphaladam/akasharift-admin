/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Frame, Loading } from "@shopify/polaris";
import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { NavigationMarkup } from "@/components/NavigationMarkup";
import { TopBarMarkup } from "@/components/TopbarMarkup";
import { useRouter, usePathname } from "next/navigation";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <Frame>
          <Loading />
        </Frame>
      ) : (
        <Frame
          navigation={user === null ? null : <NavigationMarkup />}
          logo={{
            url: "/",
            width: 125,
            topBarSource: "",
          }}
          topBar={user === null ? null : <TopBarMarkup />}
        >
          {children}
        </Frame>
      )}
    </AuthContext.Provider>
  );
};

export const WithAuthOnly = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user }: any = useAuthContext();

  React.useEffect(() => {
    if (user === null) {
      if (pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [user]);

  return <div>{children}</div>;
};
