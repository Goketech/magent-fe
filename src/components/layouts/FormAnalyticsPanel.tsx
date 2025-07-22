import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { useState } from "react";
import { FormAnalytics } from "./CampaignDetails";

interface FormAnalyticsPanelProps {
  formAnalytics: FormAnalytics;
  setShowAnalytics: (value: boolean) => void;
}

// const CHART_COLORS = ['#9333EA', '#A855F7', '#C084FC', '#DDD6FE', '#EDE9FE', '#F3F4F6'];
const CHART_COLORS = [
  "#9333EA",
  "#DC2626",
  "#059669",
  "#D97706",
  "#7C3AED",
  "#DB2777",
];

export const FormAnalyticsPanel = ({
  formAnalytics,
  setShowAnalytics,
}: FormAnalyticsPanelProps) => {
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>(
    {}
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-4 sm:mt-8 border-t pt-4 sm:pt-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-medium">Form Analytics</h3>
        <button
          onClick={() => setShowAnalytics(false)}
          className="text-purple-800 hover:text-purple-500 text-xs sm:text-sm"
        >
          Hide Analytics
        </button>
      </div>

      {/* Form Info */}
      <div
        className="rounded-lg p-3 sm:p-4 mb-4 sm:mb-6"
        style={{
          backgroundImage:
            "url('/details.png'), linear-gradient(#330065, #330065)",
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <h4 className="font-medium mb-2 text-white text-sm sm:text-base">
          Form Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-white">
          <div className="">
            <span className="opacity-70">Form Title:</span>
            <span className="ml-2 font-medium">{formAnalytics.form.title}</span>
          </div>
          <div>
            <span className="opacity-70">Status:</span>
            <span
              className={`ml-2 px-2 py-1 rounded text-xs ${
                formAnalytics.form.status === "published"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {formAnalytics.form.status}
            </span>
          </div>
          <div>
            <span className="opacity-70">Created:</span>
            <span className="ml-2 font-medium">
              {formatDate(formAnalytics.form.createdAt)}
            </span>
          </div>
          <div>
            <span className="opacity-70">Public:</span>
            <span className="ml-2 font-medium">
              {formAnalytics.form.isPublic ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white border rounded-lg p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-blue-600">
            {formAnalytics.overview.totalSubmissions}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            Total Submissions
          </div>
        </div>
        <div className="bg-white border rounded-lg p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-green-600">
            {formAnalytics.overview.completedSubmissions}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white border rounded-lg p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-orange-600">
            {formAnalytics.overview.partialSubmissions}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Partial</div>
        </div>
        <div className="bg-white border rounded-lg p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-purple-600">
            {formAnalytics.overview.completionRate}%
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            Completion Rate
          </div>
        </div>
      </div>

      {/* Field Analytics */}
      {formAnalytics.fieldAnalytics &&
        Object.keys(formAnalytics.fieldAnalytics).length > 0 && (
          <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6">
            {Object.entries(formAnalytics.fieldAnalytics).map(
              ([fieldId, fieldData]) => {
                // Helper function to format option labels
                interface OptionMap {
                  [key: string]: string;
                }

                const formatOptionLabel = (optionId: string): string => {
                  const optionMap: OptionMap = {
                    option1: "Option 1",
                    option2: "Option 2",
                    option3: "Option 3",
                    option4: "Option 4",
                  };
                  return optionMap[optionId] || optionId;
                };

                // Process checkbox responses to count individual options
                const processCheckboxData = (responses: any) => {
                  const optionCounts = {};

                  interface CheckboxResponse {
                    _id: string[]; // array of selected option ids
                    count: number;
                  }

                  interface RadioResponse {
                    _id: string; // selected option id
                    count: number;
                  }

                  type ResponseType = CheckboxResponse | RadioResponse;

                  interface OptionCounts {
                    [option: string]: number;
                  }

                  responses.forEach((response: ResponseType) => {
                    if (Array.isArray(response._id)) {
                      // Checkbox response - count each option individually
                      response._id.forEach((option: string) => {
                        (optionCounts as OptionCounts)[option] =
                          ((optionCounts as OptionCounts)[option] || 0) +
                          (response as CheckboxResponse).count;
                      });
                    } else {
                      // Radio response - count normally
                      (optionCounts as OptionCounts)[
                        (response as RadioResponse)._id
                      ] = (response as RadioResponse).count;
                    }
                  });

                  return Object.entries(optionCounts).map(
                    ([option, count], index) => ({
                      name: formatOptionLabel(option),
                      value: count,
                      color: CHART_COLORS[index % CHART_COLORS.length],
                    })
                  );
                };

                // Prepare chart data for radio/checkbox fields
                const chartData =
                  fieldData.type === "checkbox"
                    ? processCheckboxData(fieldData.responses || [])
                    : fieldData.responses?.map((response: any, index: any) => ({
                        name: formatOptionLabel(response._id),
                        value: response.count,
                        color: CHART_COLORS[index % CHART_COLORS.length],
                      })) || [];

                // Determine chart type based on field type and number of options
                const shouldShowChart =
                  (fieldData.type === "radio" ||
                    fieldData.type === "checkbox" ||
                    fieldData.type === "select") &&
                  fieldData.responses?.length > 0;
                const shouldUsePieChart =
                  shouldShowChart && chartData.length <= 3;
                const shouldUseBarChart =
                  shouldShowChart && chartData.length >= 4;

                return (
                  <div
                    key={fieldId}
                    className="bg-white border rounded-lg p-3 sm:p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-1 sm:gap-0">
                      <h5 className="font-medium text-gray-800 capitalize text-sm sm:text-base">
                        {fieldData.label}
                      </h5>
                      {/* <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded self-start sm:self-auto">
                        {fieldData.type}
                      </span> */}
                    </div>

                    {/* Chart or Text Response Display */}
                    {shouldUsePieChart && (
                      <div className="mb-4">
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {chartData.map((entry: any, index: any) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [value, "Responses"]}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {shouldUseBarChart && (
                      <div className="mb-4">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            <YAxis
                              domain={[0, "dataMax"]}
                              allowDecimals={false}
                            />
                            <Tooltip
                              formatter={(value) => [value, "Responses"]}
                            />
                            <Legend />
                            <Bar dataKey="value" fill="#9333EA" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {/* Response breakdown */}

                    {(fieldData.type === "text" ||
                      (!shouldUsePieChart && !shouldUseBarChart)) && (
                       <div className="space-y-2">
                      {fieldData.responses && fieldData.responses.length > 0 ? (
                        <>
                          {!["checkbox", "radio", "select"].includes(
                            fieldData.type
                          ) ? (
                            // Text field responses
                            <>
                              {(expandedFields[fieldId]
                                ? fieldData.responses
                                : fieldData.responses.slice(-5)
                              ).map((response: any, index: any) => (
                                <div
                                  key={index}
                                  className="text-xs sm:text-sm text-gray-600 p-2 bg-gray-50 rounded"
                                >
                                  {response._id || "No content"}
                                </div>
                              ))}

                              {fieldData.responses.length > 5 && (
                                <button
                                  onClick={() =>
                                    setExpandedFields((prev) => ({
                                      ...prev,
                                      [fieldId]: !prev[fieldId],
                                    }))
                                  }
                                  className="text-purple-600 text-xs mt-2"
                                >
                                  {expandedFields[fieldId]
                                    ? "See less"
                                    : "See more"}
                                </button>
                              )}
                            </>
                          ) : // Radio/Checkbox responses with counts
                          fieldData.type === "checkbox" ? (
                            chartData.map((item: any, index: any) => (
                              <div
                                key={index}
                                className="flex justify-between items-center text-xs sm:text-sm"
                              >
                                <span className="text-gray-600 flex-1 pr-2 truncate">
                                  {item.name}
                                </span>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <div className="w-12 sm:w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-purple-600 h-2 rounded-full"
                                      style={{
                                        width: `${
                                          (item.value /
                                            formAnalytics.overview
                                              .totalSubmissions) *
                                          100
                                        }%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="font-medium text-purple-600 min-w-[1.5rem] sm:min-w-[2rem] text-xs sm:text-sm">
                                    {item.value}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            fieldData.responses.map(
                              (response: any, index: any) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center text-xs sm:text-sm"
                                >
                                  <span className="text-gray-600 flex-1 pr-2 truncate">
                                    {formatOptionLabel(response._id)}
                                  </span>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="w-12 sm:w-20 bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-purple-600 h-2 rounded-full"
                                        style={{
                                          width: `${
                                            (response.count /
                                              formAnalytics.overview
                                                .totalSubmissions) *
                                            100
                                          }%`,
                                        }}
                                      ></div>
                                    </div>
                                    <span className="font-medium text-purple-600 min-w-[1.5rem] sm:min-w-[2rem] text-xs sm:text-sm">
                                      {response.count}
                                    </span>
                                  </div>
                                </div>
                              )
                            )
                          )}
                        </>
                      ) : (
                        <div className="text-xs sm:text-sm text-gray-500 italic">
                          No responses yet
                        </div>
                      )}
                    </div>
                    )}
                   
                  </div>
                );
              }
            )}
          </div>
        )}

      {/* Last Submission */}
      <div className="bg-white border rounded-lg p-3 sm:p-4">
        <h4 className="font-medium mb-2 text-sm sm:text-base">
          Last Submission
        </h4>
        <p className="text-xs sm:text-sm text-gray-600">
          {formAnalytics.overview.lastSubmission
            ? formatDate(formAnalytics.overview.lastSubmission)
            : "No submissions yet"}
        </p>
      </div>

      {/* Recent Submissions */}
      {formAnalytics.recentSubmissions.length > 0 && (
        <div className="mt-4 bg-white border rounded-lg p-3 sm:p-4">
          <h4 className="font-medium mb-2 text-sm sm:text-base">
            Recent Submissions
          </h4>
          <div className="space-y-2">
            {formAnalytics.recentSubmissions.map((submission, index) => (
              <div
                key={index}
                className="text-xs sm:text-sm border-b pb-2 last:border-b-0"
              >
                <span className="text-gray-600">
                  Submission {index + 1} -{" "}
                  {formatDate(submission.submittedAt || submission.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
