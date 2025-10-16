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
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdBusiness className="text-cyan-400 mr-2 text-lg" />
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
              <span className="ml-2 text-sm text-gray-300">Selling</span>
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
              <span className="ml-2 text-sm text-gray-300">Buying</span>
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
              <span className="ml-2 text-sm text-gray-300">Renting</span>
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
              <span className="ml-2 text-sm text-gray-300">Renting Out</span>
            </label>
            {/* Trading only available for mansions and penthouses */}
            {(localForm.type === "mansion" ||
              localForm.type === "penthouse") && (
              <label className="flex items-center">
                <input
                  type="radio"
                  name="rePurpose"
                  value="Trading"
                  checked={localForm.purpose === "Trading"}
                  onChange={(e) => handleRadioChange("purpose", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm text-gray-300">Trading</span>
              </label>
            )}
          </div>
        </div>

        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdHome className="text-cyan-400 mr-2 text-lg" />
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
                <span className="ml-2 text-sm text-gray-300 capitalize">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdTag className="text-cyan-400 mr-2 text-lg" />
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
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdAttachMoney className="text-cyan-400 mr-2 text-lg" />
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
            <span className="ml-2 text-sm text-gray-300">Million.</span>
          </label>
          {(localForm.purpose === "Renting" ||
            localForm.purpose === "Renting Out") && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
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

      {/* Features */}
      <div className="feature-card">
        <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
          <MdHomeRepairService className="text-cyan-400 mr-2 text-lg" />
          Features
        </h6>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Garden */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdPark className="text-cyan-400 mr-2 text-sm" />
              Garden
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.garden}
                onChange={(e) =>
                  handleCheckboxChange("garden", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">garden</span>
            </label>
          </div>

          {/* Garage Spaces */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdGarage className="text-cyan-400 mr-2 text-sm" />
              Garage Spaces
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
              <span className="ml-2 text-sm text-gray-300">Garage spaces</span>
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
                    <span className="ml-2 text-sm text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Warehouses */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdWarehouse className="text-cyan-400 mr-2 text-sm" />
              Warehouses
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.warehouses}
                onChange={(e) =>
                  handleCheckboxChange("warehouses", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">Warehouses</span>
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
                    <span className="ml-2 text-sm text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Custom Interior */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdHomeRepairService className="text-cyan-400 mr-2 text-sm" />
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
              <span className="ml-2 text-sm text-gray-300">
                custom interior
              </span>
            </label>
          </div>

          {/* Insurance (not for apartments) */}
          {localForm.type !== "apartment" && (
            <div>
              <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <MdSecurity className="text-cyan-400 mr-2 text-sm" />
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
                <span className="ml-2 text-sm text-gray-300">insurance</span>
              </label>
            </div>
          )}

          {/* Swimming Pool */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdPool className="text-cyan-400 mr-2 text-sm" />
              Swimming Pool
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.swimmingPool}
                onChange={(e) =>
                  handleCheckboxChange("swimmingPool", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">swimming pool</span>
            </label>
          </div>

          {/* Tennis Court */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdSportsTennis className="text-cyan-400 mr-2 text-sm" />
              Tennis Court
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.tennisCourt}
                onChange={(e) =>
                  handleCheckboxChange("tennisCourt", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">tennis court</span>
            </label>
          </div>

          {/* Helipad */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdFlight className="text-cyan-400 mr-2 text-sm" />
              Helipad
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.helipad}
                onChange={(e) =>
                  handleCheckboxChange("helipad", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">helipad</span>
            </label>
          </div>

          {/* Driveway */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdDriveEta className="text-cyan-400 mr-2 text-sm" />
              Driveway
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.driveway}
                onChange={(e) =>
                  handleCheckboxChange("driveway", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">driveway</span>
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
                    <span className="ml-2 text-sm text-gray-300">
                      {option} driveway
                    </span>
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
                  <span className="ml-2 text-sm text-gray-300">
                    driveway (no descriptor)
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Backyard */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdYard className="text-cyan-400 mr-2 text-sm" />
              Backyard
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.backyard}
                onChange={(e) =>
                  handleCheckboxChange("backyard", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">backyard</span>
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
                  <span className="ml-2 text-sm text-gray-300">
                    spacious backyard
                  </span>
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
                  <span className="ml-2 text-sm text-gray-300">
                    backyard (no descriptor)
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* View */}
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <MdVisibility className="text-cyan-400 mr-2 text-sm" />
              View
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.view}
                onChange={(e) => handleCheckboxChange("view", e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">View</span>
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
                      onChange={(e) =>
                        handleChange("viewValue", e.target.value)
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="feature-card">
        <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
          <MdLocationOn className="text-cyan-400 mr-2 text-lg" />
          Location
        </h6>

        {/* Enable Location and Preposition Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2">
              Enable Location
            </h6>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localForm.location}
                onChange={(e) =>
                  handleCheckboxChange("location", e.target.checked)
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-300">
                Include location
              </span>
            </label>
          </div>

          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2">
              Preposition
            </h6>
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
                <span className="ml-2 text-sm text-gray-300">in</span>
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
                <span className="ml-2 text-sm text-gray-300">near</span>
              </label>
            </div>
          </div>
        </div>

        {/* Location Options */}
        {localForm.location && (
          <div>
            <h6 className="text-sm font-medium text-gray-300 mb-2">
              Location Options
            </h6>
            {localForm.type === "apartment" ? (
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3">
                  <h6 className="text-sm font-medium text-gray-300 mb-2">
                    Locations
                  </h6>
                  <div className="grid grid-cols-3 gap-2">
                    {[...location1, ...location2].map((location, index) => {
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
                            <span className="ml-2 text-sm text-gray-300">
                              {location}
                            </span>
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
                            }}
                            className="form-radio"
                          />
                          <span className="ml-2 text-sm text-gray-300">
                            {location}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="col-span-1">
                  <h6 className="text-sm font-medium text-gray-300 mb-2">
                    Tower Names
                  </h6>
                  <div className="grid grid-cols-1 gap-2">
                    {apartmentLocations.map((location, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="reLocation"
                          value={location}
                          checked={localForm.locationValue === location}
                          onChange={(e) => {
                            handleChange("locationValue", e.target.value);
                          }}
                          className="form-radio"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          {location}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {[...location1, ...location2].map((location, index) => (
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
                    <span className="ml-2 text-sm text-gray-300">
                      {location}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
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
