import { User } from "firebase/auth";
import React from "react";

export const UserContext = React.createContext<{
  user: User | null;
  setUser: any;
}>({
  user: null,
  setUser: () => {},
});
