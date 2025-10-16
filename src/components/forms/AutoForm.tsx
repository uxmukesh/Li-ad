"use client";

import { useState, useEffect } from "react";
import { AutoForm as AutoFormType } from "@/types";
import { generateAutoTemplate } from "@/lib/utils";
import { autoNames } from "@/lib/data";
import {
  MdBusiness,
  MdDirectionsCar,
  MdAttachMoney,
  MdSettings,
  MdAutoAwesome,
  MdSecurity,
  MdSpeed,
  MdSportsMotorsports,
} from "react-icons/md";

interface AutoFormProps {
  form: AutoFormType;
  onChange: (form: AutoFormType) => void;
  onOutputChange: (output: string) => void;
}

export default function AutoForm({
  form,
  onChange,
  onOutputChange,
}: AutoFormProps) {
  const [localForm, setLocalForm] = useState<AutoFormType>(form);
  const [filteredNames, setFilteredNames] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const output = generateAutoTemplate(localForm);
    onOutputChange(output);
  }, [localForm, onOutputChange]);

  const handleChange = (field: keyof AutoFormType, value: any) => {
    const newForm = { ...localForm, [field]: value };
    setLocalForm(newForm);
    onChange(newForm);
  };

  const handleRadioChange = (field: keyof AutoFormType, value: string) => {
    handleChange(field, value);
  };

  const handleCheckboxChange = (
    field: keyof AutoFormType,
    checked: boolean
  ) => {
    handleChange(field, checked);
  };

  const handleNameChange = (value: string) => {
    handleChange("name", value);

    if (value.length > 0) {
      const filtered = autoNames
        .filter((name) => name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setFilteredNames(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectName = (name: string) => {
    handleChange("name", name);
    setShowSuggestions(false);
  };

  const clearForm = () => {
    const clearedForm: AutoFormType = {
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
    };
    setLocalForm(clearedForm);
    onChange(clearedForm);
  };

  return (
    <div className="space-y-8">
      {/* Purpose, Name, and Price Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdBusiness className="text-cyan-400 mr-2 text-lg" />
            Purpose
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="autoPurpose"
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
                name="autoPurpose"
                value="Buying"
                checked={localForm.purpose === "Buying"}
                onChange={(e) => handleRadioChange("purpose", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm text-gray-300">Buying</span>
            </label>
          </div>
        </div>

        <div className="feature-card relative">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdDirectionsCar className="text-cyan-400 mr-2 text-lg" />
            Name
          </h6>
          <div className="relative">
            <input
              type="text"
              value={localForm.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="form-input w-full"
              placeholder="Search for auto..."
              onFocus={() => {
                if (localForm.name.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />
            {showSuggestions && filteredNames.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredNames.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => selectName(name)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
            {localForm.name.toLowerCase() === "monowheel" && (
              <div className="mt-3">
                <input
                  type="text"
                  value={localForm.monowheelType}
                  onChange={(e) =>
                    handleChange("monowheelType", e.target.value)
                  }
                  className="form-input w-full"
                  placeholder="Enter monowheel type (numbers)"
                />
              </div>
            )}
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

      {/* Features Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <h6 className="text-sm font-medium text-gray-300 mb-2">
            Configuration
          </h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.configuration}
              onChange={(e) =>
                handleCheckboxChange("configuration", e.target.checked)
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-300">configuration</span>
          </label>
          {localForm.configuration && (
            <div className="mt-2 space-y-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="autoConfig"
                  value="full configuration"
                  checked={localForm.configValue === "full configuration"}
                  onChange={(e) => handleChange("configValue", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm text-gray-300">Full</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="autoConfig"
                  value="partial configuration"
                  checked={localForm.configValue === "partial configuration"}
                  onChange={(e) => handleChange("configValue", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm text-gray-300">Partial</span>
              </label>
            </div>
          )}
        </div>

        <div>
          <h6 className="text-sm font-medium text-gray-300 mb-2">
            Visual Upgrades
          </h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.visualUpgrades}
              onChange={(e) =>
                handleCheckboxChange("visualUpgrades", e.target.checked)
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-300">visual upgrades</span>
          </label>
        </div>

        <div>
          <h6 className="text-sm font-medium text-gray-300 mb-2">
            Luminous Wheels
          </h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.luminousWheels}
              onChange={(e) =>
                handleCheckboxChange("luminousWheels", e.target.checked)
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-300">luminous wheels</span>
          </label>
        </div>

        <div>
          <h6 className="text-sm font-medium text-gray-300 mb-2">Insurance</h6>
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

        <div>
          <h6 className="text-sm font-medium text-gray-300 mb-2">Turbo Kit</h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.turboKit}
              onChange={(e) =>
                handleCheckboxChange("turboKit", e.target.checked)
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-300">turbo kit</span>
          </label>
        </div>
      </div>

      {/* Drift Kit */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div>
          <h6 className="text-sm font-medium text-gray-300 mb-2">Drift Kit</h6>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.driftKit}
              onChange={(e) =>
                handleCheckboxChange("driftKit", e.target.checked)
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-300">drift kit</span>
          </label>
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
