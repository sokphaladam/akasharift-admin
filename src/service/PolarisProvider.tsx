"use client";
import { AppProvider } from "@shopify/polaris";
import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import enTranslations from "@shopify/polaris/locales/en.json";

export function PolarisProvider(props: React.PropsWithChildren) {
  return (
    <AppProvider i18n={enTranslations}>
      <AuthContextProvider>{props.children}</AuthContextProvider>
    </AppProvider>
  );
}
