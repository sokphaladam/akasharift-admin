"use client";
import { AppProvider, Frame } from "@shopify/polaris";
import React from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { NavigationMarkup } from "@/components/NavigationMarkup";

export function PolarisProvider(props: React.PropsWithChildren) {
  return (
    <AppProvider i18n={enTranslations}>
      <Frame navigation={<NavigationMarkup />}>{props.children}</Frame>
    </AppProvider>
  );
}
