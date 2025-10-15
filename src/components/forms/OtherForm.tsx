"use client";

import { useState, useEffect } from "react";
import { OtherForm as OtherFormType } from "@/types";
import { generateOtherTemplate } from "@/lib/utils";
import {
  MdPartyMode,
  MdBuild,
  MdInventory,
  MdPets,
  MdNature,
  MdCardGiftcard,
  MdCheckroom,
  MdCasino,
  MdGroup,
  MdAttachMoney,
  MdLocationOn,
  MdEdit,
} from "react-icons/md";

interface OtherFormProps {
  form: OtherFormType;
  onChange: (form: OtherFormType) => void;
  onOutputChange?: (output: string) => void;
}

export default function OtherForm({
  form,
  onChange,
  onOutputChange,
}: OtherFormProps) {
  const [localForm, setLocalForm] = useState<OtherFormType>(form);

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  useEffect(() => {
    if (onOutputChange) {
      const output = generateOtherTemplate(localForm);
      onOutputChange(output);
    }
  }, [localForm, onOutputChange]);

  const handleChange = (field: keyof OtherFormType, value: string) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const handleRadioChange = (field: keyof OtherFormType, value: string) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const clearForm = () => {
    const clearedForm: OtherFormType = {
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
    };
    setLocalForm(clearedForm);
    onChange(clearedForm);
  };

  const partyLocations = [
    "Houses/apartment",
    "The beach",
    "The yacht",
    "Bahama Mamas Bar",
    "Tequi-la-la Bar",
    "Stadium",
    "Diamond Resort Bar (casino)",
    "Arena",
    "Raton Canyon",
    "Vanilla Unicorn Bar",
    "Hotel Spa Bar",
    "Cayo Perico",
    "House №49",
  ];

  const partyTypes = [
    "Party",
    "Pool party",
    "Wedding",
    "Car meet",
    "Exclusive car meet",
  ];

  const serviceTypes = [
    "Looking for a lawyer",
    "Looking for a personal driver",
    "Looking for a professional dancer",
    "Looking for a professional singer",
    "Looking for a DJ",
    "Wedding at Church",
    "Looking to play poker",
  ];

  const itemCategories = [
    "Automatic tools",
    "Inventory",
    "Backpack skins",
    "Batteries",
    "Pet items",
    "Canisters",
    "Chargers",
    "Christmas resources",
    "Containers",
    "Dice",
    "Fish",
    "Fishing rods",
    "Fruits and vegetables",
    "Fireworks",
    "Fuel for resource extraction",
    "Grand tickets",
    "Hookahs",
    "Juices",
    "Leash",
    "Letters",
    "License plates",
    "Lottery tickets",
    "Luminous wheels",
    "Masks",
    "Milk",
    "Mining resources",
    "Mushrooms",
    "Paint cans",
    "Pearls",
    "Pet food",
    "Pickaxes",
    "Prime",
    "Repair kits",
    "Resource barrels",
    "Resource Miners tickets",
    "Seeds",
    "Snow",
    "Solar panels",
    "SIM cards",
    "Scrap metal",
    "Top quality metal",
    "Threads",
    "Timber",
    "Tokens",
    "Tonic treats",
    "Video cards",
    "Wires",
    "Tuning parts",
  ];

  const petTypes = ["Shoulder pets", "Caged pets"];

  const shoulderPets = [
    "six tailed fox on shoulder pet",
    "hamster on shoulder pet",
    "strong chicken on shoulder pet",
    "owl on shoulder pet",
    "flying bear on shoulder pet",
    "toothless dragon on shoulder pet",
    "leon brawl on shoulder pet",
    "lovely bird egg on shoulder pet",
    "Mr. Robot friend on shoulder pet",
    "el primo corazon brawl on shoulder pet",
    "black voron on shoulder pet",
  ];

  const cagedPets = [
    "cage with a Border Collie",
    "cage with a Cat",
    "cage with a Cougar",
    "cage with a Cyberdog",
    "cage with a Husky",
    "cage with a Panther",
    "cage with a Pig",
    "cage with a Poodle",
    "cage with a Monkey",
    "cage with a Pug",
    "cage with a Christmas Elf",
    "cage with a Santa Claus",
    "cage with a Fancy bear",
    "cage with a Cute Hippo",
    "cage with a New years Husky",
    "cage with a Rabbit",
    "cage with a Rat",
    "cage with a Retriever",
    "cage with a Robobeast",
    "cage with a Rooster",
    "cage with a Puma",
    "cage with a Rottweiler",
    "cage with a Westie",
    "cage with a Kitty Bunny",
    "cage with a Duckling",
    "cage with a Panda",
    "cage with a Lion Cub",
    "cage with a Mini Robot",
  ];

  const resourceTypes = [
    "Copper",
    "Emeralds",
    "Rubies",
    "Diamonds",
    "Timber",
    "Snow",
    "Scrap metal",
    "Top quality metal",
    "Threads",
    "Solar panels",
    "Fuel for resource extraction",
  ];

  const containerTypes = [
    "Valuable container",
    "Desert scarf mask container",
    "Biker container",
    "Brand T-shirts 2 container",
    "Trucker container",
    "Racer container",
    "Grand racers container",
    "Ingrand container",
    "Progen container",
    "Maserati container",
    "Benefactor container",
    "Gardener container",
    "Rare love container",
    "Regular love container",
    "Renault container",
    "Resources container",
    "Diver container",
    "Organization container",
    "Sphere of influence container",
    "Wheels 1 container",
    "Wheels 2 container",
    "Wheels 3 container",
    "Old autumn gold container",
    "Old summer gold container",
    "Old winter gold container",
    "School container",
    "Arena container",
    "Daily container",
    "Halloween container",
    "Womens gift container of type 1",
    "Womens gift container of type 2",
    "Mens gift container of type 1",
    "Mens gift container of type 2",
    "Blue womens top container of type 4",
    "Black womens top container of type 4",
    "Benefactor E500 (W124) container",
    "Daily study of the organization container",
    "Captured caravans container",
    "Delivered caravans container",
    "Valentine 2025 container",
  ];

  const clothingTypes = [
    "Shirts for men",
    "Shoes for women",
    "TRON full set",
    "TRON helmet",
    "Lui Vi full set",
    "Clothing for women",
    "Clothing for men",
    "Desert scarf mask",
    "Luminous clothes",
    "Grand RP collection",
  ];

  const gamblingTypes = ["Dice", "Poker", "Lottery"];

  const allianceTypes = [
    "Looking for an alliance",
    "Family alliance",
    "Business alliance",
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Selection */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdPartyMode className="text-orange-600 mr-2 text-lg" />
            Category
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="party"
                checked={localForm.category === "party"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Party</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="services"
                checked={localForm.category === "services"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Services</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="items"
                checked={localForm.category === "items"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Items</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="pets"
                checked={localForm.category === "pets"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Pets</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="resources"
                checked={localForm.category === "resources"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Resources</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="containers"
                checked={localForm.category === "containers"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Containers</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="clothing"
                checked={localForm.category === "clothing"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Clothing</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="gambling"
                checked={localForm.category === "gambling"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Gambling</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="alliance"
                checked={localForm.category === "alliance"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Alliance</span>
            </label>
          </div>
        </div>

        {/* Purpose Selection */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdAttachMoney className="text-orange-600 mr-2 text-lg" />
            Purpose
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="purpose"
                value="Selling"
                checked={localForm.purpose === "Selling"}
                onChange={(e) => handleRadioChange("purpose", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Selling</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="purpose"
                value="Buying"
                checked={localForm.purpose === "Buying"}
                onChange={(e) => handleRadioChange("purpose", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Buying</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="purpose"
                value="Trading"
                checked={localForm.purpose === "Trading"}
                onChange={(e) => handleRadioChange("purpose", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Trading</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="purpose"
                value="Looking for"
                checked={localForm.purpose === "Looking for"}
                onChange={(e) => handleRadioChange("purpose", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Looking for</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="purpose"
                value="Offering"
                checked={localForm.purpose === "Offering"}
                onChange={(e) => handleRadioChange("purpose", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Offering</span>
            </label>
          </div>
        </div>
      </div>

      {/* Party Details */}
      {localForm.category === "party" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdLocationOn className="text-orange-600 mr-2 text-lg" />
              Party Location
            </h6>
            <div className="space-y-2">
              {partyLocations.map((location) => (
                <label key={location} className="flex items-center">
                  <input
                    type="radio"
                    name="partyLocation"
                    value={location}
                    checked={localForm.partyLocation === location}
                    onChange={(e) =>
                      handleChange("partyLocation", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{location}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdPartyMode className="text-orange-600 mr-2 text-lg" />
              Party Type
            </h6>
            <div className="space-y-2">
              {partyTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="partyType"
                    value={type}
                    checked={localForm.partyType === type}
                    onChange={(e) => handleChange("partyType", e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Services Details */}
      {localForm.category === "services" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdBuild className="text-orange-600 mr-2 text-lg" />
            Service Type
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {serviceTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="serviceType"
                  value={type}
                  checked={localForm.serviceType === type}
                  onChange={(e) => handleChange("serviceType", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Items Details */}
      {localForm.category === "items" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdInventory className="text-orange-600 mr-2 text-lg" />
              Item Category
            </h6>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {itemCategories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="itemCategory"
                    value={category}
                    checked={localForm.itemCategory === category}
                    onChange={(e) =>
                      handleChange("itemCategory", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdEdit className="text-orange-600 mr-2 text-lg" />
              Item Details
            </h6>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Type
                </label>
                <select
                  value={localForm.itemType}
                  onChange={(e) => handleChange("itemType", e.target.value)}
                  className="form-input"
                >
                  <option value="">Select item type</option>
                  <option value="automatic drill">Automatic drill</option>
                  <option value="automatic sawmill">Automatic sawmill</option>
                  <option value="automatic rod">Automatic rod</option>
                  <option value="automatic oil well">Automatic oil well</option>
                  <option value="automatic watering can">
                    Automatic watering can
                  </option>
                  <option value="high quality inventory">
                    High quality inventory
                  </option>
                  <option value="medium quality inventory">
                    Medium quality inventory
                  </option>
                  <option value="low quality inventory">
                    Low quality inventory
                  </option>
                  <option value="max quality inventory">
                    Max quality inventory
                  </option>
                  <option value="backpack skin">Backpack skin</option>
                  <option value="battery">Battery</option>
                  <option value="premium fuel canister">
                    Premium fuel canister
                  </option>
                  <option value="fuel canister">Fuel canister</option>
                  <option value="charger">Charger</option>
                  <option value="Christmas key">Christmas key</option>
                  <option value="Christmas copper">Christmas copper</option>
                  <option value="Christmas timber">Christmas timber</option>
                  <option value="Christmas perch">Christmas perch</option>
                  <option value="Christmas seed">Christmas seed</option>
                  <option value="Christmas lollipop">Christmas lollipop</option>
                  <option value="New years gift">New years gift</option>
                  <option value="A Little gift">A Little gift</option>
                  <option value="A Big gift">A Big gift</option>
                  <option value="Drawing">Drawing</option>
                  <option value="Dirty Statue">Dirty Statue</option>
                  <option value="Purified Statue">Purified Statue</option>
                  <option value="dice">Dice</option>
                  <option value="perch">Perch</option>
                  <option value="carp">Carp</option>
                  <option value="salmon">Salmon</option>
                  <option value="trout">Trout</option>
                  <option value="fishing rod">Fishing rod</option>
                  <option value="mandarin">Mandarin</option>
                  <option value="pumpkin">Pumpkin</option>
                  <option value="strawberry">Strawberry</option>
                  <option value="pineapple">Pineapple</option>
                  <option value="cabbage">Cabbage</option>
                  <option value="firework">Firework</option>
                  <option value="fuel for resource extraction">
                    Fuel for resource extraction
                  </option>
                  <option value="Grand ticket">Grand ticket</option>
                  <option value="hookah">Hookah</option>
                  <option value="attack juice">Attack juice</option>
                  <option value="protection juice">Protection juice</option>
                  <option value="endurance juice">Endurance juice</option>
                  <option value="riding juice">Riding juice</option>
                  <option value="power juice">Power juice</option>
                  <option value="immunity juice">Immunity juice</option>
                  <option value="juice on becoming an animal">
                    Juice on becoming an animal
                  </option>
                  <option value="juice for double the payment">
                    Juice for double the payment
                  </option>
                  <option value="fast running juice">Fast running juice</option>
                  <option value="Leash">Leash</option>
                  <option value="letter G">Letter G</option>
                  <option value="letter R">Letter R</option>
                  <option value="letter A">Letter A</option>
                  <option value="letter N">Letter N</option>
                  <option value="letter D">Letter D</option>
                  <option value="license plate">License plate</option>
                  <option value="regular lottery ticket">
                    Regular lottery ticket
                  </option>
                  <option value="rare lottery ticket">
                    Rare lottery ticket
                  </option>
                  <option value="flame and water lottery ticket">
                    Flame and water lottery ticket
                  </option>
                  <option value="Cayo Perico ticket">Cayo Perico ticket</option>
                  <option value="Car ticket">Car ticket</option>
                  <option value="Secret ticket fragment">
                    Secret ticket fragment
                  </option>
                  <option value="Secret ticket">Secret ticket</option>
                  <option value="luminous wheels">Luminous wheels</option>
                  <option value="mask">Mask</option>
                  <option value="milk">Milk</option>
                  <option value="copper">Copper</option>
                  <option value="emerald">Emerald</option>
                  <option value="ruby">Ruby</option>
                  <option value="diamond">Diamond</option>
                  <option value="mushroom">Mushroom</option>
                  <option value="paint can">Paint can</option>
                  <option value="pearl">Pearl</option>
                  <option value="pet food">Pet food</option>
                  <option value="pickaxe">Pickaxe</option>
                  <option value="Prime">Prime</option>
                  <option value="Prime Platinum">Prime Platinum</option>
                  <option value="repair kit">Repair kit</option>
                  <option value="solar barrel">Solar barrel</option>
                  <option value="gasoline barrel">Gasoline barrel</option>
                  <option value="kerosene barrel">Kerosene barrel</option>
                  <option value="Resource Miners ticket">
                    Resource Miners ticket
                  </option>
                  <option value="pineapple seed">Pineapple seed</option>
                  <option value="cabbage seed">Cabbage seed</option>
                  <option value="pumpkin seed">Pumpkin seed</option>
                  <option value="mandarin seed">Mandarin seed</option>
                  <option value="mushroom seed">Mushroom seed</option>
                  <option value="snow">Snow</option>
                  <option value="solar panel">Solar panel</option>
                  <option value="SIM card">SIM card</option>
                  <option value="scrap metal">Scrap metal</option>
                  <option value="top quality metal">Top quality metal</option>
                  <option value="thread">Thread</option>
                  <option value="timber">Timber</option>
                  <option value="token">Token</option>
                  <option value="tonic treat">Tonic treat</option>
                  <option value="video card">Video card</option>
                  <option value="wire">Wire</option>
                  <option value="tuning parts">Tuning parts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={localForm.itemQuantity}
                  onChange={(e) => handleChange("itemQuantity", e.target.value)}
                  className="form-input"
                  placeholder="Enter quantity"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality
                </label>
                <select
                  value={localForm.itemQuality}
                  onChange={(e) => handleChange("itemQuality", e.target.value)}
                  className="form-input"
                >
                  <option value="">Select quality</option>
                  <option value="low">Low quality</option>
                  <option value="medium">Medium quality</option>
                  <option value="high">High quality</option>
                  <option value="max">Max quality</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pets Details */}
      {localForm.category === "pets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdPets className="text-orange-600 mr-2 text-lg" />
              Pet Type
            </h6>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="shoulder"
                  checked={localForm.petType === "shoulder"}
                  onChange={(e) => handleChange("petType", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm">Shoulder pets</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="caged"
                  checked={localForm.petType === "caged"}
                  onChange={(e) => handleChange("petType", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm">Caged pets</span>
              </label>
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdPets className="text-orange-600 mr-2 text-lg" />
              Pet Selection
            </h6>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {localForm.petType === "shoulder" &&
                shoulderPets.map((pet) => (
                  <label key={pet} className="flex items-center">
                    <input
                      type="radio"
                      name="petName"
                      value={pet}
                      checked={localForm.petName === pet}
                      onChange={(e) => handleChange("petName", e.target.value)}
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">{pet}</span>
                  </label>
                ))}
              {localForm.petType === "caged" &&
                cagedPets.map((pet) => (
                  <label key={pet} className="flex items-center">
                    <input
                      type="radio"
                      name="petName"
                      value={pet}
                      checked={localForm.petName === pet}
                      onChange={(e) => handleChange("petName", e.target.value)}
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">{pet}</span>
                  </label>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Resources Details */}
      {localForm.category === "resources" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdNature className="text-orange-600 mr-2 text-lg" />
              Resource Type
            </h6>
            <div className="space-y-2">
              {resourceTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="resourceType"
                    value={type}
                    checked={localForm.resourceType === type}
                    onChange={(e) =>
                      handleChange("resourceType", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdEdit className="text-orange-600 mr-2 text-lg" />
              Resource Details
            </h6>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={localForm.resourceQuantity}
                onChange={(e) =>
                  handleChange("resourceQuantity", e.target.value)
                }
                className="form-input"
                placeholder="Enter quantity"
                min="1"
              />
            </div>
          </div>
        </div>
      )}

      {/* Containers Details */}
      {localForm.category === "containers" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdCardGiftcard className="text-orange-600 mr-2 text-lg" />
            Container Type
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {containerTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="containerType"
                  value={type}
                  checked={localForm.containerType === type}
                  onChange={(e) =>
                    handleChange("containerType", e.target.value)
                  }
                  className="form-radio"
                />
                <span className="ml-2 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Clothing Details */}
      {localForm.category === "clothing" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdCheckroom className="text-orange-600 mr-2 text-lg" />
              Clothing Type
            </h6>
            <div className="space-y-2">
              {clothingTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="clothingType"
                    value={type}
                    checked={localForm.clothingType === type}
                    onChange={(e) =>
                      handleChange("clothingType", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdEdit className="text-orange-600 mr-2 text-lg" />
              Clothing Details
            </h6>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Item
              </label>
              <input
                type="text"
                value={localForm.clothingItem}
                onChange={(e) => handleChange("clothingItem", e.target.value)}
                className="form-input"
                placeholder="Enter specific clothing item"
              />
            </div>
          </div>
        </div>
      )}

      {/* Gambling Details */}
      {localForm.category === "gambling" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdCasino className="text-orange-600 mr-2 text-lg" />
              Gambling Type
            </h6>
            <div className="space-y-2">
              {gamblingTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="gamblingType"
                    value={type}
                    checked={localForm.gamblingType === type}
                    onChange={(e) =>
                      handleChange("gamblingType", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdAttachMoney className="text-orange-600 mr-2 text-lg" />
              Bet Amount
            </h6>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bet Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="betType"
                      value="specific"
                      checked={localForm.betAmount !== ""}
                      onChange={(e) => handleChange("betAmount", "100000")}
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">Specific amount</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="betType"
                      value="negotiable"
                      checked={localForm.betAmount === ""}
                      onChange={(e) => handleChange("betAmount", "")}
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">Negotiable (over $10M)</span>
                  </label>
                </div>
              </div>
              {localForm.betAmount !== "" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bet Amount
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={localForm.betAmount.replace(/[$,]/g, "")}
                      onChange={(e) =>
                        handleChange("betAmount", `$${e.target.value}`)
                      }
                      className="form-input"
                      placeholder="100000"
                      min="1"
                    />
                    <input
                      type="text"
                      value={localForm.betAmount}
                      onChange={(e) =>
                        handleChange("betAmount", e.target.value)
                      }
                      className="form-input"
                      placeholder="e.g., $100.000"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Alliance Details */}
      {localForm.category === "alliance" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdGroup className="text-orange-600 mr-2 text-lg" />
            Alliance Type
          </h6>
          <div className="space-y-2">
            {allianceTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="allianceType"
                  value={type}
                  checked={localForm.allianceType === type}
                  onChange={(e) => handleChange("allianceType", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price and Location */}
      {(localForm.category === "items" ||
        localForm.category === "pets" ||
        localForm.category === "resources" ||
        localForm.category === "containers" ||
        localForm.category === "clothing") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdAttachMoney className="text-orange-600 mr-2 text-lg" />
              {localForm.purpose === "Selling" ? "Price" : "Budget"}
            </h6>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceType"
                      value="specific"
                      checked={!localForm.priceMillion}
                      onChange={(e) => handleChange("priceMillion", "false")}
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">Specific amount</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceType"
                      value="negotiable"
                      checked={localForm.priceMillion}
                      onChange={(e) => handleChange("priceMillion", "true")}
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">
                      Negotiable (over $300M)
                    </span>
                  </label>
                </div>
              </div>
              {!localForm.priceMillion && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={localForm.price.replace(/[$,]/g, "")}
                      onChange={(e) =>
                        handleChange("price", `$${e.target.value}`)
                      }
                      className="form-input"
                      placeholder="100000"
                      min="1"
                    />
                    <input
                      type="text"
                      value={localForm.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="form-input"
                      placeholder="e.g., $100.000"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdLocationOn className="text-orange-600 mr-2 text-lg" />
              Location
            </h6>
            <div>
              <select
                value={localForm.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="form-input"
              >
                <option value="">Select location (optional)</option>
                <option value="the city">The city</option>
                <option value="Paleto Bay">Paleto Bay</option>
                <option value="Sandy Shores">Sandy Shores</option>
                <option value="Vespucci Beach">Vespucci Beach</option>
                <option value="Del Perro">Del Perro</option>
                <option value="Rockford Hills">Rockford Hills</option>
                <option value="Vinewood">Vinewood</option>
                <option value="Mirror Park">Mirror Park</option>
                <option value="Davis">Davis</option>
                <option value="Strawberry">Strawberry</option>
                <option value="Chumash">Chumash</option>
                <option value="Grapeseed">Grapeseed</option>
                <option value="Harmony">Harmony</option>
                <option value="Grand Senora Desert">Grand Senora Desert</option>
                <option value="Sandy Shores Airfield">
                  Sandy Shores Airfield
                </option>
                <option value="Los Santos International Airport">
                  Los Santos International Airport
                </option>
                <option value="Maze Bank Arena">Maze Bank Arena</option>
                <option value="Diamond Casino">Diamond Casino</option>
                <option value="Bahama Mamas">Bahama Mamas</option>
                <option value="Tequi-la-la">Tequi-la-la</option>
                <option value="Vanilla Unicorn">Vanilla Unicorn</option>
                <option value="Cayo Perico">Cayo Perico</option>
                <option value="Custom location">Custom location</option>
              </select>
              {localForm.location === "Custom location" && (
                <input
                  type="text"
                  value={localForm.specialDetails}
                  onChange={(e) =>
                    handleChange("specialDetails", e.target.value)
                  }
                  className="form-input mt-2"
                  placeholder="Enter custom location"
                />
              )}
            </div>
          </div>
        </div>
      )}


      {/* Clear Button */}
      <div className="flex justify-end">
        <button onClick={clearForm} className="btn-secondary">
          Clear Form
        </button>
      </div>
    </div>
  );
}
