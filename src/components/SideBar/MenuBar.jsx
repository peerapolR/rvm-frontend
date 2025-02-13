import React, { useState } from "react";
import { Menu } from "antd";
import IconLogout from "@icons/IconLogout";
import DotIcon from "@icons/DotIcon";
import { useRouter } from "next/navigation";
import PlusIcon from "@icons/PlusIcon";
import ListIcon from "@icons/ListIcon";
import GroupIcon from "@icons/GroupIcon";
import FileExportIcon from "@icons/FileExportIcon";
import { usePath } from "@contexts/PathContext";
import { useUserAuth } from "@contexts/UserAuthContext";

export default function MenuBar() {
  const { setHeader } = usePath();
  const router = useRouter();
  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const { logout, user } = useUserAuth();

  // Access rules: map roles to accessible keys
  const roleAccess = {
    sale: ["1", "2", "5"],
    "sale manager": ["1", "2", "4", "41", "42", "5"],
    "p&d": ["3", "33", "331", "332", "5"],
    admin: ["1", "2", "3", "33", "331", "332", "4", "41", "42", "5", "6", "7"],
  };

  // Get accessible keys for the current user role
  const accessibleKeys = roleAccess[user?.role] || [];

  // Filter items based on role
  const filterMenuItems = (items) =>
    items
      .filter((item) => accessibleKeys.includes(item.key))
      .map((item) => ({
        ...item,
        children: item.children ? filterMenuItems(item.children) : undefined,
      }));

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
    setStateOpenKeys(openKeys);
  };

  const getLevelKeys = (items) => {
    const key = {};
    const func = (items, level = 1) => {
      items.forEach((item) => {
        if (item.key) key[item.key] = level;
        if (item.children) func(item.children, level + 1);
      });
    };
    func(items);
    return key;
  };

  const pathObj = {
    1: "/main/proposal",
    2: "/main/myProposal",
    331: "/main/formula",
    332: "/main/ingredient",
    41: "/main/pendingProposal",
    42: "/main/allProposal",
  };

  const handlePath = (e) => {
    const selectedKey = e.key;
    const path = pathObj[selectedKey];

    if (e.key === "5") {
      logout();
    } else if (path) {
      router.push(path);
    }
  };

  const items = [
    { key: "1", icon: <PlusIcon />, label: "New Proposal" },
    { key: "2", icon: <ListIcon />, label: "My Proposal" },
    {
      key: "3",
      icon: <GroupIcon />,
      label: "Formula & Ingredient",
      children: [
        {
          key: "33",
          label: "Supplement",
          children: [
            { key: "331", label: "Formula", icon: <DotIcon /> },
            { key: "332", label: "All Ingredient", icon: <DotIcon /> },
          ],
        },
        // {
        //   key: "34",
        //   label: "Skin Care",
        //   children: [
        //     { key: "341", label: "Formula", icon: <DotIcon /> },
        //     { key: "342", label: "All Ingredient", icon: <DotIcon /> },
        //   ],
        // },
        // {
        //   key: "35",
        //   label: "Cosmetic",
        //   children: [
        //     { key: "351", label: "Formula", icon: <DotIcon /> },
        //     { key: "352", label: "All Ingredient", icon: <DotIcon /> },
        //   ],
        // },
      ],
    },
    {
      key: "4",
      icon: <FileExportIcon />,
      label: "Sale Proposal",
      children: [
        { key: "41", label: "Pending Proposal" },
        { key: "42", label: "All Proposal" },
      ],
    },
    { key: "6", icon: < GroupIcon/>, label: "ChangePassword" },
    { key: "7", icon: <ListIcon/>, label:"Admin Panel"},
    { key: "5", icon: <IconLogout />, label: "LogOut" },
  ];

  const levelKeys = getLevelKeys(items);

  return (
    <Menu
      style={{ fontSize: "16px", backgroundColor: "white" }}
      onClick={handlePath}
      mode="inline"
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      items={filterMenuItems(items)} // Render filtered items
    />
  );
}
