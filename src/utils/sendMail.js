// utils/sendEmail.js
import emailjs from "@emailjs/browser";

export const sendEmail = async ({ name, email, subject, message }) => {
  const templateParams = {
    from_name: name,
    from_email: email,
    subject,
    message,
  };

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID, // tu ID de servicio
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // tu ID de plantilla
    templateParams,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY, // tu public key
  );
};
