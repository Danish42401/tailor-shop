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
    message += `\n*Measurements provided:*\n`;
    const m = customerData.measurements;
    if (m.fullLength) message += `- [1] Full Length: ${m.fullLength}\n`;
    if (m.chestWidth) message += `- [2] Chest Width: ${m.chestWidth}\n`;
    if (m.waistWidth) message += `- [3] Waist Width: ${m.waistWidth}\n`;
    if (m.hipWidth) message += `- [4] Hip Width: ${m.hipWidth}\n`;
    if (m.shoulderWidth) message += `- [5] Shoulder Width: ${m.shoulderWidth}\n`;
    if (m.sleeveLength) message += `- [6] Sleeve Length: ${m.sleeveLength}\n`;
    if (m.armOpening) message += `- [7] Arm Opening: ${m.armOpening}\n`;
    if (m.neckCollar) message += `- [8] Neck/Collar: ${m.neckCollar}\n`;
    if (m.neckDepthFront) message += `- [9] Neck Depth (F): ${m.neckDepthFront}\n`;
    if (m.neckDepthBack) message += `- [10] Neck Depth (B): ${m.neckDepthBack}\n`;
    if (m.other) message += `- Other: ${m.other}\n`;
  }

  message += `\n_Please confirm the order and discuss the fitting schedule._`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
