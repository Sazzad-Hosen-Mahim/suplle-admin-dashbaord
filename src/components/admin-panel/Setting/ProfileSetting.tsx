import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RiMailFill } from "react-icons/ri";
import profile from "@/assets/admin/profile.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const ProfileSetting = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Alexa Rawles",
    nickName: "Rawles",
    gender: "Male",
    country: "India",
    language: "English",
    timezone: "(GMT+5:30)",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-[24px] font-normal leading-normal font-[Rubik] mb-6 bg-gradient-to-b from-[#56DAAB] via-[#31B8A0] to-[#0F9996] bg-clip-text text-transparent text-center sm:text-left">
        My Profile
      </h1>

      <div className="w-full mx-auto p-6  rounded-sm shadow-sm dark:bg-[#161616]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Avatar className="w-21 h-21 flex-shrink-0">
              <AvatarImage src={profile} alt="Alexa Rawles" />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-[16px] font-normal leading-normal  font-[Rubik]">
                Alexa Rawles
              </h2>
              <p className="text-[14px] font-normal leading-normal   break-all opacity-50">
                alexarawles@gmail.com
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-[81.248px] h-[38.44px] rounded-[6.989px] text-white bg-[linear-gradient(176deg,_#56DAAB_-18.78%,_#0F9996_111.3%)] cursor-pointer">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-[24px] font-normal leading-normal font-[Rubik] bg-gradient-to-b from-[#56DAAB] via-[#31B8A0] to-[#0F9996] bg-clip-text text-transparent">
                    Edit Profile
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0">
                      <Label htmlFor="fullName" className="mb-2">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="bg-[#F9F9F9] h-[45px] rounded-[6px] opacity-50"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Label htmlFor="nickName" className="mb-2">
                        Nick Name
                      </Label>
                      <Input
                        id="nickName"
                        value={formData.nickName}
                        onChange={handleInputChange}
                        className="bg-[#F9F9F9] h-[45px] rounded-[6px] opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0">
                      <Label htmlFor="gender" className="mb-2">
                        Gender
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleSelectChange("gender", value)
                        }
                      >
                        <SelectTrigger className="w-full p-[22px] bg-[#F9F9F9] rounded-[6px]">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Label htmlFor="country" className="mb-2">
                        Country
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleSelectChange("country", value)
                        }
                      >
                        <SelectTrigger className="w-full p-[22px] bg-[#F9F9F9] rounded-[6.989px]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="Nepal">Nepal</SelectItem>
                            <SelectItem value="Bangladesh">
                              Bangladesh
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0">
                      <Label htmlFor="language" className="mb-2">
                        Language
                      </Label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) =>
                          handleSelectChange("language", value)
                        }
                      >
                        <SelectTrigger className="w-full p-[22px] bg-[#F9F9F9] rounded-[6.989px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Bangla">Bangla</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                            <SelectItem value="Urdhu">Urdhu</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Label htmlFor="timezone" className="mb-2">
                        Time Zone
                      </Label>
                      <Select
                        value={formData.timezone}
                        onValueChange={(value) =>
                          handleSelectChange("timezone", value)
                        }
                      >
                        <SelectTrigger className="w-full p-[22px] bg-[#F9F9F9] rounded-[6px]">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="(GMT+5:30)">
                              (GMT+5:30)
                            </SelectItem>
                            <SelectItem value="GMT-05:00">GMT-05:00</SelectItem>
                            <SelectItem value="GMT+00:00">GMT+00:00</SelectItem>
                            <SelectItem value="GMT+01:00">GMT+01:00</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="h-[38px] rounded-[6px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="h-[38px] rounded-[6px] text-white bg-[linear-gradient(176deg,_#56DAAB_-18.78%,_#0F9996_111.3%)]"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Rest of your existing profile display code remains the same */}
        <div className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="name"
                  className="mb-2 text-[13.978px] font-normal leading-normal  font-[Rubik] truncate"
                >
                  Full Name
                </Label>
                <Input
                  className="mb-4 bg-[#F9F9F9] w-full h-[45.429px] rounded-[6px] opacity-50"
                  type="text"
                  id="name"
                  placeholder="Alexa"
                  value={formData.fullName}
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="nickname"
                  className="mb-2 text-[13px] font-normal leading-normal font-[Rubik] truncate"
                >
                  Nick Name
                </Label>
                <Input
                  className="mb-4 bg-[#F9F9F9] w-full h-[45.429px] rounded-[6px] opacity-50"
                  type="text"
                  id="nickname"
                  placeholder="Rawles"
                  value={formData.nickName}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="gender"
                  className="mb-2 block text-[13.978px] font-normal leading-normal font-[Rubik] truncate"
                >
                  Gender
                </Label>
                <Input
                  className="mb-4 bg-[#F9F9F9] w-full h-[45px] rounded-[6px] opacity-50"
                  type="text"
                  id="gender"
                  value={formData.gender}
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="country"
                  className="mb-2 block text-[13px] font-normal leading-normal  font-[Rubik] truncate"
                >
                  Country
                </Label>
                <Input
                  className="mb-4 bg-[#F9F9F9] w-full h-[45px] rounded-[6px] opacity-50"
                  type="text"
                  id="country"
                  value={formData.country}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="language"
                  className="mb-2 block text-[13.978px] font-normal leading-normal font-[Rubik] truncate"
                >
                  Language
                </Label>
                <Input
                  className="mb-4 bg-[#F9F9F9] w-full h-[45px] rounded-[6px] opacity-50"
                  type="text"
                  id="language"
                  value={formData.language}
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="timezone"
                  className="mb-2 block text-[13.978px] font-normal leading-normal  font-[Rubik] truncate"
                >
                  Time Zone
                </Label>
                <Input
                  className="mb-4 bg-[#F9F9F9] w-full h-[45px] rounded-[6px] opacity-50"
                  type="text"
                  id="timezone"
                  value={formData.timezone}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className=" font-rubik text-base font-normal leading-normal mb-4">
              My email Address
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-[42px] h-[42px] flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                <RiMailFill className="w-6 h-6 text-[#4182F9]" />
              </div>

              <div>
                <h2 className="text-sm font-normal leading-normal  font-[Rubik] break-all">
                  alexarawles@gmail.com
                </h2>
                <p className="text-[12px] font-normal leading-normal  font-[Rubik] opacity-50">
                  1 month ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;

/* 
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RiMailFill } from "react-icons/ri";

interface ProfileSettingProps {
  user: {
    fullName: string;
    nickName: string;
    gender: string;
    country: string;
    language: string;
    timezone: string;
    email: string;
    emailUpdatedAgo: string;
    avatarUrl?: string;
  };
}

const genderOptions = [
  { value: "", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "transgender", label: "Transgender" },
  { value: "other", label: "Other" },
];

const countryOptions = [
  { value: "", label: "Select Country" },
  { value: "india", label: "India" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "other", label: "Other" },
];

const languageOptions = [
  { value: "", label: "English" },
  { value: "bangla", label: "Bangla" },
  { value: "hindi", label: "Hindi" },
  { value: "arabic", label: "Arabic" },
  { value: "other", label: "Other" },
];

const timezoneOptions = [
  { value: "", label: "(GMT+5:30)" },
  { value: "usa", label: "GMT-05:00" },
  { value: "greenwich", label: "GMT+00:00" },
  { value: "european", label: "GMT+01:00" },
];

const ProfileSetting = ({ user }: ProfileSettingProps) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [nickName, setNickName] = useState(user.nickName);
  const [gender, setGender] = useState(user.gender);
  const [country, setCountry] = useState(user.country);
  const [language, setLanguage] = useState(user.language);
  const [timezone, setTimezone] = useState(user.timezone);

  const handleEdit = () => {

    alert("Edit clicked");
  };

  return (
    <div className="w-full">
      <h1 className="text-[24px] font-normal leading-normal font-[Rubik] mb-6 bg-gradient-to-b from-[#56DAAB] via-[#31B8A0] to-[#0F9996] bg-clip-text text-transparent text-center sm:text-left">
        My Profile
      </h1>

      <div className="w-full mx-auto p-6 bg-white rounded-sm shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Avatar className="w-20 h-20 flex-shrink-0 rounded-full">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={fullName} />
              ) : (
                <AvatarFallback>
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>

            <div>
              <h2 className="text-[16px] font-normal leading-normal text-black font-[Rubik]">
                {fullName}
              </h2>
              <p className="text-[14px] font-normal leading-normal text-black font-[Rubik] break-all">
                {user.email}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            <Button
              className="w-[81.248px] h-[38.44px] rounded-[6.989px] text-white bg-[linear-gradient(176deg,_#56DAAB_-18.78%,_#0F9996_111.3%)]"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </div>
        </div>

   
        <div className="space-y-6">
          <div>
     
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="name"
                  className="mb-2 text-[13.978px] font-normal leading-normal text-black font-[Rubik] truncate"
                >
                  Full Name
                </Label>
                <Input
                  className="mb-4 bg-[#F9F9F9] w-full h-[45.429px] rounded-[6.989px]"
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="nickname"
                  className="mb-2 text-[13.978px] font-normal leading-normal text-black font-[Rubik] truncate"
                >
                  Nick Name
                </Label>
                <Input
                  className="mb-4 bg-[#F9F9F9] w-full h-[45.429px] rounded-[6.989px]"
                  type="text"
                  id="nickname"
                  placeholder="Nick Name"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="gender"
                  className="mb-2 block text-[13.978px] font-normal leading-normal text-black font-[Rubik] truncate"
                >
                  Gender
                </Label>
                <select
                  id="gender"
                  className="mb-4 bg-[#F9F9F9] w-full h-[45.429px] rounded-[6.989px] border border-gray-300 px-3 text-[14px] text-black font-[Rubik] focus:outline-none"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genderOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="country"
                  className="mb-2 block text-[13.978px] font-normal leading-normal text-black font-[Rubik] truncate"
                >
                  Country
                </Label>
                <select
                  id="country"
                  className="mb-4 bg-[#F9F9F9] w-full h-[45.429px] rounded-[6.989px] border border-gray-300 px-3 text-[14px] text-black font-[Rubik] focus:outline-none"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countryOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

    
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="language"
                  className="mb-2 block text-[13.978px] font-normal leading-normal text-black font-[Rubik] truncate"
                >
                  Language
                </Label>
                <select
                  id="language"
                  className="mb-4 bg-[#F9F9F9] w-full h-[45.429px] rounded-[6.989px] border border-gray-300 px-3 text-[14px] text-black font-[Rubik] focus:outline-none"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languageOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="timezone"
                  className="mb-2 block text-[13.978px] font-normal leading-normal text-black font-[Rubik] truncate"
                >
                  Time Zone
                </Label>
                <select
                  id="timezone"
                  className="mb-4 bg-[#F9F9F9] w-full h-[45.429px] rounded-[6.989px] border border-gray-300 px-3 text-[14px] text-black font-[Rubik] focus:outline-none"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  {timezoneOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

    
          <div>
            <h2 className="text-black font-rubik text-base font-normal leading-normal mb-4">
              My email Address
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-[42px] h-[42px] flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                <RiMailFill className="w-6 h-6 text-[#4182F9]" />
              </div>

              <div>
                <h2 className="text-sm font-normal leading-normal text-black font-[Rubik] break-all">
                  {user.email}
                </h2>
                <p className="text-[12px] font-normal leading-normal text-black font-[Rubik] opacity-50">
                  {user.emailUpdatedAgo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;




import ProfileSetting from "@/components/admin-panel/Setting/ProfileSetting";

const someUser = {
  fullName: "Alexa Rawles",
  nickName: "Rawles",
  gender: "female",
  country: "bangladesh",
  language: "bangla",
  timezone: "greenwich",
  email: "alexarawles@gmail.com",
  emailUpdatedAgo: "1 month ago",
  avatarUrl: "/path-to-user-image.jpg",
};

const AdminSetting = () => {
  return (
    <div>
      <ProfileSetting user={someUser} />
    </div>
  );
};

export default AdminSetting;

 */
