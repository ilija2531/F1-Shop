
import emailjs from "@emailjs/browser";

export const sendOrderEmail = async ({ name, email, orderItems, total }) => {
  const orderText = orderItems
    .map((item) => `${item.name} × ${item.quantity}`)
    .join("\n");

  const templateParams = {
    name,
    order: orderText,
    total,
    email,
  };

  return await emailjs.send(
    "service_9tt40vp",
    "template_pza7x0h",
    templateParams,
    "4jlgdtHmAc8muLzpM"
  );
};