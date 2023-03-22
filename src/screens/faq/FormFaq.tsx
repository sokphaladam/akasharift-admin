import { LegacyCard, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";

interface Props {
  editmode?: boolean;
  value: any;
  setValue: any;
}

export function FormFaq(props: Props) {
  const handleChangeQuestion = useCallback((value: any) => {
    props.setValue((stateInput: any) => {
      return {
        ...stateInput,
        question: value,
      };
    });
  }, []);

  const handleChangeAnswer = useCallback((value: any) => {
    props.setValue((stateInput: any) => {
      return {
        ...stateInput,
        answer: value,
      };
    });
  }, []);

  return (
    <div>
      <LegacyCard>
        <LegacyCard.Section>
          <TextField
            autoComplete="off"
            label="Question"
            placeholder="What question in faq?"
            value={props.value.question}
            onChange={handleChangeQuestion}
          />
          <br />
          <TextField
            multiline={5}
            autoComplete="off"
            placeholder="What is the answer of your question?"
            label="Answer"
            value={props.value.answer}
            onChange={handleChangeAnswer}
          />
        </LegacyCard.Section>
      </LegacyCard>
    </div>
  );
}
