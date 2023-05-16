import React from "react";
import { Navigation } from "@shopify/polaris";
import { MenuItems } from "@/lib/MenuItem";

export function NavigationMarkup() {
  return (
    <Navigation location="/">
      {MenuItems.map((item) => {
        return (
          <Navigation.Section
            key={item.label}
            title={item.label}
            items={item.sub.map((x) => {
              return {
                label: x.label,
                url: x.url,
                icon: x.icon as any,
              };
            })}
          />
        );
      })}
    </Navigation>
  );
}
