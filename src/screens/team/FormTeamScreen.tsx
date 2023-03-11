import { DropFileUpload } from "@/components/DropFileUpload";
import { useFirebase } from "@/service/useFirebase";
import {
  LegacyCard,
  FormLayout,
  TextField,
  Button,
  InlineError,
} from "@shopify/polaris";
import { getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface State {
  file?: File | string;
  name?: string;
  position?: string;
  description?: string;
  discordname?: string;
  discordlink?: string;
  twittername?: string;
  twitterlink?: string;
}

export function FormTeamScreen({
  initalData,
  onCompleted,
}: {
  initalData?: any;
  onCompleted: any;
}) {
  const { data, file } = useFirebase();
  const [state, setState] = useState<State>({});
  const [error, setError] = useState({
    type: "",
    msg: "",
  });

  useEffect(() => {
    if (initalData) {
      setState(initalData);
    }
  }, [initalData]);

  const handleCheckValidate = () => {
    if (!state.file) {
      setError({ type: "file", msg: "Image is required" });
      return false;
    }

    if (!state.name) {
      setError({ type: "name", msg: "Name is required" });
      return false;
    }

    if (!state.position) {
      setError({ type: "position", msg: "Position is required" });
      return false;
    }

    if (!state.description) {
      setError({ type: "description", msg: "Description is required" });
      return false;
    }

    if (!state.twittername) {
      setError({ type: "twitter", msg: "Twitter name is required" });
      return false;
    }

    if (!state.twitterlink) {
      setError({ type: "twitter", msg: "Twitter link is required" });
      return false;
    }

    if (!state.discordname) {
      setError({ type: "discord", msg: "Discord name is required" });
      return false;
    }

    if (!state.discordlink) {
      setError({ type: "discord", msg: "Discord link is required" });
      return false;
    }

    setError({ type: "", msg: "" });
    return true;
  };

  const handleClickSave = () => {
    const check_validate = handleCheckValidate();

    if (check_validate) {
      if (typeof state.file === "string") {
        if (initalData) {
          data.updateData("team", initalData.id, { ...state }).then((res) => {
            if (res.status) {
              alert(res.message);
              setState({});
              onCompleted();
            }
          });
        } else {
          data
            .createData("team", { ...state }, new Date().getTime().toString())
            .then((res) => {
              if (res.status) {
                alert(res.message);
                setState({});
                onCompleted();
              }
            });
        }
        return;
      }

      const task = file.upload(state.file as File);

      task.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot.state);
        },
        (error) => {},
        () => {
          getDownloadURL(task.snapshot.ref).then((url) => {
            if (initalData) {
              data
                .updateData("team", initalData.id, { ...state, file: url })
                .then((res) => {
                  if (res.status) {
                    alert(res.message);
                    setState({});
                    onCompleted();
                  }
                });
            } else {
              data
                .createData(
                  "team",
                  { ...state, file: url },
                  new Date().getTime().toString()
                )
                .then((res) => {
                  if (res.status) {
                    alert(res.message);
                    setState({});
                    onCompleted();
                  }
                });
            }
          });
        }
      );
    }
  };

  const handleChangeState = useCallback(
    (obj: string, value: string) => {
      setState({ ...state, [obj]: value });
    },
    [state]
  );

  return (
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
            handleChangeState("file", file[0] as any);
          }}
          url={typeof state.file === "string" ? state.file + "" : null}
        />
        <br />
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField
              autoComplete="off"
              label="Name"
              value={state.name}
              onChange={(value) => handleChangeState("name", value)}
              error={error.type === "name" && error.msg}
            />
            <TextField
              autoComplete="off"
              label="Position"
              value={state.position}
              onChange={(value) => handleChangeState("position", value)}
              error={error.type === "position" && error.msg}
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <TextField
              multiline={5}
              autoComplete="off"
              label="Description"
              value={state.description}
              onChange={(value) => handleChangeState("description", value)}
              error={error.type === "description" && error.msg}
            />
          </FormLayout.Group>
        </FormLayout>
      </LegacyCard.Section>
      <LegacyCard.Section title="Twitter">
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField
              autoComplete="off"
              label="Name"
              value={state.twittername}
              onChange={(value) => handleChangeState("twittername", value)}
              error={error.type === "twitter" && error.msg}
            />
            <TextField
              autoComplete="off"
              label="Link"
              value={state.twitterlink}
              onChange={(value) => handleChangeState("twitterlink", value)}
              error={error.type === "twitter" && error.msg}
            />
          </FormLayout.Group>
        </FormLayout>
      </LegacyCard.Section>
      <LegacyCard.Section title="Discord">
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField
              autoComplete="off"
              label="Name"
              value={state.discordname}
              onChange={(value) => handleChangeState("discordname", value)}
              error={error.type === "discord" && error.msg}
            />
            <TextField
              autoComplete="off"
              label="Link"
              value={state.discordlink}
              onChange={(value) => handleChangeState("discordlink", value)}
              error={error.type === "discord" && error.msg}
            />
          </FormLayout.Group>
        </FormLayout>
      </LegacyCard.Section>
      <LegacyCard.Section>
        <div className="flex">
          <Button primary size="slim" onClick={handleClickSave}>
            Save
          </Button>
          <div className="ml-1">
            {initalData.id && (
              <Button destructive size="slim" onClick={onCompleted}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </LegacyCard.Section>
    </LegacyCard>
  );
}
