import React, { useCallback, useContext, useState } from "react";
import { TopBar } from "@shopify/polaris";
import { UserContext } from "@/service/context/UserContext";
import { useFirebase } from "@/service/useFirebase";

export function TopBarMarkup() {
  const { user } = useContext(UserContext);
  const { logout } = useFirebase();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const userMenuActions = [
    {
      items: [
        {
          content: "Logout",
          onAction: logout,
        },
      ],
    },
  ];

  const userMenu = (
    <TopBar.UserMenu
      initials={user?.email?.charAt(0).toUpperCase()}
      name={user?.email || ""}
      actions={userMenuActions}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      searchResultsVisible={false}
      userMenu={userMenu}
    />
  );
}
