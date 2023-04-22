"use client";
import { LegacyCard, Page, Tabs } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { FirstLayout } from "./components/FirstLayout";
import { StoryLayout } from "./components/StroyLayout";
import { EndLayout } from "./components/EndLayout";
import { FooterLayout } from "./components/FooterLayout";

const tabs = [
  {
    id: "first-layout",
    content: "First Layout",
    accessibilityLabel: "First Layout",
    panelID: "first-layout-content",
  },
  {
    id: "story-layout",
    content: "Story Layout",
    panelID: "story-layout-content",
  },
  {
    id: "last-layout",
    content: "Last Layout",
    panelID: "last-layout-content",
  },
  {
    id: "footer-layout",
    content: "Footer Page",
    panelID: "footer-layout-content",
  },
];

export interface CustomPageProps {
  id?: string;
  file?: File | string;
  description?: string;
  title?: string;
  article?: { title?: string; description?: string }[];
  link?: {
    title?: string;
    url?: string;
  };
  twitter?: {
    title?: string;
    url?: string;
  };
  discord?: {
    title?: string;
    url?: string;
  };
  telegram?: {
    title?: string;
    url?: string;
  };
  copyright?: "";
}

export function PageScreen() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: any) => setSelected(selectedTabIndex),
    []
  );

  return (
    <Page title="Custome Page" fullWidth>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <LegacyCard>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              {tabs[selected].id === "first-layout" && <FirstLayout />}
              {tabs[selected].id === "story-layout" && <StoryLayout />}
              {tabs[selected].id === "last-layout" && <EndLayout />}
              {tabs[selected].id === "footer-layout" && <FooterLayout />}
            </Tabs>
          </LegacyCard>
        </div>
      </div>
    </Page>
  );
}
