import { DropFileUpload } from "@/components/DropFileUpload";
import { Button, LegacyCard, TextField } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { CustomPageProps } from "../PageScreen";
import { useFirebase } from "@/service/useFirebase";
import { getDownloadURL } from "firebase/storage";
export function FirstLayout() {
  const [loading, setLoading] = useState(false);
  const { data, file } = useFirebase();
  const [state, setState] = useState<CustomPageProps>({});

  const readCollections = async () => {
    const page = await data.getData("custom_page", "first-layout");
    if (!!page.status && page.data) {
      setState(
        page.data.article
          ? page.data
          : {
              ...page.data,
              article: [
                {
                  title: "",
                  description: "",
                },
                {
                  title: "",
                  description: "",
                },
              ],
            }
      );
    } else {
      setState({});
    }
  };

  useEffect(() => {
    readCollections();
  }, []);

  const handleChangeState = useCallback((obj: string, value: string) => {
    setState((state) => {
      return {
        ...state,
        [obj]: value,
      };
    });
  }, []);

  const updateData = (input: CustomPageProps) => {
    data.updateData("custom_page", "first-layout", input).then((res) => {
      if (res.status) {
        alert(res.message);
        readCollections();
        setLoading(false);
      }
    });
  };

  const handleSave = () => {
    setLoading(true);
    if (typeof state.file === "string") {
      updateData(state);
    } else {
      const task = file.upload(state.file as File);
      task.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot.state);
        },
        (err) => {},
        () => {
          getDownloadURL(task.snapshot.ref).then((url) => {
            updateData({
              ...state,
              file: url,
            });
          });
        }
      );
    }
  };

  return (
    <div>
      <LegacyCard.Section>
        <p>Background Image</p>
        <DropFileUpload
          allowMultiple={false}
          onComplete={(file: File[]) => {
            handleChangeState("file", file[0] as any);
          }}
          url={typeof state?.file === "string" ? state.file + "" : null}
        />
        <br />
        <TextField
          value={state?.description}
          onChange={(value) => handleChangeState("description", value)}
          multiline={5}
          autoComplete="off"
          label="Description"
        />
      </LegacyCard.Section>
      {state.article?.map((x, i) => {
        return (
          <LegacyCard.Section key={i}>
            <TextField
              label="Title"
              autoComplete="off"
              value={x.title}
              onChange={(value) => {
                const val = [...state.article!];
                val[i].title = value;
                setState((state) => {
                  return {
                    ...state,
                    article: val,
                  };
                });
              }}
            />
            <br />
            <TextField
              multiline={5}
              autoComplete="off"
              label="Description"
              value={x.description}
              onChange={(value) => {
                const val = [...state.article!];
                val[i].description = value;
                setState((state) => {
                  return {
                    ...state,
                    article: val,
                  };
                });
              }}
            />
          </LegacyCard.Section>
        );
      })}
      <LegacyCard.Section>
        <Button
          loading={loading}
          disabled={loading}
          primary
          size="slim"
          onClick={handleSave}
        >
          Save
        </Button>
      </LegacyCard.Section>
    </div>
  );
}
