export type ZoneValue =
  | "east"
  | "west"
  | "north"
  | "south"
  | "upper"
  | "lower"
  | "outside";

export type ZoneOption = {
  value: ZoneValue;
  label: string;
};

export const zoneType: ZoneOption[] = [
  { value: "east", label: "East" },
  { value: "west", label: "West" },
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "upper", label: "Upper" },
  { value: "lower", label: "Lower" },
  { value: "outside", label: "Outside" },
];
