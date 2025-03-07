import React from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col justify-between items-center gap-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center flex-grow mt-[25%]"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          {t("hero.title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {t("hero.description")}
        </p>
        <a
          href="#contact"
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {t("hero.contactButton")}
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className=""
      >
        <MdKeyboardDoubleArrowDown className="text-8xl text-gray-800 dark:text-white" />
      </motion.div>
    </section>
  );
};

export default Hero;
