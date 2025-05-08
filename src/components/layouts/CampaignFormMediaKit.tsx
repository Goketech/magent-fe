import { useFormik } from "formik";
import { mediaKitSchema } from "../../lib/validation";

export interface CampaignMediaKitProps {
  onSubmit: (values: any) => void;
  initialValues?: any;
}

interface CampaignFormBasicProps {
  formik: any; // Or use proper Formik types
}

const CampaignFormMediaKit: React.FC<CampaignFormBasicProps> = ({ formik}) => {
  

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Brand media kit</h3>
      
      {/* Website and Twitter */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://yourproject.xyz"
          />
          {formik.touched.website && formik.errors.website && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.website as string}</div>
          )}
        </div>

        <div>
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
            X (formerly Twitter) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            value={formik.values.twitter}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://x.com/yourhandle"
          />
          {formik.touched.twitter && formik.errors.twitter && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.twitter as string}</div>
          )}
        </div>
      </div>

      {/* YouTube and Instagram */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
            YouTube
          </label>
          <input
            type="text"
            id="youtube"
            name="youtube"
            value={formik.values.youtube}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://youtube.com/yourchannel"
          />
          {formik.touched.youtube && formik.errors.youtube && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.youtube as string}</div>
          )}
        </div>

        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
            Instagram
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formik.values.instagram}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://instagram.com/yourhandle"
          />
          {formik.touched.instagram && formik.errors.instagram && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.instagram as string}</div>
          )}
        </div>
      </div>

      {/* Telegram and Discord */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="telegram" className="block text-sm font-medium text-gray-700 mb-1">
            Telegram
          </label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            value={formik.values.telegram}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://t.me/yourchannel"
          />
          {formik.touched.telegram && formik.errors.telegram && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.telegram as string}</div>
          )}
        </div>

        <div>
          <label htmlFor="discord" className="block text-sm font-medium text-gray-700 mb-1">
            Discord
          </label>
          <input
            type="text"
            id="discord"
            name="discord"
            value={formik.values.discord}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://discord.gg/yourserver"
          />
          {formik.touched.discord && formik.errors.discord && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.discord as string}</div>
          )}
        </div>
      </div>

      {/* Other Resources */}
      <div className="mb-4">
        <label htmlFor="otherResources" className="block text-sm font-medium text-gray-700 mb-1">
          Other resources
        </label>
        <input
          type="text"
          id="otherResources"
          name="otherResources"
          value={formik.values.otherResources}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Input other link resources..."
        />
        {formik.touched.otherResources && formik.errors.otherResources && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.otherResources as string}</div>
        )}
      </div>

      {/* Other Information */}
      <div className="mb-4">
        <label htmlFor="otherInformation" className="block text-sm font-medium text-gray-700 mb-1">
          Other information
        </label>
        <textarea
          id="otherInformation"
          name="otherInformation"
          value={formik.values.otherInformation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
          placeholder="Input any other relevant information..."
        />
        {formik.touched.otherInformation && formik.errors.otherInformation && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.otherInformation as string}</div>
        )}
      </div>
    </div>
  );
};

export default CampaignFormMediaKit;