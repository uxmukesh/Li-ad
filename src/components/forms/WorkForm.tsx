"use client";

import { useState, useEffect } from "react";
import { WorkForm as WorkFormType } from "@/types";
import { generateWorkTemplate } from "@/lib/utils";
import { location1, location2 } from "@/lib/data";
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

  const handleSalaryAmountChange = (value: string) => {
    // Store only plain numbers - no $ or formatting in input
    // Remove all non-numeric characters except dots (for decimal numbers)
    const plainNumber = value.replace(/[^\d.]/g, "");
    handleChange("salaryAmount", plainNumber);
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

  const plantationRoles = ["Solar panel plantation worker"];

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
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdWork className="text-cyan-400 mr-2 text-lg" />
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
              <span className="ml-2 text-sm text-gray-300">Hiring</span>
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
              <span className="ml-2 text-sm text-gray-300">
                Looking for work
              </span>
            </label>
          </div>
        </div>

        {/* Job Type Selection */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdBuild className="text-cyan-400 mr-2 text-lg" />
            Job Type
          </h6>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value="plantation-workers"
                checked={localForm.jobType === "plantation-workers"}
                onChange={(e) => handleRadioChange("jobType", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm text-gray-300">
                Plantation workers
              </span>
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
              <span className="ml-2 text-sm text-gray-300">Specific role</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value="construction-workers"
                checked={localForm.jobType === "construction-workers"}
                onChange={(e) => handleRadioChange("jobType", e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-sm text-gray-300">
                Construction workers
              </span>
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
              <span className="ml-2 text-sm text-gray-300">
                General workers
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Specific Role Selection */}
      {localForm.jobType === "specific-role" && (
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdPerson className="text-cyan-400 mr-2 text-lg" />
            Role
          </h6>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Professional Services */}
            <div>
              <h6 className="text-xs font-semibold text-gray-400 mb-2 block">
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
                    <span className="ml-2 text-sm text-gray-300">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transportation */}
            <div>
              <h6 className="text-xs font-semibold text-gray-400 mb-2 block">
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
                    <span className="ml-2 text-sm text-gray-300">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Entertainment */}
            <div>
              <h6 className="text-xs font-semibold text-gray-400 mb-2 block">
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
                    <span className="ml-2 text-sm text-gray-300">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Construction Site Roles - 4th */}
            <div>
              <h6 className="text-xs font-semibold text-gray-400 mb-2 block">
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
                    <span className="ml-2 text-sm text-gray-300">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Security & Support */}
            <div>
              <h6 className="text-xs font-semibold text-gray-400 mb-2 block">
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
                    <span className="ml-2 text-sm text-gray-300">{role}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Construction Site and Experience Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Construction Site */}
        {localForm.jobType === "construction-workers" && (
          <div className="feature-card">
            <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
              <MdBuild className="text-cyan-400 mr-2 text-lg" />
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
                  <span className="ml-2 text-sm text-gray-300">
                    {site.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        <div className="feature-card">
          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
            <MdEdit className="text-cyan-400 mr-2 text-lg" />
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
              <span className="ml-2 text-sm text-gray-300">
                No experience required
              </span>
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
              <span className="ml-2 text-sm text-gray-300">
                1 year of experience
              </span>
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
              <span className="ml-2 text-sm text-gray-300">
                2 years of experience
              </span>
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
              <span className="ml-2 text-sm text-gray-300">
                3 years of experience
              </span>
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
              <span className="ml-2 text-sm text-gray-300">
                5+ years of experience
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Location - Full Width with 4 Columns */}
      <div className="feature-card">
        <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
          <MdLocationOn className="text-cyan-400 mr-2 text-lg" />
          Location
        </h6>

        {/* Location Enable/Disable Checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localForm.location !== ""}
              onChange={(e) => {
                if (!e.target.checked) {
                  handleChange("location", "");
                } else {
                  // When enabling location, set a default location if none exists
                  if (localForm.location === "") {
                    handleChange("location", "at Vinewood Hills");
                  }
                }
              }}
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-300">
              Include location in the ad
            </span>
          </label>
        </div>

        {/* Location Options - Only show if location is enabled */}
        {localForm.location !== "" && (
          <>
            {/* In/Near/At Selection */}
            <div className="mb-4">
              <h6 className="text-sm font-medium text-gray-300 mb-2">
                Preposition:
              </h6>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="locationPreposition"
                    value="in"
                    checked={localForm.location.startsWith("in ")}
                    onChange={(e) => {
                      const currentLocation = localForm.location.replace(
                        /^(in |near |at )/,
                        ""
                      );
                      handleChange("location", `in ${currentLocation}`);
                    }}
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm text-gray-300">in</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="locationPreposition"
                    value="near"
                    checked={localForm.location.startsWith("near ")}
                    onChange={(e) => {
                      const currentLocation = localForm.location.replace(
                        /^(in |near |at )/,
                        ""
                      );
                      handleChange("location", `near ${currentLocation}`);
                    }}
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm text-gray-300">near</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="locationPreposition"
                    value="at"
                    checked={localForm.location.startsWith("at ")}
                    onChange={(e) => {
                      const currentLocation = localForm.location.replace(
                        /^(in |near |at )/,
                        ""
                      );
                      handleChange("location", `at ${currentLocation}`);
                    }}
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm text-gray-300">at</span>
                </label>
              </div>
            </div>

            {/* Location Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[...location1, ...location2].map((location, index) => {
                const currentPreposition = localForm.location.startsWith("in ")
                  ? "in "
                  : localForm.location.startsWith("near ")
                  ? "near "
                  : localForm.location.startsWith("at ")
                  ? "at "
                  : "";
                const cleanLocation = localForm.location.replace(
                  /^(in |near |at )/,
                  ""
                );
                const fullLocation = currentPreposition + location;

                return (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="workLocation"
                      value={location}
                      checked={cleanLocation === location}
                      onChange={(e) =>
                        handleChange(
                          "location",
                          currentPreposition + e.target.value
                        )
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-sm text-gray-300">
                      {location}
                    </span>
                  </label>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Salary/Bonus */}
      <div className="feature-card">
        <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
          <MdAttachMoney className="text-cyan-400 mr-2 text-lg" />
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
              <span className="ml-2 text-sm text-gray-300">Negotiable</span>
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
              <span className="ml-2 text-sm text-gray-300">Bonus</span>
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
              <span className="ml-2 text-sm text-gray-300">
                Specific amount
              </span>
            </label>
            {localForm.salary === "specific" && (
              <input
                type="text"
                value={localForm.salaryAmount}
                onChange={(e) => handleSalaryAmountChange(e.target.value)}
                className="form-input w-32"
                placeholder="15000"
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
