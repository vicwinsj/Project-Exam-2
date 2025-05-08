import { useState } from "react";
import { Button } from "./form/Button";

interface TabsProps {
  tabs: string[];
  onTabChange?: (tab: string) => void;
}

export const Tabs = ({ tabs, onTabChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex gap-3 items-center">
      {tabs.map((tab) => (
        <Button
          variant="outline"
          key={tab}
          onClick={() => handleClick(tab)}
          className={` ${activeTab === tab && "font-semibold! border-2 text-ocean-700 border-ocean-700 hover:border-ocean-700 hover:bg-white"}`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};
