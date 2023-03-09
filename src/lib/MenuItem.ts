import {
  CustomersMinor,
  ProfileMinor,
  MetaobjectReferenceMinor,
} from "@shopify/polaris-icons";

export const MenuItems = [
  {
    label: "Applications",
    sub: [
      {
        label: "Characters",
        icon: CustomersMinor,
        url: "/character",
      },
      {
        label: "Team Member",
        icon: ProfileMinor,
        url: "/team_member",
      },
      {
        label: "Roadmap",
        icon: MetaobjectReferenceMinor,
        url: "/roadmap",
      },
    ],
  },
];
