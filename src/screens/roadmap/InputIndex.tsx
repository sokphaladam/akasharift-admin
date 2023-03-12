import { useFirebase } from "@/service/useFirebase";
import { TextField } from "@shopify/polaris";
import React, { useEffect, useState } from "react";

export function InputIndex({ id }: { id: string }) {
  const { data } = useFirebase();
  const [value, setValue] = useState("");
  const [state, setState] = useState<any>({});

  const readCollections = async () => {
    const road = await data.getData("roadmap", id);
    if (road.status && road.data) {
      setState(road.data);
      setValue(road.data.index);
    }
  };

  useEffect(() => {
    readCollections();
  }, []);

  const handleChangeIndex = () => {
    if (value && value != (state.index || "")) {
      data.updateData("roadmap", id, { ...state, index: value }).then((res) => {
        if (res.status) {
          alert(res.message);
        }
      });
    }
  };

  return (
    <TextField
      label=""
      labelHidden
      autoComplete="off"
      value={value}
      onChange={(v) => setValue(v)}
      onBlur={handleChangeIndex}
      type="number"
      inputMode="numeric"
    />
  );
}
