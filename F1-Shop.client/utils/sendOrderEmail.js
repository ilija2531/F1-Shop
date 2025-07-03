import emailjs from "@emailjs/browser";

export const sendOrderEmail = async ({ name, email, orderItems, total, shipping }) => {
  const orderText = orderItems
    .map((item) => `${item.name} × ${item.quantity}`)
    .join("\n");

  const shippingText = `
👤 ${shipping.fullName}
🏠 ${shipping.address}, ${shipping.city}
📞 ${shipping.phone}
`.trim();

  const templateParams = {
    name,
    email,
    order: orderText,
    total,
    shipping: shippingText,
  };

  return await emailjs.send(
    "service_9tt40vp",
    "template_pza7x0h",
    templateParams,
    "4jlgdtHmAc8muLzpM"
  );
};
