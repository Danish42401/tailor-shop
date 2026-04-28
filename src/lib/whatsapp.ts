import { CartItem, CustomOrderRequest } from "@/types";

export const generateWhatsAppLink = (
  phoneNumber: string,
  cart: CartItem[],
  totalPrice: number,
  customerData?: CustomOrderRequest
) => {
  let message = `*KIDS CHOICE DUBAI - New Order Request*\n\n`;

  if (customerData) {
    message += `*Customer:* ${customerData.customerName}\n`;
    message += `*Contact:* ${customerData.phoneNumber}\n`;
    message += `----------------------------\n`;
  }

  if (cart.length > 0) {
    message += `*Selected Items:*\n`;
    cart.forEach((item) => {
      message += `• ${item.name} (${item.quantity}x) - AED ${item.price * item.quantity}\n`;
    });
    message += `\n*Total Estimate:* AED ${totalPrice.toFixed(2)}\n`;
    message += `----------------------------\n`;
  }

  if (customerData?.notes) {
    message += `\n*Tailoring Notes/Customization:*\n${customerData.notes}\n`;
  }

  if (customerData?.measurements && Object.values(customerData.measurements).some(v => v)) {
    message += `\n*Measurements Provided:*\n`;
    const m = customerData.measurements;
    if (m.chest) message += `- [1] Chest: ${m.chest}\n`;
    if (m.shoulder) message += `- [2] Shoulder: ${m.shoulder}\n`;
    if (m.frockLength) message += `- [3] Frock Length: ${m.frockLength}\n`;
    if (m.armhole) message += `- [4] Armhole: ${m.armhole}\n`;
    if (m.sleeveLength) message += `- [5] Sleeve Length: ${m.sleeveLength}\n`;
    if (m.waist) message += `- [6] Waist: ${m.waist}\n`;
    if (m.neckWidth) message += `- [7] Neck Width: ${m.neckWidth}\n`;
    if (m.neckDepth) message += `- [8] Neck Depth: ${m.neckDepth}\n`;
  }

  message += `\n_Please confirm the order and discuss the fitting schedule._`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
