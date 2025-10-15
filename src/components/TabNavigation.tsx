"use client";

import { TabType } from "@/types";
import {
  MdLocationCity,
  MdDirectionsCar,
  MdAllInclusive,
  MdFavorite,
  MdEngineering,
  MdBusiness,
} from "react-icons/md";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "real-estate" as TabType, label: "Real Estate", icon: MdLocationCity },
  { id: "auto" as TabType, label: "Auto", icon: MdDirectionsCar },
  { id: "dating" as TabType, label: "Dating", icon: MdFavorite },
  { id: "work" as TabType, label: "Work", icon: MdEngineering },
  { id: "business" as TabType, label: "Business", icon: MdBusiness },
  { id: "other" as TabType, label: "Other", icon: MdAllInclusive },
];

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`nav-pill flex items-center justify-center flex-1 ${
            activeTab === tab.id ? "nav-pill-active" : "nav-pill-inactive"
          }`}
        >
          <tab.icon className="text-lg mr-2" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
