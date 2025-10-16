import {
  RealEstateForm,
  AutoForm,
  DatingForm,
  WorkForm,
  BusinessForm,
  OtherForm,
} from "@/types";

// Lifeinvader policy: Prohibited items that should be rejected
export const PROHIBITED_ITEMS = [
  // Firearms and weapons
  "firearm",
  "gun",
  "pistol",
  "rifle",
  "shotgun",
  "ammunition",
  "bullet",
  "ammo",
  "bulletproof vest",
  "armor plate",
  "balaclava mask",
  "bandit mask",

  // Drugs and illegal substances
  "weed",
  "cannabis",
  "cocaine",
  "drug",
  "marijuana",
  "seeds",
  "trees",

  // Medical and safety items
  "ems surgical mask",
  "medical mask",
  "covid mask",
  "mask",

  // Surveillance and security
  "scanner",
  "radar",
  "vehicle scanner",
  "human scanner",
  "resource scanner",
  "anti-radar",
  "satellite dish",

  // Tools and equipment
  "rope",
  "head bag",
  "usb with virus",
  "lock pick",
  "crowbar",
  "barricade",
  "engine block",
  "air horn",

  // Other prohibited items
  "animal skin",
  "troll",
  "grand coin",
  "battlepass",
  "premium battlepass",
  "hype body",
  "branded armor",
  "gang",
  "nationality",
  "food",
  "medkit",
  "pills",
  "tincture soup",
  "birthday",
  "license",
  "driving license",
  "air transport",
  "boat transport",
];

// Lifeinvader policy: Prohibited locations
export const PROHIBITED_LOCATIONS = [
  "mega mall",
  "gang hq",
  "ballas",
  "vagos",
  "families",
  "bloods",
  "marabunta",
  "black market",
  "lspd",
  "fib",
  "sahp",
  "ems",
  "government",
  "ghetto",
];

// Lifeinvader policy: Prohibited family names and people
export const PROHIBITED_PEOPLE = [
  "leader",
  "deputy leader",
  "state org leader",
  "classified people",
];

export function validateAdContent(content: string): {
  isValid: boolean;
  reason?: string;
} {
  const lowerContent = content.toLowerCase();

  // Check for prohibited items (with business type exceptions)
  for (const item of PROHIBITED_ITEMS) {
    if (lowerContent.includes(item)) {
      // Allow specific business types that contain prohibited words
      const allowedBusinessTypes = [
        "ammunition store",
        "bar",
        "burger shop",
        "clothing shop",
        "hair salon",
        "electric station",
        "plantation",
        "private business",
        "family business",
      ];

      // Check if the content contains an allowed business type
      const containsAllowedBusiness = allowedBusinessTypes.some(
        (businessType) => lowerContent.includes(businessType)
      );

      if (!containsAllowedBusiness) {
        return {
          isValid: false,
          reason: `Cannot advertise ${item}. This item is prohibited by Lifeinvader policy.`,
        };
      }
    }
  }

  // Check for prohibited locations
  for (const location of PROHIBITED_LOCATIONS) {
    if (lowerContent.includes(location)) {
      return {
        isValid: false,
        reason: `Cannot promote parties or events at ${location}. This location is prohibited.`,
      };
    }
  }

  // Check for prohibited people references
  for (const person of PROHIBITED_PEOPLE) {
    if (lowerContent.includes(person)) {
      return {
        isValid: false,
        reason: `Cannot advertise or look for ${person}. This is prohibited by policy.`,
      };
    }
  }

  // Check for proper ad structure
  const validStarters = [
    "buying",
    "selling",
    "trading",
    "selling or trading",
    "renting",
    "renting out",
    "looking for",
    "looking to",
    "hiring",
  ];
  const startsWithValid = validStarters.some((starter) =>
    lowerContent.startsWith(starter)
  );

  if (!startsWithValid) {
    return {
      isValid: false,
      reason:
        'Ad must begin with "Buying", "Selling", "Trading", "Selling or trading", "Renting", "Renting out", "Looking for", "Looking to", or "Hiring".',
    };
  }

  // Check for price/budget format (exclude dating ads)
  const isDatingAd = lowerContent.startsWith("looking for");
  const hasPriceOrBudget =
    lowerContent.includes("price:") ||
    lowerContent.includes("budget:") ||
    lowerContent.includes("rent:");
  if (
    !hasPriceOrBudget &&
    !lowerContent.includes("negotiable") &&
    !isDatingAd
  ) {
    return {
      isValid: false,
      reason:
        'Ad must include either "Price:", "Budget:", "Rent:", or "Negotiable".',
    };
  }

  // Real Estate specific validations
  if (
    lowerContent.includes("house") ||
    lowerContent.includes("apartment") ||
    lowerContent.includes("mansion") ||
    lowerContent.includes("penthouse")
  ) {
    // Check for proper garage space format
    if (lowerContent.includes("g.s") && !lowerContent.includes("g.s.")) {
      return {
        isValid: false,
        reason: "Garage spaces must be formatted as 'g.s.' (with period).",
      };
    }

    // Check for proper warehouse format
    if (lowerContent.includes("w.h") && !lowerContent.includes("w.h.")) {
      return {
        isValid: false,
        reason: "Warehouses must be formatted as 'w.h.' (with period).",
      };
    }

    // Check for proper article usage
    if (lowerContent.includes("garden") && !lowerContent.includes("a garden")) {
      return {
        isValid: false,
        reason: "Garden must be formatted as 'a garden'.",
      };
    }

    // Check for proper number formatting
    if (lowerContent.includes("№") && !lowerContent.match(/№\d+/)) {
      return {
        isValid: false,
        reason:
          "House numbers must be formatted as '№' followed by the number.",
      };
    }

    // Check for apartment insurance rule
    if (
      lowerContent.includes("apartment") &&
      lowerContent.includes("insurance")
    ) {
      return {
        isValid: false,
        reason:
          "Apartments cannot be insured. Insurance should not be specified for apartments.",
      };
    }
  }

  return { isValid: true };
}

export function formatCurrency(amount: string): string {
  if (!amount) return "";

  // Lifeinvader policy: Use full stop (.) instead of comma (,) for prices
  // Convert to number, format with dots as thousands separators
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return amount;

  // Format with dots as thousands separators (Lifeinvader policy)
  return numAmount.toLocaleString("en-US").replace(/,/g, ".");
}

export function formatArray(arr: Record<string, string>): string {
  const arrLength = Object.keys(arr).length;
  const arrValues = Object.values(arr);

  if (arrLength === 0) return "";
  if (arrLength === 1) return arrValues[0];
  if (arrLength === 2) return arrValues.join(" and ");
  if (arrLength > 2) {
    return arrValues.slice(0, -1).join(", ") + " and " + arrValues.slice(-1);
  }

  return "";
}

export function generateRealEstateTemplate(form: RealEstateForm): string {
  const {
    purpose,
    type,
    number,
    price,
    priceMillion,
    rentalPeriod,
    garden,
    garageSpaces,
    garageSpaceValue,
    warehouses,
    warehouseValue,
    customInterior,
    insurance,
    swimmingPool,
    tennisCourt,
    helipad,
    driveway,
    drivewayValue,
    backyard,
    backyardValue,
    view,
    viewValue,
    location,
    beforeLocation,
    locationValue,
  } = form;

  // Build features in the exact order specified by Lifeinvader policy
  const features: string[] = [];

  // 1. Garden (must have "a" before garden)
  if (garden) features.push("a garden");

  // 2. Garage spaces (2 g.s., 5 g.s., 9 g.s., 25 g.s.)
  if (garageSpaces && garageSpaceValue) features.push(garageSpaceValue);

  // 3. Warehouses (3 w.h., 4 w.h., 5 w.h.)
  if (warehouses && warehouseValue) features.push(warehouseValue);

  // 4. Custom interior
  if (customInterior) features.push("custom interior");

  // 5. Insurance (do not mention number of days) - Not available for apartments
  if (insurance && type !== "apartment") features.push("insurance");

  // 6. Helipad
  if (helipad) features.push("helipad");

  // 7. Others (swimming pool, tennis court, driveway, backyard)
  if (swimmingPool) features.push("swimming pool");
  if (tennisCourt) features.push("tennis court");
  if (driveway) {
    const drivewayDescriptor = drivewayValue
      ? `${drivewayValue} driveway`
      : "driveway";
    features.push(drivewayDescriptor);
  }
  if (backyard) {
    const backyardDescriptor = backyardValue
      ? `${backyardValue} backyard`
      : "backyard";
    features.push(backyardDescriptor);
  }

  // 8. Views (Nice, beautiful, great)
  if (view && viewValue) features.push(`${viewValue} view`);

  // Format features according to Lifeinvader policy
  // Handle "a" article for swimming pool and helipad when they are first/only features
  let formattedFeatures = [...features];

  // Check if swimming pool or helipad are the first features and need "a" article
  if (formattedFeatures.length > 0) {
    const firstFeature = formattedFeatures[0];
    if (firstFeature === "swimming pool") {
      formattedFeatures[0] = "a swimming pool";
    } else if (firstFeature === "helipad") {
      formattedFeatures[0] = "a helipad";
    }
  }

  // Use "." after the last feature, "and" before the last feature, and use "," between other features
  // Special rule: "g.s." or "w.h." does not need an addition "." at the end if that is mentioned as the last feature
  let featureString = "";
  if (formattedFeatures.length > 0) {
    if (formattedFeatures.length === 1) {
      featureString = ` with ${formattedFeatures[0]}`;
    } else if (formattedFeatures.length === 2) {
      featureString = ` with ${formattedFeatures[0]} and ${formattedFeatures[1]}`;
    } else {
      const lastFeature = formattedFeatures.pop();
      featureString = ` with ${formattedFeatures.join(
        ", "
      )} and ${lastFeature}`;
    }
  }

  // Determine article and number formatting
  let article = "";
  let numberString = "";

  if (number) {
    numberString = ` №${number}`;
  } else {
    if (type === "apartment") {
      article = " an";
    } else {
      article = " a";
    }
  }

  // Location formatting with proper capitalization
  let locationString = "";
  if (location && beforeLocation && locationValue) {
    // Ensure proper capitalization for official locations
    const capitalizedLocation = locationValue
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    locationString = ` ${beforeLocation} ${capitalizedLocation}`;
  }

  // Price formatting according to policy
  let priceLabel = "";
  let priceString = "";

  if (purpose === "Selling") {
    priceLabel = "Price:";
  } else if (purpose === "Buying") {
    priceLabel = "Budget:";
  } else if (purpose === "Renting") {
    priceLabel = "Budget:";
  } else if (purpose === "Renting Out") {
    priceLabel = "Rent:";
  }

  if (price) {
    const formattedPrice = formatCurrency(price);
    const millionText = priceMillion ? " Million" : "";
    const rentalPeriodText =
      (purpose === "Renting" || purpose === "Renting Out") && rentalPeriod
        ? ` ${rentalPeriod}`
        : "";
    priceString = ` $${formattedPrice}${millionText}${rentalPeriodText}.`;
  } else {
    priceString = " Negotiable.";
  }

  // Build final ad according to Lifeinvader policy
  let purposeText: string = purpose;
  if (purpose === "Renting Out") {
    purposeText = "Renting out";
  }

  // Handle Casino apartment to Casino penthouse conversion (Rule 263)
  let propertyType = type;
  if (
    type === "apartment" &&
    locationValue &&
    locationValue.toLowerCase().includes("casino")
  ) {
    propertyType = "penthouse";
  }

  // Check if the last feature is g.s. or w.h. to avoid double periods
  const lastFeature = formattedFeatures[formattedFeatures.length - 1];
  const isLastFeatureGSorWH =
    lastFeature &&
    (lastFeature.includes("g.s.") || lastFeature.includes("w.h."));

  // If the last feature is g.s. or w.h., don't add an extra period after location
  const locationEnding = isLastFeatureGSorWH ? "" : ".";

  return `${purposeText}${article} ${propertyType}${numberString}${featureString}${locationString}${locationEnding} ${priceLabel}${priceString}`;
}

export function generateAutoTemplate(form: AutoForm): string {
  const {
    purpose,
    name,
    price,
    priceMillion,
    configuration,
    configValue,
    visualUpgrades,
    luminousWheels,
    insurance,
    turboKit,
    driftKit,
    monowheel,
    monowheelType,
  } = form;

  // Format vehicle name with quotes if provided
  let nameValue = name ? ` "${name}"` : "";

  // Handle monowheel as vehicle name when name is "Monowheel"
  if (name.toLowerCase() === "monowheel") {
    if (monowheelType) {
      nameValue = ` "Monowheel" of type ${monowheelType}`;
    } else {
      nameValue = ` "Monowheel"`;
    }
  }

  // Build features using Lifeinvader policy terminology
  const features: string[] = [];

  // Configuration terminology conversion
  if (configuration && configValue) {
    if (configValue === "full configuration") {
      features.push("full configuration");
    } else if (configValue === "partial configuration") {
      features.push("partial configuration");
    }
  }

  // Visual upgrades terminology
  if (visualUpgrades) features.push("visual upgrades");

  // Luminous wheels terminology
  if (luminousWheels) features.push("luminous wheels");

  // Insurance
  if (insurance) features.push("insurance");

  // Turbo kit terminology
  if (turboKit) features.push("turbo kit");

  // Drift kit terminology
  if (driftKit) features.push("drift kit");

  // Format features according to policy
  let featureString = "";
  if (features.length > 0) {
    if (features.length === 1) {
      featureString = ` with ${features[0]}`;
    } else if (features.length === 2) {
      featureString = ` with ${features[0]} and ${features[1]}`;
    } else {
      const lastFeature = features.pop();
      featureString = ` with ${features.join(", ")} and ${lastFeature}`;
    }
  }

  // Price formatting according to Lifeinvader policy
  const priceLabel = purpose === "Selling" ? "Price:" : "Budget:";
  let priceString = "";

  if (price) {
    const formattedPrice = formatCurrency(price);
    const millionText = priceMillion ? " Million" : "";
    priceString = ` $${formattedPrice}${millionText}.`;
  } else {
    priceString = " Negotiable.";
  }

  // Build final ad according to Lifeinvader policy
  return `${purpose}${nameValue}${featureString}. ${priceLabel}${priceString}`;
}

// Generate Dating template according to Lifeinvader policy
export function generateDatingTemplate(form: DatingForm): string {
  const { type, firstName, lastName, customText } = form;

  // Dating type labels according to policy
  const typeLabels: Record<string, string> = {
    "specific-person": "Looking for",
    family: "Looking for a family",
    "family-members": "Looking for family members",
    date: "Looking for a date",
    wife: "Looking for a wife",
    husband: "Looking for a husband",
    valentine: "Looking for a valentine",
    friend: "Looking for a friend",
    friends: "Looking for friends",
    boyfriend: "Looking for a boyfriend",
    boyfriends: "Looking for boyfriends",
    girlfriend: "Looking for a girlfriend",
    girlfriends: "Looking for girlfriends",
    "casino-poker-players": "Looking for Casino poker players",
  };

  let adText = typeLabels[type] || "Looking for";

  // Add specific person name if applicable
  if (type === "specific-person" && firstName && lastName) {
    // Capitalize first letter of each name according to policy
    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const capitalizedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    adText += ` ${capitalizedFirstName} ${capitalizedLastName}.`;
  } else if (customText) {
    adText += ` ${customText}.`;
  } else {
    adText += ".";
  }

  return adText;
}

// Generate Work template according to Lifeinvader policy
export function generateWorkTemplate(form: WorkForm): string {
  const {
    type,
    jobType,
    constructionSite,
    specificRole,
    location,
    salary,
    salaryAmount,
    bonusAmount,
    experience,
    customText,
  } = form;

  let adText = "";

  // Determine the main action
  if (type === "hiring") {
    adText = "Hiring";
  } else {
    adText = "Looking for work";
  }

  // Add job details based on job type
  if (jobType === "construction-workers") {
    if (constructionSite === "site-1") {
      adText += " workers at construction site №1 on Vespucci Boulevard";
    } else if (constructionSite === "site-2") {
      adText += " workers at construction site №2 on Calais Avenue";
    } else if (constructionSite === "site-3") {
      adText += " workers at construction site №3 in Pillbox Hill";
    } else {
      adText += " workers at construction site";
    }
  } else if (jobType === "specific-role" && specificRole) {
    if (type === "hiring") {
      adText += ` ${specificRole.toLowerCase()}`;
    } else {
      adText += ` as a ${specificRole.toLowerCase()}`;
    }
  } else if (jobType === "general-workers") {
    if (type === "hiring") {
      adText += " workers";
    } else {
      adText += " a job";
    }
  } else if (jobType === "plantation-workers") {
    if (type === "hiring") {
      adText += " workers for solar panel plantations";
    } else {
      adText += " solar panel plantation work";
    }
  }

  // Add location if specified
  if (location) {
    if (type === "hiring") {
      adText += ` ${location}`;
    } else {
      adText += ` ${location}`;
    }
  }

  // Add experience if specified
  if (experience) {
    adText += ` with ${experience}`;
  }

  // Add custom text if specified
  if (customText) {
    adText += ` ${customText}`;
  }

  // Add salary/compensation
  if (type === "hiring") {
    if (salary === "negotiable") {
      adText += ". Salary: Negotiable";
    } else if (salary === "bonus" && bonusAmount) {
      adText += `. Awarding ${bonusAmount} bonus`;
    } else if (salary === "specific" && salaryAmount) {
      adText += `. Salary: ${salaryAmount}`;
    } else if (salary === "bonus") {
      adText += ". Awarding bonuses";
    } else {
      adText += ". Salary: Negotiable";
    }
  } else {
    // For "looking for work" ads, add appropriate ending
    adText += ".";
  }

  return adText;
}

// Generate Business template according to Lifeinvader policy
export function generateBusinessTemplate(form: BusinessForm): string {
  const {
    type,
    purpose,
    businessType,
    businessNumber,
    price,
    priceMillion,
    location,
    specialDetails,
    sharesType,
    serviceType,
    serviceDescription,
  } = form;

  let adText = "";

  if (type === "business") {
    // Business ads
    adText = purpose;

    if (businessType) {
      if (businessNumber) {
        adText += ` ${businessType} №${businessNumber}`;
      } else {
        adText += ` ${businessType} business`;
      }
    }

    if (specialDetails) {
      adText += ` ${specialDetails}`;
    }

    if (location) {
      adText += ` ${location}`;
    }

    // Add price/budget
    if (price) {
      const priceValue = parseFloat(price);
      const isOver300Million = priceMillion && priceValue > 300;

      if (isOver300Million) {
        adText += `. ${purpose === "Buying" ? "Budget" : "Price"}: Negotiable`;
      } else {
        const formattedPrice = priceMillion ? `${price} Million` : price;
        adText += `. ${
          purpose === "Buying" ? "Budget" : "Price"
        }: ${formattedPrice}`;
      }
    } else {
      adText += `. ${purpose === "Buying" ? "Budget" : "Price"}: Negotiable`;
    }
  } else if (type === "shares") {
    // Business shares ads
    adText = purpose;

    if (sharesType) {
      adText += ` ${sharesType}`;
    }

    if (location) {
      adText += ` ${location}`;
    }

    // Add price/budget
    if (price) {
      const priceValue = parseFloat(price);
      const isOver300Million = priceMillion && priceValue > 300;

      if (isOver300Million) {
        adText += `. ${purpose === "Buying" ? "Budget" : "Price"}: Negotiable`;
      } else {
        const formattedPrice = priceMillion ? `${price} Million` : price;
        adText += `. ${
          purpose === "Buying" ? "Budget" : "Price"
        }: ${formattedPrice}`;
      }
    } else {
      adText += `. ${purpose === "Buying" ? "Budget" : "Price"}: Negotiable`;
    }
  } else if (type === "services") {
    // Service ads
    adText = serviceDescription || `Looking for ${serviceType} services`;
  }

  return adText + ".";
}

// Generate Other template according to Lifeinvader policy
export function generateOtherTemplate(form: OtherForm): string {
  const {
    category,
    purpose,
    partyLocation,
    partyType,
    serviceType,
    serviceDescription,
    itemCategory,
    itemType,
    itemQuantity,
    itemQuality,
    petType,
    petName,
    resourceType,
    resourceQuantity,
    containerType,
    clothingType,
    clothingItem,
    gamblingType,
    betAmount,
    allianceType,
    price,
    priceMillion,
    location,
    specialDetails,
  } = form;

  let adText = "";

  if (category === "party") {
    // Party ads - always start with "Looking for"
    if (partyType && partyLocation) {
      if (partyType === "Wedding" && partyLocation === "Church") {
        adText = "Looking for Wedding at Church";
        if (location) {
          adText += ` at ${location}`;
        }
      } else if (partyType === "Car meet") {
        adText = "Looking for Car meet";
        if (partyLocation !== "House №49") {
          adText += ` at ${partyLocation}`;
        }
      } else if (partyType === "Exclusive car meet") {
        adText = "Looking for Exclusive car meet";
        if (partyLocation !== "House №49") {
          adText += ` at ${partyLocation}`;
        }
      } else {
        adText = `Looking for ${partyType}`;
        if (partyLocation !== "House №49") {
          adText += ` at ${partyLocation}`;
        } else {
          adText += ` at house №49`;
        }
      }
    } else if (partyType) {
      adText = `Looking for ${partyType}`;
    } else {
      adText = "Looking for a party";
    }
  } else if (category === "services") {
    // Service ads - already start with "Looking for"
    if (serviceType) {
      adText = serviceType;
      if (location) {
        adText += ` at ${location}`;
      }
    } else if (serviceDescription) {
      adText = serviceDescription;
    } else {
      adText = "Looking for services";
    }
  } else if (category === "items") {
    // Item ads
    adText = purpose;

    if (itemType) {
      adText += ` ${itemType}`;
    } else if (itemCategory) {
      adText += ` ${itemCategory.toLowerCase()}`;
    }

    if (itemQuantity && itemQuantity !== "1") {
      adText += ` ${itemQuantity}`;
    }

    if (itemQuality && itemQuality !== "") {
      adText += ` ${itemQuality} quality`;
    }

    if (location) {
      adText += ` ${location}`;
    }

    // Add price/budget
    if (price) {
      if (priceMillion) {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
      } else {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: ${price}`;
      }
    } else {
      adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
    }
  } else if (category === "pets") {
    // Pet ads
    adText = purpose;

    if (petName) {
      adText += ` ${petName}`;
    } else if (petType === "shoulder") {
      adText += ` shoulder pet`;
    } else if (petType === "caged") {
      adText += ` caged pet`;
    }

    if (location) {
      adText += ` ${location}`;
    }

    // Add price/budget
    if (price) {
      if (priceMillion) {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
      } else {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: ${price}`;
      }
    } else {
      adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
    }
  } else if (category === "resources") {
    // Resource ads
    adText = purpose;

    if (resourceType) {
      adText += ` ${resourceType.toLowerCase()}`;
    }

    if (resourceQuantity && resourceQuantity !== "1") {
      adText += ` ${resourceQuantity}`;
    }

    if (location) {
      adText += ` ${location}`;
    }

    // Add price/budget
    if (price) {
      if (priceMillion) {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
      } else {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: ${price}`;
      }
    } else {
      adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
    }
  } else if (category === "containers") {
    // Container ads
    adText = purpose;

    if (containerType) {
      adText += ` ${containerType}`;
    }

    if (location) {
      adText += ` ${location}`;
    }

    // Add price/budget
    if (price) {
      if (priceMillion) {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
      } else {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: ${price}`;
      }
    } else {
      adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
    }
  } else if (category === "clothing") {
    // Clothing ads
    adText = purpose;

    if (clothingItem) {
      adText += ` ${clothingItem}`;
    } else if (clothingType) {
      adText += ` ${clothingType.toLowerCase()}`;
    }

    if (location) {
      adText += ` ${location}`;
    }

    // Add price/budget
    if (price) {
      if (priceMillion) {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
      } else {
        adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: ${price}`;
      }
    } else {
      adText += `. ${purpose === "Selling" ? "Price" : "Budget"}: Negotiable`;
    }
  } else if (category === "gambling") {
    // Gambling ads - always start with "Looking for"
    if (gamblingType === "Dice") {
      adText = "Looking to play dice";
      if (betAmount) {
        adText += `. Bet: ${betAmount}`;
      } else {
        adText += `. Bet: Negotiable`;
      }
    } else if (gamblingType === "Poker") {
      adText = "Looking to play poker";
      if (betAmount) {
        adText += `. Bet: ${betAmount}`;
      } else {
        adText += `. Bet: Negotiable`;
      }
    } else if (gamblingType === "Lottery") {
      adText = "Looking for lottery tickets";
    } else {
      adText = "Looking for gambling";
    }
  } else if (category === "alliance") {
    // Alliance ads - always start with "Looking for"
    if (allianceType) {
      adText = allianceType;
    } else {
      adText = "Looking for an alliance";
    }
  }

  return adText + ".";
}
