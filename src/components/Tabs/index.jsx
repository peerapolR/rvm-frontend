import React, { useState } from "react";
import "./style.scss";

export default function Tabs() {
  const [selectedKey, setSelectedKey] = useState(1);

  const handleChangeTab = (id) => {
    setSelectedKey(id);
  };

  const tabItem = [
    {
      id: 1,
      label: "All",
    },
    {
      id: 2,
      label: "Prototype Formula",
    },
    {
      id: 3,
      label: "Concept Formula",
    },
    {
      id: 4,
      label: "Sale-Custom Formula",
    },
  ];

  const TabPanel = (props) => {
    const { id, label, selectedKey } = props;
    return (
      <div
        className={selectedKey === id ? "baseTab selected" : "baseTab"}
        onClick={() => handleChangeTab(id)}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-4 px-6 py-4">
      {tabItem.map((e) => {
        return (
          <TabPanel
            key={e.id}
            id={e.id}
            label={e.label}
            selectedKey={selectedKey}
          ></TabPanel>
        );
      })}
    </div>
  );
}
