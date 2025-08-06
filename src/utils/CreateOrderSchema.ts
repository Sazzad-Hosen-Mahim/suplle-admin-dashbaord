import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerPhone: z.string().min(1, "Phone number is required"),
  floor: z.string().min(1, "Floor is required"),
  table: z.string().min(1, "Table is required"),
  payment: z.enum(["cash", "card"], {
    required_error: "Payment method is required",
  }),
  menus: z.array(
    z.object({
      menu: z.string(),
      quantity: z.number().min(1),
    })
  ),
  status: z.enum(["pending", "inProgress", "delivered", "cancel"], {
    required_error: "Order status is required",
  }),
});

export type CreateOrderFormData = z.infer<typeof createOrderSchema>;
