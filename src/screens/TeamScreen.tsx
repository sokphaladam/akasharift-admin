"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Page,
  Thumbnail,
} from "@shopify/polaris";
import { FormTeamScreen } from "./team/FormTeamScreen";
import { useFirebase } from "@/service/useFirebase";

export function TeamScreen() {
  const { data } = useFirebase();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});

  const readCollections = async () => {
    const team = await data.getMutipleData("team");
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
    data.removeData("team", id).then((res) => {
      if (res.status) {
        alert(res.message);
        setLoading(false);
        readCollections();
      }
    });
  };

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
          <LegacyCard>
            <LegacyCard.Section flush>
              <IndexTable
                loading={loading}
                headings={[
                  { title: "Info" },
                  { title: "Twitter" },
                  { title: "Discord" },
                  { title: "Action", alignment: "end" },
                ]}
                itemCount={items.length}
                resourceName={{
                  singular: "team",
                  plural: "teams",
                }}
                selectable={false}
                emptyState={
                  <EmptySearchResult
                    title={"No character yet"}
                    description={"Try upload new file character"}
                    withIllustration
                  />
                }
              >
                {items.map((item, index) => {
                  return (
                    <IndexTable.Row
                      selected={selected.id === item.id}
                      key={item.id}
                      id={item.id}
                      position={index}
                    >
                      <IndexTable.Cell>
                        <div className="flex items-center">
                          <Thumbnail source={item.file} alt="" size="small" />
                          <div className="ml-4">
                            <b>{item.name}</b>
                            <br />
                            <small>{item.position}</small>
                          </div>
                        </div>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <a href={item.twitterlink} target="_blank">
                          {item.twittername}
                        </a>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <a href={item.discordlink} target="_blank">
                          {item.discordname}
                        </a>
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
            <FormTeamScreen
              initalData={selected}
              onCompleted={() => {
                readCollections();
                setSelected({});
              }}
            />
          ) : (
            <FormTeamScreen
              initalData={selected}
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
