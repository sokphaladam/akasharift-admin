import {
  CustomersMinor,
  ProfileMinor,
  MetaobjectReferenceMinor,
  QuestionMarkMinor,
  AppsMinor,
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
      {
        label: 'FAQ',
        icon: QuestionMarkMinor,
        url: '/faq'
      }
    ],
  },
  {
    label: 'Settings',
    sub: [
      // {
      //   label: "Files",
      //   icon: ContentMinor,
      //   url: "/file",
      // }
      {
        label: 'Custome Page',
        icon: AppsMinor,
        url: '/setting/page'
      }
    ]
  }
];
