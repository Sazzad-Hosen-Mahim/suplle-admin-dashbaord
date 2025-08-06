import { useState } from "react";
import Wrapper from "../shared/Wrapper";

const offices = [
  {
    name: "Germany Office",
    lat: 52.52,
    lng: 13.405,
  },
  {
    name: "UK Office",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    name: "USA Office",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    name: "Saudi Arabia's Office",
    lat: 24.7136,
    lng: 46.6753,
  },
  {
    name: "AUS Office",
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    name: "South Africa Office",
    lat: -33.9249,
    lng: 18.4241,
  },
];

const GoogleMap = () => {
  const [activeOffice] = useState(offices[2]);

  return (
    <Wrapper>
      <div className="w-full p-3 md:p-6 ">
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <iframe
            title="Google Map"
            className="w-full h-full rounded-xl"
            src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${activeOffice.lat},${activeOffice.lng}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
            loading="lazy"
          ></iframe>

          {/* Info Card */}
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:w-auto bg-black bg-opacity-80 rounded-xl p-4 flex flex-col gap-2 text-white backdrop-blur-md max-w-md">
            <div>
              <p className="text-2xl font-bold">Urban Bistro</p>
              <p className="text-green-500 text-sm">South London</p>
            </div>
            <div className="text-sm leading-relaxed">
              <p>Tooley St, London Bridge, London SE1 2TF, United Kingdom</p>
              <p className="pt-2">
                Phone number <br />
                <span className="text-green-500">+863 674 093 34</span>
              </p>
              <p className="pt-2">
                Website <br />
                <span className="text-green-500 break-words">
                  http://urbanbistro.uk/
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default GoogleMap;
