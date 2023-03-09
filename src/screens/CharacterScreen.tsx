"use client";
import React, { useEffect, useState } from "react";
import { Page } from "@shopify/polaris";
import { DropFileUpload } from "@/components/DropFileUpload";
import { useFirebase } from "@/service/useFirebase";

export function CharacterScreen() {
  const [items, setItems] = useState<any[]>([]);
  const { getCollections } = useFirebase();

  const readCollections = async () => {
    setItems(await getCollections("character"));
  };

  useEffect(() => {
    readCollections();
  }, []);

  return (
    <Page
      title="Characters"
      fullWidth
      primaryAction={{
        content: "Save",
        onAction: () => {},
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <div>
          <DropFileUpload />
          <br />
          {JSON.stringify(items)}
        </div>
      </div>
    </Page>
  );
}
