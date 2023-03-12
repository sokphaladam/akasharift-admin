import { DropFileUpload } from "@/components/DropFileUpload";
import { CheckValidate } from "@/lib/CheckValidate";
import { useFirebase } from "@/service/useFirebase";
import {
  Button,
  Form,
  IndexTable,
  InlineError,
  LegacyCard,
  TextField,
} from "@shopify/polaris";
import { getDownloadURL } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";

interface State {
  file?: File | string;
  title?: string;
  description?: string;
  list?: string[];
  index?: number;
}

export function FormRoadMapScreen({
  initalData,
  onCompleted,
}: {
  initalData?: any;
  onCompleted: any;
}) {
  const [textList, setTextList] = useState("");
  const [state, setState] = useState<State>({});
  const { file, data } = useFirebase();
  const [error, setError] = useState<any>({});

  useEffect(() => {
    if (initalData) {
      setState(initalData);
    }
  }, [initalData]);

  const handleInsertList = () => {
    if (textList) {
      setState((state) => {
        return {
          ...state,
          list: state.list ? [...state.list, textList] : [textList],
        };
      });

      setTextList("");
    }
  };

  const handleRemoveList = (index: number) => {
    if ((state.list?.length || 0) > 0) {
      const list = [...(state.list || [])];
      list.splice(index, 1);
      setState((state) => {
        return {
          ...state,
          list,
        };
      });
    }
  };

  const handleChangeTextList = useCallback((value: any) => {
    setTextList(value);
  }, []);

  const handleChangeState = useCallback((obj: string, value: any) => {
    setState((state) => {
      return {
        ...state,
        [obj]: value,
      };
    });
  }, []);

  const createRoad = (url?: string) => {
    const input = { ...state, index: 0 };
    if (url) {
      input.file = url;
    }

    data
      .createData("roadmap", input, new Date().getTime().toString())
      .then((res) => {
        if (res.status) {
          alert(res.message);
          onCompleted();
        }
      });
  };

  const updateRoad = (id: string, url?: string) => {
    const input = { ...state };
    if (url) {
      input.file = url;
    }

    data.updateData("roadmap", id, input).then((res) => {
      if (res.status) {
        alert(res.message);
        onCompleted();
      }
    });
  };

  const handleSave = () => {
    const valid = CheckValidate(state, ["file", "title", "description"]);

    if (valid) return setError(valid);

    if (typeof state.file === "string") {
      if (initalData) {
        updateRoad(initalData.id);
      } else {
        createRoad();
      }
    } else {
      const task = file.upload(state.file as File);
      task.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {},
        () => {
          getDownloadURL(task.snapshot.ref).then((url) => {
            if (initalData) {
              updateRoad(initalData.id, url);
            } else {
              createRoad(url);
            }
          });
        }
      );
    }
  };

  return (
    <Form onSubmit={handleSave}>
      <LegacyCard>
        <LegacyCard.Section>
          {error.type && (
            <>
              <InlineError message={error.msg} fieldID="myFieldID" />
              <br />
            </>
          )}
          <DropFileUpload
            allowMultiple={false}
            onComplete={(file: File[]) => {
              handleChangeState("file", file[0]);
            }}
            url={typeof state.file === "string" ? state.file + "" : null}
          />
        </LegacyCard.Section>
        <LegacyCard.Section>
          <TextField
            label="Title"
            autoComplete="off"
            value={state.title}
            onChange={(value) => handleChangeState("title", value)}
            error={error.type === "title" && error.msg}
          />
        </LegacyCard.Section>
        <LegacyCard.Section>
          <TextField
            label="Description"
            autoComplete="off"
            multiline={5}
            value={state.description}
            onChange={(value) => handleChangeState("description", value)}
            error={error.type === "description" && error.msg}
          />
        </LegacyCard.Section>
        <LegacyCard.Section flush>
          <IndexTable
            headings={[{ title: "Text List" }, { title: "" }]}
            selectable={false}
            itemCount={(state.list?.length || 0) + 1}
          >
            <IndexTable.Row id="0" position={0}>
              <IndexTable.Cell>
                <TextField
                  label=""
                  labelHidden
                  autoComplete="off"
                  value={textList}
                  onChange={handleChangeTextList}
                />
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Button fullWidth onClick={handleInsertList}>
                  Add
                </Button>
              </IndexTable.Cell>
            </IndexTable.Row>
            {state.list &&
              state.list.map((x, i) => {
                return (
                  <IndexTable.Row key={x} id={x} position={i + 1}>
                    <IndexTable.Cell>
                      <p>{x}</p>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      <Button
                        destructive
                        fullWidth
                        onClick={() => handleRemoveList(i)}
                      >
                        Remove
                      </Button>
                    </IndexTable.Cell>
                  </IndexTable.Row>
                );
              })}
          </IndexTable>
        </LegacyCard.Section>
        <LegacyCard.Section>
          <Button primary submit>
            Save
          </Button>
        </LegacyCard.Section>
      </LegacyCard>
    </Form>
  );
}
