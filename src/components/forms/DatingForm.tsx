"use client";

import { useState, useEffect } from "react";
import { DatingForm as DatingFormType } from "@/types";
import { generateDatingTemplate } from "@/lib/utils";
import { MdPerson, MdEdit } from "react-icons/md";

interface DatingFormProps {
  form: DatingFormType;
  onChange: (form: DatingFormType) => void;
  onOutputChange?: (output: string) => void;
}

export default function DatingForm({
  form,
  onChange,
  onOutputChange,
}: DatingFormProps) {
  const [localForm, setLocalForm] = useState<DatingFormType>(form);

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  useEffect(() => {
    if (onOutputChange) {
      const output = generateDatingTemplate(localForm);
      onOutputChange(output);
    }
  }, [localForm, onOutputChange]);

  const handleChange = (field: keyof DatingFormType, value: string) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const handleRadioChange = (field: keyof DatingFormType, value: string) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const clearForm = () => {
    const clearedForm: DatingFormType = {
      type: "specific-person",
      firstName: "",
      lastName: "",
      customText: "",
    };
    setLocalForm(clearedForm);
    onChange(clearedForm);
  };

  const datingTypes = [
    {
      value: "specific-person",
      label: "Specific person (First and Last name)",
    },
    { value: "family", label: "A family" },
    { value: "family-members", label: "Family members" },
    { value: "date", label: "A date" },
    { value: "wife", label: "A wife" },
    { value: "husband", label: "A husband" },
    { value: "valentine", label: "A valentine" },
    { value: "friend", label: "A friend" },
    { value: "friends", label: "Friends" },
    { value: "boyfriend", label: "A boyfriend" },
    { value: "boyfriends", label: "Boyfriends" },
    { value: "girlfriend", label: "A girlfriend" },
    { value: "girlfriends", label: "Girlfriends" },
    { value: "casino-poker-players", label: "Casino poker players" },
  ];

  return (
    <div className="space-y-6">
      {/* Dating Type Selection */}
      <div className="feature-card">
        <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
          <MdEdit className="text-cyan-400 mr-2 text-lg" />
          Looking for
        </h6>
        <div className="grid grid-cols-2 gap-3">
          {datingTypes.map((type) => (
            <label key={type.value} className="flex items-center">
              <input
                type="radio"
                name="datingType"
                value={type.value}
                checked={localForm.type === type.value}
                onChange={(e) => handleRadioChange("type", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm text-gray-300">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Specific Person Fields */}
      {localForm.type === "specific-person" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdPerson className="text-cyan-400 mr-2 text-lg" />
            Person Details
          </h6>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={localForm.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="form-input"
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={localForm.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="form-input"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            * Both first and last name are required for specific person
            searches.
          </p>
        </div>
      )}

      {/* Custom Text for Other Types */}
      {localForm.type !== "specific-person" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdEdit className="text-cyan-400 mr-2 text-lg" />
            Additional Details
          </h6>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Information (Optional)
            </label>
            <textarea
              value={localForm.customText}
              onChange={(e) => handleChange("customText", e.target.value)}
              className="form-input"
              placeholder="Enter any additional details..."
              rows={3}
            />
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
