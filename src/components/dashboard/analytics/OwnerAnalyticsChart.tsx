import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  sales: number;
}

const OwnerAnalyticsChart = ({ chartData }: { chartData: ChartData[] }) => {
  return (
    <ResponsiveContainer height={400}>
      <LineChart
        width={400}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#92D7D6"
          strokeWidth={2.5}
          activeDot={{ r: 8 }}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OwnerAnalyticsChart;
