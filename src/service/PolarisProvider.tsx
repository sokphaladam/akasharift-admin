"use client";
import { AppProvider, Frame, Loading } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { NavigationMarkup } from "@/components/NavigationMarkup";
import { TopBarMarkup } from "@/components/TopbarMarkup";
import { UserContext } from "./context/UserContext";
import { useFirebase } from "./useFirebase";

export default function PolarisProvider(props: React.PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const { auth } = useFirebase();
  const [user, setUser] = useState<any>(null);
  const [isauth, setIsAuth] = useState(
    process.browser && window.location.pathname === "/login" ? true : false
  );

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("locationchange", () => {
        if (window.location.pathname === "/login") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (process.browser) {
        if (auth.currentUser !== null) {
          // do something
          setUser(auth.currentUser);
        } else {
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      }
      setLoading(false);
    }, 500);
  }, []);

  return (
    <UserContext.Provider
      value={{ user: user ? user : auth.currentUser, setUser }}
    >
      <AppProvider i18n={enTranslations}>
        {loading ? (
          <Frame>
            <Loading />
          </Frame>
        ) : isauth ? (
          <Frame>{props.children}</Frame>
        ) : (
          <Frame
            navigation={<NavigationMarkup />}
            logo={{
              url: "/",
              width: 125,
              topBarSource: "",
            }}
            topBar={<TopBarMarkup />}
          >
            {props.children}
          </Frame>
        )}
      </AppProvider>
    </UserContext.Provider>
  );
}
