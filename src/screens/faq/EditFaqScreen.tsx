"use client";
import { Page } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { FormFaq } from "./FormFaq";
import { useFirebase } from "@/service/useFirebase";
import { useRouter } from "next/navigation";

export function EditFaqScreen({ id }: { id: string }) {
  const { data } = useFirebase();
  const [item, setItem] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const readCollections = async () => {
    const faq = await data.getData("faq", id);
    if (!!faq.status && faq.data) {
      setItem(faq.data);
    } else {
      setItem({});
    }
  };

  useEffect(() => {
    readCollections();
  }, []);

  const handleSave = () => {
    setLoading(true);
    data.updateData("faq", id, item).then((res) => {
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
      title="Edit New FAQ"
      primaryAction={{
        content: "Save",
        onAction: handleSave,
        loading: loading,
        disabled: loading,
      }}
    >
      <div>
        {item && item.question && (
          <FormFaq editmode={true} value={item} setValue={setItem} />
        )}
      </div>
    </Page>
  );
}
