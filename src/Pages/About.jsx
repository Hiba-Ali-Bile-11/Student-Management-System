

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import aboutImage from "../assets/images/about.png";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

function About() {
  return (
    <>
      <Navbar />
     <div className="min-h-screen bg-gradient-to-br from-[#06B6D4] via-cyan-500 to-[#1E3A8A] dark:from-gray-900 dark:via-gray-800 dark:to-black pt-28 overflow-hidden text-gray-900 dark:text-white">






        <div className="max-w-7xl mx-auto px-6">

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              title="About Us"

            />
          </motion.div>

          {/* ================= ABOUT SECTION ================= */}

          <div className="grid lg:grid-cols-2 gap-14 items-center py-16">

            {/* LEFT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              animate={{ y: [0, -15, 0] }}
            >
              <div
                className="
                  relative
                  rounded-3xl
                  overflow-hidden
                  group
                  border-4
                  border-cyan-300/40
                  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  hover:border-white
                  transition-all
                  duration-700
                "
              >
                <img
                  src={aboutImage}
                  alt="About"
                  className="
                    w-full
                    rounded-3xl
                    transition-all
                    duration-700
                    group-hover:scale-110
                    group-hover:rotate-1
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#1E3A8A]/70
                    via-transparent
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-700
                  "
                />
              </div>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight"
              >
                Student
                <span className="text-cyan-300"> Management </span>
                System
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-gray-100 leading-9 mb-6"
              >
                Student Management System is a modern web application
                developed using React and Tailwind CSS. It helps schools,
                colleges, and universities manage students, courses,
                attendance, and academic records efficiently.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg md:text-xl text-gray-100 leading-9"
              >
                Our goal is to provide a fast, secure, user-friendly,
                and modern platform that simplifies educational
                management with excellent performance.
              </motion.p>

              {/* FEATURES */}
              <div className="grid grid-cols-2 gap-5 mt-10">

                <motion.div
                  whileHover={{ scale: 1.08, rotate: -2 }}
                  transition={{ duration: 0.4 }}
                  className="
                    bg-white/15
                    backdrop-blur-xl
                    border
                    border-white/30
                    rounded-2xl
                    p-5
                    text-center
                    shadow-xl
                    cursor-pointer
                  "
                >
                  <h3 className="text-4xl font-black text-cyan-300">
                    100%
                  </h3>

                  <p className="text-white mt-2">
                    Secure Data
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  transition={{ duration: 0.4 }}
                  className="
                    bg-white/15
                    backdrop-blur-xl
                    border
                    border-white/30
                    rounded-2xl
                    p-5
                    text-center
                    shadow-xl
                    cursor-pointer
                  "
                >
                  <h3 className="text-4xl font-black text-cyan-300">
                    24/7
                  </h3>

                  <p className="text-white mt-2">
                    Support
                  </p>
                </motion.div>

              </div>

            </motion.div>

          </div>


          <div className="grid md:grid-cols-2 gap-8 pb-20">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-3xl
                p-8
                shadow-2xl
                hover:border-cyan-300
                hover:shadow-cyan-400/40
                transition-all
                duration-500
                cursor-pointer
              "
            >

              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{ duration: 0.8 }}
              >
                <FaBullseye className="text-cyan-300 text-6xl mb-6" />
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h3>

              <p className="text-gray-100 leading-8">
                To simplify student management through modern,
                secure and responsive technology while improving
                educational experiences.
              </p>

            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-3xl
                p-8
                shadow-2xl
                hover:border-cyan-300
                hover:shadow-cyan-400/40
                transition-all
                duration-500
                cursor-pointer
              "
            >

              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{ duration: 0.8 }}
              >
                <FaEye className="text-cyan-300 text-6xl mb-6" />
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Our Vision
              </h3>

              <p className="text-gray-100 leading-8">
                To become one of the leading digital education
                management solutions for schools, colleges,
                and universities.
              </p>

            </motion.div>

          </div>

          {/* ================= WHY CHOOSE US ================= */}

          <SectionTitle
            title="Why Choose Us?"
            subtitle="Reasons why our system is the right choice."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-14 pb-20 text-gray-900 dark:text-white">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.06,
                y: -15,
              }}
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-2xl
                text-
                border-2
                border-transparent
                hover:border-cyan-400
                transition-all
                duration-500
                cursor-pointer
              "
            >

              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.3,
                }}
                transition={{ duration: 0.8 }}
              >
                <FaCheckCircle className="text-cyan-500 text-6xl mx-auto mb-5" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4">
                Easy to Use
              </h3>

              <p className="text-gray-600 leading-7">
                Clean and user-friendly interface designed
                for students, teachers and administrators.
              </p>

            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.06,
                y: -15,
              }}
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-2xl
                text-center
                border-2
                border-transparent
                hover:border-cyan-400
                transition-all
                duration-500
                cursor-pointer
              "
            >

              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.3,
                }}
                transition={{ duration: 0.8 }}
              >
                <FaCheckCircle className="text-cyan-500 text-6xl mx-auto mb-5" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4">
                Responsive
              </h3>

              <p className="text-gray-600 leading-7">
                Fully responsive design that works perfectly
                on desktop, tablet and mobile devices.
              </p>

            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.06,
                y: -15,
              }}
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-2xl
                text-center
                border-2
                border-transparent
                hover:border-cyan-400
                transition-all
                duration-500
                cursor-pointer
              "
            >

              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.3,
                }}
                transition={{ duration: 0.8 }}
              >
                <FaCheckCircle className="text-cyan-500 text-6xl mx-auto mb-5" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4">
                Secure System
              </h3>

              <p className="text-gray-600 leading-7">
                Student information is protected with modern
                security and reliable data management.
              </p>

            </motion.div>

            <Link
              to="/"
              className="inline-flex items-center justify-center mt-6 border border-blue-900 text-white hover:bg-blue-900 hover:text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300"
            >
              Go Back Home
            </Link>

          </div>



        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;