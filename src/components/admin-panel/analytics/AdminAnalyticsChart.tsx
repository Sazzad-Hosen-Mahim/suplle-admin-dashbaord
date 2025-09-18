import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataPoint {
  date: string;
  sales: number;
  orders: number;
}

interface Filter {
  value: string;
  groupBy: string;
}

interface AdminAnalyticsChartProps {
  selectedFilter: Filter;
  chartData: ChartDataPoint[];
}

const formatDate = (dateString: string, groupBy: string) => {
  try {
    if (groupBy === "month") {
      // Format as "MMM YY" (e.g., "Sep 25")
      const date = new Date(dateString + "-01");
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
    } else {
      // Format as "MMM DD" (e.g., "Sep 18")
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  } catch (error) {
    return dateString; // Fallback to original string if formatting fails
  }
};

const AdminAnalyticsChart = ({
  selectedFilter,
  chartData,
}: AdminAnalyticsChartProps) => {
  // Format data for the chart
  const formattedData = chartData.map((item) => ({
    ...item,
    // Format the date based on the grouping
    formattedDate: formatDate(item.date, selectedFilter.groupBy),
  }));

  // If no chart data, show empty state
  if (chartData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-gray-500">
          No data available for the selected period
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
        <XAxis
          dataKey="formattedDate"
          tick={{ fill: "#71717A" }}
          axisLine={{ stroke: "#E4E4E7" }}
        />
        <YAxis tick={{ fill: "#71717A" }} axisLine={{ stroke: "#E4E4E7" }} />
        <Tooltip
          formatter={(value: number, name: string) => {
            if (name === "sales") {
              return [`$${value.toLocaleString()}`, "Sales"];
            }
            return [value.toLocaleString(), "Orders"];
          }}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #E4E4E7",
            borderRadius: "6px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          name="Sales"
          stroke="#56DAAB"
          strokeWidth={2.5}
          activeDot={{ r: 8, fill: "#56DAAB" }}
          dot={{ r: 4, fill: "#56DAAB" }}
        />
        <Line
          type="monotone"
          dataKey="orders"
          name="Orders"
          strokeWidth={2.5}
          stroke="#92D7D6"
          activeDot={{ r: 8, fill: "#92D7D6" }}
          dot={{ r: 4, fill: "#92D7D6" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AdminAnalyticsChart;
