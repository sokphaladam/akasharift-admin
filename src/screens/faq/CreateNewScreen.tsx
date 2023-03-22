"use client";
import { Page } from "@shopify/polaris";
import React, { useState } from "react";
import { FormFaq } from "./FormFaq";
import { useFirebase } from "@/service/useFirebase";
import { useRouter } from "next/navigation";

export function CreateNewScreen() {
  const [item, setItem] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { data } = useFirebase();
  const { push } = useRouter();

  const handleSave = () => {
    setLoading(true);
    data
      .createData("faq", item, new Date().getTime().toString())
      .then((res) => {
        if (res.status) {
          alert(res.message);
          setLoading(false);
          push("/faq");
        }
      });
  };

  return (
    <Page
      fullWidth
      title="Create New FAQ"
      primaryAction={{
        content: "Save",
        onAction: handleSave,
        loading: loading,
        disabled: loading,
      }}
    >
      <div>
        <FormFaq value={item} setValue={setItem} />
      </div>
    </Page>
  );
}
