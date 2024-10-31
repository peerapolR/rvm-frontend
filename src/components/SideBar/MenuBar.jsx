import React, { useState } from "react";
import { Menu } from "antd";
import IconLogout from "@icons/IconLogout";
import DotIcon from "@icons/DotIcon";
import { useRouter } from "next/navigation";
import PlusIcon from "@icons/PlusIcon";
import ListIcon from "@icons/ListIcon";
import GroupIcon from "@icons/GroupIcon";
import ExportIcon from "@icons/ExportIcon";
import { usePath } from "@contexts/PathContext";

export default function MenuBar() {
  const { setHeader } = usePath();
  const router = useRouter();
  const [stateOpenKeys, setStateOpenKeys] = useState([]);

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
    77: "/formula",
    88: "/ingredient",
  };

  const handlePath = (e) => {
    console.log(e);

    const selectedKey = e.key;
    const path = pathObj[selectedKey];
    if (path) {
      router.push(path);
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
          key: "66",
          label: "Supplement",
          children: [
            {
              key: "77",
              label: "Formula",
              icon: <DotIcon />,
            },
            {
              key: "88",
              label: "All Ingredient",
              icon: <DotIcon />,
            },
          ],
        },
        {
          key: "32",
          label: "Skin Care",
          children: [
            { key: "321", label: "Option 1" },
            { key: "322", label: "Option 2" },
            { key: "323", label: "Option 3" },
          ],
        },
        {
          key: "33",
          label: "Cosmetic",
          children: [
            { key: "331", label: "Option 1" },
            { key: "332", label: "Option 2" },
            { key: "333", label: "Option 3" },
          ],
        },
      ],
    },
    {
      key: "4",
      icon: <ExportIcon />,
      label: "Sale Proposal",
      children: [
        { key: "41", label: "Option 1" },
        { key: "42", label: "Option 2" },
        { key: "43", label: "Option 3" },
        { key: "44", label: "Option 4" },
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
      style={{ height: "1000px", fontSize: "16px", backgroundColor: "white" }}
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
