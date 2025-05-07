import { useFormik } from "formik";
import { basicInfoSchema } from "../../lib/validation";
// react-icons/md/MdExpandMore

export interface CampaignBasicInfoProps {
  onSubmit: (values: any) => void;
  initialValues?: any;
}

const CampaignFormBasic: React.FC<CampaignBasicInfoProps> = ({ 
  onSubmit, 
  initialValues = {
    campaignName: "",
    campaignGoals: "",
    campaignKPIs: "",
    targetNumber: "",
    targetAudience: "",
    industry: "",
    valuePerUser: "",
    amount: "",
    totalLiquidity: "",
    startDate: "",
    endDate: ""
  } 
}) => {
  
  const formik = useFormik({
    initialValues,
    validationSchema: basicInfoSchema,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });
  const getVpuLabel = (goal: string) => {
    switch (goal) {
      case "Engagement":
        return "Cost Per Engagement (CPE)";
      case "App Installs":
        return "Cost Per Install (CPI)";
      case "Followers":
      case "Signups":
      case "Feedback":
      case "Waitlist Signups":
        return "Cost Per Action (CPA)";
      default:
        return "Value Per User (VPU)";
    }
  };
  

  return (
    <div className="space-y-6">
      {/* Campaign Name */}
      <div className="mb-4">
        <label htmlFor="campaignName" className="block font-medium text-[#212221] mb-1">
          Campaign name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="campaignName"
          name="campaignName"
          value={formik.values.campaignName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border border-[#D7D7D7] rounded"
          placeholder="NFT Push 25"
        />
        {formik.touched.campaignName && formik.errors.campaignName && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.campaignName as string}</div>
        )}
      </div>

      {/* Campaign Goals, KPIs and Target Number */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="campaignGoals" className="block font-medium text-[#212221] mb-1">
            Campaign goals <span className="text-red-500">*</span>
          </label>
          <select
            id="campaignGoals"
            name="campaignGoals"
            value={formik.values.campaignGoals}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
          >
            <option value="">Select goal</option>
            <option value="Engagement">Engagement</option>
            <option value="Waitlist Signups">Waitlist Signups</option>
            <option value="Feedback">Feedback</option>
            <option value="Followers">Followers</option>
            <option value="App Installs">App Installs</option>
            <option value="Signups">Signups</option>
          </select>
          {formik.touched.campaignGoals && formik.errors.campaignGoals && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.campaignGoals as string}</div>
          )}
        </div>

        {formik.values.campaignGoals === "Engagement" && (
    <div>
      <label htmlFor="campaignKPIs" className="block font-medium text-[#212221] mb-1">
        Campaign KPIs <span className="text-red-500">*</span>
      </label>
      <select
        id="campaignKPIs"
        name="campaignKPIs"
        value={formik.values.campaignKPIs}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
      >
        <option value="">Select KPI</option>
        <option value="Likes">Likes</option>
        <option value="Comments">Comments</option>
        <option value="Shares">Shares</option>
      </select>
      {formik.touched.campaignKPIs && formik.errors.campaignKPIs && (
        <div className="text-red-500 text-xs mt-1">
          {formik.errors.campaignKPIs as string}
        </div>
      )}
    </div>
  )}
        <div>
          <label htmlFor="targetNumber" className="block font-medium text-[#212221] mb-1">
            Target number <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="targetNumber"
            name="targetNumber"
            value={formik.values.targetNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
            placeholder="120"
          />
          {formik.touched.targetNumber && formik.errors.targetNumber && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.targetNumber as string}</div>
          )}
        </div>
      </div>

      {/* Target Audience */}
      <div className="grid grid-cols-2 gap-4">
  <div className="col-span-2">
    <label className="block font-medium text-[#212221] mb-1">
      Target audience <span className="text-red-500">*</span>
    </label>
  </div>

  <div>
    {/* <label htmlFor="age" className="block font-medium text-[#212221] mb-1">
      Age <span className="text-red-500">*</span>
    </label> */}
    <input
      type="number"
      id="age"
      name="age"
      placeholder="Age"
      value={formik.values.age}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      min={13}
      max={120}
      className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
    />
    {formik.touched.age && formik.errors.age && (
      <div className="text-red-500 text-xs mt-1">{formik.errors.age as string}</div>
    )}
  </div>

  <div>
    {/* <label htmlFor="gender" className="block font-medium text-[#212221] mb-1">
      Gender <span className="text-red-500">*</span>
    </label> */}
    <select
      id="gender"
      name="gender"
      value={formik.values.gender}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
    >
      <option value="">Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
    {formik.touched.gender && formik.errors.gender && (
      <div className="text-red-500 text-xs mt-1">{formik.errors.gender as string}</div>
    )}
  </div>
</div>

        <div>
          <label htmlFor="industry" className="block font-medium text-[#212221] mb-1">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            value={formik.values.industry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
          >
            <option value="">Select industry</option>
            <option value="DeFi">DeFi</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="DePIN">DePIN</option>
            <option value="Consumer dApps">Consumer dApps</option>
            <option value="Payments">Payments</option>
            <option value="NFTs">Gaming</option>
            <option value="AI">AI</option>
            <option value="DAOs">DAOs</option>
          </select>
          {formik.touched.industry && formik.errors.industry && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.industry as string}</div>
          )}
        </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="valuePerUser" className="block font-medium text-[#212221] mb-1">
          {getVpuLabel(formik.values.campaignGoals)} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="valuePerUser"
              name="valuePerUser"
              value={formik.values.valuePerUser}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
            >
              <option value="">{`Select your ${getVpuLabel(formik.values.campaignGoals)}`}</option>
              <option value="0.01">0.01</option>
              <option value="0.05">0.05</option>
              <option value="0.10">0.10</option>
            </select>
          </div>
          {formik.touched.valuePerUser && formik.errors.valuePerUser && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.valuePerUser as string}</div>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block font-medium text-[#212221] mb-1">
            Amount (VPU) <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              id="amount"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
              placeholder="0.00"
            />
            <span className="absolute right-3 text-gray-500">USDC</span>
          </div>
          {formik.touched.amount && formik.errors.amount && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.amount as string}</div>
          )}
        </div>
      </div>

      {/* Total Liquidity */}
      <div className="mb-4">
        <label htmlFor="totalLiquidity" className="block text-sm font-medium text-[#212221] mb-1">
          Total liquidity <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <input
            type="number"
            id="totalLiquidity"
            name="totalLiquidity"
            value={formik.values.totalLiquidity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
            placeholder="0.00"
          />
          <span className="absolute right-3 text-gray-500">USDC</span>
        </div>
        {formik.touched.totalLiquidity && formik.errors.totalLiquidity && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.totalLiquidity as string}</div>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-[#212221] mb-1">
            Start date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.startDate as string}</div>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-[#212221] mb-1">
            End date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.endDate as string}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignFormBasic;