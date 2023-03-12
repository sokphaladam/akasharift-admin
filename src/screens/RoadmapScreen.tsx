"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  IndexTable,
  LegacyCard,
  Page,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import { DropFileUpload } from "@/components/DropFileUpload";
import { FormRoadMapScreen } from "./roadmap/FormRoadMapScreen";
import { useFirebase } from "@/service/useFirebase";
import { InputIndex } from "./roadmap/InputIndex";

export function RoadmapScreen() {
  const { data } = useFirebase();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});

  const readCollections = async () => {
    const team = await data.getMutipleData("roadmap");
    if (!!team.status && team.data) {
      setItems(team.data.docs.map((x) => ({ ...x.data(), id: x.id })));
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    readCollections();
  }, []);

  const handleDelete = (id: string) => {
    setLoading(true);
    data.removeData("roadmap", id).then((res) => {
      if (res.status) {
        alert(res.message);
        setLoading(false);
        readCollections();
      }
    });
  };

  return (
    <Page title="Roadmap" fullWidth>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <LegacyCard>
            <LegacyCard.Section>
              <IndexTable
                selectable={false}
                headings={[
                  { title: "" },
                  { title: "Title" },
                  { title: "Index" },
                  { title: "Action" },
                ]}
                itemCount={items.length}
              >
                {items.map((item, index) => {
                  return (
                    <IndexTable.Row key={item.id} position={index} id={item.id}>
                      <IndexTable.Cell>
                        <Thumbnail source={item.file} alt="" />
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <small>{item.title}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <InputIndex id={item.id} />
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <div className="flex justify-end items-center">
                          <Button
                            size="slim"
                            loading={loading}
                            disabled={loading}
                            onClick={() => {
                              setSelected(item);
                            }}
                          >
                            Edit
                          </Button>
                          <div className="ml-2">
                            <Button
                              size="slim"
                              destructive
                              onClick={() => handleDelete(item.id)}
                              loading={loading}
                              disabled={loading}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  );
                })}
              </IndexTable>
            </LegacyCard.Section>
          </LegacyCard>
        </div>
        <div>
          {selected && !loading ? (
            <FormRoadMapScreen
              initalData={selected}
              onCompleted={() => {
                readCollections();
                setSelected({});
              }}
            />
          ) : (
            <FormRoadMapScreen
              onCompleted={() => {
                readCollections();
                setSelected({});
              }}
            />
          )}
        </div>
      </div>
    </Page>
  );
}
