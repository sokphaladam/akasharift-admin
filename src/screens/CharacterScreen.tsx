"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Page,
  Select,
  Thumbnail,
} from "@shopify/polaris";
import { DropFileUpload } from "@/components/DropFileUpload";
import { useFirebase } from "@/service/useFirebase";
import { getDownloadURL } from "firebase/storage";
import { humanFileSize } from "@/lib/HumanFileSize";
import { useRouter } from "next/navigation";

export function CharacterScreen() {
  const { refresh } = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const { file, data } = useFirebase();
  const [loading, setLoading] = useState(false);

  const readCollections = async () => {
    const character = await data.getMutipleData("character");
    if (!!character.status && character.data) {
      setItems(character.data.docs.map((x) => ({ ...x.data(), id: x.id })));
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    readCollections();
  }, []);

  const handleOnComplete = (files: File[]) => {
    setLoading(true);
    for (const f of files) {
      const task = file.upload(f);
      task.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot.state);
        },
        (error) => {},
        () => {
          getDownloadURL(task.snapshot.ref).then((url) => {
            data
              .createData(
                "character",
                {
                  url,
                  filename: f.name,
                  size: f.size,
                  lastModified: f.lastModified,
                },
                new Date().getTime().toString()
              )
              .then((res) => {
                if (res.status) {
                  readCollections();
                  console.log(res.message);
                }
              });
          });
        }
      );
    }
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    data.removeData("character", id).then((res) => {
      if (res.status) {
        alert(res.message);
        setLoading(false);
        readCollections();
      }
    });
  };

  return (
    <Page title="Characters" fullWidth>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <DropFileUpload onComplete={handleOnComplete} allowMultiple={true} />
          <br />
          <LegacyCard>
            <LegacyCard.Section flush>
              <IndexTable
                selectable={false}
                loading={loading}
                itemCount={items.length}
                resourceName={{
                  singular: "character",
                  plural: "characters",
                }}
                emptyState={
                  <EmptySearchResult
                    title={"No character yet"}
                    description={"Try upload new file character"}
                    withIllustration
                  />
                }
                headings={[
                  {
                    title: "Image",
                  },
                  {
                    title: "Filename",
                  },
                  {
                    title: "Size",
                  },
                  {
                    title: "Display Position",
                  },
                  {
                    title: "Action",
                    alignment: "end",
                  },
                ]}
              >
                {items &&
                  items.map((item, index) => {
                    return (
                      <IndexTable.Row
                        key={item.id}
                        id={item.id}
                        position={index}
                      >
                        <IndexTable.Cell>
                          <Thumbnail source={item.url} alt="" size="small" />
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <small>{item.filename}</small>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <small>{humanFileSize(item.size)}</small>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <Select
                            label=""
                            labelHidden
                            options={[
                              {
                                label: "Select Position",
                                value: "default",
                              },
                              {
                                label: "Left",
                                value: "LEFT",
                              },
                              {
                                label: "Right",
                                value: "RIGHT",
                              },
                            ]}
                            disabled={loading}
                            onChange={(value) => {
                              setLoading(true);
                              data
                                .updateData("character", item.id, {
                                  ...item,
                                  position: value,
                                })
                                .then((res) => {
                                  if (res.status) {
                                    readCollections();
                                    setLoading(false);
                                  }
                                });
                            }}
                            value={item.position || "default"}
                          />
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <div className="flex justify-end items-center">
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
                        </IndexTable.Cell>
                      </IndexTable.Row>
                    );
                  })}
              </IndexTable>
            </LegacyCard.Section>
          </LegacyCard>
        </div>
      </div>
    </Page>
  );
}
