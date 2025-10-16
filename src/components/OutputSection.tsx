"use client";

import { useState, useEffect } from "react";
import {
  MdContentCopy,
  MdCheckCircle,
  MdError,
  MdHome,
  MdDirectionsCar,
  MdFavorite,
  MdWork,
  MdBusiness,
  MdMoreHoriz,
} from "react-icons/md";
import { validateAdContent } from "@/lib/utils";
import { TabType } from "@/types";
import { FaInfinity } from "react-icons/fa";

interface OutputSectionProps {
  output: string;
  activeTab?: TabType;
}

export default function OutputSection({
  output,
  activeTab,
}: OutputSectionProps) {
  const [validation, setValidation] = useState<{
    isValid: boolean;
    reason?: string;
  }>({ isValid: true });

  useEffect(() => {
    if (output) {
      const result = validateAdContent(output);
      setValidation(result);
    } else {
      setValidation({ isValid: true });
    }
  }, [output]);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getCategoryInfo = () => {
    if (!activeTab)
      return { name: "Unknown", icon: MdMoreHoriz, color: "gray" };

    const categories = {
      "real-estate": { name: "Real Estate", icon: MdHome, color: "white" },
      auto: { name: "Auto", icon: MdDirectionsCar, color: "blue" },
      dating: { name: "Dating", icon: MdFavorite, color: "rose" },
      work: { name: "Work", icon: MdWork, color: "amber" },
      business: { name: "Business", icon: MdBusiness, color: "indigo" },
      other: { name: "Other", icon: FaInfinity, color: "white" },
    };

    return (
      categories[activeTab] || {
        name: "Unknown",
        icon: MdMoreHoriz,
        color: "gray",
      }
    );
  };

  const categoryInfo = getCategoryInfo();
  const IconComponent = categoryInfo.icon;

  return (
    <div className="mt-8 pt-8 border-t border-gray-600/50">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-600/50">
        <div className="flex items-center mb-4">
          <MdContentCopy className="text-gray-300 mr-2" />
          <h3 className="text-lg font-semibold text-white">Generated Ad</h3>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={output}
            readOnly
            className="form-input flex-1 bg-gray-800/80"
            placeholder="Generated ad will appear here..."
          />
          <button
            onClick={copyToClipboard}
            className="btn-primary flex items-center gap-2"
            disabled={!output}
          >
            <MdContentCopy className="text-sm" />
            Copy
          </button>
        </div>
        {output && (
          <div className="mt-4">
            {/* Policy Compliance Status and Category Display in 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Policy Compliance Status */}
              <div
                className={`p-3 rounded-lg border ${
                  validation.isValid
                    ? "bg-emerald-900/30 border-emerald-600/50"
                    : "bg-rose-900/30 border-rose-600/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {validation.isValid ? (
                    <MdCheckCircle className="text-emerald-400" />
                  ) : (
                    <MdError className="text-rose-400" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      validation.isValid ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {validation.isValid
                      ? "Lifeinvader Policy Compliant"
                      : "Policy Violation Detected"}
                  </span>
                </div>
                {!validation.isValid && (
                  <p className="text-sm text-rose-300 mt-1 ml-6">
                    {validation.reason}
                  </p>
                )}
              </div>

              {/* Category Display */}
              <div className="p-3 bg-gray-800/60 rounded-lg border border-gray-600/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-${categoryInfo.color}-900/50`}
                  >
                    <IconComponent
                      className={`text-${categoryInfo.color}-400 text-lg`}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">
                      Lifeinvader Category:
                    </p>
                    <p className="text-white font-semibold">
                      {categoryInfo.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
