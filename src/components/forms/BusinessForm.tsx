"use client";

import { useState, useEffect } from "react";
import { BusinessForm as BusinessFormType } from "@/types";
import { generateBusinessTemplate } from "@/lib/utils";
import {
  MdBusiness,
  MdAttachMoney,
  MdLocationOn,
  MdEdit,
  MdStore,
  MdShare,
  MdBuild,
} from "react-icons/md";

interface BusinessFormProps {
  form: BusinessFormType;
  onChange: (form: BusinessFormType) => void;
  onOutputChange?: (output: string) => void;
}

export default function BusinessForm({
  form,
  onChange,
  onOutputChange,
}: BusinessFormProps) {
  const [localForm, setLocalForm] = useState<BusinessFormType>(form);

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  useEffect(() => {
    if (onOutputChange) {
      const output = generateBusinessTemplate(localForm);
      onOutputChange(output);
    }
  }, [localForm, onOutputChange]);

  const handleChange = (field: keyof BusinessFormType, value: string) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const handleRadioChange = (field: keyof BusinessFormType, value: string) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const clearForm = () => {
    const clearedForm: BusinessFormType = {
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
    };
    setLocalForm(clearedForm);
    onChange(clearedForm);
  };

  const businessTypes = [
    "Ammunition Store",
    "Bar",
    "Car wash",
    "Chip tuning",
    "Clothing shop",
    "Cowshed",
    "Electric station",
    "Farm",
    "Flower shop",
    "Freight train",
    "Gas station",
    "Hair salon",
    "Jewelry store",
    "Oil Well",
    "Parking",
    "Plantation",
    "Car sharing",
    "State object",
    "Service station",
    "24/7 Store",
    "Tattoo studio",
    "Taxi company",
    "ATM",
    "Juice shop",
    "Burger shop",
    "Warehouse",
    "private business",
    "family business",
  ];

  const sharesTypes = [
    "Taxi fleet shares",
    "Gas station shares",
    "Chip tuning shares",
    "Barber shop shares",
    "Tattoo studio shares",
    "Armory store shares",
    "Bar shares",
    "Car sharing shares",
  ];

  const serviceTypes = [
    "DJ services",
    "Wedding services",
    "Party services",
    "Photography",
    "Catering",
    "Cleaning services",
    "Transportation",
    "Security services",
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Type Selection */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdBusiness className="text-orange-600 mr-2 text-lg" />
            Business Type
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="businessType"
                value="business"
                checked={localForm.type === "business"}
                onChange={(e) => handleRadioChange("type", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Business</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="businessType"
                value="shares"
                checked={localForm.type === "shares"}
                onChange={(e) => handleRadioChange("type", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Business Shares</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="businessType"
                value="services"
                checked={localForm.type === "services"}
                onChange={(e) => handleRadioChange("type", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Services</span>
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
          </div>
        </div>
      </div>

      {/* Business Type Selection */}
      {localForm.type === "business" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdStore className="text-orange-600 mr-2 text-lg" />
            Business Type
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {businessTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value={type}
                  checked={localForm.businessType === type}
                  onChange={(e) => handleChange("businessType", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Business Shares Selection */}
      {localForm.type === "shares" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdShare className="text-orange-600 mr-2 text-lg" />
            Business Shares
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sharesTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="sharesType"
                  value={type}
                  checked={localForm.sharesType === type}
                  onChange={(e) => handleChange("sharesType", e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Services Selection */}
      {localForm.type === "services" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdBuild className="text-orange-600 mr-2 text-lg" />
            Service Type
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Number */}
        {(localForm.type === "business" || localForm.type === "shares") && (
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdEdit className="text-orange-600 mr-2 text-lg" />
              Business Number
            </h6>
            <div>
              <input
                type="text"
                value={localForm.businessNumber}
                onChange={(e) => handleChange("businessNumber", e.target.value)}
                className="form-input"
                placeholder="Enter business number (e.g., №123)"
              />
              <p className="text-xs text-gray-500 mt-1">
                * Leave empty for "business" without specific number
              </p>
            </div>
          </div>
        )}

        {/* Price */}
        {(localForm.type === "business" || localForm.type === "shares") && (
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <MdAttachMoney className="text-orange-600 mr-2 text-lg" />
              {localForm.purpose === "Selling" ? "Price" : "Budget"}
            </h6>
            <div>
              <input
                type="text"
                value={localForm.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="form-input"
                placeholder="Enter amount (e.g., $100 Million)"
              />
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localForm.priceMillion}
                    onChange={(e) =>
                      handleChange("priceMillion", e.target.checked.toString())
                    }
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-sm">
                    Price over $300 Million (will be set to Negotiable)
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="feature-card">
        <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
          <MdLocationOn className="text-orange-600 mr-2 text-lg" />
          Location
        </h6>
        <div>
          <input
            type="text"
            value={localForm.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="form-input"
            placeholder="Enter location (e.g., near Paleto Bay, in the city)"
          />
        </div>
      </div>

      {/* Special Details */}
      {localForm.type === "business" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdEdit className="text-orange-600 mr-2 text-lg" />
            Special Details
          </h6>
          <div>
            <input
              type="text"
              value={localForm.specialDetails}
              onChange={(e) => handleChange("specialDetails", e.target.value)}
              className="form-input"
              placeholder="Enter special details (e.g., with 20 beds, Control)"
            />
            <p className="text-xs text-gray-500 mt-1">
              * For plantations: number of beds, for others: Control, etc.
            </p>
          </div>
        </div>
      )}

      {/* Service Description */}
      {localForm.type === "services" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdEdit className="text-orange-600 mr-2 text-lg" />
            Service Description
          </h6>
          <div>
            <textarea
              value={localForm.serviceDescription}
              onChange={(e) =>
                handleChange("serviceDescription", e.target.value)
              }
              className="form-input"
              placeholder="Enter service description..."
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              * Describe the service being offered
            </p>
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
