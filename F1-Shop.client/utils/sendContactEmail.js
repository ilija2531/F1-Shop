import emailjs from "@emailjs/browser";

export const sendContactEmail = async ({ name, email, message }) => {
  const templateParams = {
    name,
    email,
    message,
  };

  return await emailjs.send(
    "service_9tt40vp",          
    "template_contact",         
    templateParams,
    "4jlgdtHmAc8muLzpM"         
  );
};
