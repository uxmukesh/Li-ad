"use client";

import { useState, useEffect } from "react";
import { RealEstateForm as RealEstateFormType } from "@/types";
import { generateRealEstateTemplate } from "@/lib/utils";
import { location1, location2, apartmentLocations } from "@/lib/data";
import {
  MdBusiness,
  MdHome,
  MdTag,
  MdAttachMoney,
  MdPark,
  MdGarage,
  MdWarehouse,
  MdHomeRepairService,
  MdSecurity,
  MdPool,
  MdSportsTennis,
  MdFlight,
  MdDriveEta,
  MdYard,
  MdVisibility,
  MdLocationOn,
} from "react-icons/md";

interface RealEstateFormProps {
  form: RealEstateFormType;
  onChange: (form: RealEstateFormType) => void;
  onOutputChange: (output: string) => void;
}

export default function RealEstateForm({
  form,
  onChange,
  onOutputChange,
}: RealEstateFormProps) {
  const [localForm, setLocalForm] = useState<RealEstateFormType>(form);

  useEffect(() => {
    const output = generateRealEstateTemplate(localForm);
    onOutputChange(output);
  }, [localForm, onOutputChange]);

  const handleChange = (field: keyof RealEstateFormType, value: any) => {
    const newForm = { ...localForm, [field]: value };
    setLocalForm(newForm);
    onChange(newForm);
  };

  const handleRadioChange = (
    field: keyof RealEstateFormType,
    value: string
  ) => {
    handleChange(field, value);
  };

  const handleCheckboxChange = (
    field: keyof RealEstateFormType,
    checked: boolean
  ) => {
    handleChange(field, checked);
  };

  const clearForm = () => {
    const clearedForm: RealEstateFormType = {
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
    };
    setLocalForm(clearedForm);
    onChange(clearedForm);
  };

  return (
    <div className="space-y-8">
      {/* Purpose and Type Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdBusiness className="text-orange-600 mr-2 text-lg" />
            Purpose
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="rePurpose"
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
                name="rePurpose"
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
                name="rePurpose"
                value="Renting"
                checked={localForm.purpose === "Renting"}
                onChange={(e) => handleRadioChange("purpose", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Renting</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="rePurpose"
                value="Renting Out"
                checked={localForm.purpose === "Renting Out"}
                onChange={(e) => handleRadioChange("purpose", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Renting Out</span>
            </label>
          </div>
        </div>

        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdHome className="text-orange-600 mr-2 text-lg" />
            Type
          </h6>
          <div className="space-y-3">
            {["house", "apartment", "mansion", "penthouse"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="reType"
                  value={type}
                  checked={localForm.type === type}
                  onChange={(e) => handleRadioChange("type", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdTag className="text-orange-600 mr-2 text-lg" />
            Number
          </h6>
          <div className="flex gap-2">
            <input
              type="number"
              value={localForm.number}
              onChange={(e) => handleChange("number", e.target.value)}
              className="form-input flex-1"
              placeholder="Number"
            />
            <button
              onClick={() => handleChange("number", "")}
              className="btn-secondary text-xs px-2 py-1"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdAttachMoney className="text-orange-600 mr-2 text-lg" />
            {localForm.purpose === "Selling"
              ? "Price:"
              : localForm.purpose === "Buying"
              ? "Budget:"
              : localForm.purpose === "Renting"
              ? "Budget:"
              : "Rent:"}
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
            <span className="ml-2 text-sm">Million.</span>
          </label>
          {(localForm.purpose === "Renting" ||
            localForm.purpose === "Renting Out") && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Period <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={localForm.rentalPeriod}
                  onChange={(e) => handleChange("rentalPeriod", e.target.value)}
                  className="form-input flex-1"
                  placeholder="per week (compulsory)"
                  required
                />
                <button
                  onClick={() => handleChange("rentalPeriod", "per week")}
                  className="btn-secondary text-xs px-2 py-1"
                >
                  Set Week
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                * Rental period is compulsory. Default: "per week"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features Row */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        <div>
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdPark className="text-orange-600 mr-2 text-lg" />
            Garden
          </h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.garden}
              onChange={(e) => handleCheckboxChange("garden", e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2 text-sm">garden</span>
          </label>
        </div>

        <div>
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdGarage className="text-orange-600 mr-2 text-lg" />
            Garage spaces
          </h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.garageSpaces}
              onChange={(e) =>
                handleCheckboxChange("garageSpaces", e.target.checked)
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm">Garage spaces</span>
          </label>
          {localForm.garageSpaces && (
            <div className="mt-2 space-y-1">
              {["2 g.s.", "5 g.s.", "9 g.s.", "25 g.s."].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="garageSpace"
                    value={option}
                    checked={localForm.garageSpaceValue === option}
                    onChange={(e) =>
                      handleChange("garageSpaceValue", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <h6 className="text-sm font-medium text-gray-700 mb-2">Warehouses</h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.warehouses}
              onChange={(e) =>
                handleCheckboxChange("warehouses", e.target.checked)
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm">Warehouses</span>
          </label>
          {localForm.warehouses && (
            <div className="mt-2 space-y-1">
              {["3 w.h.", "4 w.h.", "5 w.h."].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="warehouse"
                    value={option}
                    checked={localForm.warehouseValue === option}
                    onChange={(e) =>
                      handleChange("warehouseValue", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <h6 className="text-sm font-medium text-gray-700 mb-2">
            Custom Interior
          </h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.customInterior}
              onChange={(e) =>
                handleCheckboxChange("customInterior", e.target.checked)
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm">custom interior</span>
          </label>
        </div>

        {localForm.type !== "apartment" && (
          <div>
            <h6 className="text-sm font-medium text-gray-700 mb-2">
              Insurance
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.insurance}
                onChange={(e) =>
                  handleCheckboxChange("insurance", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">insurance</span>
            </label>
          </div>
        )}

        <div>
          <h6 className="text-sm font-medium text-gray-700 mb-2">Other</h6>
          <div className="space-y-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.swimmingPool}
                onChange={(e) =>
                  handleCheckboxChange("swimmingPool", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">swimming pool</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.tennisCourt}
                onChange={(e) =>
                  handleCheckboxChange("tennisCourt", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">tennis court</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.helipad}
                onChange={(e) =>
                  handleCheckboxChange("helipad", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">helipad</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.driveway}
                onChange={(e) =>
                  handleCheckboxChange("driveway", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">driveway</span>
            </label>
            {localForm.driveway && (
              <div className="mt-2 space-y-1">
                {["long", "large"].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="drivewayType"
                      value={option}
                      checked={localForm.drivewayValue === option}
                      onChange={(e) =>
                        handleChange("drivewayValue", e.target.value)
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">{option} driveway</span>
                  </label>
                ))}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="drivewayType"
                    value=""
                    checked={localForm.drivewayValue === ""}
                    onChange={(e) =>
                      handleChange("drivewayValue", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">driveway (no descriptor)</span>
                </label>
              </div>
            )}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.backyard}
                onChange={(e) =>
                  handleCheckboxChange("backyard", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">backyard</span>
            </label>
            {localForm.backyard && (
              <div className="mt-2 space-y-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="backyardType"
                    value="spacious"
                    checked={localForm.backyardValue === "spacious"}
                    onChange={(e) =>
                      handleChange("backyardValue", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">spacious backyard</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="backyardType"
                    value=""
                    checked={localForm.backyardValue === ""}
                    onChange={(e) =>
                      handleChange("backyardValue", e.target.value)
                    }
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">backyard (no descriptor)</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View and Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h6 className="text-sm font-medium text-gray-700 mb-2">View</h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.view}
              onChange={(e) => handleCheckboxChange("view", e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2 text-sm">View</span>
          </label>
          {localForm.view && (
            <div className="mt-2 space-y-1">
              {["nice", "beautiful", "great"].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="reView"
                    value={option}
                    checked={localForm.viewValue === option}
                    onChange={(e) => handleChange("viewValue", e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2">
          <h6 className="text-sm font-medium text-gray-700 mb-2">Location</h6>
          <div className="flex items-center gap-10">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.location}
                onChange={(e) =>
                  handleCheckboxChange("location", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">Location</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="beforeLocation"
                  value="in"
                  checked={localForm.beforeLocation === "in"}
                  onChange={(e) =>
                    handleChange("beforeLocation", e.target.value)
                  }
                  className="form-radio"
                />
                <span className="ml-2 text-sm">in</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="beforeLocation"
                  value="near"
                  checked={localForm.beforeLocation === "near"}
                  onChange={(e) =>
                    handleChange("beforeLocation", e.target.value)
                  }
                  className="form-radio"
                />
                <span className="ml-2 text-sm">near</span>
              </label>
            </div>
          </div>
          {localForm.location && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {localForm.type === "apartment"
                ? // Show all locations for apartments (regular + apartment-specific)
                  [
                    ...location1.slice(0, 10),
                    ...location2,
                    ...apartmentLocations,
                  ].map((location, index) => {
                    // Handle special case for "near the beach market"
                    if (location === "near the beach market") {
                      return (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name="reLocation"
                            value="the beach market"
                            checked={
                              localForm.locationValue === "the beach market"
                            }
                            onChange={(e) => {
                              handleChange("locationValue", e.target.value);
                              handleChange("beforeLocation", "near");
                            }}
                            className="form-radio"
                          />
                          <span className="ml-2 text-sm">{location}</span>
                        </label>
                      );
                    }
                    return (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="reLocation"
                          value={location}
                          checked={localForm.locationValue === location}
                          onChange={(e) => {
                            handleChange("locationValue", e.target.value);
                            // Don't auto-set preposition for apartments, let user choose
                          }}
                          className="form-radio"
                        />
                        <span className="ml-2 text-sm">{location}</span>
                      </label>
                    );
                  })
                : // Show all locations for houses and other property types
                  [...location1.slice(0, 10), ...location2].map(
                    (location, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="reLocation"
                          value={location}
                          checked={localForm.locationValue === location}
                          onChange={(e) =>
                            handleChange("locationValue", e.target.value)
                          }
                          className="form-radio"
                        />
                        <span className="ml-2 text-sm">{location}</span>
                      </label>
                    )
                  )}
            </div>
          )}
        </div>
      </div>

      {/* Clear Button */}
      <div className="flex justify-end">
        <button onClick={clearForm} className="btn-primary">
          Clear Form
        </button>
      </div>
    </div>
  );
}
