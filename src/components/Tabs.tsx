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
    <div className="w-1/2 sm:w-fit flex flex-col sm:flex-row gap-3 items-center">
      {tabs.map((tab) => (
        <Button
          variant="outline"
          key={tab}
          onClick={() => handleClick(tab)}
          className={`w-full ${activeTab === tab && "font-semibold! text-sunset-800 border-sunset-800 hover:border-sunset-900"}`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};
