export const rs = (n: number) =>
  `Rs. ${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const WHATSAPP_NUMBER = "9779845441995";
export const PHONE_DISPLAY = "+977 9845441995";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(name: string, price: string, qty = 1) {
  return `Hello LightMart! I would like to order:\n\n• ${name}\n• Quantity: ${qty}\n• Price: ${price}\n\nPlease confirm availability and delivery.`;
}
