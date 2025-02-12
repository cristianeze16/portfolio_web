import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaJs, FaPython } from "react-icons/fa";
import { SiExpress, SiMongodb, SiMysql, SiTailwindcss } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Skills = () => {
  const { t } = useLanguage();

  const skills = [
    // Frontend
    { name: "React", icon: FaReact, color: "text-blue-500" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "text-cyan-500" },
    // Backend
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
    { name: "Python", icon: FaPython, color: "text-blue-400" },
    { name: "Express.js", icon: SiExpress, color: "text-gray-800 dark:text-white" },
    // Databases
    { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-600" },
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          {t("skills.title")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <skill.icon className={`text-6xl ${skill.color} mb-4`} />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
