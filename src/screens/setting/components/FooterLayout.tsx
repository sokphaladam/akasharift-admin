import { DropFileUpload } from "@/components/DropFileUpload";
import { Button, LegacyCard, TextField } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { CustomPageProps } from "../PageScreen";
import { useFirebase } from "@/service/useFirebase";
import { getDownloadURL } from "firebase/storage";

export function FooterLayout() {
  const [loading, setLoading] = useState(false);
  const { data, file } = useFirebase();
  const [state, setState] = useState<CustomPageProps>({});

  const readCollections = async () => {
    const page = await data.getData("custom_page", "footer-layout");
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
    data.updateData("custom_page", "footer-layout", input).then((res) => {
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
        <p>Logo Footer Image</p>
        <DropFileUpload
          allowMultiple={false}
          onComplete={(file: File[]) => {
            handleChangeState("file", file[0] as any);
          }}
          url={typeof state?.file === "string" ? state.file + "" : null}
        />
        <br />
        <TextField
          label="CopyRight"
          autoComplete="off"
          value={state.copyright}
          onChange={(value) => handleChangeState("copyright", value)}
        />
        <br />
        <TextField
          label="Contact Link"
          autoComplete="off"
          value={state.title}
          onChange={(value) => handleChangeState("title", value)}
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
      <LegacyCard.Section>
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Link Title Twitter"
            autoComplete="off"
            value={state.twitter?.title}
            onChange={(value) => {
              setState((state) => {
                return {
                  ...state,
                  twitter: {
                    ...state.twitter,
                    title: value,
                  },
                };
              });
            }}
          />
          <TextField
            label="Link URL Twitter"
            autoComplete="off"
            value={state.twitter?.url}
            onChange={(value) => {
              setState((state) => {
                return {
                  ...state,
                  twitter: {
                    ...state.twitter,
                    url: value,
                  },
                };
              });
            }}
          />
        </div>
        <br />
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Link Title Discord"
            autoComplete="off"
            value={state.discord?.title}
            onChange={(value) => {
              setState((state) => {
                return {
                  ...state,
                  discord: {
                    ...state.discord,
                    title: value,
                  },
                };
              });
            }}
          />
          <TextField
            label="Link URL Discord"
            autoComplete="off"
            value={state.discord?.url}
            onChange={(value) => {
              setState((state) => {
                return {
                  ...state,
                  discord: {
                    ...state.discord,
                    url: value,
                  },
                };
              });
            }}
          />
        </div>
        <br />
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Link Title Telegram"
            autoComplete="off"
            value={state.telegram?.title}
            onChange={(value) => {
              setState((state) => {
                return {
                  ...state,
                  telegram: {
                    ...state.telegram,
                    title: value,
                  },
                };
              });
            }}
          />
          <TextField
            label="Link URL Telegram"
            autoComplete="off"
            value={state.telegram?.url}
            onChange={(value) => {
              setState((state) => {
                return {
                  ...state,
                  telegram: {
                    ...state.telegram,
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
