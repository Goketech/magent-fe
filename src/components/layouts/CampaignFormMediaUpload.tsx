import { useState } from "react";
import { Upload } from "lucide-react";

export interface CampaignMediaUploadProps {
  onUpload: (files: File[]) => void;
}

const CampaignFormMediaUpload: React.FC<CampaignMediaUploadProps> = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<"image" | "video">("image");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      
      if (fileArray.length > 5) {
        alert("You can upload at most 5 files");
        return;
      }

      if (activeTab === "image") {
        const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        const allValid = fileArray.every(file => validImageTypes.includes(file.type));
        if (!allValid) {
          alert("Please upload only image files (JPG, PNG, GIF, WebP)");
          return;
        }
      } else {
        const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
        const allValid = fileArray.every(file => validVideoTypes.includes(file.type));
        if (!allValid) {
          alert("Please upload only video files (MP4, WebM, OGG)");
          return;
        }
      }

      setSelectedFiles(fileArray);
      onUpload(fileArray);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      
      // Validate file count
      if (fileArray.length > 5) {
        alert("You can upload at most 5 files");
        return;
      }

      // Validate file types based on active tab
      if (activeTab === "image") {
        const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        const allValid = fileArray.every(file => validImageTypes.includes(file.type));
        if (!allValid) {
          alert("Please upload only image files (JPG, PNG, GIF, WebP)");
          return;
        }
      } else {
        const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
        const allValid = fileArray.every(file => validVideoTypes.includes(file.type));
        if (!allValid) {
          alert("Please upload only video files (MP4, WebM, OGG)");
          return;
        }
      }

      setSelectedFiles(fileArray);
      onUpload(fileArray);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onUpload(newFiles);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Upload media</h3>
      <p className="text-sm text-gray-600 mb-4">Choose what media you want to upload</p>
      
      {/* Tab Selection */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("image")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "image" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"
          }`}
        >
          Image(s)
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "video" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"
          }`}
        >
          Video
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mb-2">Upload not more than 5 files</p>
      
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <div className="flex flex-col items-center">
          <div className="p-3 bg-purple-100 rounded-full mb-3">
            <Upload size={24} className="text-purple-600" />
          </div>
          <p className="text-sm text-center">
            Select image to upload<br/>
            <span className="text-xs text-gray-500">Supported format: JPG, PNG, GIF, WebP (1MB max)</span>
          </p>
          <button type="button" className="mt-4 bg-white border border-gray-300 rounded px-4 py-2 text-sm">
            Select file
          </button>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          multiple
          accept={activeTab === "image" ? "image/*" : "video/*"}
          onChange={handleFileChange}
        />
      </div>
      
      {/* Preview of uploaded files */}
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex space-x-2 overflow-x-auto py-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                {activeTab === "image" ? (
                  <div className="w-16 h-16 rounded bg-gray-200 overflow-hidden relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
                    <span className="text-xs">Video</span>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignFormMediaUpload;