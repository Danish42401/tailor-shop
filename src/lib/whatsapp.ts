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
    if (customerData.phoneNumber) {
      message += `*Contact:* ${customerData.phoneNumber}\n`;
    }
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
    if (m.fullLength) message += `- [1] Length: ${m.fullLength}\n`;
    if (m.chestWidth) message += `- [2] Chest: ${m.chestWidth}\n`;
    if (m.waistWidth) message += `- [3] Waist: ${m.waistWidth}\n`;
    if (m.shoulderWidth) message += `- [4] Shoulder: ${m.shoulderWidth}\n`;
    if (m.hipWidth) message += `- [5] Hip Width: ${m.hipWidth}\n`;
    if (m.sleeveLength) message += `- [6] Sleeve Length: ${m.sleeveLength}\n`;
    if (m.armOpening) message += `- [7] Arm Opening: ${m.armOpening}\n`;
    if (m.neckCollar) message += `- [8] Neck/Collar: ${m.neckCollar}\n`;
    if (m.neckDepthFront) message += `- [9] Front Neck Depth: ${m.neckDepthFront}\n`;
    if (m.neckDepthBack) message += `- [10] Back Neck Depth: ${m.neckDepthBack}\n`;
  }

  message += `\n_Please confirm the order and discuss the fitting schedule._`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
