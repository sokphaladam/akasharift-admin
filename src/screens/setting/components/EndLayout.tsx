import { useFirebase } from "@/service/useFirebase";
import { Button, LegacyCard, TextField } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { CustomPageProps } from "../PageScreen";
import { DropFileUpload } from "@/components/DropFileUpload";
import { getDownloadURL } from "firebase/storage";

export function EndLayout() {
  const [loading, setLoading] = useState(false);
  const { data, file } = useFirebase();
  const [state, setState] = useState<CustomPageProps>({});

  const readCollections = async () => {
    const page = await data.getData("custom_page", "end-layout");
    if (!!page.status && page.data) {
      setState(page.data);
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
    data.updateData("custom_page", "end-layout", input).then((res) => {
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
          value={state?.title}
          onChange={(value) => handleChangeState("title", value)}
          autoComplete="off"
          label="Title"
        />
        <br />
        <TextField
          value={state?.description}
          onChange={(value) => handleChangeState("description", value)}
          multiline={5}
          autoComplete="off"
          label="Description"
        />
        <br />
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Link Title"
            autoComplete="off"
            value={state.link?.title}
            onChange={(value) => {
              setState((state) => {
                return {
                  ...state,
                  link: {
                    ...state,
                    title: value,
                  },
                };
              });
            }}
          />
          <TextField
            label="Link URL"
            autoComplete="off"
            value={state.link?.url}
            onChange={(value) => {
              setState((state) => {
                return {
                  ...state,
                  link: {
                    ...state,
                    url: value,
                  },
                };
              });
            }}
          />
        </div>
      </LegacyCard.Section>
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
