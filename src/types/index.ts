export interface RealEstateForm {
  purpose: "Selling" | "Buying" | "Renting" | "Renting Out" | "Trading";
  type: "house" | "apartment" | "mansion" | "penthouse";
  number: string;
  price: string;
  priceMillion: boolean;
  rentalPeriod: string;
  garden: boolean;
  garageSpaces: boolean;
  garageSpaceValue: string;
  warehouses: boolean;
  warehouseValue: string;
  customInterior: boolean;
  insurance: boolean;
  swimmingPool: boolean;
  tennisCourt: boolean;
  helipad: boolean;
  driveway: boolean;
  drivewayValue: string;
  backyard: boolean;
  backyardValue: string;
  view: boolean;
  viewValue: string;
  location: boolean;
  beforeLocation: string;
  locationValue: string;
}

export interface AutoForm {
  purpose: "Selling" | "Buying";
  name: string;
  price: string;
  priceMillion: boolean;
  configuration: boolean;
  configValue: string;
  visualUpgrades: boolean;
  luminousWheels: boolean;
  insurance: boolean;
  turboKit: boolean;
  driftKit: boolean;
  monowheel: boolean;
  monowheelType: string;
}

export interface DatingForm {
  type:
    | "specific-person"
    | "family"
    | "family-members"
    | "date"
    | "wife"
    | "husband"
    | "valentine"
    | "friend"
    | "friends"
    | "boyfriend"
    | "boyfriends"
    | "girlfriend"
    | "girlfriends"
    | "casino-poker-players";
  firstName: string;
  lastName: string;
  customText: string;
}

export interface WorkForm {
  type: "hiring" | "looking-for-work";
  jobType:
    | "construction-workers"
    | "specific-role"
    | "general-workers"
    | "plantation-workers";
  constructionSite: "site-1" | "site-2" | "site-3" | "general";
  specificRole: string;
  location: string;
  salary: "negotiable" | "bonus" | "specific";
  salaryAmount: string;
  bonusAmount: string;
  experience: string;
  customText: string;
}

export interface BusinessForm {
  type: "business" | "shares" | "services";
  purpose: "Selling" | "Buying" | "Trading";
  businessType: string;
  businessNumber: string;
  price: string;
  priceMillion: boolean;
  location: string;
  specialDetails: string;
  sharesType: string;
  serviceType: string;
  serviceDescription: string;
}

export interface OtherForm {
  category:
    | "party"
    | "services"
    | "items"
    | "pets"
    | "resources"
    | "containers"
    | "clothing"
    | "gambling"
    | "alliance";
  purpose: "Selling" | "Buying" | "Trading" | "Looking for" | "Offering";
  partyLocation: string;
  partyType: string;
  serviceType: string;
  serviceDescription: string;
  itemCategory: string;
  itemType: string;
  itemQuantity: string;
  itemQuality: string;
  luminousWheelsType: string;
  petType: string;
  petName: string;
  resourceType: string;
  resourceQuantity: string;
  containerType: string;
  clothingType: string;
  clothingItem: string;
  clothingGender: "male" | "female" | "";
  gamblingType: string;
  betAmount: string;
  allianceType: string;
  price: string;
  priceMillion: boolean;
  location: string;
  specialDetails: string;
}

export interface AdTemplate {
  realEstate: RealEstateForm;
  auto: AutoForm;
  dating: DatingForm;
  work: WorkForm;
  business: BusinessForm;
  other: OtherForm;
}

export type TabType =
  | "real-estate"
  | "auto"
  | "dating"
  | "work"
  | "business"
  | "other";
