"use client";

import { useState } from "react";
import {
  TabType,
  RealEstateForm,
  AutoForm,
  DatingForm,
  WorkForm,
  BusinessForm,
  OtherForm,
} from "@/types";
import TabNavigation from "@/components/TabNavigation";
import RealEstateFormComponent from "@/components/forms/RealEstateForm";
import AutoFormComponent from "@/components/forms/AutoForm";
import DatingFormComponent from "@/components/forms/DatingForm";
import WorkFormComponent from "@/components/forms/WorkForm";
import BusinessFormComponent from "@/components/forms/BusinessForm";
import OtherFormComponent from "@/components/forms/OtherForm";
import ComingSoon from "@/components/ComingSoon";
import OutputSection from "@/components/OutputSection";

export default function AdGenerator() {
  const [activeTab, setActiveTab] = useState<TabType>("real-estate");
  const [realEstateForm, setRealEstateForm] = useState<RealEstateForm>({
    purpose: "Selling",
    type: "house",
    number: "",
    price: "",
    priceMillion: false,
    rentalPeriod: "",
    garden: false,
    garageSpaces: false,
    garageSpaceValue: "",
    warehouses: false,
    warehouseValue: "",
    customInterior: false,
    insurance: false,
    swimmingPool: false,
    tennisCourt: false,
    helipad: false,
    driveway: false,
    drivewayValue: "",
    backyard: false,
    backyardValue: "",
    view: false,
    viewValue: "",
    location: false,
    beforeLocation: "",
    locationValue: "",
  });

  const [autoForm, setAutoForm] = useState<AutoForm>({
    purpose: "Selling",
    name: "",
    price: "",
    priceMillion: false,
    configuration: false,
    configValue: "",
    visualUpgrades: false,
    luminousWheels: false,
    insurance: false,
    turboKit: false,
    driftKit: false,
    monowheel: false,
    monowheelType: "",
  });

  const [datingForm, setDatingForm] = useState<DatingForm>({
    type: "specific-person",
    firstName: "",
    lastName: "",
    customText: "",
  });

  const [workForm, setWorkForm] = useState<WorkForm>({
    type: "hiring",
    jobType: "construction-workers",
    constructionSite: "general",
    specificRole: "",
    location: "",
    salary: "negotiable",
    salaryAmount: "",
    bonusAmount: "",
    experience: "",
    customText: "",
  });

  const [businessForm, setBusinessForm] = useState<BusinessForm>({
    type: "business",
    purpose: "Selling",
    businessType: "",
    businessNumber: "",
    price: "",
    priceMillion: false,
    location: "",
    specialDetails: "",
    sharesType: "",
    serviceType: "",
    serviceDescription: "",
  });

  const [otherForm, setOtherForm] = useState<OtherForm>({
    category: "party",
    purpose: "Looking for",
    partyLocation: "",
    partyType: "",
    serviceType: "",
    serviceDescription: "",
    itemCategory: "",
    itemType: "",
    itemQuantity: "",
    itemQuality: "",
    petType: "",
    petName: "",
    resourceType: "",
    resourceQuantity: "",
    containerType: "",
    clothingType: "",
    clothingItem: "",
    gamblingType: "",
    betAmount: "",
    allianceType: "",
    price: "",
    priceMillion: false,
    location: "",
    specialDetails: "",
  });

  const [output, setOutput] = useState("");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleRealEstateChange = (form: RealEstateForm) => {
    setRealEstateForm(form);
  };

  const handleAutoChange = (form: AutoForm) => {
    setAutoForm(form);
  };

  const handleDatingChange = (form: DatingForm) => {
    setDatingForm(form);
  };

  const handleWorkChange = (form: WorkForm) => {
    setWorkForm(form);
  };

  const handleBusinessChange = (form: BusinessForm) => {
    setBusinessForm(form);
  };

  const handleOtherChange = (form: OtherForm) => {
    setOtherForm(form);
  };

  const handleOutputChange = (output: string) => {
    setOutput(output);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "real-estate":
        return (
          <RealEstateFormComponent
            form={realEstateForm}
            onChange={handleRealEstateChange}
            onOutputChange={handleOutputChange}
          />
        );
      case "auto":
        return (
          <AutoFormComponent
            form={autoForm}
            onChange={handleAutoChange}
            onOutputChange={handleOutputChange}
          />
        );
      case "dating":
        return (
          <DatingFormComponent
            form={datingForm}
            onChange={handleDatingChange}
            onOutputChange={handleOutputChange}
          />
        );
      case "work":
        return (
          <WorkFormComponent
            form={workForm}
            onChange={handleWorkChange}
            onOutputChange={handleOutputChange}
          />
        );
      case "business":
        return (
          <BusinessFormComponent
            form={businessForm}
            onChange={handleBusinessChange}
            onOutputChange={handleOutputChange}
          />
        );
      case "other":
        return (
          <OtherFormComponent
            form={otherForm}
            onChange={handleOtherChange}
            onOutputChange={handleOutputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 -mt-16 relative z-10">
      <div className="card bg-gray-900/90 backdrop-blur-[30px] backdrop-saturate-200 shadow-2xl">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="mt-6">{renderActiveTab()}</div>
        <OutputSection output={output} activeTab={activeTab} />
      </div>
    </div>
  );
}
