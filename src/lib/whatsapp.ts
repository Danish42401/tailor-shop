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
    if (m.length) message += `- Length: ${m.length}\n`;
    if (m.shoulder) message += `- Shoulder: ${m.shoulder}\n`;
    if (m.chest) message += `- Chest: ${m.chest}\n`;
    if (m.waist) message += `- Waist: ${m.waist}\n`;
    if (m.other) message += `- Extra: ${m.other}\n`;
  }

  message += `\n_Please confirm the order and discuss the fitting schedule._`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
