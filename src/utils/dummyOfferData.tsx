// utils/dummyOfferData.ts
import { generateRandomId } from '@/utils/utils'
import food1 from '@/assets/offerItem/offer1.jpg'
import food2 from '@/assets/offerItem/offer2.jpg'
import food3 from '@/assets/offerItem/offer3.jpg'

const categories = [
  'offers', 'burgers','main course','soft drinks', 'fries', 'snacks', 'coldDrinks', 
  'happyMeals', 'desserts', 'hotDrinks', 'souces', 'orbits','starter'
]

export const dummyOfferData = Array.from({ length: 30 }, (_, i) => {
  const category = categories[i % categories.length]
  return {
    id: generateRandomId(),
    title: `${category} Item ${i + 1}`,
    description: 'Yummy and fresh.',
    price: +(Math.random() * 20 + 5).toFixed(2),
    discount: [10, 15, 20][i % 3],
    imageUrl: [food1, food2, food3][i % 3],
    category,
  }
})
