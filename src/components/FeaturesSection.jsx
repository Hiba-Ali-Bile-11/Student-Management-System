


import {
  FaUserGraduate,
  FaBookOpen,
  FaClipboardCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: <FaUserGraduate size={50} />,
      title: "Student Management",
      description:
        "Manage student information quickly and efficiently.",
    },
    {
      id: 2,
      icon: <FaBookOpen size={50} />,
      title: "Course Management",
      description:
        "Organize courses and academic records with ease.",
    },
    {
      id: 3,
      icon: <FaClipboardCheck size={50} />,
      title: "Attendance",
      description:
        "Track attendance and student performance instantly.",
    },
  ];

  return (
    <section className="bg-blue-50 dark:bg-gray-900 py-24 px-6 overflow-hidden text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            title="Our Features"
            subtitle="Everything you need to manage your students in one place."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.25,
                type: "spring",
                stiffness: 120,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 1, 0, -1, 0],
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                bg-gradient-to-br
                from-[#1E3A8A]
                via-[#2563EB]
                to-[#3B82F6]
                p-10
                text-center
                shadow-2xl
                hover:shadow-[0_40px_100px_rgba(37,99,235,0.55)]
                hover:-translate-y-6
                hover:scale-105
                transition-all
                duration-700
                cursor-pointer
              "
            >

              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  -top-20
                  -right-20
                  w-52
                  h-52
                  rounded-full
                  bg-white/20
                  blur-3xl
                "
              />

              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="
                  relative
                  mx-auto
                  mb-8
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-cyan-300
                  shadow-xl
                  group-hover:bg-white
                  group-hover:text-[#1E3A8A]
                  group-hover:scale-125
                  transition-all
                  duration-700
                "
              >
                {feature.icon}
              </motion.div>
                            <motion.h3
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="
                  text-3xl
                  font-bold
                  text-white
                  mb-4
                "
              >
                {feature.title}
              </motion.h3>

              <motion.p
                animate={{
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="
                  text-blue-100
                  text-lg
                  leading-8
                  group-hover:text-white
                  transition-all
                  duration-500
                "
              >
                {feature.description}
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: 100 }}
                transition={{ duration: 0.6 }}
                className="
                  h-1
                  bg-cyan-300
                  rounded-full
                  mx-auto
                  mt-8
                "
              />

              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.05, 0.2, 0.05],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  inset-0
                  rounded-3xl
                  bg-white
                  blur-3xl
                  -z-10
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;