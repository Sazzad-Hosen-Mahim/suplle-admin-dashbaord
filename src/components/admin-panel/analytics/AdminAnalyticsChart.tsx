import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";


interface Data {
  month: string;
  sales: number;
  order: number;
}

const data: Data[] = [
  {
    month: "Jan",
    sales: 2400,
    order: 6000,
  },
  {
    month: "Feb",
    sales: 9350,
    order: 5600,
  },
  {
    month: "Mar",
    sales: 2530,
    order: 4300,
  },
  {
    month: "Apr",
    sales: 4550,
    order: 2560,
  },
  {
    month: "May",
    sales: 8250,
    order: 4530,
  },

  {
    month: "Jun",
    sales: 6550,
    order: 760,
  },
  {
    month: "Jul",
    sales: 7550,
    order: 4230,
  },
  {
    month: "Aug",
    sales: 6350,
    order: 4360,
  },
  {
    month: "Sep",
    sales: 9550,
    order: 8430,
  },
  {
    month: "Oct",
    sales: 3550,
    order: 6310,
  },
  {
    month: "Nov",
    sales: 7650,
    order: 3610,
  },
  {
    month: "Dec",
    sales: 4550,
    order: 4930,
  },
];

const AdminAnalyticsChart = ({
  selectedFilter,
}: {
  selectedFilter: string;
}) => {
  const filteredData = selectedFilter === "6 months" ? data.slice(0, 6) : data;
  return (
    <ResponsiveContainer height={400}>
      <LineChart
        width={400}
        height={300}
        data={filteredData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#56DAAB"
          strokeWidth={2.5}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="order"
          strokeWidth={2.5}
          stroke="#92D7D6"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AdminAnalyticsChart;