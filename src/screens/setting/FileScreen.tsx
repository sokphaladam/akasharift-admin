"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  IndexTable,
  LegacyCard,
  Page,
  Thumbnail,
} from "@shopify/polaris";
import { DropFileUpload } from "@/components/DropFileUpload";
import { useFirebase } from "@/service/useFirebase";
import { getDownloadURL } from "firebase/storage";

export function FileScreen() {
  const { file } = useFirebase();
  const [items, setItems] = useState<any[]>([]);

  const readCollection = async () => {
    const snap = await file.listF();

    for (const sn of snap) {
      const ref = file.getStorageRef(sn.name);
      getDownloadURL(ref).then((url) => {
        setItems((items) => [...items, { name: sn.name, url }]);
      });
    }
  };

  useEffect(() => {
    readCollection();
  }, []);

  if (items.length === 0) {
    return <div></div>;
  }

  return (
    <Page
      title="Storage"
      fullWidth
      primaryAction={{
        content: "Save",
        onAction: () => {},
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <LegacyCard>
          <LegacyCard.Section flush>
            <IndexTable
              selectable={false}
              headings={[
                { title: "Image" },
                { title: "Filename" },
                { title: "Action", alignment: "end" },
              ]}
              itemCount={items.length}
            >
              {items.map((x, i) => {
                return (
                  <IndexTable.Row key={i} id={x.name} position={i}>
                    <IndexTable.Cell>
                      <Thumbnail source={x.url} alt="" size="small" />
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      <small>{x.name}</small>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      <div className="flex justify-end">
                        <Button
                          size="slim"
                          destructive
                          onClick={() => {
                            file
                              .delete(x.name)
                              .then(() => {
                                readCollection();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </IndexTable.Cell>
                  </IndexTable.Row>
                );
              })}
            </IndexTable>
          </LegacyCard.Section>
        </LegacyCard>
      </div>
    </Page>
  );
}
