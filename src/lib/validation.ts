import * as Yup from "yup";

// Combined form validation schema
export const campaignFormSchema = Yup.object({
  // Basic Info
  campaignName: Yup.string()
    .required("Campaign name is required")
    .max(100, "Campaign name cannot exceed 100 characters"),
  campaignGoals: Yup.string().required("Campaign goal is required"),
  // campaignKPIs: Yup.string().required("Campaign KPI is required"),
  targetNumber: Yup.number()
    .required("Target number is required")
    .positive("Target number must be positive")
    .integer("Target number must be an integer"),
    age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(13, "Minimum age is 13")
    .max(120, "Maximum age is 120"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Both"], "Select a valid gender"),
  industry: Yup.string().required("Industry is required"),
  valuePerUser: Yup.string().required("Value Per User is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    ,
  totalLiquidity: Yup.number()
    .required("Total liquidity is required")
    .positive("Total liquidity must be positive")
    .test(
      'amount-within-budget',
      'Total reward (amount × target number) exceeds total liquidity',
      function(value) {
        const { targetNumber, amount } = this.parent;
        // Only validate if all values exist
        if (value && targetNumber && amount) {
          return amount * targetNumber <= value;
        }
        return true;
      }
    ),
  startDate: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date must be in the future"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),

  // Media Kit
  website: Yup.string()
    .required("Website URL is required")
    .url("Please enter a valid URL"),
  twitter: Yup.string()
    .required("Twitter URL is required")
    .url("Please enter a valid URL"),
  youtube: Yup.string().url("Please enter a valid URL").nullable(),
  instagram: Yup.string().url("Please enter a valid URL").nullable(),
  telegram: Yup.string().url("Please enter a valid URL").nullable(),
  discord: Yup.string().url("Please enter a valid URL").nullable(),
  otherResources: Yup.string().nullable(),
  otherInformation: Yup.string().nullable(),

  // Media Upload
  mediaFiles: Yup.array().of(Yup.mixed()).nullable(),
});

// Basic info validation schema
export const basicInfoSchema = Yup.object({
  campaignName: Yup.string()
    .required("Campaign name is required")
    .max(100, "Campaign name cannot exceed 100 characters"),

  campaignGoals: Yup.string().required("Campaign goal is required"),

  campaignKPIs: Yup.string().required("Campaign KPI is required"),

  targetNumber: Yup.number()
    .required("Target number is required")
    .positive("Target number must be positive")
    .integer("Target number must be an integer"),

  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(13, "Minimum age is 13")
    .max(120, "Maximum age is 120"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"], "Select a valid gender"),

  industry: Yup.string().required("Industry is required"),

  valuePerUser: Yup.string().required("This field is required"),

  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),

  totalLiquidity: Yup.number()
    .required("Total liquidity is required")
    .positive("Total liquidity must be positive")
    .test(
      'amount-within-budget',
      'Total reward (amount × target number) exceeds total liquidity',
      function(value) {
        const { targetNumber, amount } = this.parent;
        // Only validate if all values exist
        if (value && targetNumber && amount) {
          return amount * targetNumber <= value;
        }
        return true;
      }
    ),

  startDate: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date must be in the future"),

  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
});

// Media kit validation schema
export const mediaKitSchema = Yup.object({
  website: Yup.string()
    .required("Website URL is required")
    .url("Please enter a valid URL"),

  twitter: Yup.string()
    .required("Twitter URL is required")
    .url("Please enter a valid URL"),

  youtube: Yup.string().url("Please enter a valid URL").nullable(),

  instagram: Yup.string().url("Please enter a valid URL").nullable(),

  telegram: Yup.string().url("Please enter a valid URL").nullable(),

  discord: Yup.string().url("Please enter a valid URL").nullable(),

  otherResources: Yup.string().nullable(),

  otherInformation: Yup.string().nullable(),
});


export const acceptSchema = Yup.object().shape({
    xAccount: Yup.string().required("X account is required"),
    walletAddress: Yup.string().required("Wallet address is required"),
    youtube: Yup.string().url("Enter a valid YouTube URL"),
    instagram: Yup.string().url("Enter a valid Instagram URL"),
    telegram: Yup.string().url("Enter a valid Telegram URL"),
    discord: Yup.string().url("Enter a valid Discord URL"),
  });