import { motion } from "framer-motion";
import heroBg from "../assets/images/hero.png";

function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(30,58,138,0.75), rgba(37,99,235,0.75)), url(${heroBg})`,
      }}
    >
      <div className="max-w-5xl mx-auto text-center">

        {/* Welcome Text */}
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-cyan-300 text-4xl md:text-6xl font-black mb-6 tracking-wide leading-tight"
        
        >
          Welcome to Student Management System
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 120,
          }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
        >
          Smart Student
          <br />
          Management System
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 text-blue-100 text-lg md:text-xl leading-9 max-w-3xl mx-auto font-bold"
        >
          A modern platform to manage students, courses, attendance,
          and academic information with a beautiful and responsive interface.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
        >
          <motion.button
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            whileHover={{
              scale: 1.15,
              boxShadow: "0px 20px 50px rgba(255,255,255,0.4)",
            }}
            className="bg-white text-[#1E3A8A] px-8 py-4 rounded-full text-lg font-bold shadow-2xl"
          >
            Get Started
          </motion.button>

          <motion.button
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.4,
            }}
            whileHover={{
              scale: 1.15,
              backgroundColor: "#fff",
              color: "#1E3A8A",
            }}
            className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold"
          >
            Learn More
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

export default HeroSection;