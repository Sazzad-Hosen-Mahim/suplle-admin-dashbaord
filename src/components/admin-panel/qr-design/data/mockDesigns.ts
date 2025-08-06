import type { Design } from "./type";
import classic from "../../../../assets/admin/classic.png"
import modern from "../../../../assets/admin/modern.png"
import custom from "../../../../assets/admin/custom.png"
import trendy from "../../../../assets/admin/trandy.png"
import eco from "../../../../assets/admin/eco.png"
import seasonal from "../../../../assets/admin/seasonal.png"
import retired from "../../../../assets/admin/retired.png"
import limited from "../../../../assets/admin/limited.png"


export const mockDesigns: Design[] = [
  {
    id: 'design-1',
    name: 'Standard QR',
    description: 'Most popular, fits all tables.',
    status: 'available',
    category: 'Classic',
    price: 9.99,
    imageUrl: classic,
  
  },
  {
    id: 'design-2',
    name: 'Minimalist',
    description: 'Clean look, easy to scan.',
    status: 'available',
    category: 'Modern',
     price: 5.00,
    imageUrl: modern,
 
  },
  {
    id: 'design-3',
    name: 'Branded',
    description: 'Add your logo and colors.',
    status: 'available',
    category: 'Custom',
     price: 9.99,
    imageUrl: custom,
 
  },
  {
    id: 'design-4',
    name: 'Gradient QR',
    description: 'Gradient QR codes with motion effects.',
    status: 'comingSoon',
    category: 'Trendy',
     price: 9.99,
    imageUrl: trendy,
    
  },
  
  {
    id: 'design-5',
    name: 'Green QR',
    description: 'Gradient QR codes with motion effects.',
    status: 'comingSoon',
     price: 7.99,
    category: 'Eco',
    imageUrl: eco,
    
  }, 
   {
    id: 'design-6',
    name: 'Festive QR',
    description: 'Gradient QR codes with motion effects.',
    status: 'comingSoon',
    category: 'Seasonal',
     price: 5.99,
    imageUrl: seasonal,
    
  },


  {
    id: 'design-7',
    name: 'Retro Style',
    description: 'Vintage-inspired QR code design.',
    status: 'unavailable',
    category: 'Retired',
     price: 9.99,
    imageUrl: retired,
   
  } ,

   {
    id: 'design-8',
    name: 'Retro Style',
    description: 'Vintage-inspired QR code design.',
    status: 'unavailable',
    category: 'Limited',
     price: 9.99,
    imageUrl: limited,
   
  }
];