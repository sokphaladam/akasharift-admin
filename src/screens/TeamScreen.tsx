"use client";
import React from "react";
import { Page } from "@shopify/polaris";
import { DropFileUpload } from "@/components/DropFileUpload";

export function TeamScreen() {
  return (
    <Page
      title="Team Member"
      fullWidth
      primaryAction={{
        content: "Save",
        onAction: () => {},
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <div>
          <DropFileUpload />
        </div>
      </div>
    </Page>
  );
}
