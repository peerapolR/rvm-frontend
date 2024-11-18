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
  const { logout } = useUserAuth();

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    open;
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
    setStateOpenKeys(openKeys);
  };

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  // const getHeaderFromArray = (array: string[]): string => {
  //   let result = "";
  //   for (let i = array.length - 1; i > 0; i--) {
  //     console.log(i);
  //     console.log(array[i]);
  //     result += array[i];
  //   }

  //   return result;
  // };

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
    } else {
      if (path) {
        router.push(path);
      }
    }
  };

  const items = [
    {
      key: "1",
      icon: <PlusIcon />,
      label: "New Proposal",
    },
    {
      key: "2",
      icon: <ListIcon />,
      label: "My Proposal",
    },
    {
      key: "3",
      icon: <GroupIcon />,
      label: "Formula & Ingredient",
      children: [
        {
          key: "33",
          label: "Supplement",
          children: [
            {
              key: "331",
              label: "Formula",
              icon: <DotIcon />,
            },
            {
              key: "332",
              label: "All Ingredient",
              icon: <DotIcon />,
            },
          ],
        },
        // {
        //   key: "34",
        //   label: "Skin Care",
        //   children: [
        //     {
        //       key: "341",
        //       label: "Formula",
        //       icon: <DotIcon />,
        //     },
        //     {
        //       key: "342",
        //       label: "All Ingredient",
        //       icon: <DotIcon />,
        //     },
        //   ],
        // },
        // {
        //   key: "35",
        //   label: "Cosmetic",
        //   children: [
        //     {
        //       key: "351",
        //       label: "Formula",
        //       icon: <DotIcon />,
        //     },
        //     {
        //       key: "352",
        //       label: "All Ingredient",
        //       icon: <DotIcon />,
        //     },
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
    {
      key: "5",
      icon: <IconLogout />,
      label: "LogOut",
    },
  ];

  const levelKeys = getLevelKeys(items);

  return (
    <Menu
      style={{ fontSize: "16px", backgroundColor: "white" }}
      onClick={(e) => handlePath(e)}
      mode="inline"
      // defaultSelectedKeys={["231"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      // style={{ width: 256 }}
      items={items}
    />
  );
}
