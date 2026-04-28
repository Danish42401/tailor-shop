import { CartItem, CustomOrderRequest } from "@/types";

export const generateWhatsAppLink = (
  phoneNumber: string,
  cart: CartItem[],
  totalPrice: number,
  customerData?: CustomOrderRequest
) => {
  let message = `*EMIRATES DEEP COLLECTION - New Order Request*\n\n`;

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
    if (m.length) message += `- [1] Length: ${m.length}\n`;
    if (m.chest) message += `- [2] Chest: ${m.chest}\n`;
    if (m.waist) message += `- [3] Waist: ${m.waist}\n`;
    if (m.shoulder) message += `- [4] Shoulder: ${m.shoulder}\n`;
    if (m.shoulderToWaist) message += `- [5] Shoulder to Waist: ${m.shoulderToWaist}\n`;
    if (m.armhole) message += `- [6] Armhole: ${m.armhole}\n`;
    if (m.sleeveLength) message += `- [7] Sleeve Length: ${m.sleeveLength}\n`;
    if (m.neckWidth) message += `- [8] Neck Width: ${m.neckWidth}\n`;
    if (m.neckDepth) message += `- [9] Neck Depth: ${m.neckDepth}\n`;
    if (m.hemWidth) message += `- [10] Hem Width / Flare: ${m.hemWidth}\n`;
  }

  message += `\n_Please confirm the order and discuss the fitting schedule._`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
