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
            <option value="Awareness">Awareness</option>
            <option value="Conversion">Conversion</option>
          </select>
          {formik.touched.campaignGoals && formik.errors.campaignGoals && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.campaignGoals as string}</div>
          )}
        </div>

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
            <div className="text-red-500 text-xs mt-1">{formik.errors.campaignKPIs as string}</div>
          )}
        </div>

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

      {/* Target Audience and Industry */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="targetAudience" className="block font-medium text-[#212221] mb-1">
            Target audience <span className="text-red-500">*</span>
          </label>
          <select
            id="targetAudience"
            name="targetAudience"
            value={formik.values.targetAudience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
          >
            <option value="">Select audience</option>
            <option value="Others">Others</option>
            <option value="AI">AI</option>
          </select>
          {formik.touched.targetAudience && formik.errors.targetAudience && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.targetAudience as string}</div>
          )}
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
            <option value="DAOs">DAOs</option>
            <option value="NFTs">NFTs</option>
            <option value="DeFi">DeFi</option>
          </select>
          {formik.touched.industry && formik.errors.industry && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.industry as string}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="valuePerUser" className="block font-medium text-[#212221] mb-1">
            Value Per User (VPU) <span className="text-red-500">*</span>
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
              <option value="">Select your VPU</option>
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