import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t("projects.project1.title"),
      description: t("projects.project1.description"),
      tech: ["React", "Node.js", "MongoDB", "Redux", "Bootstrap"],
      image: "./images/motorX.jpg",
      live: "https://motorx.vercel.app/",
    },
    {
      title: t("projects.project2.title"),
      description: t("projects.project2.description"),
      tech: ["React", "Node.js", "MongoDB", "Redux", "Bootstrap"],
      image: "./images/myTinerary.jpg",
      github: "https://github.com/ivangutierrez92/my-tinerary-team-perro",
    },
    {
      title: t("projects.project3.title"),
      description: t("projects.project3.description"),
      tech: ["Python", "Telegram API"],
      image: "./images/botelegram.jpg",
      github: "https://github.com/cristianeze16/bot_telegram",
    },
    {
      title: t("projects.project4.title"),
      description: t("projects.project4.description"),
      tech: ["Javascript", "Chrome"],
      image: "./images/chrome_extension.jpg",
      github: "https://github.com/cristianeze16/linkedin_palette",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          {t("projects.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="text-white hover:text-blue-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="text-2xl" />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        className="text-white hover:text-blue-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt className="text-2xl" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
