"use client";

import { useState, useEffect } from "react";
import { OtherForm as OtherFormType } from "@/types";
import { generateOtherTemplate } from "@/lib/utils";
import {
  maleClothingNames,
  femaleClothingNames,
  resourceTypes,
  containerTypes,
  itemTypesByCategory,
  partyLocations,
  partyTypes,
  serviceTypes,
  itemCategories,
  petTypes,
  shoulderPets,
  cagedPets,
  clothingTypes,
  gamblingTypes,
  allianceTypes,
  location1,
  location2,
} from "@/lib/data";
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
  const [filteredClothingItems, setFilteredClothingItems] = useState<string[]>(
    []
  );
  const [showClothingSuggestions, setShowClothingSuggestions] = useState(false);
  const [clothingWarning, setClothingWarning] = useState<string>("");

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  useEffect(() => {
    if (onOutputChange) {
      const output = generateOtherTemplate(localForm);
      onOutputChange(output);
    }
  }, [localForm, onOutputChange]);

  const handleChange = (field: keyof OtherFormType, value: any) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const handleRadioChange = (field: keyof OtherFormType, value: string) => {
    handleChange(field, value);
  };

  const handleCheckboxChange = (
    field: keyof OtherFormType,
    checked: boolean
  ) => {
    handleChange(field, checked);
  };

  // Combine male and female clothing names for search
  const allClothingNames = [...maleClothingNames, ...femaleClothingNames];

  const filterClothingItems = (
    value: string,
    gender: "male" | "female" | ""
  ) => {
    if (value.length > 0) {
      // Filter based on selected gender
      let sourceArray = allClothingNames;
      if (gender === "male") {
        sourceArray = maleClothingNames;
      } else if (gender === "female") {
        sourceArray = femaleClothingNames;
      }

      const filtered = sourceArray
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setFilteredClothingItems(filtered);
      setShowClothingSuggestions(true);
    } else {
      setShowClothingSuggestions(false);
    }
  };

  const handleClothingItemChange = (value: string) => {
    handleChange("clothingItem", value);
    filterClothingItems(value, localForm.clothingGender);
    // Validate when user types
    if (value && localForm.clothingGender) {
      validateClothingItem(value, localForm.clothingGender);
    } else {
      setClothingWarning("");
    }
  };

  const handleGenderChange = (gender: "male" | "female" | "") => {
    handleChange("clothingGender", gender);
    // Re-filter if there's already text in the search using the new gender
    if (localForm.clothingItem.length > 0) {
      filterClothingItems(localForm.clothingItem, gender);
      // Validate the existing item with new gender
      validateClothingItem(localForm.clothingItem, gender);
    } else {
      setClothingWarning("");
    }
  };

  const selectClothingItem = (item: string) => {
    handleChange("clothingItem", item);
    setShowClothingSuggestions(false);
    validateClothingItem(item, localForm.clothingGender);
  };

  // Get item types for selected category
  const getItemTypesForCategory = (category: string): string[] => {
    if (!category) return [];
    return itemTypesByCategory[category] || [];
  };

  // Check if category has only one item
  const hasSingleItem = (category: string): boolean => {
    const items = getItemTypesForCategory(category);
    return items.length === 1;
  };

  const validateClothingItem = (
    item: string,
    gender: "male" | "female" | ""
  ) => {
    if (!item || !gender) {
      setClothingWarning("");
      return;
    }

    const isInMaleList = maleClothingNames.some(
      (name) => name.toLowerCase() === item.toLowerCase()
    );
    const isInFemaleList = femaleClothingNames.some(
      (name) => name.toLowerCase() === item.toLowerCase()
    );

    if (gender === "male" && !isInMaleList && isInFemaleList) {
      setClothingWarning("This clothing item is not available for men.");
    } else if (gender === "female" && !isInFemaleList && isInMaleList) {
      setClothingWarning("This clothing item is not available for women.");
    } else {
      setClothingWarning("");
    }
  };

  const clearForm = () => {
    const clearedForm: OtherFormType = {
      category: "clothing",
      purpose: "Selling",
      partyLocation: "",
      partyType: "",
      serviceType: "",
      serviceDescription: "",
      itemCategory: "",
      itemType: "",
      itemQuantity: "",
      itemQuality: "",
      luminousWheelsType: "",
      petType: "",
      petName: "",
      resourceType: "",
      resourceQuantity: "",
      containerType: "",
      clothingType: "",
      clothingItem: "",
      clothingGender: "",
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Purpose Selection */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdAttachMoney className="text-cyan-400 mr-2 text-lg" />
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
              <span className="ml-2 text-sm text-gray-300">Selling</span>
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
              <span className="ml-2 text-sm text-gray-300">Buying</span>
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
              <span className="ml-2 text-sm text-gray-300">Trading</span>
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
              <span className="ml-2 text-sm text-gray-300">Looking for</span>
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
              <span className="ml-2 text-sm text-gray-300">Offering</span>
            </label>
          </div>
        </div>

        {/* Category Selection */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdPartyMode className="text-cyan-400 mr-2 text-lg" />
            Category
          </h6>
          <div className="space-y-3">
            {/* Most used categories first */}
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="clothing"
                checked={localForm.category === "clothing"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm text-gray-300">Clothing</span>
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
              <span className="ml-2 text-sm text-gray-300">Items</span>
            </label>
            {/* Other categories */}
            <div className="border-t border-gray-600/30 my-2"></div>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="party"
                checked={localForm.category === "party"}
                onChange={(e) => handleRadioChange("category", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm text-gray-300">Party</span>
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
              <span className="ml-2 text-sm text-gray-300">Services</span>
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
              <span className="ml-2 text-sm text-gray-300">Pets</span>
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
              <span className="ml-2 text-sm text-gray-300">Gambling</span>
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
              <span className="ml-2 text-sm text-gray-300">Alliance</span>
            </label>
          </div>
        </div>
      </div>

      {/* Party Details */}
      {localForm.category === "party" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdLocationOn className="text-cyan-400 mr-2 text-lg" />
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
                  <span className="ml-2 text-sm text-gray-300">{location}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdPartyMode className="text-cyan-400 mr-2 text-lg" />
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
                  <span className="ml-2 text-sm text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Services Details */}
      {localForm.category === "services" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdBuild className="text-cyan-400 mr-2 text-lg" />
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
                <span className="ml-2 text-sm text-gray-300">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Items Details */}
      {localForm.category === "items" && (
        <div className="grid grid-cols-1 gap-6">
          {/* Item Category Selection */}
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdInventory className="text-cyan-400 mr-2 text-lg" />
              Item Category
            </h6>
            <p className="text-xs text-gray-400 mb-3">
              Select a category to see available items
            </p>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-col auto-rows-max gap-2"
              style={{
                gridTemplateRows: `repeat(${Math.ceil(
                  itemCategories.length / 4
                )}, minmax(0, auto))`,
              }}
            >
              {itemCategories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="itemCategory"
                    value={category}
                    checked={localForm.itemCategory === category}
                    onChange={(e) => {
                      const selectedCategory = e.target.value;
                      const items = getItemTypesForCategory(selectedCategory);
                      const updatedForm = {
                        ...localForm,
                        itemCategory: selectedCategory,
                        // Auto-select itemType if category has only one item (like Scrap metal)
                        itemType: items.length === 1 ? items[0] : "",
                      };
                      setLocalForm(updatedForm);
                      onChange(updatedForm);
                    }}
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Item Type Selection - Grid Display */}
          {localForm.itemCategory && (
            <div className="feature-card">
              <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
                <MdEdit className="text-cyan-400 mr-2 text-lg" />
                Item Type
              </h6>
              {localForm.itemCategory === "Inventory" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Quality
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="itemQuality"
                          value="low"
                          checked={localForm.itemQuality === "low"}
                          onChange={(e) => {
                            handleChange("itemQuality", e.target.value);
                            handleChange("itemType", "low quality inventory");
                          }}
                          className="form-radio"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          Low quality
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="itemQuality"
                          value="medium"
                          checked={localForm.itemQuality === "medium"}
                          onChange={(e) => {
                            handleChange("itemQuality", e.target.value);
                            handleChange(
                              "itemType",
                              "medium quality inventory"
                            );
                          }}
                          className="form-radio"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          Medium quality
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="itemQuality"
                          value="high"
                          checked={localForm.itemQuality === "high"}
                          onChange={(e) => {
                            handleChange("itemQuality", e.target.value);
                            handleChange("itemType", "high quality inventory");
                          }}
                          className="form-radio"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          High quality
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="itemQuality"
                          value="max"
                          checked={localForm.itemQuality === "max"}
                          onChange={(e) => {
                            handleChange("itemQuality", e.target.value);
                            handleChange("itemType", "max quality inventory");
                          }}
                          className="form-radio"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          Max quality
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : localForm.itemCategory === "Resources" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Resource Type
                    </label>
                    <div
                      className="grid grid-cols-3 md:grid-cols-4 grid-flow-col auto-rows-max gap-2"
                      style={{
                        gridTemplateRows: `repeat(${Math.ceil(
                          resourceTypes.length / 4
                        )}, minmax(0, auto))`,
                      }}
                    >
                      {resourceTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="resourceType"
                            value={type}
                            checked={localForm.resourceType === type}
                            onChange={(e) => {
                              const updatedForm = {
                                ...localForm,
                                resourceType: e.target.value,
                                itemType: type.toLowerCase(),
                              };
                              setLocalForm(updatedForm);
                              onChange(updatedForm);
                            }}
                            className="form-radio"
                          />
                          <span className="ml-2 text-sm text-gray-300">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Quantity (Optional)
                    </label>
                    <input
                      type="number"
                      value={localForm.resourceQuantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (!isNaN(parseInt(value)) && parseInt(value) > 0)
                        ) {
                          handleChange("resourceQuantity", value);
                        }
                      }}
                      className="form-input w-full"
                      placeholder="Leave empty for single unit"
                      min="1"
                    />
                  </div>
                </div>
              ) : localForm.itemCategory === "Containers" ? (
                <div>
                  <p className="text-xs text-gray-400 mb-3">
                    Select the type of container you're{" "}
                    {localForm.purpose.toLowerCase()}
                  </p>
                  <div
                    className="grid grid-cols-3 md:grid-cols-4 grid-flow-col auto-rows-max gap-2"
                    style={{
                      gridTemplateRows: `repeat(${Math.ceil(
                        containerTypes.length / 4
                      )}, minmax(0, auto))`,
                    }}
                  >
                    {containerTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="containerType"
                          value={type}
                          checked={localForm.containerType === type}
                          onChange={(e) => {
                            const updatedForm = {
                              ...localForm,
                              containerType: e.target.value,
                              itemType: type.toLowerCase(),
                            };
                            setLocalForm(updatedForm);
                            onChange(updatedForm);
                          }}
                          className="form-radio"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {(() => {
                    const itemTypes = getItemTypesForCategory(
                      localForm.itemCategory
                    );
                    const numColumns = 4;
                    return (
                      <div className="grid grid-cols-4 gap-2">
                        {itemTypes.map((item) => (
                          <label
                            key={item}
                            className="flex items-center cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="itemType"
                              value={item}
                              checked={localForm.itemType === item}
                              onChange={(e) =>
                                handleChange("itemType", e.target.value)
                              }
                              className="form-radio"
                            />
                            <span className="ml-2 text-sm text-gray-300">
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    );
                  })()}
                  {getItemTypesForCategory(localForm.itemCategory).length ===
                    0 && (
                    <p className="text-xs text-gray-400 mt-2">
                      No items available for this category.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Luminous Wheels Type Input */}
          {localForm.itemCategory === "Luminous wheels" && (
            <div className="feature-card">
              <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
                <MdEdit className="text-cyan-400 mr-2 text-lg" />
                Type Number (Optional)
              </h6>
              <input
                type="number"
                value={localForm.luminousWheelsType}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (!isNaN(parseInt(value)) && parseInt(value) > 0)
                  ) {
                    handleChange("luminousWheelsType", value);
                  }
                }}
                className="form-input w-full"
                placeholder="Enter type number (e.g., 3)"
                min="1"
              />
              <p className="text-xs text-gray-400 mt-2">
                Leave empty to use just "luminous wheels" without type number
              </p>
            </div>
          )}

          {/* Quantity Input */}
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdInventory className="text-cyan-400 mr-2 text-lg" />
              Quantity (Optional)
            </h6>
            <input
              type="number"
              value={localForm.itemQuantity}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value === "" ||
                  (!isNaN(parseInt(value)) && parseInt(value) > 0)
                ) {
                  handleChange("itemQuantity", value);
                }
              }}
              className="form-input w-full"
              placeholder="Leave empty for single item"
              min="1"
            />
            <p className="text-xs text-gray-400 mt-2">
              Specify quantity or leave empty for a single item
            </p>
          </div>
        </div>
      )}

      {/* Pets Details */}
      {localForm.category === "pets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdPets className="text-cyan-400 mr-2 text-lg" />
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
                <span className="ml-2 text-sm text-gray-300">
                  Shoulder pets
                </span>
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
                <span className="ml-2 text-sm text-gray-300">Caged pets</span>
              </label>
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdPets className="text-cyan-400 mr-2 text-lg" />
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
                    <span className="ml-2 text-sm text-gray-300">{pet}</span>
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
                    <span className="ml-2 text-sm text-gray-300">{pet}</span>
                  </label>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Resources Details */}

      {/* Clothing Details */}
      {localForm.category === "clothing" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card relative">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdEdit className="text-cyan-400 mr-2 text-lg" />
              Specific Item
            </h6>
            <div className="space-y-3">
              {/* Gender Selection Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleGenderChange("")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localForm.clothingGender === ""
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange("male")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localForm.clothingGender === "male"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange("female")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localForm.clothingGender === "female"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Female
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={localForm.clothingItem}
                  onChange={(e) => handleClothingItemChange(e.target.value)}
                  className="form-input w-full"
                  placeholder="Search for clothing item or type custom..."
                  onFocus={() => {
                    if (localForm.clothingItem.length > 0) {
                      setShowClothingSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowClothingSuggestions(false), 200);
                  }}
                />
                {showClothingSuggestions &&
                  filteredClothingItems.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredClothingItems.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectClothingItem(item)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-gray-300"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
              {clothingWarning && (
                <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-3">
                  <p className="text-sm text-yellow-400">{clothingWarning}</p>
                </div>
              )}
              <p className="text-xs text-gray-400">
                Select gender to filter search, then type to search from items
                or enter a custom item name. Leave empty to use only the
                category above.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdAttachMoney className="text-cyan-400 mr-2 text-lg" />
              {localForm.purpose === "Selling" ? "Price:" : "Budget:"}
            </h6>
            <div className="flex gap-2">
              <input
                type="number"
                value={localForm.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="form-input flex-1"
                placeholder="Amount"
              />
              <button
                onClick={() => handleChange("price", "")}
                className="btn-secondary text-xs px-2 py-1"
              >
                Clear
              </button>
            </div>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={localForm.priceMillion}
                onChange={(e) =>
                  handleCheckboxChange("priceMillion", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">Million.</span>
            </label>
          </div>
        </div>
      )}

      {/* Gambling Details */}
      {localForm.category === "gambling" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdCasino className="text-cyan-400 mr-2 text-lg" />
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
                  <span className="ml-2 text-sm text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdAttachMoney className="text-cyan-400 mr-2 text-lg" />
              Bet Amount
            </h6>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                    <span className="ml-2 text-sm text-gray-300">
                      Specific amount
                    </span>
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
                    <span className="ml-2 text-sm text-gray-300">
                      Negotiable (over $10M)
                    </span>
                  </label>
                </div>
              </div>
              {localForm.betAmount !== "" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
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
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdGroup className="text-cyan-400 mr-2 text-lg" />
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
                <span className="ml-2 text-sm text-gray-300">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price and Location */}
      {(localForm.category === "items" || localForm.category === "pets") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdAttachMoney className="text-cyan-400 mr-2 text-lg" />
              {localForm.purpose === "Selling" ? "Price:" : "Budget:"}
            </h6>
            <div className="flex gap-2">
              <input
                type="number"
                value={localForm.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="form-input flex-1"
                placeholder="Amount"
              />
              <button
                onClick={() => handleChange("price", "")}
                className="btn-secondary text-xs px-2 py-1"
              >
                Clear
              </button>
            </div>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={localForm.priceMillion}
                onChange={(e) =>
                  handleCheckboxChange("priceMillion", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">Million.</span>
            </label>
          </div>

          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdLocationOn className="text-cyan-400 mr-2 text-lg" />
              Location
            </h6>
            <div>
              <select
                value={localForm.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="form-input"
              >
                <option value="">Select location (optional)</option>
                {[...location1, ...location2, "Custom location"]
                  .sort((a, b) =>
                    a.localeCompare(b, undefined, { sensitivity: "base" })
                  )
                  .map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
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
