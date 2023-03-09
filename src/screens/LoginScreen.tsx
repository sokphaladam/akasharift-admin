"use client";
import { UserContext } from "@/service/context/UserContext";
import { useFirebase } from "@/service/useFirebase";
import {
  Button,
  Page,
  TextField,
  Text,
  Form,
  LegacyCard,
} from "@shopify/polaris";
import React, { useCallback, useContext, useState } from "react";

export function LoginScreen() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [error, setError] = useState({ type: "", msg: "" });
  const { login } = useFirebase();
  const { setUser } = useContext(UserContext);

  // "akashrift@admin.com",
  // "123456"

  const onChangeEmail = useCallback((value: any) => setEmailInput(value), []);
  const onChangePassword = useCallback((value: any) => setPassword(value), []);

  const handleLogin = () => {
    if (!emailInput) {
      setError({
        type: "email",
        msg: "Email address is required",
      });
      return;
    }
    if (!passwordInput) {
      setError({
        type: "password",
        msg: "Password is required",
      });
      return;
    }

    login(emailInput, passwordInput)
      .then((res) => {
        setUser(res.user);
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Page fullWidth>
      <div className="w-full h-[90vh] justify-center flex flex-col items-center">
        <div className="w-2/12 text-center">
          <Form onSubmit={handleLogin}>
            <LegacyCard>
              <LegacyCard.Section>
                <Text as="h1" variant="headingXl" fontWeight="bold">
                  Authentication
                </Text>
                <br />
                <TextField
                  label="Email"
                  type="email"
                  autoComplete="off"
                  value={emailInput}
                  onChange={onChangeEmail}
                  requiredIndicator
                  error={error.type === "email" && error.msg}
                />
                <br />
                <TextField
                  label="Password"
                  type="password"
                  autoComplete="off"
                  value={passwordInput}
                  onChange={onChangePassword}
                  requiredIndicator
                  error={error.type === "password" && error.msg}
                />
              </LegacyCard.Section>
              <LegacyCard.Section>
                <div className="text-end">
                  <Button primary submit>
                    Sign In
                  </Button>
                </div>
              </LegacyCard.Section>
            </LegacyCard>
          </Form>
        </div>
      </div>
    </Page>
  );
}
