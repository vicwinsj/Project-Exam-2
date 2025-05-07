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
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <Button
          variant="outline"
          key={tab}
          onClick={() => handleClick(tab)}
          className={` ${activeTab === tab && "inset-shadow-stone-900 inset-shadow-sm/50 bg-neutral-700 hover:bg-neutral-600 border-neutral-700 hover:border-neutral-600 text-white hover:text-turquoise-500"}`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};
