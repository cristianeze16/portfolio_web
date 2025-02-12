import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { t, language } = useLanguage();
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ show: false, success: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ show: false, success: false, message: "" });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus({
        show: true,
        success: true,
        message:
          language === "es"
            ? "¡Mensaje enviado con éxito!"
            : "Message sent successfully!",
      });
      form.current.reset();
    } catch (error) {
      setStatus({
        show: true,
        success: false,
        message:
          language === "es"
            ? "Error al enviar el mensaje. Por favor, intenta nuevamente."
            : "Error sending message. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          {t("contact.title")}
        </h2>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300"
          >
            <div className="flex justify-center space-x-8 mb-8">
              <a
                href="https://github.com/cristianeze16"
                target="_blank"
                className="text-4xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/cristian-hermosa-"
                target="_blank"
                className="text-4xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:cristianezehermosa@gmail.com"
                className="text-4xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaEnvelope />
              </a>
            </div>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="user_name"
                  className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                >
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="user_email"
                  className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                >
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              {status.show && (
                <div
                  className={`p-4 rounded-lg ${
                    status.success
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                      : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                  }`}
                >
                  {status.message}
                </div>
              )}
              <button
                type="submit"
                disabled={sending}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors ${
                  sending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {sending
                  ? language === "es"
                    ? "Enviando..."
                    : "Sending..."
                  : t("contact.send")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
