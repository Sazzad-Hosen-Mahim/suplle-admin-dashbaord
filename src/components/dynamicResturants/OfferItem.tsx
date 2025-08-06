
// components/OfferItem.tsx
import React from 'react'
import { Plus } from 'lucide-react'
import Wrapper from '../shared/Wrapper'
import { dummyOfferData } from '@/utils/dummyOfferData'

type Props = {
  selectedCategory: string
}

const OfferItem: React.FC<Props> = ({ selectedCategory }) => {
  const filteredOffers = dummyOfferData.filter(item => item.category === selectedCategory)
  return (
    <Wrapper>
      <div className="flex flex-wrap gap-4 justify-start items-center p-5 md:p-12">
        {filteredOffers.map((item) => (
          <div
            key={item.id}
            className="relative w-full sm:w-[45%] lg:w-[30%] h-[330px] rounded-xl overflow-hidden shadow-lg bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="absolute top-2 right-2 bg-orange-700 text-white text-sm font-semibold px-4 py-1 rounded-lg z-10">
              -{item.discount}%
            </div>
            <div className="relative z-10 p-4 flex flex-col justify-end h-full">
              <p className="text-lg text-[#FC8A06] font-medium">Urban Bistro</p>
              <h3 className="text-xl text-white font-bold leading-tight mt-1">
                {item.title}
              </h3>
            </div>
            <div className="absolute bottom-0 right-0 bg-white bg-opacity-60 rounded-tl-3xl px-3 py-2">
              <Plus className="text-white rounded-full bg-black" size={30} />

            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};


export default OfferItem;

