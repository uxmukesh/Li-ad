"use client";

import { useState, useEffect } from "react";
import { WorkForm as WorkFormType } from "@/types";
import { generateWorkTemplate } from "@/lib/utils";
import {
  MdWork,
  MdLocationOn,
  MdAttachMoney,
  MdEdit,
  MdBuild,
  MdPerson,
  MdGroup,
  MdStar,
} from "react-icons/md";

interface WorkFormProps {
  form: WorkFormType;
  onChange: (form: WorkFormType) => void;
  onOutputChange?: (output: string) => void;
}

export default function WorkForm({
  form,
  onChange,
  onOutputChange,
}: WorkFormProps) {
  const [localForm, setLocalForm] = useState<WorkFormType>(form);

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  useEffect(() => {
    if (onOutputChange) {
      const output = generateWorkTemplate(localForm);
      onOutputChange(output);
    }
  }, [localForm, onOutputChange]);

  const handleChange = (field: keyof WorkFormType, value: string) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const handleRadioChange = (field: keyof WorkFormType, value: string) => {
    const updatedForm = { ...localForm, [field]: value };
    setLocalForm(updatedForm);
    onChange(updatedForm);
  };

  const clearForm = () => {
    const clearedForm: WorkFormType = {
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
    };
    setLocalForm(clearedForm);
    onChange(clearedForm);
  };

  // Group roles by policy rules
  const constructionRoles = [
    "locksmith (Lumberjack)",
    "electrician",
    "gardener (Farmer)",
    "surveyor (Oilman)",
    "driver",
  ];

  const professionalServices = ["Lawyer", "DJ", "Photographer"];

  const transportationRoles = ["Trucker", "Personal driver"];

  const entertainmentRoles = ["Professional Dancer", "Professional Singer"];

  const securitySupportRoles = ["Bodyguard", "Assistant", "Firefighter"];

  const constructionSites = [
    { value: "site-1", label: "Construction site №1 (Vespucci Boulevard)" },
    { value: "site-2", label: "Construction site №2 (Calais Avenue)" },
    { value: "site-3", label: "Construction site №3 (Pillbox Hill)" },
    { value: "general", label: "General construction site" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Type Selection */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdWork className="text-orange-600 mr-2 text-lg" />
            Work Type
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="workType"
                value="hiring"
                checked={localForm.type === "hiring"}
                onChange={(e) => handleRadioChange("type", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Hiring</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="workType"
                value="looking-for-work"
                checked={localForm.type === "looking-for-work"}
                onChange={(e) => handleRadioChange("type", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Looking for work</span>
            </label>
          </div>
        </div>

        {/* Job Type Selection */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdBuild className="text-orange-600 mr-2 text-lg" />
            Job Type
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value="construction-workers"
                checked={localForm.jobType === "construction-workers"}
                onChange={(e) => handleRadioChange("jobType", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Construction workers</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value="specific-role"
                checked={localForm.jobType === "specific-role"}
                onChange={(e) => handleRadioChange("jobType", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Specific role</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value="general-workers"
                checked={localForm.jobType === "general-workers"}
                onChange={(e) => handleRadioChange("jobType", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">General workers</span>
            </label>
          </div>
        </div>
      </div>

      {/* Construction Site Selection */}
      {localForm.jobType === "construction-workers" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdLocationOn className="text-orange-600 mr-2 text-lg" />
            Construction Site
          </h6>
          <div className="space-y-3">
            {constructionSites.map((site) => (
              <label key={site.value} className="flex items-center">
                <input
                  type="radio"
                  name="constructionSite"
                  value={site.value}
                  checked={localForm.constructionSite === site.value}
                  onChange={(e) =>
                    handleRadioChange("constructionSite", e.target.value)
                  }
                  className="form-radio"
                />
                <span className="ml-2 text-sm">{site.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Specific Role Selection */}
      {localForm.jobType === "specific-role" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdPerson className="text-orange-600 mr-2 text-lg" />
            Role
          </h6>

          <div className="space-y-4">
            {/* Construction Site Roles */}
            <div>
              <h6 className="text-xs font-semibold text-gray-600 mb-2 block">
                Construction Site Roles
              </h6>
              <div className="space-y-2">
                {constructionRoles.map((role) => (
                  <label key={role} className="flex items-center">
                    <input
                      type="radio"
                      name="specificRole"
                      value={role}
                      checked={localForm.specificRole === role}
                      onChange={(e) =>
                        handleChange("specificRole", e.target.value)
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Professional Services */}
            <div>
              <h6 className="text-xs font-semibold text-gray-600 mb-2 block">
                Professional Services
              </h6>
              <div className="space-y-2">
                {professionalServices.map((role) => (
                  <label key={role} className="flex items-center">
                    <input
                      type="radio"
                      name="specificRole"
                      value={role}
                      checked={localForm.specificRole === role}
                      onChange={(e) =>
                        handleChange("specificRole", e.target.value)
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transportation */}
            <div>
              <h6 className="text-xs font-semibold text-gray-600 mb-2 block">
                Transportation
              </h6>
              <div className="space-y-2">
                {transportationRoles.map((role) => (
                  <label key={role} className="flex items-center">
                    <input
                      type="radio"
                      name="specificRole"
                      value={role}
                      checked={localForm.specificRole === role}
                      onChange={(e) =>
                        handleChange("specificRole", e.target.value)
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Entertainment */}
            <div>
              <h6 className="text-xs font-semibold text-gray-600 mb-2 block">
                Entertainment
              </h6>
              <div className="space-y-2">
                {entertainmentRoles.map((role) => (
                  <label key={role} className="flex items-center">
                    <input
                      type="radio"
                      name="specificRole"
                      value={role}
                      checked={localForm.specificRole === role}
                      onChange={(e) =>
                        handleChange("specificRole", e.target.value)
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Security & Support */}
            <div>
              <h6 className="text-xs font-semibold text-gray-600 mb-2 block">
                Security & Support
              </h6>
              <div className="space-y-2">
                {securitySupportRoles.map((role) => (
                  <label key={role} className="flex items-center">
                    <input
                      type="radio"
                      name="specificRole"
                      value={role}
                      checked={localForm.specificRole === role}
                      onChange={(e) =>
                        handleChange("specificRole", e.target.value)
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm">{role}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="Enter location (e.g., TV station, FIB, beach market)"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <MdEdit className="text-orange-600 mr-2 text-lg" />
            Experience
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value=""
                checked={localForm.experience === ""}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">No experience required</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="1 year of experience"
                checked={localForm.experience === "1 year of experience"}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">1 year of experience</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="2 years of experience"
                checked={localForm.experience === "2 years of experience"}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">2 years of experience</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="3 years of experience"
                checked={localForm.experience === "3 years of experience"}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">3 years of experience</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="5+ years of experience"
                checked={localForm.experience === "5+ years of experience"}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">5+ years of experience</span>
            </label>
          </div>
        </div>
      </div>

      {/* Salary/Bonus */}
      <div className="feature-card">
        <h6 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
          <MdAttachMoney className="text-orange-600 mr-2 text-lg" />
          Compensation
        </h6>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="radio"
                name="salary"
                value="negotiable"
                checked={localForm.salary === "negotiable"}
                onChange={(e) => handleRadioChange("salary", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Negotiable</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="radio"
                name="salary"
                value="bonus"
                checked={localForm.salary === "bonus"}
                onChange={(e) => handleRadioChange("salary", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Bonus</span>
            </label>
            {localForm.salary === "bonus" && (
              <input
                type="text"
                value={localForm.bonusAmount}
                onChange={(e) => handleChange("bonusAmount", e.target.value)}
                className="form-input w-32"
                placeholder="$3.000"
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="radio"
                name="salary"
                value="specific"
                checked={localForm.salary === "specific"}
                onChange={(e) => handleRadioChange("salary", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm">Specific amount</span>
            </label>
            {localForm.salary === "specific" && (
              <input
                type="text"
                value={localForm.salaryAmount}
                onChange={(e) => handleChange("salaryAmount", e.target.value)}
                className="form-input w-32"
                placeholder="$15.000"
              />
            )}
          </div>
        </div>
      </div>

      {/* Clear Button */}
      <div className="flex justify-end">
        <button onClick={clearForm} className="btn-secondary">
          Clear Form
        </button>
      </div>
    </div>
  );
}
