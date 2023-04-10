import { MenuProps } from "antd";

export const itemsHeader: MenuProps["items"] = [
  {
    key: "1",
    type: "group",
    label: "Group title",
    children: [
      {
        key: "1-1",
        label: "1st menu item",
      },
      {
        key: "1-2",
        label: "2nd menu item",
      },
    ],
  },
  {
    key: "2",
    label: "sub menu",
    children: [
      {
        key: "2-1",
        label: "3rd menu item",
      },
      {
        key: "2-2",
        label: "4th menu item",
      },
    ],
  },
  {
    key: "3",
    label: "disabled sub menu",
    disabled: true,
    children: [
      {
        key: "3-1",
        label: "5d menu item",
      },
      {
        key: "3-2",
        label: "6th menu item",
      },
    ],
  },
];
