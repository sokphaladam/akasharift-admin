/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useFirebase } from "@/service/useFirebase";
import {
  DescriptionList,
  LegacyCard,
  Page,
  ResourceItem,
  ResourceList,
  Text,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";

export function FaqScreen() {
  const { data } = useFirebase();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");

  const readCollections = async () => {
    const faq = await data.getMutipleData("faq");
    if (!!faq.status && faq.data) {
      setItems(faq.data.docs.map((x) => ({ ...x.data(), id: x.id })));
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    readCollections();
  }, []);

  return (
    <Page
      title="FAQ"
      fullWidth
      primaryAction={{
        content: "Create New",
        url: "/faq/create",
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <div>
          <LegacyCard>
            <ResourceList
              resourceName={{ singular: "faq", plural: "faqs" }}
              items={items}
              selectable={false}
              renderItem={(item, id, i) => {
                return (
                  <ResourceItem
                    verticalAlignment="center"
                    key={item.id}
                    id={item.id}
                    name={item.question}
                    accessibilityLabel={`View details for ${item.question}`}
                    onClick={() => setIndex(item.id)}
                    shortcutActions={[
                      {
                        content: "Edit",
                        url: "/faq/" + item.id,
                        disabled: loading,
                      },
                      {
                        content: "Delete",
                        onAction: () => {
                          setLoading(true);
                          data.removeData("faq", item.id).then((res) => {
                            if (res.status) {
                              alert(res.message);
                              setLoading(false);
                              readCollections();
                            }
                          });
                        },
                        disabled: loading,
                      },
                    ]}
                  >
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                      {item.question}
                    </Text>
                    {index === item.id && (
                      <div>
                        <br />
                        {item.answer}
                      </div>
                    )}
                  </ResourceItem>
                );
              }}
            />
          </LegacyCard>
        </div>
      </div>
    </Page>
  );
}
