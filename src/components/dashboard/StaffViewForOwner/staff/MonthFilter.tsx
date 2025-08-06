import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface MonthFilterProps {
  onMonthChange: (month: string) => void;
}

const MonthFilter = ({ onMonthChange }: MonthFilterProps) => {
  return (
    <div className="sectionTitle flex items-center justify-between mt-4">
      <h2 className="font-semibold">All Staff List</h2>
      <Select onValueChange={onMonthChange}>
        <SelectTrigger>
          <SelectValue placeholder="This Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Month</SelectLabel>
            {monthNames.map((month, index) => (
              <SelectItem key={index} value={month.toLowerCase()}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthFilter;
